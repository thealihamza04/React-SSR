import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import sirv from 'sirv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'
const resolve = (p) => path.resolve(__dirname, '..', p)

async function createServer() {
  const app = express()

  let vite
  if (!isProd) {
    const { createServer } = await import('vite')
    vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
    app.use(vite.middlewares)
  } else {
    app.use('/assets', sirv(resolve('dist/client/assets'), { maxAge: 31536000, immutable: true }))
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl
    try {
      const templatePath = isProd ? resolve('dist/client/index.html') : resolve('index.html')
      let template = fs.readFileSync(templatePath, 'utf-8')
      if (!isProd && vite) template = await vite.transformIndexHtml(url, template)

      const render = isProd
        ? (await import(resolve('dist/server/entry-server.js'))).render
        : (await vite.ssrLoadModule('/src/entry-server.jsx')).render

      const { pipe, status } = await render(url)
      res.status(status)
      const [head, tail] = template.split('<!--app-html-->')
      res.write(head)
      pipe(res)
      res.write(tail)
    } catch (e) {
      if (!isProd && vite) vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  const port = process.env.PORT || 5173
  app.listen(port, () => {
    console.log(`SSR server listening on :${port}`)
  })
}

createServer()


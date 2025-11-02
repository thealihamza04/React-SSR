import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resolve = (p) => path.resolve(__dirname, '..', p)

export default async function handler(req, res) {
  try {
    const url = req.url
    const templatePath = resolve('dist/index.html')
    const template = fs.readFileSync(templatePath, 'utf-8')

    const { render } = await import(resolve('dist/server/entry-server.js'))
    const { pipe, status } = await render(url)

    res.statusCode = status || 200
    const [head, tail] = template.split('<!--app-html-->')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.write(head)
    pipe(res)
    res.write(tail)
    res.end()
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.end(e.message)
  }
}

export const intro =
  'Add server-side rendering to your React app with a small, clean setup using Vite, React Router, TailwindCSS, and DaisyUI.'

export const steps = [
  {
    title: 'Install dependencies',
    lang: 'bash',
    code: `npm i react-router-dom express sirv
npm i -D tailwindcss @tailwindcss/vite daisyui cross-env`,
  },
  {
    title: 'Add client and server entries',
    lang: 'jsx',
    code: `// src/entry-client.jsx
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

hydrateRoot(document.getElementById('root'), (
  <BrowserRouter>
    <App />
  </BrowserRouter>
))

// src/entry-server.jsx
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

export function render(url) {
  return new Promise((resolve, reject) => {
    let didError = false
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onShellReady() { resolve({ pipe, status: didError ? 500 : 200 }) },
        onShellError(err) { reject(err) },
        onError() { didError = true },
      }
    )
  })
}`,
  },
  {
    title: 'Create an Express server for dev/prod',
    lang: 'javascript',
    code: `// server/index.js
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
  app.listen(port, () => console.log(\`SSR server listening on :\${port}\`))
}

createServer()`,
  },
  {
    title: 'Configure Tailwind + DaisyUI (v4)',
    lang: 'markup',
    code: `// src/index.css
@import "tailwindcss";
@plugin "daisyui";

// index.html
<link rel="stylesheet" href="/src/index.css" />`,
  },
  {
    title: 'Build and run',
    lang: 'bash',
    code: `npm run dev          # start dev SSR
npm run build        # build client + server bundles
npm run preview      # run production SSR`,
  },
  {
    title: 'Deploy to Vercel',
    lang: 'bash',
    code: `# Ensure these files exist (added in this template):
# vercel.json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build:vercel",
  "rewrites": [
    { "source": "/assets/(.*)", "destination": "/assets/$1" },
    { "source": "/((?!assets/|api/|.*\\..*).*)", "destination": "/api/index.js" }
  ]
}

# package.json (scripts)
"build:vercel": "npm run build && node scripts/vercel-copy-assets.cjs"

# Deploy commands
npm i -g vercel          # install Vercel CLI (once)
vercel                   # first deploy, accept defaults
vercel --prod            # promote a production deployment`,
  },
]


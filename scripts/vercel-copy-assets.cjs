/* Copy built client assets to public/ so Vercel serves them statically */
const fs = require('node:fs')
const path = require('node:path')

const from = path.resolve(__dirname, '..', 'dist', 'assets')
const to = path.resolve(__dirname, '..', 'public', 'assets')

if (fs.existsSync(from)) {
  fs.mkdirSync(to, { recursive: true })
  fs.cpSync(from, to, { recursive: true, force: true })
  console.log(`[vercel] Copied assets -> ${path.relative(path.resolve(__dirname, '..'), to)}`)
} else {
  console.warn('[vercel] No client assets found to copy')
}

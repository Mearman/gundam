import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p: string) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import(toAbsolute('dist/server/entry-server.js'))

const appHtml = render()
const html = template.replace('<!--ssr-outlet-->', appHtml)

fs.writeFileSync(toAbsolute('dist/index.html'), html)
console.log('✓ Pre-rendered static HTML into dist/index.html')

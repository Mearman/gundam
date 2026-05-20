import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import pkg from './package.json'

// https://vite.dev/config/
export default defineConfig({
  base: '/gundam/',
  plugins: [react(), vanillaExtractPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
})

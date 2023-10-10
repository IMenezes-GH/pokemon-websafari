// vite.config.js
import {resolve} from 'path'
import { defineConfig } from 'vite'
// const { defineConfig } = require("vite");

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        safari: resolve(__dirname, 'safari/pokedex.html')
      }
    }
  }
})
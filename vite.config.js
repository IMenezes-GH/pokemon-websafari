// vite.config.js
import {resolve} from 'path'
import { defineConfig } from 'vite'
// const { defineConfig } = require("vite");

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pokedex: resolve(__dirname, 'safari/pokedex.html'),
        about: resolve(__dirname, 'safari/about.html'),
        team: resolve(__dirname, 'safari/team.html'),
        explore: resolve(__dirname, 'safari/explore.html')
      }
    }
  }
})
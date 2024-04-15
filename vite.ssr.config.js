import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import symfonyPlugin from "vite-plugin-symfony";

// https://vitejs.dev/config/
export default defineConfig(({isSsrBuild})=>{
  return{
    plugins: [vue()],
    root: './assets',
    base:'/',
    build : {
      rollupOptions:{
        input : {
          app: resolve(__dirname,'assets/entry-client.js')
          },
        }
      }
  }
  })

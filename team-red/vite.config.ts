import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation"
import ElementPlus from 'unplugin-element-plus/vite'
import legacyPlugin from '@vitejs/plugin-legacy'
import topLevelAwait from "vite-plugin-top-level-await"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ElementPlus(),
    vue(),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: i => `__tla_${i}`
    }),
    legacyPlugin({  // 新增
      targets: ['chrome 51', 'not IE 11']
    }),
    federation({
      name: 'team-red',
      remotes: {
        "team-blue": "http://localhost:5002/assets/remoteEntry-legacy.js",
        "team-green": "http://localhost:5003/assets/remoteEntry-legacy.js",
      },
      shared: ['vue','pinia']
  })
  ],
  build:{
    minify:false,
    target: ['chrome 51', 'not IE 11']
  }
})

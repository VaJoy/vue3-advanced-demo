import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import legacyPlugin from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacyPlugin({  // 新增
      targets: ['chrome 51', 'not IE 11']
    }),
    cssInjectedByJsPlugin(),
    federation({
      name: 'team-green',
      filename: 'remoteEntry-legacy.js',
      exposes: {
          './Recommendations': './src/components/Recommendations.vue',
      },
      shared: ['vue', 'pinia']
    })
  ],
  base: 'http://127.0.0.1:5003',
  build: {
    minify: false,
    target: ['chrome 51', 'not IE 11']
 }
})

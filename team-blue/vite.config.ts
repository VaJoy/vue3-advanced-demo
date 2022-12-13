import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacyPlugin from '@vitejs/plugin-legacy'
import federation from '@originjs/vite-plugin-federation'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ElementPlus(),
    cssInjectedByJsPlugin(),
    vue(),
    legacyPlugin({
      targets: ['chrome 51', 'not IE 11']
    }),
    federation({
      name: 'team-blue',
      filename: 'remoteEntry-legacy.js',
      exposes: {
          './BasketInfo': './src/components/BasketInfo.vue',
          './BuyButton': './src/components/BuyButton.vue',
      },
      shared: ['vue', 'pinia']
    })
  ],
  build: {
    minify: false,
    target: ['chrome 51', 'not IE 11']
 }
})

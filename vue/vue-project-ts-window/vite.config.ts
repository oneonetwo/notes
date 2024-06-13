import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//注册vant组件
import AutoImport from 'unplugin-auto-import/vite' //作用是自动导入第三方库或组件
import Components from 'unplugin-vue-components/vite' //可以不需要手动引入组件，能够让开发者就像全局组件那样进行开发，但实际上又是按需引入
import { VantResolver } from '@vant/auto-import-resolver' //会自动引入vant插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // importStyle: false //已经全局引入样式，关闭对应导入
      resolvers: [VantResolver({ importStyle: false })]
    }),
    Components({
      resolvers: [
        VantResolver()
        // (componentName) => {
        //   // where `componentName` is always CapitalCase
        //   if (componentName.startsWith('Van')) return { name: componentName.slice(3), from: 'vant' }
        // }
      ]
    })
  ],
  base: 'root',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

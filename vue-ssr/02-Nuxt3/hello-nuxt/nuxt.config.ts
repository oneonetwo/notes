// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  // devtools: { enabled: true },
  // 全局样式配置
  css: [
    "@/assets/styles/main.css", 
    "@/assets/styles/global.scss",
    "@/assets/font/iconfont.css"
  ],
  //自动导入
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 自动给 scss模块首行添加额外的数据
          additionalData: '@use "@/assets/styles/variables.scss" as *;'
        }
      }
    }
  },
  modules: ['@pinia/nuxt'], //引入pinia
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  // devtools: { enabled: true },
  // 全局样式配置
  css: [
    //reset 统一样式样式
    "normalize.css",
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
  app: {
    head: {
      title: '这是项目的title',
      meta: [
        {
          name: 'description',
          content: '这是项目的描述'
        },{
          name: 'keywords',
          content: '这是项目的 关键字'
        }
      ],
      link: [{rel: "icon", type:"image/x-icon", href:"/favicon.ico"}],
      noscript: [{children: "Javascript is required"}]
    }
  }
})

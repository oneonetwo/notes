import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import './registerMicroApp.js'

// 创建主应用
const app = createApp(App)
// 必须在 mount 之前注册 router
app.use(router)
app.mount('#root')
    


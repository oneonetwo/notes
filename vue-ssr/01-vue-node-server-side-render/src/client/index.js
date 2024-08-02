import { createApp } from "vue"
import App from "../app.vue"
import createRouter from '../router'
import { createWebHistory } from "vue-router"
import { createPinia } from "pinia"


const app = createApp(App)

//使用路由插件
let router = createRouter(createWebHistory())
app.use(router)

let pinia = createPinia();
app.use(pinia)

router.isReady().then(_=>{
    app.mount('#app')
})
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import About from '../views/about/index.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let prefix = ''

// // 判断是 qiankun 环境则增加路由前缀
if(qiankunWindow.__POWERED_BY_QIANKUN__){
  prefix = '/sub-app-vite'
}

const routes = [
  {
    path: prefix+'/',
    name: 'Home',
    component: Home
  },
  {
    path: prefix+'/about/',
    name: 'About',
    component: About
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 
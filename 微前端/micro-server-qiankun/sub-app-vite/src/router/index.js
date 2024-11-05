import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import About from '../views/about/index.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]
const router = createRouter({
  history: createWebHashHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/#/sub-app-vite' : '/'),
  routes
})

export default router 
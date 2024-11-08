import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/microApp/sub-app-vite/:pathMatch(.*)',
    hidden:true,
    name: 'sub-app-vite',
    component: () => import('../views/subApp/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 
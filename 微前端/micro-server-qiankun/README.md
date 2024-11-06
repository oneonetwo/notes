## Nodev18.18.0 Pnpm 9.0.1 vue3.x
### main-app webpack 5.x    sub-app-vite vite 3.x

### 一. 主应用引入qiankun

1. `npm i qiankun -S`

### 二. 主应用配置

1. 注册微应用   
2. 启动qiankun
3. 引入vue-router，修改router的配置
4. 修改 app.vue
```js
import { registerMicroApps, start } from 'qiankun'

const isDev = process.env.NODE_ENV === 'development'


// 1. 注册微应用
registerMicroApps([
    {
      name: 'sub-app-vite', // 子应用名称
      entry: '//localhost:5173', // 子应用入口，根据实际端口配置
      container: '#sub-app-container', // 子应用挂载的容器
      activeRule: '/#/sub-app-vite/' // 子应用激活的路由规则
    }
])

// 2.启动 qiankun
start() 
// 3. 修改router的配置
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sub-app-vite/:pathMatch(.*)',
    name: 'sub-app-vite',
    component: () => import('../views/subApp/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 

```


### 3. 子应用配置
1. 在入口文件`main.js`中注册微应用

2. 配置vite.config.js
    1. 引入插件 `npm install vite-plugin-qiankun -D`
3. 修改 router的配置

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app = null
let container = null

renderWithQiankun({
    mount(props) {
        // 挂载
        render(props)
    },
    bootstrap() {
        // 启动
        console.log('子应用启动')

    },
    unmount() {
        // 卸载
        app.unmount()
    }
})


function render(props = {}) {
  // 保存容器引用
  container = props.container ? props.container.querySelector('#app') : document.querySelector('#app')
  app = createApp(App)
  app.use(router)
  // 确保容器存在后再挂载
  app.mount(container)
}

// qiankun 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render()
}


````


### 四. 子应用使用主应用的store
1. 使用 window 全局对象
2. 使用 qiankun 的 props 传递 Pinia 实例
    1. 方式一：使用`provide/inject`
    2. 方式二：子应用中组件直接调用主应用的store
```js
  registerMicroApps([
    {
      name: 'childApp',
      entry: '//localhost:8081',
      container: '#container',
      activeRule: '/app1',
      props: { piniaStore: pinia } // 传递给子应用的 props
    }
  ]);
  const { piniaStore } = props;
  app.use(piniaStore);
```
3. 使用 qiankun 提供的 initGlobalState
  


### 五. 上线部署，打包路径以及环境区分
1. 主应用注册微应用时，entry的值为子应用的base路径
2. 子应用修改vite.config.js的base路径为子应用的base路径

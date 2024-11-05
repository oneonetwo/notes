## Nodev18.18.0 Pnpm 9.0.1 vue3.x
### main-app webpack 5.x    sub-app-vite vite 3.x

#### 1. 引入qiankun
1. `npm i qiankun -S`
### 2. 主应用配置
    - 注册微应用    
    - 启动qiankun
```js
import { registerMicroApps, start } from 'qiankun'

const isDev = process.env.NODE_ENV === 'development'
console.log('isDev', isDev)

// 注册微应用
registerMicroApps([
    {
      name: 'sub-app-vite', // 子应用名称
      entry: '//localhost:5173', // 子应用入口，根据实际端口配置
      container: '#sub-app-container', // 子应用挂载的容器
      activeRule: '/#/sub-app-vite/' // 子应用激活的路由规则
    }
])

// 启动 qiankun
start() 
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

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
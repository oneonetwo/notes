import { registerMicroApps, start, initGlobalState  } from 'qiankun'

const isDev = process.env.NODE_ENV === 'development'



export const qianduanRender = (app, piniaInstance) => {  
  // 注册微应用
  registerMicroApps([
    {
      name: 'sub-app-vite', // 子应用名称
      entry: isDev?'//localhost:5173':'//127.0.0.1:8056', // 子应用入口，根据实际端口配置
      container: '#sub-app-container', // 子应用挂载的容器
      activeRule: '/#/sub-app-vite/live', // 子应用激活的路由规则
      props: ()=>({
        piniaStore: piniaInstance,
                // 添加基础路由配置传递给子应用
        baseRoute: '/sub-app-vite'
      })
    }
  ])

  // 启动 qiankun
  start(
    {
      sandbox: {
        strictStyleIsolation: true,
        experimentalStyleIsolation: true,
      }
    }
  ) 
}

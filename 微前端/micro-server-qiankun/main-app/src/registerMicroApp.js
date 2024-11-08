import { registerMicroApps, start, initGlobalState  } from 'qiankun'

const isDev = process.env.NODE_ENV === 'development'



export const qianduanRender = (app, piniaInstance) => {  
  // 注册微应用
  // https://qiankun.umijs.org/zh/cookbook#%E5%BE%AE%E5%BA%94%E7%94%A8%E7%9A%84%E8%B7%AF%E7%94%B1%E6%A8%A1%E5%BC%8F%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9
  const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
  registerMicroApps([
    {
      name: 'sub-app-vite', // 子应用名称
      entry: isDev?'//localhost:5173/':'//127.0.0.1:8056', // 子应用入口，根据实际端口配置
      container: '#sub-app-container', // 子应用挂载的容器
      activeRule: getActiveRule('#/microApp/sub-app-vite'), // 子应用激活的路由规则
      props: ()=>({
        piniaStore: piniaInstance,
      })
    }
  ])

  
  // 启动 qiankun
  start() 
}

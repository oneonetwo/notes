import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import piniaInstance from './store'

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
  // 注册子应用的pinia
  app.use(piniaInstance)
//   props.onGlobalStateChange((state, prev) => {
//     // state: 变更后的状态; prev 变更前的状态
//     console.log('变更后的状态; prev 变更前的状态', state, prev);
//   });
  app.use(router)

  // 使用主应用的store
  app.use(props.piniaStore)

  // 确保容器存在后再挂载
  app.mount(container)
}


// qiankun 独立运行时
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render()
}

// export async function bootstrap() {
//   console.log('子应用启动')
// }

// export async function mount(props) {
//   console.log('子应用挂载')
//   render(props)
// }

// export async function unmount() {
//   console.log('子应用卸载')
//   app.unmount()
// }


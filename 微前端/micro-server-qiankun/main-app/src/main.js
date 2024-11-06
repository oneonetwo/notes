import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import { qianduanRender } from './registerMicroApp.js'
import piniaInstance, { useUserStore } from './store'
import { initGlobalState } from 'qiankun'
// 创建主应用
const app = createApp(App)
// 必须在 mount 之前注册 router
app.use(router)
// 注册pinia
app.use(piniaInstance)

qianduanRender(app, piniaInstance)

// 注册 actions
// 初始化 state
const state = useUserStore().user
const actions = initGlobalState(state);
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
// actions.offGlobalStateChange();

// 注册微应用
app.mount('#root')
    


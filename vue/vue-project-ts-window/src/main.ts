import { createApp } from 'vue'
import piniaInstance from './stores'

import App from './App.vue'
import router from './router'

// vant引入组件样式
import 'vant/lib/index.css'
import './styles/index.scss'

const app = createApp(App)

app.use(piniaInstance)
app.use(router)

app.mount('#app')

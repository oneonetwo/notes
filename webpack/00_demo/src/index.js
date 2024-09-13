import './components/cssFileDemo.js'
import './components/imgDemo.js'
import './components/jsloader.js'
// 引入vue
import { createApp } from 'vue'
import Hello from './vue-demo/hello.vue'

// vue代码
console.log('DefinePlugin定义的全局变量', version)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

createApp(Hello).mount('#app')



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './react/app';


import './components/cssFileDemo.js'
import './components/imgDemo.js'
import './components/jsloader.js'
// 引入vue
import { createApp } from 'vue'
import Hello from './vue-demo/hello.vue'
import { sum } from './ts/math.ts';

// vue代码
console.log('DefinePlugin定义的全局变量', version)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)



createApp(Hello).mount('#app')

//react 代码
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

//6. 使用typescript代码
console.log(sum(20, 30))


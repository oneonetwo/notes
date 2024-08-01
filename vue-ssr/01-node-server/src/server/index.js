let express = require('express')
let server = express()
import createApp from '../app'
import { renderToString } from '@vue/server-renderer'
// @vue/server-renderer 包中的 renderToString 函数是 Vue 3 提供的用于服务器端渲染（SSR）的核心函数之一。它的主要作用是将 Vue 组件实例渲染为 HTML 字符串，

server.get('/', async (req, res)=>{

    // let appStringHtml = await renderToString(createApp)
    // console.log('content', appStringHtml);
    res.send(12321)
})

server.listen(3000, ()=>{
    console.log('start node server on 3000 ~')
})
let express = require('express')
let server = express()


import createApp from '../app'
import { renderToString } from '@vue/server-renderer'
import createRouter from '../router'
import { createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'

// @vue/server-renderer 包中的 renderToString 函数是 Vue 3 提供的用于服务器端渲染（SSR）的核心函数之一。它的主要作用是将 Vue 组件实例渲染为 HTML 字符串，
server.use(express.static('build')) //部署静态资源

server.get('/*', async (req, res)=>{
    try {
        let app = createApp();

        //1. app 安装使用路由插件
        let router = createRouter(createMemoryHistory())
        app.use(router)
        await router.push(req.url || '/')
        await router.isReady()
        //2. app安装 pinia
        let pinia = createPinia();
        app.use(pinia)
        //
        let appStringHtml = await renderToString(app)
        
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>vue ssr</title>
                </head>
                <body>
                    <h1>vue app</h1>
                    <div id="app">
                        ${appStringHtml}
                    </div>
                    <script src="/client/client_bundle.js"></script>
                </body>
            </html>
`)
    } catch (error) {
        res.status(500)   
        
    }
})

server.listen(3000, ()=>{
    console.log('start node server on 3000 ~')
})
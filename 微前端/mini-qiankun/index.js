// 实现基础的加载并渲染子应用

// 1. 实现注册子应用配置的方法

let appConfig = null

function registerMicroApp (config){
    appConfig = config
}

export function getAppConfig () {
    return appConfig
}

// 2. 匹配路由规则
// 在已经存在的VueRouter中增加我们自己的匹配规则
// history
// go

function rewriteRouter(){
    window.addEventListener('popstate', ()=>{
        console.log('开始加载子应用')
        matchRouteRule()
    })

    const originPushState = window.history.pushState
    window.history.pushState = function (...reset){
        // 1. 执行原本的方法逻辑
        originPushState.apply(window.history, reset)
        // 2. 插入我们自己的逻辑
        console.log('开始加载子应用')
        // 3. 匹配路由规则
        matchRouteRule()

    }
}

function matchRouteRule (){
    //获取当前url的路径
    const path = window.location.pathname
    const appConfig = getAppConfig()
    const app = appConfig.find(item=>item.activeRule === path)
    if(app){
        // 加载子应用
        loadMicroApp(app)
    }
}


// 3. 加载子应用
// 通过网络请求获取子应用的html资源，解析内部资源css js
function loadMicroApp (app) {
    // 1. 使用`import-html-entry` https://github.com/kuitos/import-html-entry
    importHtml(app.entry).then(res=>{
        // 4. 渲染子应用
        // 1. 把模版渲染出来 tempalte渲染到对应的节点上
        document.querySelector(app.container).innerHTML = res.template
        // 2. 把脚本执行一下
        res.execScripts()
    })
}

// 启动方法
export function start(){
    rewriteRouter()
}



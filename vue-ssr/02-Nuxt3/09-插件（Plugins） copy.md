### Nuxt插件 （Plugins）
1. Nuxt3支持自定义插件进行扩展,创建插件有两种方式:
    1. 方式一:直接使用`useNuxtApp()`中的`provide(name,vlaue)`方法直接创建,比如:可在App.vue中创建 
        - `useNuxtApp`提供了访问Nuxt共享`运行时上下文`的方法和属性(两端可用):`provide、hooks、callhook、vueApp`等
    2. 方式二:在`plugins`目录中创建插件(推荐)
        1. `顶级`和`子目录index文件`写的插件会在创建Vue应用程序时会`自动加载`和`注册`
        2. `.server`或`.client`后缀名插件,可区分`服务器端`或`客户端`,用时需区分环境
2. 在plugins目录中创建插件
    1. 在plugins目录下创建`plugins/price.ts`插件
    2. 接着`defineNuxtPlugin`函数创建插件,参数是一个回调函数
    3. 然后在组件中使用`useNuxtApp()`来拿到插件中的方法
3. 注意事项:
    1. 插件注册顺序可以通过在文件名前加上`一个数字`来控制插件注册的顺序
    2. 比如:plugins/1.price.ts plugins/2.string.ts,plugins/3.date.ts

```js
// 1. 注册
export default defineNuxtPlugin(()=>{
    return {
        provide: {
            hello: (msg: string) => `hello ${msg}`
        }
    }
})

//2. 使用
const { $hello } = useNuxtApp() 

```


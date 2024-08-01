import  { createSSRApp } from "vue"
import  App from "./app.vue"

//  写一个函数返回示例的原因
// 1. 避免共享状态
//    在服务端渲染中，每个请求都会创建一个新的应用实例。通过将应用创建逻辑封装在 createApp 函数中，确保每次调用该函数时都会创建一个新的 Vue 应用实例。这样可以避免在多个请求之间共享应用实例，从而避免共享状态导致的问题。
// 2. 支持服务端渲染
//    在 SSR 中，每个请求都需要一个新的 Vue 实例和新的根组件树。如果不使用工厂函数，每个请求将会共享同一个 Vue 实例，这会导致数据污染和潜在的安全问题。通过使用 createApp 函数，每次请求都会生成一个新的应用实例，确保数据隔离。
// 3. 灵活性和可扩展性
export default function createApp(){
    let app = createSSRApp(App)
    return app
}


import { createPinia } from 'pinia'
// import piniaPluginPersist from 'pinia-plugin-persist'

export * from './user'
const piniaInstance = createPinia()
// 使用pinia插件 数据持久化
// piniaInstance.use(piniaPluginPersist)

export default piniaInstance
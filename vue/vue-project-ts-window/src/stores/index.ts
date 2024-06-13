import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate' //数据持久化

// export { useUserStore } from './user'
export * from './user'

const piniaInstance = createPinia().use(persist)
export default piniaInstance

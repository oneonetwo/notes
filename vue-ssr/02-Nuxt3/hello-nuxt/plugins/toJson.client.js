export default defineNuxtPlugin((nuxtAppContext)=>{
    return {
        provide: {
            // 自定义差劲啊，格式化价格的插件（创建vue实例就会自动注册）
            toJson: (obj)=>{
                return JSON.parse(JSON.stringify(obj))
            },
            //key: value
        }
    }
})
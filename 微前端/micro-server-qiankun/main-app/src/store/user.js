import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('user-info',  ()=>{
    const user = ref({
        name: '张三',
        age: 18
    })
    const setUserInfo = ()=>{
        user.value.name = '李四'
        user.value.age = 20
    }
    return { user, setUserInfo }
})

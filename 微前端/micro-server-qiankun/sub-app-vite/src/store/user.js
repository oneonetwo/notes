import { defineStore } from "pinia"
import { ref } from "vue"

export const useCounter = defineStore('use-counter',  ()=>{
    const number = ref(0)
    const add = ()=>{
        number.value += 1
    }
    const minus = ()=>{
        number.value -= 1
    }
    return { number, add, minus }
})

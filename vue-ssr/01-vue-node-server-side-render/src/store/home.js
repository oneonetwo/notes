import { defineStore } from 'pinia'

export const  useHomeStore = defineStore('home', {
    state : ()=>({
        count: 1000
    }),
    actions: {
        //支持同步和异步
        increment(){
            this.count++
        },
        decrement(){
            this.count--
        },
        async fetchHomeDataList(){

        }
    }
})
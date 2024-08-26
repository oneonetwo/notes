import { defineStore } from 'pinia';

export const useHomeStore = defineStore('home-info', () => {
    
    const count = ref(0)
    const increment = ()=>{
        count.value++
    }
    const doubleCount = computed(()=>count.value * 2)


    const list = ref([]);


    const fetchHomeData = async()=>{
        const { data } = await  $fetch('http://localhost:3000/api/homeInfo', {method:'GET'})
        list.value = data
    }

    return {
        count,
        increment,
        doubleCount,
        list,
        fetchHomeData,
    }
})
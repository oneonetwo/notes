<template>
	<div>
    <br>
    <br>
    <br>
    <br>
		<div>Page: Nuxt3 集成 Pinia</div>

		<div>{{ count }}</div>
		<button @click="homeStore.increment">增加</button>
    <br>
    <br>
    <div>{{list}}</div>
    <br>
    <br>
    <br>
    <br>
	</div>
</template>
<script setup>
import { useHomeStore } from '~/store/home'
import { storeToRefs } from 'pinia' //解构

const homeStore = useHomeStore()
const { count, list } = storeToRefs(homeStore)

onMounted(()=>{
  homeStore.fetchHomeData()
}) 

</script>
<style scoped></style>

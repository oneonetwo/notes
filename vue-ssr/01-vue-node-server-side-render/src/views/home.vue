<template>
	<div style="border: 1px solid red">
		<h1>Home Page</h1>
		<div>
			{{ count }}
		</div>
		<button @click="handleIncrement">+1</button>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useHomeStore } from "../store/home";
import { storeToRefs } from "pinia";

let homeStore = useHomeStore()
let { count } = storeToRefs(homeStore)
// let count = ref(1000);
function handleIncrement() {
	homeStore.increment()
}
</script>

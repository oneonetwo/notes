<template>
	<div style="border: 1px solid green">
		<h1>About page</h1>
		<div>
			{{ count }}
		</div>
		<button @click="handleIncrement">- 1</button>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useHomeStore } from "../store/home";
import { storeToRefs } from "pinia";
let homeStore = useHomeStore()
let { count } = storeToRefs(homeStore)
// let count = ref(100);
function handleIncrement() {
	homeStore.decrement()
}
</script>

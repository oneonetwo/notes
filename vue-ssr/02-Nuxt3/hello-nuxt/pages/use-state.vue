<template>
	<div>
    <br>
    <br>
    <br>
    <br>
		<div>Page: useState全局共享数据</div>

		<div>{{ state.loginInfo }}</div>
		<button @click="state.changeAge(2)">增加年龄</button>
    <br>
    <br>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
	</div>
</template>
<script setup>
const state = useLoginInfo();

</script>
<style scoped></style>

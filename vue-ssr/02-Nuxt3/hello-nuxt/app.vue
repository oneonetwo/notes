<template>
	<div class="global-theme">
		<!-- <NuxtRouteAnnouncer /> -->
		<!-- <NuxtWelcome /> -->
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
	</div>
</template>
<script setup>

// 方式一： 创建插件
const nuxtApp = useNuxtApp()
nuxtApp.provide('formData', ()=>{
    return '2024-12-11'
})

nuxtApp.provide('version', '1.0.1')

//使用插件
console.log(nuxtApp.$formData())



</script>
<style lang="scss" scoped>
// 全局样式
.global-theme {
	color: red;
}
</style>

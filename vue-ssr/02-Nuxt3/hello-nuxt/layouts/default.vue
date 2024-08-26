<template>
    <div class="layouts">
        <div class="header">
        <h1>header</h1>
		<nuxt-link to="/"> <button>首页</button></nuxt-link>
		<nuxt-link to="/home"><button>home</button></nuxt-link>
		<nuxt-link to="/login"><button>login</button></nuxt-link>
		<nuxt-link to="/use-state"> <button>useState全局共享数据</button>	</nuxt-link>
		<nuxt-link to="/pinia-demo"><button>pinia  demo</button></nuxt-link>
		<nuxt-link to="/plugins"> <button>plugins demo</button></nuxt-link>
		<nuxt-link to="/use-fetch"><button>useFetch封装 demo</button></nuxt-link>
		<nuxt-link to="/request-demo" replace><button>request demo page</button></nuxt-link>
		<nuxt-link
			:to="{
				path: '/request-lazy',
				query: {
					id: 100,
				},
			}"
			><button>request-lazy</button></nuxt-link
		>
		<nuxt-link to="http://www.baidu.com" target="_blank"
			><button>baidu.com</button></nuxt-link
		>
		<button @click="gotoCategory"> baidu.com </button>
		<button @click="gotoCard">card</button>
		<button @click="gotoBack">back</button>
    <!-- 动态路由 -->
		<nuxt-link to="/detail-admin/123?name=xiaoming" replace><button>/detail-admin/123</button></nuxt-link>
    <!-- 嵌套路由 -->
		<nuxt-link to="/detail06/parent"> <button>parent page</button></nuxt-link>
		<nuxt-link to="/detail06/parent/child"> <button>parent child page</button></nuxt-link>
        </div>   
        <slot/>
        <div class="footer">footer</div>
    </div>
</template>
<script setup>
const router = useRouter()
//路由守卫
router.beforeEach((to, from)=>{
  console.log('from', from) 
  console.log('to', to)
})
function gotoBack() {
  router.go(-1)
}
function gotoCard(){
  router.push('/card')
}
function gotoCategory() {
	// 1. 外部链接
	return navigateTo(`http://baidu.com`, {
		external: true, //跳到外部链接
	});
	// 2. url对象
	return navigateTo(
		{
			path: "/category",
			query: {
				id: 200,
			},
		},
		{
			replace: true, //是否替换当前的页面
		},
	);
}
</script>
<style lang="scss" scoped>
.header{
    width: 100%;
    height: 200px;
    background-color: aquamarine;
}
.footer{
    width: 100%;
    height: 50px;
    background-color: antiquewhite;;
}
</style>
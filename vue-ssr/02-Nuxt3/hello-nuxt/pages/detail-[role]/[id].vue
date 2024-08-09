<template>
    <div>
        <h2>detail-role:{{role}}--id:{{id}}</h2>
        <h3>{{name}}</h3>
    </div>
</template>
<script setup>
    let route = useRoute()

    let {role, id} = route.params
    let { name } = route.query


    definePageMeta({
        //路由验证
        validate: (route)=>{
            console.log(route);
            // return /^\d+$/.test(route.params.id);
            if(/^\d+$/.test(route.params.id)){
                return true
            }else{
                return {
                    statusCode: 401
                }
            }
        }
    })
</script>
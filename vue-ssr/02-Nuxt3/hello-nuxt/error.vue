<template>
    <div>
        error 401 page

        <p>{{error}}</p>

        <button @click="goHome">go home</button>
    </div>
</template>


<script setup>
const props = defineProps({
    error: Object
})

function goHome(){
    //清理错误
    clearError({redirect: '/'})
}
</script>
<template>
    <div>
        <h2 class="title">{{ title }}</h2>
        <img src="/1.jpg" alt="">
    </div>
</template>
<script setup>
import { ref } from 'vue';

const title = ref('主应用首页')


</script>
<style scope lang="scss">
img{
    width: 100px;
    height: 100px;
}
    .title{
        background-color: burlywood;
    }
</style>

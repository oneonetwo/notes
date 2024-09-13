<template>
    <div>
        <h2 class="title">{{ title }}</h2>
        <p>这是什么内容</p>
    </div>
</template>
<script setup>

import { ref } from 'vue';

    const title = ref('我是 Vue 的title')
</script>
<style scope>
    .title{
        background-color: burlywood;
    }
</style>

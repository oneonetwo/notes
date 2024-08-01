<template>
    <div   style="border: 1px solid #000">
    <h1>vue3 serve side render</h1>
    <div>
        {{count}}
    </div>
    <button @click="handleIncrement"> + 1</button>
    </div>
</template>
<script setup>
import { ref } from 'vue';

let count = ref(0)
function handleIncrement(){
    count.value += 1
}

</script>
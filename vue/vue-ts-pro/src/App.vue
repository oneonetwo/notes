<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'


const count = ref<string | number>(100)

count.value = '123'
  
</script>

<template>
  <div>
vuew
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>


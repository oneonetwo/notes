<template>
  <div class="about">
    <h3>用户信息：{{ userStore.user.name }} {{ userStore.user.age }}</h3>
  </div>
</template>

<script setup>  
import { inject, watch } from 'vue'
import { useUserStore } from '../../../../main-app/src/store';
const userStore = useUserStore()

</script> 
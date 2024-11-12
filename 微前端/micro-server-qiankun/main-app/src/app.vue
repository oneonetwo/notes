<template>
    <div class="main-app">
      <h1>用户信息：{{ userStore.user.name }} {{ userStore.user.age }}</h1>
      <button @click="handleSetUserInfo">修改用户信息</button>
      
      <div class="nav">
        <router-link to="/">首页</router-link> |
        <router-link to="/sub-app-vite/">子应用</router-link>
      </div>
      <router-view></router-view>
    </div>
  </template>
<script setup>

import { useUserStore } from '@/store'
const userStore = useUserStore()
const handleSetUserInfo = () => {
    userStore.setUserInfo()
}

</script>
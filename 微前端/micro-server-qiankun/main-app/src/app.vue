<template>
    <div class="main-app">
      <h1>这是导航</h1>
      <div class="nav">
        <router-link to="/">首页</router-link> |
        <router-link to="/sub-app-vite/">子应用</router-link>
      </div>
      <router-view></router-view>
    </div>
  </template>
<script setup>

</script>
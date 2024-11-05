<template>
  <div class="sub-app">
    <h2>子应用</h2>
    <div class="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/about">关于</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>



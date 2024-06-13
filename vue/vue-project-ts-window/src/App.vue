<script setup lang="ts">
import { onMounted } from 'vue'
import request from './utils/request'
import { useUserStore } from './stores'
import type { User } from './types/user'

const userStore = useUserStore()
userStore.set({
  token: 'SADKLFDSL',
  id: '12312',
  account: 'abcd1234',
  mobile: '186122',
  avatar: '1231231'
})

onMounted(() => {
  request<User>(`/users/login`).then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <van-button>按钮</van-button>
</template>

<style scoped>
div {
  color: var(--main-color);
}
</style>

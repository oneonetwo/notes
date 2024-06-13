<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
// 1. 通过props设置
defineProps<{
  title?: string
  rightText?: string
}>()

const emit = defineEmits<{
  (e: 'click-right'): void
}>()

const clickRight = () => {
  emit('click-right')
}
</script>

<template>
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-right="clickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep {
  .van-nav-bar {
    &__arrow {
      color: var(--van-gray-8);
      font-size: 18px;
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>

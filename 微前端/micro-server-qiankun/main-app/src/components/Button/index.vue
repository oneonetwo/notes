<template>
  <button>{{ text }}</button>
</template>
<script setup>
import { defineProps } from 'vue'

defineProps({
    text: {
        type: String,
        default: '按钮'
    }
})
</script>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
const arr = reactive({
  a: 1,
  b: 2,
  c: 3
})
const text = ref('qwe')
const mouse = ref<{ a: number; b: number }>({
  a: 1,
  b: 2
})
console.log('arr******************************************', arr)
setTimeout(() => {
  mouse.value.a = 12321312312
}, 2000)
const handleInput = (e: Event): void => {
  console.log('event.target.value', text.value)
}
onMounted(() => {
  console.log('mounted')
})
watch(
  [text, () => mouse],
  ([newText, newY]) => {
    console.log(newText, newY)
    console.log('text b', text.value, mouse.value.b)
  },
  {
    immediate: true
  }
)
defineExpose({
  mouse
})
</script>
<template>
  <input v-model="text" @input="handleInput" />
  <input
    type="text"
    data-set="text"
    :ref="
      (el: Element) => {
        console.log('123', el)
      }
    "
  />
</template>

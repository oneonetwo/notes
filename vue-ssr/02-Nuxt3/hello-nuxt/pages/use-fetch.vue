

<template>
  <div>
    Page: useFetch试用
  </div>
</template>
<script setup>
  import { fetchHomeInfoData} from '~/service/home'

  const {data} = await fetchHomeInfoData()
  console.log('>>>>>>>>', data.value.data)


</script>
<style scoped></style>




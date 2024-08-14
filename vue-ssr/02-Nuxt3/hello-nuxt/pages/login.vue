<template>
    <div>
        <h1>Login page</h1>

        <button @click="handleLogin"> login</button>
    </div>
</template>

<script setup>

definePageMeta({
    layout: "custom-layout"
})

async function handleLogin(){
    const {data} = await useFetch("/api/login", {method: "POST", body: {
        username: 'abcd',
        password: 12344
    }})

    console.log(data.value?.data)

    // cookie存放浏览器100s
    const cookie = useCookie('token', {
        maxAge: 100
    })
    cookie.value = data.value?.data.token
    return navigateTo("/")
}

</script>
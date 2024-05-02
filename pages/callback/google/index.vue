<template>
    <h1>Hello</h1>
</template>

<script setup lang="ts">
const route = useRoute();
onMounted(async () => {
    console.log("route--",route.query.code)
})
</script>
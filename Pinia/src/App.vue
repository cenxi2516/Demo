<template>
    <div class="container">
        <h1>Pinia 演示案例</h1>
        <PageNav />
        <router-view name="default"></router-view>
    </div>
</template>

<script setup>
import PageNav from '@/views/PageNav.vue'
</script>

<style scoped>
.container > h1 {
    font-weight: 200;
    text-align: center;
}
</style>

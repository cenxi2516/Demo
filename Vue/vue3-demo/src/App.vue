<template>
  <div id="main">
    <button type="button" @click="increment">Count：{{ count }}</button>
    <div>{{ () => 1 + 2 }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const count = ref(0)

const increment = () => count.value++

onMounted(() => {
  console.log('component mounted')
})
</script>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopFooter from '@/components/layout/TopFooter.vue'
import BottomFooter from '@/components/layout/BottomFooter.vue'

</script>

<template>
  <TopFooter />
  <main class="pt-20">
    <RouterView />
  </main>
  <BottomFooter />
</template>

<style scoped>
</style>
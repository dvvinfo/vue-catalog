<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1150px;
  margin: 0 auto;
  padding: 35px 0;
}
</style>

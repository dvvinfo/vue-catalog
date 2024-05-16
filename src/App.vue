<script>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'App',
  components: {
    RouterView,
    AppHeader
  }
}
</script>

<template>
  <AppHeader />
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
@media screen and (max-width: 1150px) {
  .wrapper {
    padding: 35px 15px;
  }
}
</style>

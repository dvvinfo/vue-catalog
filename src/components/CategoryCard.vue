<template>
  <div class="category-card" :style="{ backgroundColor: category.text_color }">
    <h3 class="category-card__title">{{ category.name }}</h3>
    <div class="category-card__image">
      <img :src="category.image" :alt="category.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.category-card {
  width: 271px;
  height: 152px;
  padding: 20px;
}
</style>

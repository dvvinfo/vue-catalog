<template>
  <div class="category" :style="{ backgroundImage: `url('${category.image}')` }">
    <h3  class="category__title" :style="{ color: category.text_color }">{{
      category.name
    }}</h3>
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
.category {
  width: 271px;
  height: 152px;
  padding: 20px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  transition: opacity 0.3s;
}
.category__title {
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  text-decoration: none;
}
.category:hover {
  opacity: 0.7;
}
</style>

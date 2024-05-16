<template>
  <div class="category" :style="{ backgroundImage: `url('${category.image}')` }" >
    <router-link to="#" class="category__title" :style="{ color: category.text_color }" >{{ category.name }}</router-link>
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
}
.category__title{
font-size: 24px;
line-height: 28px;
font-weight: bold;
text-decoration: none;
}
</style>

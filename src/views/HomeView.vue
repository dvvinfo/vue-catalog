<script>
import axios from 'axios';
import CategoryCard from '@/components/CategoryCard.vue';

export default {
  name: 'HomeView',
  components: {
    CategoryCard
  },
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const cityId = 1; // default city id
        const response = await axios.get(`https://nlstar.com/ru/api/catalog3/v1/menutags/?city_id=${cityId}`);
        console.log(response.data);
        this.categories = response.data.tags;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  }
}


</script>

<template>
  <div class="page">
   <h1 class="title">Категории товаров</h1>
   <div class="categories">
    <CategoryCard v-for="category in categories" :key="category.slug" :category="category"/>
   </div>
  </div>
</template>
<style scoped>
.title{
  font-size: 44px;
line-height: 44px;
font-weight: bold;
}
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, 271px);
  gap: 22px;
  margin-top: 20px;
  justify-content: center;
}
</style>
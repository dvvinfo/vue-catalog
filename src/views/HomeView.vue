<script>
import axios from 'axios'
import CategoryCard from '@/components/CategoryCard.vue'
import AppLoader from '@/components/AppLoader.vue'

export default {
  name: 'HomeView',
  components: {
    CategoryCard,
    AppLoader
  },
  data() {
    return {
      categories: [],
      isLoading: true,
      error: false
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        this.isLoading = true
        const cityId = 1 // default city id
        const response = await axios.get(
          `https://nlstar.com/ru/api/catalog3/v1/menutags/?city_id=${cityId}`
        )
        console.log(response.data)
        this.categories = response.data.tags
        this.isLoading = false
        this.error = false
      } catch (error) {
        this.error = true
        console.error('Error fetching categories:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<template>
  <div class="page">
    <h1 class="title">Категории товаров</h1>
    <AppLoader v-if="isLoading" />
    <p class="error" v-else-if="error">Произошла ошибка при загрузке категорий</p>
    
    <div class="categories" v-else>
      <router-link class="category-link" v-for="category in categories" :key="category.slug" :to="{ name: 'CategoryView', params: { slug: category.slug } }">
      <CategoryCard  :category="category"  />
    </router-link>
    </div>
  </div>
</template>

<style scoped>
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, 271px);
  gap: 22px;
  margin-top: 20px;
  justify-content: center;
}
.error {
  font-size: 18px;
  font-weight: 500;
  color: var(--gray);
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.category-link{
  text-decoration: none;
}
</style>

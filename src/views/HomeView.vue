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
      error: false,
      cityId: 1 
    }
  },
  mounted() {
    this.initializeCityId()
    this.fetchCategories()
  },
  methods: {
    initializeCityId() {
      const storedCity = localStorage.getItem('selectedCityId')
      if (storedCity) {
        try {
          const parsedCity = JSON.parse(storedCity)
          this.cityId = parsedCity.id ? parseInt(parsedCity.id, 10) : 1
        } catch (error) {
          console.error('Error parsing stored city id:', error)
          this.cityId = 1
        }
      }
    },
    onStorageChange(event) {
      if (event.key === 'selectedCityId') {
        if (event.newValue) {
          try {
            const parsedCity = JSON.parse(event.newValue)
            this.cityId = parsedCity.id ? parseInt(parsedCity.id, 10) : 1
          } catch (error) {
            console.error('Error parsing stored city id:', error)
            this.cityId = 1
          }
        } else {
          this.cityId = 1
        }
      }
    },
    async fetchCategories() {
      try {
        this.isLoading = true
        const response = await axios.get(
          `https://nlstar.com/ru/api/catalog3/v1/menutags/?city_id=${this.cityId}`
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
  },
  watch: {
    $data: {
    handler() {
      const cityId = localStorage.getItem('selectedCityId');
      if (cityId) {
        this.cityId = JSON.parse(cityId).id;
      }
    },
    deep: false
  }
  },
}
</script>

<template>
  <div class="page">
    <h1 class="title">Категории товаров</h1>
    <AppLoader v-if="isLoading" />
    <p class="error" v-else-if="error">Произошла ошибка при загрузке категорий</p>
    
    <div class="categories" v-else>
      <router-link class="category-link" v-for="category in categories" :key="category.slug" :to="{ name: 'CategoryView', params: { slug: category.slug } }">
        <CategoryCard :category="category" />
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
.category-link {
  text-decoration: none;
}
</style>

<script>
import axios from 'axios'
import ProductCard from '@/components/ProductCard.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppLoader from '@/components/AppLoader.vue'

export default {
  name: 'CategoryView',
  components: {
    ProductCard,
    AppSidebar,
    AppLoader
  },
  data() {
    return {
      cityId: null,
      categorySlug: this.$route.params.slug,
      subcategorySlug: this.$route.params.subcategorySlug || null,
      categoryName: '',
      subcategories: [],
      products: [],
      selectedSubcategory: null,
      isLoading: false,
      isSidebar: true
    }
  },
  watch: {
    '$route.params.slug': {
      immediate: true,
      handler(newSlug) {
        this.categorySlug = newSlug
        this.fetchCategories()
      }
    },
    '$route.params.subcategorySlug': {
      immediate: true,
      handler(newSubcategorySlug) {
        this.subcategorySlug = newSubcategorySlug
        this.updateProducts()
      }
    }
  },
  methods: {
    async fetchCategories() {
      try {
        this.isLoading = true
        const response = await axios.get('https://nlstar.com/ru/api/catalog3/v1/menutags/', {
          params: { city_id: this.cityId }
        })
        console.log(response.data)
        const category = response.data.tags.find((cat) => cat.slug === this.categorySlug)
        if (category) {
          this.categoryName = category.name
          this.subcategories = category.children
          if (this.subcategories.length < 2) {
            this.selectedSubcategory = null
          }
          this.updateProducts()
          this.isLoading = false
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchProducts(slug) {
      try {
        this.isLoading = true
        const response = await axios.get(
          `https://nlstar.com/ru/api/catalog3/v1/menutags/${slug}/`,
          {
            params: { city_id: this.cityId }
          }
        )
        console.log(response.data)
        this.products = response.data.products.filter(
          (product) => product.allowed && product.available
        )
        this.isLoading = false
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    updateProducts() {
      if (this.subcategorySlug) {
        const subcategory = this.subcategories.find((sub) => sub.slug === this.subcategorySlug)
        if (subcategory) {
          this.fetchProducts(subcategory.slug)
        }
      } else {
        this.fetchProducts(this.categorySlug)
      }
    },
    selectSubcategory(subcategory) {
      this.selectedSubcategory = subcategory
      if (subcategory) {
        this.$router.push({
          name: 'SubcategoryView',
          params: { slug: this.categorySlug, subcategorySlug: subcategory.slug }
        })
      } else {
        this.$router.push({ name: 'CategoryView', params: { slug: this.categorySlug } })
      }
    },
    goBack() {
      this.$router.push({ name: 'HomePage' })
    },
    toggleSidebar() {
      this.isSidebar = !this.isSidebar
    },

    onStorageChange(event) {
      if (event.key === 'selectedCityId') {
        this.cityId = JSON.parse(event.newValue).id
      }
    }
  },
  created() {
    // Инициализация cityId из локального хранилища
    const storedCityId = localStorage.getItem('selectedCityId')
    if (storedCityId) {
      this.cityId = JSON.parse(storedCityId).id
    } else {
      this.cityId = 1 
    }

    this.fetchCategories()

    window.addEventListener('storage', this.onStorageChange)
  },

  beforeMount() {
    window.removeEventListener('storage', this.onStorageChange)
  }
}
</script>

<template>
  <div class="page">
    <div class="breadcrumbs">
      <router-link to="/">
        <svg
          class="breadcrumbs__arrow"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="15" cy="15" r="15" fill="#030303" />
          <path d="M21.9999 15H8.49988" stroke="white" stroke-width="2" />
          <path d="M13 10L8 15L13 20" stroke="white" stroke-width="2" />
        </svg>
      </router-link>
      <h1 class="title">{{ categoryName }}</h1>
      <div class="burger" @click="toggleSidebar">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round" />
          <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
          <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
    </div>
    <div v-if="isLoading" class="page__loader">
      <AppLoader />
    </div>
    <div v-else class="page__container">
      <AppSidebar
        v-if="isSidebar"
        class="page__sidebar"
        :class="{ 'page__sidebar--open': isSidebar }"
        :subcategories="subcategories"
        :selectedSubcategory="selectedSubcategory"
        :categorySlug="categorySlug"
        @select-subcategory="selectSubcategory"
      />
      <div class="page__content">
        <div class="products" v-if="products.length">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        <div class="info" v-else>Товары не найдены</div>
      </div>
    </div>
  </div>
</template>

<style>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 10px;
}
.page__container {
  display: flex;
  gap: 34px;
  padding-top: 20px;
  position: relative;
}
.page__content {
  width: 100%;
}
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(276px, 1fr));
  gap: 24px;
}
.page__loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.burger {
  display: none;
}
.info {
  text-align: center;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
}
@media (max-width: 1150px) {
  .burger {
    display: block;
    margin-left: auto;
  }
  .page__sidebar {
    position: absolute;
    top: 20px;
    left: -20px;
    background-color: var(--white);
    height: 100%;
    transform: translate(-100%, 0);
    transition: transform 0.3s ease-in-out;
  }
  .page__sidebar--open {
    transform: translate(0, 0);
  }
  .page__container {
    width: 100%;
  }
  .products {
    justify-items: center;
    justify-content: center;
  }
}
</style>

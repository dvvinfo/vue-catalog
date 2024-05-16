<script>
import axios from 'axios'
import CityModal from './CityModal.vue'

export default {
  name: 'AppHeader',
  components: {
    CityModal
  },
  data() {
    return {
      showCityModal: false,
      selectedCity: ''
    }
  },
  mounted() {
    this.loadSelectedCity()
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.loadSelectedCity)
  },
  methods: {
    openCityModal() {
      this.showCityModal = true
    },
    async fetchCategories() {
      try {
        const cityId = 1 // default city id
        const response = await axios.get(`https://nlstar.com/api/catalog3/v1/city/?id=${cityId}`)
        this.selectedCity = response.data.data.city
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    loadSelectedCity() {
      const city = localStorage.getItem('selectedCity')
      if (city) {
        this.selectedCity = JSON.parse(city).city
      } else {
        this.fetchCategories()
      }
    },
    closeCityModal() {
      this.showCityModal = false
    },
    // Add a helper function to update selectedCity
    updateSelectedCity(city) {
      this.selectedCity = city
    }
  },
  watch: {
    // Watch for changes in localStorage and update selectedCity
    $data: {
      handler() {
        const city = localStorage.getItem('selectedCity')
        if (city) {
          this.updateSelectedCity(JSON.parse(city).city)
        }
      },
      deep: true
    }
  }
}
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="location" @click="openCityModal">
        <svg
          class="location__icon"
          width="11"
          height="16"
          viewBox="0 0 11 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.5 7C4.119 7 3 5.881 3 4.5C3 3.119 4.119 2 5.5 2C6.881 2 8 3.119 8 4.5C8 5.881 6.881 7 5.5 7ZM5.5 0C2.462 0 0 2.462 0 5.5C0 8.538 5.5 16 5.5 16C5.5 16 11 8.538 11 5.5C11 2.462 8.538 0 5.5 0Z"
            fill="#979797"
          />
        </svg>
        <div class="location__title">{{ selectedCity }}</div>
      </div>
    </div>
  </header>
  <CityModal v-if="showCityModal" @close="closeCityModal" />
</template>

<style scoped>
.header {
  height: 72px;
  display: flex;
  align-items: center;
  background-color: var(--white);
  box-shadow: 0px 2px 4px rgba(39, 39, 39, 0.1);
}
.header__container {
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
}
.location {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.location__title {
  font-size: 15px;
  line-height: 24px;
  font-weight: bold;
}
@media screen and (max-width: 1150px) {
  .header__container {
    padding: 0 15px;
  }
}
</style>

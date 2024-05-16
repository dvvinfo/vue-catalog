<script>
import axios from 'axios'
import AppLoader from '@/components/AppLoader.vue'
export default {
  name: 'CityModal',
  components: {
    AppLoader
  },
  data() {
    return {
      searchTerm: '',
      cities: [],
      selectedCity: null,
      error: false,
      isLoading: false
    }
  },
  methods: {
    async searchCities() {
      if (this.searchTerm.length >= 3) {
        try {
          this.isLoading = true
          const response = await axios.get(
            `https://nlstar.com/api/catalog3/v1/city/?term=${this.searchTerm}&country=ru`
          )
          this.cities = response.data
          this.isLoading = false
          this.error = false
        } catch (error) {
          this.error = true
          console.error('Error searching cities:', error)
        } finally {
          this.isLoading = false
        }
      } else {
        this.cities = []
      }
    },
    selectCity(city) {
      console.log('Selected city:', city)
      this.selectedCity = city
      this.searchTerm = city.city
      this.cities = []
      localStorage.setItem('selectedCity', JSON.stringify(city))
    },

    closeModal() {
      this.$emit('close')
    },
    clearSearch() {
      this.searchTerm = ''
    }
  }
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h3 class="modal-title">Выберите город</h3>
      <button class="close-button" @click="closeModal">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.815 0L8 6.815L1.185 0L0 1.185L6.815 8L0 14.815L1.185 16L8 9.185L14.815 16L16 14.815L9.185 8L16 1.185L14.815 0Z"
            fill="#979797"
          />
        </svg>
      </button>
      <div class="modal-body">
        <div class="search">
          <input
            class="input"
            type="text"
            v-model="searchTerm"
            @input="searchCities"
            placeholder="Например, Санкт-петербург"
          />

          <button class="close-button" @click="clearSearch">
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.815 0L8 6.815L1.185 0L0 1.185L6.815 8L0 14.815L1.185 16L8 9.185L14.815 16L16 14.815L9.185 8L16 1.185L14.815 0Z"
                fill="#979797"
              />
            </svg>
          </button>
        </div>

        <div class="error" v-if="error">Произошла ошибка при поиске городов"></div>
        <div class="cities" v-else-if="isLoading">
          <AppLoader />
        </div>
        <template v-else>
          <ul class="cities" v-if="cities.data">
            <li class="city" v-for="city in cities.data" :key="city.id" @click="selectCity(city)">
              {{ city.city }}, {{ city.label }}
            </li>
          </ul>
        </template>

        <button class="button" @click="closeModal" :disabled="!selectedCity">Подтвердить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  background-color: var(--white);
  padding: 20px;
  border-radius: 5px;
  max-width: 769px;
  width: 100%;
  padding: 28px 19px 32px 19px;
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
  border-radius: 5px;
}
.modal-title {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
}
.close-button {
  position: absolute;
  right: 18px;
  top: 18px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.modal-body {
  margin: 12px;
  display: flex;
  align-items: center;
  gap: 18px;
}
.search {
  position: relative;
  max-width: 540px;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-border-input);
  border-radius: 5px;
}
.input {
  width: 100%;
  border: none;
  font-size: 18px;
  line-height: 23px;
}
.input:focus {
  outline: none;
}
.input::placeholder {
  color: var(--color-text-gray);
}
.cities {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  bottom: -122px;
  z-index: 3;
  background-color: #fff;
  max-width: 522px;
  width: 100%;
  height: 170px;
  overflow-y: auto;
  border: 1px solid var(--color-border-input);
  padding: 12px 0;
}
.cities::-webkit-scrollbar{
  width: 0;
}
.city {
  padding: 5px 10px;
  cursor: pointer;
}

.button {
  padding: 13px 24px;
  background-color: transparent;
  color: var(--color-text-button);
  border: 2px solid var(--color-border-input);
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: 1.75px;
  border-radius: 24px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.error {
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
}

</style>

<template>
  <div class="sidebar">
    <ul class="sidebar__list">
      <li
        class="sidebar__item"
        :class="{ selected: !selectedSubcategory }"
      >
        <router-link
          class="sidebar__link"
          :to="{ name: 'CategoryView', params: { slug: categorySlug } }"
        >
          Все продукты
        </router-link>
      </li>
      <template v-if="subcategories.length >= 2">
        <li
          class="sidebar__item"
          v-for="subcategory in subcategories"
          :key="subcategory.slug"
          :class="{ selected: selectedSubcategory && selectedSubcategory.slug === subcategory.slug }"
        >
          <router-link
            class="sidebar__link"
            :to="{
              name: 'CategoryView',
              params: { slug: categorySlug, subcategorySlug: subcategory.slug }
            }"
          >
            {{ subcategory.name }}
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  props: {
    subcategories: {
      type: Array,
      required: true
    },
    selectedSubcategory: {
      type: Object,
      default: null
    },
    categorySlug: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.selected {
  font-weight: bold;
}
.sidebar {
  width: 240px;
  background-color: var(--color-background);
}
.sidebar__list {
  padding: 0;
  margin: 0;
}
.sidebar__item {
  list-style: none;
}

.sidebar__link {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: var(--color-text-black);
  width: 100%;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-line);
  display: block;
}
.router-link-active {
  background-color: hsla(210, 29%, 93%, 1);
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:slug',
      name: 'CategoryView',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/category/:slug/:subcategorySlug?',
      name: 'CategoryView',
      component: () => import('../views/CategoryView.vue')
    },
  ]
})

export default router

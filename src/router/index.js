import { createRouter, createWebHistory } from 'vue-router'
import FutureView from '@/views/FutureView.vue'
import MapView from '@/views/MapView.vue'
import ShanxiView from '@/views/ShanxiView.vue'
import CultureView from '@/views/CultureView.vue'
import HomeView from '@/views/HomeView.vue'
import CategorizeView from '@/views/CategorizeView.vue'

const routes = [
  { path: '/', redirect:'/home' },
  { path: '/home', component: HomeView },
  { path: '/map', component: MapView },
  { path: '/categorize', component: CategorizeView },
  { path: '/culture', component: CultureView },
  { path: '/shanxi', component: ShanxiView },
  { path: '/future', component: FutureView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
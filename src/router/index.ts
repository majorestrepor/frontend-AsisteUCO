import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

// Cambiar título basado en el nombre de la ruta
router.beforeEach((to) => {
  const titles: Record<string, string> = {
    home: 'Registro de Asistencias - Universidad Católica de Oriente',
    about: 'Acerca del Sistema',
  }
  document.title = titles[to.name as string] || 'Sistema de Asistencias UCO'
})

export default router

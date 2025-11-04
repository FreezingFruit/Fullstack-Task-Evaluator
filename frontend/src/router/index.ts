import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: () => import('@/views/TaskView.vue'),
    },
    // 404 Page - Catch all route (MUST be last)
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Route protection - but exclude 404 page
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  // Don't protect 404 page
  if (to.name === 'NotFound') {
    return next()
  }

  if (authRequired && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

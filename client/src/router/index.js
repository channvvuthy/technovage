import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: '/theme/customers',
        name: 'Customer',
        component: () => import('@/views/pages/customer/Customer.vue'),
      },
      {
        path: '/theme/purchases',
        name: 'Purchase',
        component: () => import('@/views/pages/purchase/Purchase.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/pages/404',
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Middleware to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth-token')

  if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // Redirect authenticated users away from login and register
    next({ name: 'Dashboard' })
  } else if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Register') {
    // Protect all routes except login and register
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router

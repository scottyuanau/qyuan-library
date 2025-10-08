import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import { isAuthenticated } from '../composables/auth'
import AddBookView from '../views/AddBookView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { guestOnly: true },
  },
  {
    path: '/firelogin',
    name: 'FirebaseLogin',
    component: FirebaseSigninView,
    meta: { guestOnly: true },
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView,
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/books',
    name: 'Books',
    component: FirebaseRegisterView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView,
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({
      name: 'AccessDenied',
      query: { redirect: to.fullPath },
    })
    return
  }

  if (to.meta.guestOnly && isAuthenticated.value) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router

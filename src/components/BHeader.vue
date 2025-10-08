<template>
  <header class="b-header fixed-top">
    <div class="container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
        <ul class="nav nav-pills mb-3 mb-md-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">
              Home (Week 5)
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/books" class="nav-link" active-class="active">Books</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
          </li>
        </ul>
        <div class="d-flex align-items-center gap-2 auth-controls">
          <span v-if="isAuthenticated" class="text-muted small">
            Signed in as <strong>{{ state.user?.username }}</strong>
          </span>
          <button v-if="isAuthenticated" class="btn btn-outline-secondary btn-sm" @click="handleLogout">
            Logout
          </button>
          <template v-else>
            <router-link to="/login" class="btn btn-primary btn-sm">Login</router-link>
            <router-link to="/firelogin" class="btn btn-outline-primary btn-sm">Firelogin</router-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/auth'

const router = useRouter()
const { state, logout, isAuthenticated: authStatus } = useAuth()

const isAuthenticated = computed(() => authStatus.value)

const handleLogout = () => {
  logout()
  if (router.currentRoute.value.meta.requiresAuth) {
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.b-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08);
  width: 100%;
}

.auth-controls {
  min-height: 38px;
}
</style>

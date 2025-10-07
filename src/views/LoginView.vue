<template>
  <div class="container py-5">
    <div class="row justify-content-center">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h1 class="h3 mb-3 text-center">Sign in</h1>
            <p v-if="accessDenied" class="alert alert-warning" role="alert">
              Please sign in to view the requested page.
            </p>
            <form @submit.prevent="handleLogin" novalidate>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  id="username"
                  type="text"
                  class="form-control"
                  v-model="credentials.username"
                  autocomplete="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  class="form-control"
                  v-model="credentials.password"
                  autocomplete="current-password"
                  required
                />
              </div>
              <p v-if="error" class="text-danger" role="alert">{{ error }}</p>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Log in</button>
              </div>
            </form>
            <div class="mt-4 text-center">
              <router-link :to="{ name: 'AccessDenied' }" class="text-decoration-none">
                Why can't I access some pages?
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/auth'

const router = useRouter()
const route = useRoute()
const { login, isAuthenticated } = useAuth()

const credentials = reactive({
  username: '',
  password: '',
})

const error = ref('')

const accessDenied = computed(() => route.query.redirect && !isAuthenticated.value)

const handleLogin = () => {
  error.value = ''

  if (!credentials.username || !credentials.password) {
    error.value = 'Please provide both a username and password.'
    return
  }

  const success = login(credentials.username, credentials.password)

  if (!success) {
    error.value = 'The provided credentials are incorrect.'
    return
  }

  const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
  router.push(redirectPath || '/')
}
</script>

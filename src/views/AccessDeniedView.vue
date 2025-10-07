<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card border-warning shadow-sm">
          <div class="card-body p-4 text-center">
            <h1 class="h3 mb-3 text-warning">Access denied</h1>
            <p class="mb-4">
              You need to be authenticated to view this page. Redirecting you to the sign in
              screen.
            </p>
            <div class="d-flex justify-content-center gap-2">
              <router-link :to="{ name: 'Login', query: { redirect: redirectPath } }" class="btn btn-primary">
                Go to login
              </router-link>
              <router-link to="/" class="btn btn-outline-secondary">Back to home</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isAuthenticated } from '../composables/auth'

const router = useRouter()
const route = useRoute()

const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/'

onMounted(() => {
  if (!isAuthenticated.value) {
    setTimeout(() => {
      router.replace({ name: 'Login', query: { redirect: redirectPath } })
    }, 2000)
  }
})
</script>

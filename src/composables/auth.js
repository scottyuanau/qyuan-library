import { computed, reactive } from 'vue'

const credentials = {
  username: 'admin',
  password: '12345',
}

const state = reactive({
  user: null,
})

const isAuthenticated = computed(() => state.user !== null)

function login(username, password) {
  if (username === credentials.username && password === credentials.password) {
    state.user = { username }
    return true
  }
  return false
}

function logout() {
  state.user = null
}

export function useAuth() {
  return {
    state,
    login,
    logout,
    isAuthenticated,
  }
}

export { isAuthenticated, login, logout, state }

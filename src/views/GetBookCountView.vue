<script>


export default {
  data() {
    return {
      count: null,
      error: null,
      loading: false,
    }
  },
  methods: {
    async getBookCount() {
      this.loading = true
      try {
        const response = await fetch(`https://countbooks-i7hrubn73q-ts.a.run.app`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        this.count = data?.count ?? 0
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = 'Unable to fetch the book count right now. Please try again later.'
        this.count = null
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="book-count">
    <h1>Book Counter</h1>
    <button type="button" @click="getBookCount" :disabled="loading">
      {{ loading ? 'Loading…' : 'Get Book Count' }}
    </button>
    <p v-if="count !== null" class="result">Total number of books: {{ count }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.book-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.result {
  font-weight: 600;
}

.error {
  color: #c53030;
}
</style>

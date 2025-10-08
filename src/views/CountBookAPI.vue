<script>


export default {
  data() {
    return {
      jsondata:null,
      error:null,
    }
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await fetch(`https://countbooks-i7hrubn73q-ts.a.run.app`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        this.jsondata = await response.json()
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
  mounted() {
    this.getBookCountAPI()
  }
}
</script>

<template>
  <pre>{{ jsondata }}</pre>
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

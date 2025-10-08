<script>
export default {
  data() {
    return {
      jsondata: null,
      error: null,
      loading: false,
    }
  },
  computed: {
    formattedJson() {
      return this.jsondata ? JSON.stringify(this.jsondata, null, 2) : ''
    },
  },
  methods: {
    async getAllBookAPI() {
      this.loading = true
      try {
        const response = await fetch(`https://getallbookapi-i7hrubn73q-ts.a.run.app`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        this.jsondata = await response.json()
        this.error = null
      } catch (error) {
        console.error('Error fetching books:', error)
        this.error = 'Unable to fetch the books right now. Please try again later.'
        this.jsondata = null
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.getAllBookAPI()
  },
}
</script>

<template>
  <div class="book-api">
    <p v-if="loading">Loading…</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <pre v-else-if="jsondata">{{ formattedJson }}</pre>
    <p v-else>No data available.</p>
  </div>
</template>

<style scoped>
.book-api {
  padding: 2rem 1rem;
}

.error {
  color: #c53030;
}
</style>

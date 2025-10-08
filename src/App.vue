<script>
// import HomeView from './views/HomeView.vue'
import BHeader from './components/BHeader.vue'

export default {
  name:'App',
  components: {
    BHeader,
  },
  computed: {
    showHeader() {
      const headerlessRoutes = ['CountBookAPI', 'GetAllBookAPI']
      return !headerlessRoutes.includes(this.$route.name)
    }
  }
}
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.main-box {
  padding-top: 6rem;
}

@media (min-width: 768px) {
  .main-box {
    padding-top: 5rem;
  }
}
</style>

<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <header class="b-header fixed-top">
    <div class="container">
      <div class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page"
              >Home (Week 5)</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.b-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.08);
  width: 100%;
}
</style>

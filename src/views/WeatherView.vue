<script>
import axios from "axios";

// Vite: env vars must be prefixed with VITE_
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    };
  },
  computed: {
    // If you call the API with units=metric, this is already °C
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            await this.fetchWeatherData(url);
          },
          (err) => {
            console.warn("Geolocation error:", err);
            // Fallback: optionally fetch a default city
            // this.searchByCity("Sydney");
          }
        );
      }
    },

    async searchByCity() {
      if (!this.city) return;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        this.city
      )}&appid=${API_KEY}&units=metric`;
      await this.fetchWeatherData(url);
    },

    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.weatherData = null;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button class="search-button" @click="searchByCity">Search</button>
      </div>
    </div>
  </div>

  <main>
    <div v-if="weatherData">
      <h2>
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<style scoped></style>

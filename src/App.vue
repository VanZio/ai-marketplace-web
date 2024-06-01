<template>
  <div id="app">
    <div class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="logo">
        <img src="./assets/logo.jpeg" alt="Logo" />
      </div>
      <nav>
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link v-if="isLoggedIn" to="/marketplace" class="nav-link">Marketplace</router-link>
        <router-link v-if="isLoggedIn && userData.type === 'manager'" to="/manager" class="nav-link">Manager Dashboard</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="nav-link">Register</router-link>
        <div class="user mt-3" v-if="isLoggedIn">
          <div class="user-info text-center">
            <p class="mb-1"><strong>{{ userData.username }}</strong></p>
            <p class="mb-1"><small> Role: {{ userData.type }}</small></p>
            <button class="btn btn-sm btn-outline-light mt-2" @click="logout">Logout</button>
          </div>
        </div>
        <div class="weather mt-3 text-center" v-if="weather">
          <h6>Current Weather</h6>
          <p>{{ weather.name }}: {{ weather.main.temp }}°C, {{ weather.weather[0].description }}</p>
        </div>
      </nav>
    </div>
    <button class="toggle-button" @click="toggleSidebar">
      ☰
    </button>
    <div class="content" :class="{ 'content-expanded': isCollapsed }">
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoggedIn: false,
      userData: {},
      weather: null,
      isCollapsed: false
    };
  },
  mounted() {
    this.checkLoggedIn();
    this.fetchWeather();
  },
  methods: {
    checkLoggedIn() {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      console.log('User data:', userData);
      if (userData) {
        this.userData = userData;
        this.isLoggedIn = true;
      }
    },
    logout() {
      sessionStorage.removeItem('user');
      this.isLoggedIn = false;
      this.$router.push({ name: 'Login' });
    },
    fetchWeather() {
      const apiKey = '8dad3db309e50de33c8cdefbe69cec74';
      const city = 'Hawthorn'; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      axios.get(url)
        .then(response => {
          this.weather = response.data;
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }
  },
  watch: {
    $route() {
      this.checkLoggedIn();
    }
  }
}
</script>

<style>
@import './css/style.css';
</style>

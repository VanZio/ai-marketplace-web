<template>
  <div id="app">
    <div class="sidebar">
      <div class="logo">
        <img src="./assets/logo.jpeg" alt="Logo" />
      </div>
      <nav>
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link v-if="isLoggedIn" to="/marketplace" class="nav-link">Marketplace</router-link>
        <router-link v-if="isLoggedIn && userData.type === 'manager'" to="/manager" class="nav-link">Manager Dashboard</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="nav-link">Register</router-link>
        <div class="user mt-auto">
          <span v-if="isLoggedIn" class="nav-link">User: {{ userData.username }}</span>
          <span v-if="isLoggedIn" class="nav-link">Role: {{ userData.type }}</span>
          <span v-if="isLoggedIn" class="nav-link" @click="logout">Logout</span>
        </div>
        <div class="weather mt-4" v-if="weather">
          <h3>Current Weather</h3>
          <p>{{ weather.name }}: {{ weather.main.temp }}°C, {{ weather.weather[0].description }}</p>
        </div>
      </nav>
    </div>
    <div class="content">
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
      weather: null
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

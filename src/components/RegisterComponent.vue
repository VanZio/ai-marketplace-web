<template>
  <div class="container">
    <h1 class="mt-5 mb-4">Register</h1>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="username">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword">
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      <div v-if="error" class="mt-3 text-danger">Error: {{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      error: null
    };
  },
  methods: {
    register() {
      if (!this.email || !this.isValidEmail(this.email)) {
        this.error = 'Please enter a valid email address';
        return;
      }
      if (!this.username) {
        this.error = 'Username is required';
        return;
      }
      if (this.password.length < 8) {
        this.error = 'Password must be at least 8 characters long';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match';
        return;
      }

      axios.post('/api/register', {
        email: this.email,
        username: this.username,
        password: this.password
      })
      .then(response => {
        console.log('Registration successful:', response.data);
        this.$router.push({ name: 'Login' }); // Navigate to the login page
      })
      .catch(error => {
        console.error('Error registering user:', error);
        if (error.response && error.response.data && error.response.data.error) {
          this.error = error.response.data.error;
        } else {
          this.error = 'Failed to register user';
        }
      });
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
}
</script>

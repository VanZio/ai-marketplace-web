<template>
  <div class="container">
    <h1 class="mt-5 mb-4">Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <div v-if="error" class="mt-3 text-danger">Error: {{ error }}</div>
    </form>
    <router-link to="/register" class="nav-link">Don't have an account? Register here</router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  props: ['error'],
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$emit('login', { username: this.username, password: this.password });
    }
  }
}
</script>

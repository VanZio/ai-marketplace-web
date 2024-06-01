<template>
  <LoginComponent :error="error" @login="login" />
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';
import axios from 'axios'

export default {
  name: 'LoginView',
  components: {
    LoginComponent
  },
  data() {
    return {
      error: null,
      users: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get('/api/users')
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          this.error = 'Failed to fetch users data';
        });
    },
    login({ username, password }) {
      if (username && password) {
        const user = this.users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.error = null;

          this.$router.push({ name: 'Home' }).then(() => {
            window.location.reload();
          });
        } else {
          this.error = 'Invalid username or password';
        }
      } else {
        this.error = 'Username and/or password must not be empty';
      }
    }
  }
}
</script>

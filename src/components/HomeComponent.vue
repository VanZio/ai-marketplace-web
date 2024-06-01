<template>
  <div class="home-view">
    <div class="banner jumbotron text-center">
      <div class="overlay">
        <h1 class="display-4">Welcome to Our AI Marketplace</h1>
        <p class="lead">Discover cutting-edge AI Designs</p>
        <button @click="navigateToMarketplace" class="btn btn-primary btn-lg mt-3">Browse AI Marketplace</button>
      </div>
    </div>
    <div class="options row justify-content-center mt-5">
      <div class="col-md-8">
        <div @click="navigateToMarketplace" class="option card text-center cursor-pointer">
          <div class="option-content card-body">
            <h2 class="card-title">Browse AI Marketplace</h2>
            <p class="card-text">Discover the latest AI Marketplace.</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer mt-5 py-3 bg-dark text-white text-center">
      <div class="container">
        <p>&copy; 2024 AI Marketplace. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  methods: {
    navigateToMarketplace() {
      if (this.isAuthenticated()) {
        this.$router.push('/marketplace');
      } else {
        this.$router.push('/login');
      }
    },
    isAuthenticated() {
      const user = sessionStorage.getItem('user');
      console.log('Checking if authenticated:', user);
      return !!user; // Check if user data is in session storage
    }
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.banner {
  background-image: url('https://images.pexels.com/photos/17483910/pexels-photo-17483910/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-the-concept-of-artificial-general-intelligence-agi-it-was-created-by-artist-domhnall-malone-as-part-of-th.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  color: white;
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.options .option {
  transition: transform 0.3s ease-in-out;
  text-decoration: none;
  color: inherit;
}

.options .option:hover {
  transform: scale(1.05);
}

.cursor-pointer {
  cursor: pointer;
}

.footer {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 1rem;
  width: 100%;
  position: relative;
  bottom: 0;
}
</style>

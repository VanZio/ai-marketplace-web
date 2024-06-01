<template>
  <div class="marketplace container mt-4">
    <div class="header mb-4">
      <h1 class="text-center mb-4">AI Marketplace</h1>
      <div class="filters row g-3 mb-4">
        <div class="col-md-4">
          <h2>Filters</h2>
          <select v-model="selectedColor" class="form-select">
            <option value="">All Colors</option>
            <option v-for="color in colors" :key="color">{{ color }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <h2>Sort by</h2>
          <select v-model="sortBy" class="form-select">
            <option value="price-asc">Price: Lowest to Highest</option>
            <option value="price-desc">Price: Highest to Lowest</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        <div class="col-md-4">
          <h2>Search</h2>
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Search by title, description, or color">
        </div>
      </div>
    </div>
    <div class="product-list row">
      <div v-for="product in paginatedProducts" :key="product.id" class="col-lg-3 col-md-4 col-sm-6 d-flex">
        <div class="card h-100 w-100">
          <img :src="product.image" :alt="product.title" class="card-img-top product-image">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title">{{ product.title }}</h3>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">Price: ${{ product.price }}</p>
            <p class="card-text">Color: {{ product.color }}</p>
            <button @click="likeProduct(product.id)" class="btn btn-primary mt-auto">Like</button>
            <p class="card-text mt-2">Likes: {{ product.likes }}</p>
            <button @click="showModal(product)" type="button" class="btn btn-primary mt-2">Buy</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination d-flex justify-content-center align-items-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary me-2">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary ms-2">Next</button>
    </div>

    <!-- Purchase Modal -->
    <div v-if="showPurchaseModal" class="modal-container">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="purchaseModalLabel">Thank you for purchasing {{ selectedProduct.title }}!</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MarketplaceComponent',
  data() {
    return {
      products: [],
      selectedColor: '',
      sortBy: 'price-asc',
      searchQuery: '',
      showPurchaseModal: false,
      selectedProduct: null,
      currentPage: 1,
      itemsPerPage: 3
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;
      if (this.selectedColor) {
        filtered = filtered.filter(product => product.color === this.selectedColor);
      }
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.color.toLowerCase().includes(query)
        );
      }
      if (this.sortBy === 'price-asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'price-desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === 'popularity') {
        filtered = filtered.sort((a, b) => b.likes - a.likes);
      }
      return filtered;
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    colors() {
      return [...new Set(this.products.map(product => product.color))];
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('https://ai-marketplace-backend.onrender.com/api/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    likeProduct(productId) {
      axios.put(`https://ai-marketplace-backend.onrender.com/api/products/${productId}/like`)
        .then(() => {
          const product = this.products.find(p => p.id === productId);
          if (product) {
            product.likes += 1;
          }
        })
        .catch(error => {
          console.error('Error liking product:', error);
        });
    },
    showModal(product) {
      this.selectedProduct = product;
      this.showPurchaseModal = true;
    },
    closeModal() {
      this.showPurchaseModal = false;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
}
</script>

<style scoped>
.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal-dialog {
  max-width: 500px; 
}

.modal-content {
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  background-color: #f7f7f7;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10rem;
}

.card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 200px; /* Set a fixed height */
  object-fit: cover; /* Ensure the image covers the entire area */
}

.card-body {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.filters h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
</style>

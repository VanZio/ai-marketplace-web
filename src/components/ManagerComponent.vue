<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Manager Dashboard</h1>

    <!-- Insert Product Form -->
    <div class="card mb-4">
      <div class="card-header">
        <h2>Add New Product</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="addProduct">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" id="title" v-model="newProduct.title" class="form-control" placeholder="Title" required>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" id="description" v-model="newProduct.description" class="form-control" placeholder="Description" required>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" id="price" v-model="newProduct.price" class="form-control" placeholder="Price" required>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Image URL</label>
            <input type="text" id="image" v-model="newProduct.image" class="form-control" placeholder="Image URL" required>
          </div>
          <div class="mb-3">
            <label for="color" class="form-label">Color</label>
            <input type="text" id="color" v-model="newProduct.color" class="form-control" placeholder="Color" required>
          </div>
          <button type="submit" class="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>

    <!-- Delete Product Form -->
    <div class="card mb-4">
      <div class="card-header">
        <h2>Delete Product</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="deleteProduct">
          <div class="mb-3">
            <label for="deleteProduct" class="form-label">Select Product</label>
            <select id="deleteProduct" v-model="selectedProductId" class="form-select" required>
              <option value="" disabled>Select a product</option>
              <option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-danger">Delete Product</button>
        </form>
      </div>
    </div>

    <!-- Update Product Form -->
    <div class="card mb-4">
      <div class="card-header">
        <h2>Update Product</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateProduct">
          <div class="mb-3">
            <label for="updateProduct" class="form-label">Select Product</label>
            <select id="updateProduct" v-model="selectedProductId" class="form-select" required>
              <option value="" disabled>Select a product</option>
              <option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="newTitle" class="form-label">New Title</label>
            <input type="text" id="newTitle" v-model="updatedProduct.title" class="form-control" placeholder="New Title">
          </div>
          <div class="mb-3">
            <label for="newDescription" class="form-label">New Description</label>
            <input type="text" id="newDescription" v-model="updatedProduct.description" class="form-control" placeholder="New Description">
          </div>
          <div class="mb-3">
            <label for="newPrice" class="form-label">New Price</label>
            <input type="number" id="newPrice" v-model="updatedProduct.price" class="form-control" placeholder="New Price">
          </div>
          <div class="mb-3">
            <label for="newImage" class="form-label">New Image URL</label>
            <input type="text" id="newImage" v-model="updatedProduct.image" class="form-control" placeholder="New Image URL">
          </div>
          <div class="mb-3">
            <label for="newColor" class="form-label">New Color</label>
            <input type="text" id="newColor" v-model="updatedProduct.color" class="form-control" placeholder="New Color">
          </div>
          <button type="submit" class="btn btn-warning">Update Product</button>
        </form>
      </div>
    </div>

    <div v-if="confirmationMessage" class="alert alert-success mt-3" role="alert">
      {{ confirmationMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManagerComponent',
  data() {
    return {
      products: [],
      newProduct: { title: '', description: '', price: 0, image: '', color: '' },
      selectedProductId: null,
      updatedProduct: { title: '', description: '', price: 0, image: '', color: '' },
      confirmationMessage: ''
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('/api/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    addProduct() {
      axios.post('/api/products', this.newProduct)
        .then(() => {
          console.log('Product added successfully');
          this.fetchProducts();
          this.newProduct = { title: '', description: '', price: 0, image: '', color: '' };
          this.showConfirmation('Product added successfully');
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    },
    deleteProduct() {
      if (this.selectedProductId) {
        axios.delete(`/api/products/${this.selectedProductId}`)
          .then(() => {
            console.log('Product deleted successfully');
            this.fetchProducts();
            this.selectedProductId = null;
            this.showConfirmation('Product deleted successfully');
          })
          .catch(error => {
            console.error('Error deleting product:', error);
          });
      }
    },
    updateProduct() {
      if (this.selectedProductId) {
        axios.put(`/api/products/${this.selectedProductId}`, this.updatedProduct)
          .then(() => {
            console.log('Product updated successfully');
            this.fetchProducts();
            this.selectedProductId = null;
            this.updatedProduct = { title: '', description: '', price: 0, image: '', color: '' };
            this.showConfirmation('Product updated successfully');
          })
          .catch(error => {
            console.error('Error updating product:', error);
          });
      }
    },
    showConfirmation(message) {
      this.confirmationMessage = message;
      setTimeout(() => {
        this.confirmationMessage = '';
      }, 3000);
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
</style>

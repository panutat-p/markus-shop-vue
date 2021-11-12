<template>
  <div class="container">
    <div class="text-start">
      <button
        v-on:click="toggleForm"
        type="button"
        class="btn btn-success mb-2"
      >
        Add Product
      </button>
    </div>
    <form v-if="isShowForm" v-on:submit.prevent="addProduct" class="text-start">
      <div class="form-group">
        <label for="input-name">Product Name</label>
        <input
          v-model="newDetail.name"
          type="text"
          class="form-control"
          id="input-name"
          placeholder="name"
          required
        />
      </div>
      <div class="form-group">
        <label for="input-category">Product Category</label>
        <input
          v-model="newDetail.category"
          type="text"
          class="form-control"
          id="input-category"
          placeholder="category"
          required
        />
      </div>
      <div class="form-group">
        <label for="input-price">Product Price</label>
        <input
          v-model="newDetail.price"
          type="text"
          class="form-control"
          id="input-price"
          placeholder="price"
          required
        />
        {{ newDetail }}
      </div>
      <div class="text-center pb-5">
        <button type="submit" class="btn btn-success">Submit</button>
      </div>
    </form>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Price</th>
          <th scope="col">Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" v-bind:key="product._id">
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>${{ product.price }}</td>
          <td>
            <router-link
              v-bind:to="{ name: `DetailId`, params: { id: product._id } }"
              >detail
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="refresh" type="button" class="btn btn-success mb-5">
      Refresh
    </button>
  </div>
</template>

<script>
import { BASE_API_URL } from "@/constants/express";
import { ref, onMounted, onUpdated } from "vue";
import axios from "axios";

export default {
  name: "Product",

  setup() {
    const products = ref([]);

    const isShowForm = ref(false);
    const newDetail = ref({});

    const getProducts = async () => {
      console.log("getProducts()");
      const res = await axios.get(`${BASE_API_URL}/products`);
      products.value = res.data;
    };

    const refresh = () => {
      console.log("refresh");
      window.location.reload();
    };

    const toggleForm = () => {
      console.log("toggleForm()");
      isShowForm.value = !isShowForm.value;
    };

    const addProduct = () => {
      console.log("addProduct()");
      const res = axios.post(`${BASE_API_URL}/products`, {
        name: newDetail.value.name,
        category: newDetail.value.category,
        price: newDetail.value.price,
      });
      console.log(res.data);
      window.location.reload();
    };

    /**
     * Life Cycle Hook
     */
    onMounted(() => {
      console.log("Hook getProducts()");
      getProducts();
    });

    onUpdated(() => {
      console.log("Hook scroll to top");
      if (isShowForm.value) {
        window.scrollTo(0, 0);
      }
    });

    return { products, refresh, isShowForm, toggleForm, newDetail, addProduct };
  },
};
</script>

<style scoped></style>

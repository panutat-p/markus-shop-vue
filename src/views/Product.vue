<template>
  <div class="container">
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
            <!--<router-link to="/detail">detail</router-link>-->
          </td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="refresh" type="button" class="btn btn-success">
      refresh
    </button>
  </div>
</template>

<script>
import { BASE_API_URL } from "@/constants/express";
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "Product",

  setup() {
    const products = ref([]);

    const getProducts = async () => {
      console.log("getProducts()");
      const res = await axios.get(`${BASE_API_URL}/products`);
      products.value = res.data;
    };

    const refresh = () => {
      console.log("refresh");
      window.location.reload();
    };

    /**
     * Life Cycle Hook
     */
    onMounted(() => {
      console.log("Hook getProducts()");
      getProducts();
    });

    return { products, refresh };
  },
};
</script>

<style scoped></style>

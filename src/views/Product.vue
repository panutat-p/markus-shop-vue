<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" v-bind:key="product._id">
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>${{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BASE_API_URL } from "@/constants/express.js"; // TODO
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

    /**
     * Life Cycle Hook
     */
    onMounted(() => {
      console.log("Hook getProducts()");
      getProducts();
    });

    return { products };
  },
};
</script>

<style scoped></style>

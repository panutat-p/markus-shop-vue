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
        <tr v-for="product in productsInCategory" v-bind:key="product._id">
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>${{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BASE_API_URL } from "@/constants/express";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  name: "ProductInCategory",

  setup() {
    const route = useRoute();

    const category = ref("");
    const productsInCategory = ref({});

    const getProductsByCategory = async (category) => {
      console.log("getProductsByCategory()");
      const res = await axios.get(
        `${BASE_API_URL}/search?category=${category}`
      );
      console.log(`${BASE_API_URL}/search?category=${category}`);
      console.log(res.data);
      productsInCategory.value = res.data;
    };

    /**
     * Life Cycle Hook
     */
    onMounted(() => {
      console.log("Hook getProductsByCategory()");
      category.value = route.params.category; // get category from params
      console.log(category.value);
      getProductsByCategory(category.value);
    });

    return { productsInCategory };
  },
};
</script>

<style scoped></style>

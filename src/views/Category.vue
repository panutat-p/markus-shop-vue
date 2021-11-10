<template>
  <div class="container">
    <div class="h3">All Categories</div>
    <div class="h4 text-center">
      <ul v-for="category in categories" v-bind:key="category._id">
        <li>
          <router-link
            v-bind:to="{
              name: `ProductInCategory`,
              params: { category: category },
            }"
            >{{ category }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BASE_API_URL } from "@/constants/express";
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "Category",

  setup() {
    const categories = ref([]);

    const getCategories = async () => {
      console.log("getCategories()");
      const res = await axios.get(`${BASE_API_URL}/categories`);
      console.log(res.data);
      categories.value = res.data;
    };

    /**
     * Life Cycle Hook
     */
    onMounted(() => {
      console.log("Hook getCategories()");
      getCategories();
    });

    return { categories };
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

a {
  font-weight: bold;
  text-decoration: none;
  color: #0d6efd;
}

a:hover {
  color: #42b983;
}
</style>

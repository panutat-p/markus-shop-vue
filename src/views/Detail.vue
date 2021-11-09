<template>
  <div class="container">
    <div v-if="isData">
      <div class="h3">Product Detail</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ detail._id }}</td>
            <td>{{ detail.name }}</td>
            <td>{{ detail.category }}</td>
            <td>${{ detail.price }}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-end">
        <button
          v-on:click="deleteProduct"
          type="button"
          class="btn btn-success mb-2"
        >
          Delete
        </button>
      </div>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1548808918-a33260f83b25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=984&q=80"
          alt="product image"
        />
      </figure>
      <button v-on:click="toggleForm" type="button" class="btn btn-success m-3">
        Edit
      </button>
    </div>
    <div v-else class="h5">No data, please select from the Products page</div>
    <form v-if="isShowForm" v-on:submit.prevent="onSubmit" class="text-start">
      <div class="form-group">
        <label for="input-name">Product Name</label>
        <input
          v-model="newDetail.name"
          type="text"
          class="form-control"
          id="input-name"
          placeholder="name"
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
        />
        {{ newDetail }}
      </div>
      <div class="text-center pb-5">
        <button type="submit" class="btn btn-success">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { BASE_API_URL } from "@/constants/express";
import { ref, onMounted, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Detail",

  setup() {
    const route = useRoute();
    const router = useRouter();

    const isData = ref(false);
    const id = ref(0);
    const detail = ref({});

    const isShowForm = ref(false);
    const newDetail = ref({ name: detail.value.name });

    const getDetailById = async (id) => {
      console.log("getDetailById()");
      console.log("id", id);
      const res = await axios.get(`${BASE_API_URL}/products/${id}`);
      console.log(res.data);
      detail.value = res.data;
      // to show default value in the form
      newDetail.value.name = detail.value.name;
      newDetail.value.category = detail.value.category;
      newDetail.value.price = detail.value.price;
    };

    const toggleForm = () => {
      console.log("toggleForm()");
      isShowForm.value = !isShowForm.value;
    };

    const onSubmit = async () => {
      console.log("onSubmit()");
      console.log("id", id.value);

      console.log(newDetail.value);

      const res = await axios.put(`${BASE_API_URL}/products/${id.value}`, {
        name: newDetail.value.name,
        category: newDetail.value.category,
        price: newDetail.value.price,
      });
      console.log(res.data);
      window.location.reload();
    };

    const deleteProduct = () => {
      console.log("deleteProduct()");
      const isConfirm = window.confirm("Are you confirm to delete?");
      if (isConfirm) {
        const res = axios.delete(`${BASE_API_URL}/products/${id.value}`);
        console.log(res.data);
      }
      router.replace("/products");
    };

    /**
     * Life Cycle Hook
     */
    onMounted(() => {
      console.log("Hook get id, getDetailByID(id)");
      id.value = route.params.id; // get id from params
      if (id.value === undefined) {
        console.log("no id");
        return;
      }
      isData.value = true;
      getDetailById(id.value);
    });

    onUpdated(() => {
      if (isShowForm.value) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });

    return {
      detail,
      isData,
      toggleForm,
      isShowForm,
      onSubmit,
      newDetail,
      deleteProduct,
    };
  },
};
</script>

<style scoped>
img {
  max-height: 600px;
}
</style>

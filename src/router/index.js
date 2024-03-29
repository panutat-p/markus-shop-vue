import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Product from "@/views/Product";
import Detail from "@/views/Detail";
import Category from "@/views/Category";
import ProductInCategory from "@/views/ProductInCategory";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Product",
    component: Product,
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/detail/:id",
    name: "DetailId",
    component: Detail,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
  },
  {
    path: "/category/:category",
    name: "ProductInCategory",
    component: ProductInCategory,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

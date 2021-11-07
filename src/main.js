import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/*
import Bootstrap 5 here
from Doc, we pick its CSS and  its bundle (js + Popper)
 */
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

createApp(App).use(router).mount("#app");

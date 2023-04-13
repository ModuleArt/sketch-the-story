import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import VueTailwind from "vue-tailwind";

const vue = createApp(App);

vue.use(VueTailwind);

vue.mount("#app");

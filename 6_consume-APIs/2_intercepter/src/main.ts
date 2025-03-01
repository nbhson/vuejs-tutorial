import { createApp } from 'vue';
import App from './App.vue';
import VueAxios from 'vue-axios';
import axios from "./interceptor";

const app = createApp(App);
app.use(VueAxios, axios)
app.mount('#app');

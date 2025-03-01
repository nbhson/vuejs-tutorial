import { createApp } from 'vue';
import { loadFonts } from './plugins/webfontloader';
import { injectStore, axios } from './interceptor/interceptor';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store/store';
import VueAxios from 'vue-axios';
import router from './route/route';

injectStore(store);
loadFonts();

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store);
app.use(vuetify);
app.use(router);
app.mount('#app');

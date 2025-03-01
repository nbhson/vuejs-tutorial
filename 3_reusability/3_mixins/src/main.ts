import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mixin({
  created() {
    console.log('Global mixin - Created hook');
  }
})
app.mount('#app');

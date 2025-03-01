<template>
  <div>
    <nav-bar></nav-bar>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavbarComponent from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    'nav-bar': NavbarComponent,
  },

  data() {
    return {
      //
    };
  },
});
</script>

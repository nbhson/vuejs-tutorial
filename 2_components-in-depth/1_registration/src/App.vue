<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- đã đăng kí có thể sử dụng -->
  <hello-work-component :msgProps="msgProps" /> 
  <hello-work-component :msgProps="msgProps" />
  <!-- chưa đăng kí không thể sử dụng -->
  <HelloWorld :msgProps="msgProps" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      msgProps: `Welcome to Your Vue.js & TypeScript App`,
    };
  },
  components: {
    // đăng kí component
    'hello-work-component': HelloWorld,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

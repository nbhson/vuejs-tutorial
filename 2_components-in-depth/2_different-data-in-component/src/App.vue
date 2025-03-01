<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld :msgProps="msgProps" />
  <HelloWorld :msgProps="msgProps" />
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
    HelloWorld,
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

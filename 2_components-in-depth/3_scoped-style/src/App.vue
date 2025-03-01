<template>
  <h3>App Component</h3> <!-- red -->
  <hello-work-component /> <!-- blue -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    'hello-work-component': HelloWorld,
  },
});
</script>

<style>
h3 {
  color: red;
}
</style>

<template>
  <div class="d-flex flex-column align-items-center">
    <CounterComponent />
    <ResultComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CounterComponent from './components/Counter.vue'
import ResultComponent from './components/Result.vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    CounterComponent,
    ResultComponent,
  },
});
</script>

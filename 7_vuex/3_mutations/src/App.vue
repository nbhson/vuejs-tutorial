<template>
  <div class="d-flex flex-column align-items-center">
    <CounterComponent />
    <StateComponent />
    <GetterComponent />
    <MutationComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CounterComponent from './components/Counter.vue'
import StateComponent from './components/State.vue'
import GetterComponent from './components/Getters.vue'
import MutationComponent from './components/Mutation.vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    CounterComponent,
    StateComponent,
    GetterComponent,
    MutationComponent
  },
});
</script>

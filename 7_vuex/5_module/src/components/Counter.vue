<template>
  <div class="mb-3">
    <button @click="cong()" class="btn btn-success">[State] Result += 1</button>
    <button @click="tru()" class="btn btn-danger">[State] Result -= 1</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CounterComponent',
  data() {
    return {
    };
  },
  methods: {
    cong() {
      return this.$store.state.counter.result++
    },
    tru() {
      return this.$store.state.counter.result--
    },
  }
});
</script>

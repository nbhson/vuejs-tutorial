<template>
  <div class="mb-3">
    <button @click="cong()" class="btn btn-success">Cộng</button>
    <button @click="tru()" class="btn btn-danger">Trừ</button>
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
      return this.$store.state.result++
    },
    tru() {
      return this.$store.state.result--
    },
  }
});
</script>

<template>
  <div class="d-flex flex-column mb-3">
    <button @click="resultx10Act()" class="btn btn-warning">[Action] Result *= 10</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'ActionComponent',
  data() {
    return {
    };
  },
  methods: {
    ...mapActions([
      'resultx10Act'
    ])
    // resultx10Act() {
    //   return this.$store.dispatch('resultx10Act', 'Sơn Nguyễn')
    // }
  }
});
</script>

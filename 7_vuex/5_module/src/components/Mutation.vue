<template>
  <div class="d-flex flex-column mb-3">
    <button @click="resultx10()" class="btn btn-dark">[Mutation] Result *= 10</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex'

export default defineComponent({
  name: 'MutationComponent',
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations([
      'resultx10'
    ])
    // resultx10() {
    //   return this.$store.commit('resultx10', 10)
    // }
  }
});
</script>

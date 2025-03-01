<template>
  <div class="mb-3">
    <strong>Getters result</strong>: {{getTodos}}
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'GetterComponent',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'getTodos',
    ])
  },
  // computed: {
  //   getTodos() {
  //     return this.$store.getters.getTodos
  //   }
  // }
});
</script>

<template>
  <div class="mb-3">
    <strong>State Result</strong>: {{result}}
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex'

export default defineComponent({
  name: 'StateComponent',
  computed: {
    ...mapState(['result'])
  },
  // computed: {
  //   result() {
  //     return this.$store.state.result
  //   }
  // }
});
</script>

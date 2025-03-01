<template>
  <div>
    Result: {{result}}
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex'

export default defineComponent({
  name: 'ResultComponent',
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

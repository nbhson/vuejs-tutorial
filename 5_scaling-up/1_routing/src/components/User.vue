<template>
  <div>USER PAGE</div>
  <p>User ID: {{ $route.params.id }}</p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserComponent',
  created() {
    // console.log(this.$route);
  },
  data() {
    return {};
  },
  watch: {
    $route(from, to) {
      console.log(to);
      console.log(from);
    },
  },
});
</script>

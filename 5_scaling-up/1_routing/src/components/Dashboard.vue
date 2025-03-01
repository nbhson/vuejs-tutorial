<template>
  <div>DASHBOARD PAGE</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardComponent',
  data() {
    return {};
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'dashboard') {
      next()
    }
  }
});
</script>

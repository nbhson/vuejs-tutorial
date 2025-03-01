<template>
  <div>
    DASHBOARD PAGE
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardComponent',
  data() {
    return {

    }
  },
  created() {
    console.log('Created');
  },
  activated() {
    console.log('Activated');
  },
  deactivated() {
    console.log('Deactivated');
  }
});
</script>
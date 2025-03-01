<template>
  <div>
    ABOUT PAGE
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutComponent',
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
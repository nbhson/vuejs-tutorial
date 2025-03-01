<template>
  <div>
    HOME PAGE
    <div>
      <button class="btn btn-success" @click="i++">Click</button>
      {{i}}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeComponent',
  data() {
    return {
      i: 0
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
<template>
  <button class="btn btn-success" type="submit">
    <slot>Submit</slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FallbackContent',
  data() {
    return {
    }
  },
});
</script>
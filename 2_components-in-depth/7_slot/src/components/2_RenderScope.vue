<template>
  <button class="btn btn-success">
    <slot></slot> <!-- slot outlet -->
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RenderScope',
  data() {
    return {
    }
  },
});
</script>
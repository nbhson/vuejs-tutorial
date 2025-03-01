<template>
  <h2>Child 1</h2>
  <h2 v-bind="$attrs">Child 2</h2> <!-- use $attrs to bind inheritance -->
  <span>Fallthrough attributes: {{ $attrs }}</span>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false, // disable attr inheritance
  name: 'DisableAttributeInheritance',
  data() {
    return {
    }
  },
});
</script>
<template>
  <div>
    <slot :text="greetingMessage" :every="everyMessage" :count="1"></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScopedSlot",
  data() {
    return {
       greetingMessage: 'Hello',
       everyMessage: 'Everyone'
    };
  },
});
</script>
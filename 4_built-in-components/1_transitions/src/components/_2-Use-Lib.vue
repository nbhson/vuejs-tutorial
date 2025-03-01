<template>
  <div>
    <transition 
      enter-active-class="animate__animated animate__backInDown"
      leave-active-class="animate__animated animate__backOutDown"
      appear="true">
      <div v-show="show" class="alert alert-danger mt-3">Error!</div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UseLibComponent",
  props: {
    show: {
      type: Boolean
    }
  }
});
</script>

<template>
  <div>
    <transition name="wrapper" appear="true">
      <div v-show="show" class="alert alert-success mt-3">Successfully!</div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnimateCssComponent",
  props: {
    show: {
      type: Boolean
    }
  }
});
</script>

<style scoped>
.wrapper-enter-active {
  animation: finished 1s reverse;
}
.wrapper-leave-active {
  animation: finished 1s;
}
@keyframes finished {
  0% {
    opacity: 1;
    right: 0;
  }
  100% {
    opacity: 0;
    right: -100px;
  }
}
</style>
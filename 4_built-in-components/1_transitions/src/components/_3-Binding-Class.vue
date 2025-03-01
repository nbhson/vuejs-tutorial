<template>
  <div>
    <div class="d-flex align-items-center mt-3">
      <label for="in">In</label>
      <select v-model="animateIn" class="form-control" name="in">
        <option value="animate__animated animate__rotateInDownLeft">Jack</option>
        <option value="animate__animated animate__rollIn">Roll</option>
      </select>
      <label for="out">Out</label>
      <select v-model="animateOut" class="form-control" name="out">
        <option value="animate__animated animate__hinge">Jack</option>
        <option value="animate__animated animate__rollOut">Roll</option>
      </select>
    </div>

    <transition 
      :enter-active-class="animateIn"
      :leave-active-class="animateOut"
      appear="true">
      <div v-show="show" class="alert alert-warning mt-3">Warning!</div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BidingClassComponent",
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      animateIn: "animate__animated animate__rotateInDownLeft",
      animateOut: "animate__animated animate__hinge"
    }
  }
});
</script>

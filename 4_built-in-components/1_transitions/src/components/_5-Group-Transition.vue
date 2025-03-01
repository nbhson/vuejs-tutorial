<template>
  <div>
    <button 
        class="btn btn-dark mt-3 mb-3"
        @click="numbers.push(numbers[numbers.length-1] + 1)"
      >
        Add Item
      </button>

      <transition-group
        enter-active-class="animate__animated animate__rotateInDownLeft"
        leave-active-class="animate__animated animate__hinge"
      >
        <div
          class="alert alert-dark" 
          style="cursor: pointer;"
          v-for="(number, index) of numbers" 
          :key="number"
          @click="remove(index)"
        >
          {{number}}
        </div>
      </transition-group>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GroupTransitionComponent",
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      numbers: [1,2,3,4,5]
    }
  },
  methods: {
    remove(index) {
      this.numbers.splice(index, 1)
    }
  }
});
</script>

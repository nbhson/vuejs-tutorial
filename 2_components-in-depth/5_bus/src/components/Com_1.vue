<template>
  <h3>
    [Component 1] <br>
    Age: {{age}} <br>
    <button @click="changeAge">Change age</button>
  </h3>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ComChildOne',
  props: {
    ageProp: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      age: 0
    }
  },
  created() {
    this.age = this.ageProp
  },
  methods: {
    changeAge() {
      this.age = 90
      this.emitter.emit("changeAge", this.age);
    }
  },
});
</script>
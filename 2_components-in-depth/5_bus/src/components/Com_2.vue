<template>
  <h3>
    [Component 2] <br>
    Age: {{age}}
  </h3>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ComChildTwo',
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
    this.emitter.on('changeAge', (age) => {
      console.log('Trigger');
      this.age = age
    })
    this.age = this.ageProp
  },
});
</script>

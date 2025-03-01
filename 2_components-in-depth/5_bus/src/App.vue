<template>
  <h3>Age: {{age}}</h3> 
  <hr>
  <com-child-one :ageProp="age"/> 
  <hr>
  <com-child-two :ageProp="age"/> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ComChildOne from './components/Com_1.vue';
import ComChildTwo from './components/Com_2.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      age: 24
    };
  },
  components: {
    'com-child-one': ComChildOne,
    'com-child-two': ComChildTwo,
  },
});
</script>
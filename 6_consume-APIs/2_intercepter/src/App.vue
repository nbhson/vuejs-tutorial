<template>
  <!-- https://animate.style/ -->
  <div class="d-flex flex-column align-items-center">
   <button class="btn btn-success" @click="getTodos()">Get Todos</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from 'axios'

export default defineComponent({
  name: "App",
  data() {
    return {
      show: true,
    };
  },
  methods: {
    getTodos() {
      axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
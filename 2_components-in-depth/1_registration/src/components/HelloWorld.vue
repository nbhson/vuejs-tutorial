<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="changeMessage()">Changes Message</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msgProps: String,
  },
  data() {
    return {
      msg: this.msgProps
    }
  },
  methods: {
    changeMessage() {
      this.msg = 'New Message'
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

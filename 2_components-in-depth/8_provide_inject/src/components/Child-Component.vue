<template>
  <div>
    {{warnMsg}}
  </div>
  <div>
    {{dangerMsg}}
  </div>
  <div>
    {{yourName}}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChildComponent',
  inject: ['warnMsg', 'dangerMsg', 'yourName'],
  data() {
    return {

    }
  },
});
</script>
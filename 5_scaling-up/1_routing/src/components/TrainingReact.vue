<template>
  <div>
    ReactJS Page

    <p>Content</p>
    <router-link class="nav-link" to="/training"
      >-> Back to Training</router-link
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrainingReact',
});
</script>

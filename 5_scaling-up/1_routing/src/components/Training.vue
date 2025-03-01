<template>
  <div>
    Training Page

    <router-link class="nav-link" to="/training/vuejs">VueJS</router-link>
    <router-link class="nav-link" to="/training/reactjs">ReactJS</router-link>
    <router-link class="nav-link" to="/training/angularjs"
      >AngularJS</router-link
    >

    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrainingComponent',
});
</script>

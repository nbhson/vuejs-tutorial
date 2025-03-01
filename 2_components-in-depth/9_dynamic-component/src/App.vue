<template>
  <div>
    <button 
      class="btn btn-outline-dark"
      @click="activeComponent = 'home'">
      Home
    </button>
    <button 
      class="btn btn-outline-dark"
      @click="activeComponent = 'about'">
      About
    </button>
    <button 
      class="btn btn-outline-dark"
      @click="activeComponent = 'dashboard'">
      Dashboard
    </button>

    <!-- keep life circle-->
    <KeepAlive> 
      <component :is="activeComponent"></component>
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeComponent from './components/Home.vue'
import AboutComponent from './components/About.vue'
import DashboardComponent from './components/Dashboard.vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      activeComponent: 'home'
    };
  },
  components: {
    'home': HomeComponent,
    'about': AboutComponent,
    'dashboard': DashboardComponent
  },
});
</script>
<template>
  <div>
    <NavbarComponent></NavbarComponent>

    <transition
      appear="true"
      enter-active-class="animate__animated animate__lightSpeedInLeft"
      leave-active-class="animate__animated animate__lightSpeedInRight"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavbarComponent from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {};
  },
  components: {
    NavbarComponent,
  },
});
</script>

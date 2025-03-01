<template>
  <!-- https://animate.style/ -->
  <div class="d-flex flex-column align-items-center">
    <!-- transition chỉ áp dụng cho single element -->
    <button class="btn btn-outline-success" @click="show = !show">
      Show alert
    </button>
    <!-- custom animate -->
    <AnimateCssComponent :show="show"></AnimateCssComponent>
    <!-- use lib -->
    <UseLibComponent :show="show"></UseLibComponent>
    <!-- binding -->
    <BidingClassComponent :show="show"></BidingClassComponent>
    <!-- js animate -->
    <JSAnimateComponent :show="show"></JSAnimateComponent>
    <!-- group -->
    <GroupTransitionComponent :show="show"></GroupTransitionComponent>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AnimateCssComponent from "./components/_1-Animate-Css.vue"
import UseLibComponent from "./components/_2-Use-Lib.vue"
import BidingClassComponent from "./components/_3-Binding-Class.vue"
import JSAnimateComponent from "./components/_4-JS-Animate.vue"
import GroupTransitionComponent from "./components/_5-Group-Transition.vue"

export default defineComponent({
  name: "App",
  data() {
    return {
      show: true,
    };
  },
  components: {
    AnimateCssComponent,
    UseLibComponent,
    BidingClassComponent,
    JSAnimateComponent,
    GroupTransitionComponent
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
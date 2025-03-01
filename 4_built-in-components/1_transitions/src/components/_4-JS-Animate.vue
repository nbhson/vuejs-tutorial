<template>
  <div>
    <transition 
      appear="true"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCalled"

      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
    >
      <div 
        class="bg-primary text-light mt-3"
        style="width: 200px; height: 1px;"
        v-show="show"
      >
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "JSAnimateComponent",
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      boxWidth: 300
    }
  },
  methods: {
    beforeEnter(el) {
      console.log('beforeEnter');
    },
    enter(el, done) {
      console.log('enter');

      let point = 0
      const interval = setInterval(() => {
        point++
        this.boxWidth += 1
        el.style.width = this.boxWidth + 'px'
        if (point >= 100) {
          clearInterval(interval)
          done()
        }
      }, 100);
    },
    afterEnter(el) {
      console.log('afterEnter');
    },
    enterCalled(el) {
      console.log('enterCalled');
    },
    beforeLeave() {
      console.log('beforeLeave');
    },
    leave(el, done) {
      console.log('leave');
    },
    afterLeave() {
      console.log('afterLeave');
    },
    leaveCancelled() {
      console.log('leaveCancelled');
    },
  }
});
</script>

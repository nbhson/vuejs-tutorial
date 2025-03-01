<template>
  <div>
    <p>
      <!-- BASIC -->
      <span v-c-element>Directive element...</span>
    </p>
    <p>
      <!-- BINDING -->
      <span v-c-binding="'red'">Directive binding</span>
    </p>
    <p>
      <!-- BINDING: ARG -->
      <span v-c-binding:background="'red'">Directive binding arg</span>
    </p>
    <p>
      <!-- BINDING: MODIFIER -->
      <span v-c-binding:background.delay="'green'"
        >Directive binding modifier</span
      >
    </p>
    <p>
      <span v-c-multi-value="{backgroundColor: 'black', color: 'white'}">Multi value...</span>
    </p>
    <p>
      <!-- LOCAL CUSTOM -->
      <span v-c-local>Local custom...</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  directives: {
    "c-local": {
      created(el, binding, vnode, prevVnode) {
        el.style.backgroundColor = 'pink';
        el.style.fontSize = '24px';
        el.style.color = 'blue';
      },
    },
  },
});
</script>
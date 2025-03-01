<template>
  <p>
    <AttributeInheritance 
      class="large"
      @click="onClick">
    </AttributeInheritance>
  </p>
  <p>
    <DisableAttributeInheritance  
      class="large">
    </DisableAttributeInheritance>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AttributeInheritance from './components/1_Attribute-Inheritance.vue';
import DisableAttributeInheritance from './components/2_Disable-Attribute-Inheritance.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      message: 'Show Info',
      dynamicFooter: 'footer',
    };
  },
  methods: {
    someEvent(data: string) {
      console.log(data);
    },
    onClick() {
      console.log('Click');
    }
  },
  components: {
    AttributeInheritance,
    DisableAttributeInheritance
  },
});
</script>
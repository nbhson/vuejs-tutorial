<template>
  <p>
    <button 
      class="btn btn-sm btn-outline-success" 
      @click="name = 'Phương Trinh'">
      Change Name
    </button>
    {{ name }}
  </p>
  
  <p>
    <child-1 
      :name="name" 
      :age="age" 
      :parentChangeName="parentChangeName"
      @nameChange="name = $event" 
    />
  </p>

  <p>
    <child-2 
      :age="age" 
      @changeAge="age = $event"
    />
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChildOne from "./components/Child1.vue";
import ChildTwo from "./components/Child2.vue";

export default defineComponent({
  name: "App",
  components: {
    "child-1": ChildOne,
    "child-2": ChildTwo,
  },
  data() {
    return {
      name: "[Parent] Sơn Nguyễn",
      age: 20
    };
  },
  methods: {
    parentChangeName(param: string) {
      this.name = `[Parent] Sơn Nguyễn - ${param}`
    }
  }
});
</script>

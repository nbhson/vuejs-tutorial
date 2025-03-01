<template>
  <div>
    <h3>Filter Products</h3>
    <div>
      <input type="text" class="form-control" v-model="searchText" />
      <ul>
        <li v-for="product in filterProducts" :key="product">
          {{ product }}
        </li>
      </ul>
    </div>
    <MixinsComponent></MixinsComponent>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import MixinsComponent from "./components/Mixins.vue"
import { mixinsFilter } from "./mixinsConfig";

export default defineComponent({
  name: "App",
  mixins: [mixinsFilter],
  components: {
    MixinsComponent
  }
});
</script>

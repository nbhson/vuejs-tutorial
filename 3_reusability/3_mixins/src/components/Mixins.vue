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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mixinsFilter } from "../mixinsConfig";

export default defineComponent({
  name: "MixinsComponent",
  mixins: [mixinsFilter],
});
</script>

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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      products: [
        "Iphone 13 Pro Max - 128Gb",
        "Samsung A90 5G",
        "Xiaomi 11T 256G",
        "ASUS ROG Phone 5",
      ],
      searchText: "",
    };
  },
  computed: {
    filterProducts(): Array<string> {
      return this.products.filter((product) =>
        product.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
});
</script>

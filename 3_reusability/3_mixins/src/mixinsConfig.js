export const mixinsFilter = {
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
    filterProducts() {
      return this.products.filter((product) =>
        product.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  created() {
    console.log('Created');
  }
}

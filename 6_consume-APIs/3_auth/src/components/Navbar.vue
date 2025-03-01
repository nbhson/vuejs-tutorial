<template>
  <v-toolbar>
    <v-toolbar-title>
      <router-link class="text-decoration-none text-black" to="/"
        >Home</router-link
      >
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div v-if="!authentication" class="d-flex navbar-nav">
      <router-link class="text-decoration-none text-black mr-3" to="/login"
        >Login</router-link
      >
      <router-link class="text-decoration-none text-black" to="/register"
        >Register</router-link
      >
    </div>

    <temple v-else class="d-flex navbar-nav">
      <v-btn icon @click="submit()">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </temple>
  </v-toolbar>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';

export default defineComponent({
  name: 'NavbarComponent',
  data() {
    return {
      store: useStore(),
    };
  },
  computed: {
    ...mapGetters(['user', 'authentication']),
  },
  methods: {
    submit() {
      this.store.dispatch('resetAuth');
    },
  },
});
</script>

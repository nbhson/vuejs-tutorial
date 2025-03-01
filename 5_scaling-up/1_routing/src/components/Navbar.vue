<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home Link</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About Link</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard"
                >Dashboard Link</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'user', params: { id: '15' } }"
              >
                User Link
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/training"
                >Training Link</router-link
              >
            </li>
          </ul>
          <ul class="d-flex justify-content-end navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <button class="nav-link btn" @click="goHome">Home Button</button>
            </li>
            <li class="nav-item">
              <button class="nav-link btn" @click="goAbout">
                About Button
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link btn" @click="goDashboard">
                Dashboard Button
              </button>
            </li>
            <li class="nav-item">
              <button class="nav-link btn" @click="goUser">User Button</button>
            </li>
            <li class="nav-item">
              <button class="nav-link btn" @click="goTraining">
                Training Button
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavbarComponent',
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    goAbout() {
      this.$router.push('/about');
    },
    goDashboard() {
      this.$router.push('/dashboard');
    },
    goUser() {
      this.$router.push({ name: 'user', params: { id: '9' } });
    },
    goTraining() {
      this.$router.push('/training');
    },
  },
});
</script>

<style scoped>
.router-link-active {
  font-weight: 500;
  text-decoration: underline;
}
</style>

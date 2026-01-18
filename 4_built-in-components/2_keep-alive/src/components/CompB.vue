<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue'

const message = ref('')

onActivated(() => {
  console.log('Component B activated')
})

onDeactivated(() => {
  console.log('Component B deactivated')
})
</script>

<template>
  <div class="component-box">
    <h3>Component B (Input)</h3>
    <p>Hãy nhập gì đó và chuyển tab, dữ liệu sẽ không bị mất.</p>
    <input v-model="message" placeholder="Nhập tin nhắn..." />
    <p>Nội dung đang nhập: {{ message }}</p>
  </div>
</template>

<style scoped>
.component-box {
  padding: 20px;
  border: 2px solid #646cff;
  border-radius: 8px;
  margin-top: 20px;
}
input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>

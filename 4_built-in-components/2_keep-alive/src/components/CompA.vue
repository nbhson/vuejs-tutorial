<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue'

const count = ref(0)

onActivated(() => {
  console.log('Component A activated')
})

onDeactivated(() => {
  console.log('Component A deactivated')
})
</script>

<template>
  <div class="component-box">
    <h3>Component A (Counter)</h3>
    <p>Trạng thái sẽ được giữ nguyên khi chuyển tab nhờ KeepAlive.</p>
    <button @click="count++">Số lần click: {{ count }}</button>
  </div>
</template>

<style scoped>
.component-box {
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 8px;
  margin-top: 20px;
}
</style>

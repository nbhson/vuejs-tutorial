<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import CompA from './components/CompA.vue'
import CompB from './components/CompB.vue'

const currentTab = shallowRef(CompA)
const useKeepAlive = ref(true)

const tabs = {
  CompA,
  CompB
}
</script>

<template>
  <div class="container">
    <h1>Vue 3 KeepAlive Demo</h1>
    
    <div class="controls">
      <label>
        <input type="checkbox" v-model="useKeepAlive" />
        Sử dụng KeepAlive
      </label>
    </div>

    <div class="tabs">
      <button 
        v-for="(comp, name) in tabs" 
        :key="name"
        :class="{ active: currentTab === comp }"
        @click="currentTab = comp"
      >
        {{ name }}
      </button>
    </div>

    <div class="view">
      <KeepAlive v-if="useKeepAlive">
        <component :is="currentTab" />
      </KeepAlive>
      <component v-else :is="currentTab" />
    </div>

    <div class="explanation">
      <p v-if="useKeepAlive">
        ✅ <strong>Đang bật KeepAlive:</strong> Khi bạn chuyển tab, trạng thái của component (counter, input) sẽ được giữ nguyên.
      </p>
      <p v-else>
        ❌ <strong>Đang tắt KeepAlive:</strong> Mỗi lần chuyển tab, component cũ sẽ bị unmount và reset trạng thái.
      </p>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}
.container {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 12px;
  background-color: #f9f9f9;
}
.controls {
  margin-bottom: 20px;
  padding: 10px;
  background: #eee;
  border-radius: 8px;
}
.tabs button {
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
}
.tabs button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}
.view {
  min-height: 200px;
}
.explanation {
  margin-top: 20px;
  padding: 10px;
  font-size: 0.9em;
  color: #666;
  border-top: 1px solid #eee;
}
</style>

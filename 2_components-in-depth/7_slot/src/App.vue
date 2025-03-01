<template>
  <p>
    <!-- BASIC -->
    <SlotContentAndOutlet>
      <span style="color: white;">Click me!</span>
    </SlotContentAndOutlet>
  </p>
  
  <p>
    <!-- RENDER SCOPE -->
    <RenderScope @click="message = 'Sơn Nguyễn'">{{ message }}</RenderScope>
    <span>{{ message }}</span>
  </p>

  <p>
    <!-- FALLBACK CONTENT -->
    <FallbackContent />
    <FallbackContent>Save</FallbackContent>
  </p>

  <p>
    <!-- NAME SLOT -->
    <NamedSlots>
      <template #header>
        <h1>Here might be a page title</h1>
      </template>

      <template #default> <!-- DEFAULT -->
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </template>

      <template #[dynamicFooter]>
        <p>Here's some contact info</p>
      </template>
    </NamedSlots>
  </p>

  <p>
    <!-- SCOPED -->
    <ScopedSlot v-slot="slotProps">
      {{ slotProps.text }} {{ slotProps.every }} {{ slotProps.count }}
    </ScopedSlot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SlotContentAndOutlet from './components/1_Basic.vue';
import RenderScope from './components/2_RenderScope.vue';
import FallbackContent from './components/3_FallBack.vue';
import NamedSlots from './components/4_Name.vue';
import ScopedSlot from './components/5_Scope.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      message: 'Show Info',
      dynamicFooter: 'footer',
    };
  },
  components: {
    SlotContentAndOutlet,
    RenderScope,
    FallbackContent,
    NamedSlots,
    ScopedSlot
  },
});
</script>
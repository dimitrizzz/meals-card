<template>
  <div class="app-layout">
    <aside>
      <Sidebar />
    </aside>

    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<style>
.app-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: #f7f9fc;
}

@media (max-width: 900px) {
  .app-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
</style>

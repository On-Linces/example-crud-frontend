<script setup lang="ts">
// Importar componentes compartidos
import Header from '@/components/Shared/Header.vue'
import Footer from '@/components/Shared/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <Header />

    <main class="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// Importamos RouterView para renderizar las páginas según la URL
import { RouterView } from 'vue-router'
// Importamos el layout principal que envuelve nuestra aplicación
import MainLayout from '@/templates/MainLayout.vue'
</script>

<template>
  <!-- Envolvemos todo el contenido en el MainLayout para mantener una estructura consistente -->
  <MainLayout>
    <!-- RouterView es donde se renderizará el componente de la página actual según la ruta -->
    <RouterView />
  </MainLayout>
</template>

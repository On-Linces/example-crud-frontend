<script setup lang="ts">
// Layout principal de la aplicación
</script>

<template>
  <div class="layout">
    <header>
      <h1>Sistema de Inventario</h1>
    </header>
    
    <main>
      <slot />
    </main>
    
    <footer>
      <p>&copy; 2026 - CRUD Demo</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  padding: 1rem;
  background: #333;
  color: white;
}

main {
  flex: 1;
  padding: 1rem;
}

footer {
  padding: 1rem;
  background: #333;
  color: white;
  text-align: center;
}
</style>

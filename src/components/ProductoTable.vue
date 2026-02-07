<script setup lang="ts">
import type { Producto } from '@/@types/producto'
import { formatCurrency } from '@/utils/formatters'

// Definición de las propiedades que recibe este componente desde el padre
defineProps<{
  productos: Producto[] // La lista de datos a mostrar
  loading?: boolean     // Estado opcional de carga
}>()

// Definición de los eventos que este componente puede emitir hacia el padre
const emit = defineEmits<{
  edit: [producto: Producto]  // Evento para iniciar edición
  delete: [id: number]        // Evento para eliminar
}>()
</script>

<template>
  <div>
    <h2>Lista de Productos</h2>

    <p v-if="loading">Cargando...</p>

    <table border="1" v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ formatCurrency(producto.precio) }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>
            <button @click="emit('edit', producto)">Editar</button>
            <button @click="emit('delete', producto.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="productos.length === 0">
          <td colspan="5">No hay productos registrados</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

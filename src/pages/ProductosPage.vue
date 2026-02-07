<script setup lang="ts">
// Página que muestra y gestiona Productos (lista + formulario). Usa el hook `useProductos` para la lógica.
import { ref } from 'vue'
import type { Producto, ProductoFormData } from '@/@types/producto'
// Hook personalizado que maneja toda la lógica del estado de productos (CRUD)
import { useProductos } from '@/hooks/useProductos'
import ProductoForm from '@/components/ProductoForm.vue'
import ProductoTable from '@/components/ProductoTable.vue'

// Desestructuramos las variables y funciones reactivas necesarias del hook
const {
  productos,        // Array reactivo con la lista de productos
  loading,          // Estado de carga (true/false)
  error,            // Mensajes de error si ocurren
  crearProducto,    // Función para crear
  actualizarProducto, // Función para actualizar
  eliminarProducto  // Función para eliminar
} = useProductos()

// Estado local para gestionar qué producto se está editando actualmente
// Si es null, significa que estamos en modo "Crear nuevo"
const productoEditando = ref<Producto | null>(null)

// Maneja el envío del formulario (tanto crear como editar)
async function handleSubmit(data: ProductoFormData) {
  if (productoEditando.value) {
    // Si hay un producto seleccionad, actualizamos
    const success = await actualizarProducto(productoEditando.value.id, data)
    // Si la actualización fue exitosa, limpiamos el estado de edición
    if (success) productoEditando.value = null
  } else {
    // Si no, creamos uno nuevo
    await crearProducto(data)
  }
}

// Se activa cuando el usuario hace clic en "Editar" en la tabla
function handleEdit(producto: Producto) {
  // Carga los datos del producto en el formulario
  productoEditando.value = producto
}

// Se activa cuando el usuario cancela la edición en el formulario
function handleCancel() {
  productoEditando.value = null
}

// Maneja la eliminación desde la tabla
async function handleDelete(id: number) {
  await eliminarProducto(id)
}
</script>

<template>
  <div>
    <!-- Muestra errores si existen -->
    <p v-if="error" style="color: red;">{{ error }}</p>

    <!-- Componente del formulario: Se usa tanto para crear como para editar -->
    <ProductoForm :producto="productoEditando" :loading="loading" @submit="handleSubmit" @cancel="handleCancel" />

    <hr />

    <!-- Componente de la tabla: Lista los productos y emite eventos de acción -->
    <ProductoTable :productos="productos" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
// Formulario reutilizable para crear o editar un Producto.
// Valida localmente antes de emitir `submit` y soporta `cancel`.
import { ref, watch, computed } from 'vue'
import type { Producto, ProductoFormData } from '@/@types/producto'
import { validateProducto, type ValidationError } from '@/validators/producto.validator'

// Props: 'producto' es opcional y se usa cuando estamos en modo Edición
const props = defineProps<{
  producto?: Producto | null
  loading?: boolean
}>()

// Eventos que emite el formulario al padre
const emit = defineEmits<{
  submit: [data: ProductoFormData] // Envía los datos validados
  cancel: []                       // Notifica cancelación
}>()

// Estado reactivo local para los campos del formulario
const formData = ref<ProductoFormData>({
  nombre: '',
  precio: 0,
  cantidad: 0
})

// Estado para almacenar errores de validación
const errors = ref<ValidationError[]>([])

// Watcher: Observa cambios en la prop 'producto' para rellenar el formulario
// Si llega un producto, estamos en modo Edición. Si es null, modo Creación.
watch(() => props.producto, (newProducto) => {
  if (newProducto) {
    // Modo Edición: Copiamos los datos del producto a los campos
    formData.value = {
      nombre: newProducto.nombre,
      precio: newProducto.precio,
      cantidad: newProducto.cantidad
    }
  } else {
    // Modo Creación: Reseteamos los campos
    formData.value = { nombre: '', precio: 0, cantidad: 0 }
  }
  // Limpiamos errores previos al cambiar de producto
  errors.value = []
}, { immediate: true }) // immediate: true hace que se ejecute la primera vez también

// Helper para extraer el mensaje de error de un campo específico
function getError(field: string): string | undefined {
  return errors.value.find(e => e.field === field)?.message
}

// Manejo del envío del formulario
function handleSubmit() {
  // 1. Validamos los datos localmente
  errors.value = validateProducto(formData.value)

  // 2. Si no hay errores, emitimos el evento 'submit' al padre
  if (errors.value.length === 0) {
    emit('submit', { ...formData.value })
  }
}

// Manejo de la cancelación
function handleCancel() {
  formData.value = { nombre: '', precio: 0, cantidad: 0 }
  errors.value = []
  emit('cancel')
}

// Exponemos una función para resetear el formulario desde el padre (útil después de crear un nuevo producto)
const formTitle = computed(() => props.producto ? 'Editar Producto' : 'Nuevo Producto')
const submitText = computed(() => props.producto ? 'Actualizar' : 'Crear')
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">{{ formTitle }}</h2>

    <div class="space-y-4">
      <div>
        <label for="nombre" class="block text-sm font-medium mb-1">Nombre</label>
        <input id="nombre" type="text" v-model="formData.nombre" :disabled="loading"
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
        <p v-if="getError('nombre')" class="text-red-500 text-sm mt-1">{{ getError('nombre') }}</p>
      </div>

      <div>
        <label for="precio" class="block text-sm font-medium mb-1">Precio</label>
        <input id="precio" type="number" step="0.01" v-model.number="formData.precio" :disabled="loading"
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
        <p v-if="getError('precio')" class="text-red-500 text-sm mt-1">{{ getError('precio') }}</p>
      </div>

      <div>
        <label for="cantidad" class="block text-sm font-medium mb-1">Cantidad</label>
        <input id="cantidad" type="number" v-model.number="formData.cantidad" :disabled="loading"
          class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
        <p v-if="getError('cantidad')" class="text-red-500 text-sm mt-1">{{ getError('cantidad') }}</p>
      </div>
    </div>

    <div class="flex gap-2 justify-end mt-6">
      <button type="button" @click="handleCancel" :disabled="loading"
        class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
      <button type="submit" :disabled="loading" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{{
        submitText }}</button>
    </div>
  </form>
</template>

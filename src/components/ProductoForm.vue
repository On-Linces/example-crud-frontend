<script setup lang="ts">
import { ref, watch } from 'vue'
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
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- El título cambia dinámicamente según si estamos editando o creando -->
    <h2>{{ producto ? 'Editar Producto' : 'Nuevo Producto' }}</h2>

    <!-- Campo Nombre -->
    <div>
      <label for="nombre">Nombre:</label>
      <input id="nombre" type="text" v-model="formData.nombre" :disabled="loading" />
      <!-- Mensaje de error condicional para nombre -->
      <span v-if="getError('nombre')" style="color: red;">{{ getError('nombre') }}</span>
    </div>

    <!-- Campo Precio -->
    <div>
      <label for="precio">Precio:</label>
      <input id="precio" type="number" step="0.01" v-model.number="formData.precio" :disabled="loading" />
      <span v-if="getError('precio')" style="color: red;">{{ getError('precio') }}</span>
    </div>

    <!-- Campo Cantidad -->
    <div>
      <label for="cantidad">Cantidad:</label>
      <input id="cantidad" type="number" v-model.number="formData.cantidad" :disabled="loading" />
      <span v-if="getError('cantidad')" style="color: red;">{{ getError('cantidad') }}</span>
    </div>

    <!-- Botones de Acción -->
    <div>
      <!-- El texto del botón también es dinámico -->
      <button type="submit" :disabled="loading">
        {{ producto ? 'Actualizar' : 'Crear' }}
      </button>
      <button type="button" @click="handleCancel" :disabled="loading">
        Cancelar
      </button>
    </div>
  </form>
</template>

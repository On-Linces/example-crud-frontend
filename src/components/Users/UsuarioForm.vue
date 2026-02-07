<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import type { Usuario, UsuarioFormData } from '@/@types/usuario'
import { validateUsuario, type ValidationError } from '@/validators/usuario.validator'

const props = defineProps<{
    usuario?: Usuario | null
    loading?: boolean
}>()

const emit = defineEmits<{
    submit: [data: UsuarioFormData] // Envía los datos validados
    cancel: []                       // Notifica cancelación
}>()

const formData = ref<UsuarioFormData>({
    name: '',
    email: ''
})

const errors = ref<ValidationError[]>([])

watch(() => props.usuario, (newUsuario) => {
    if (newUsuario) {
        formData.value = {
            name: newUsuario.name,
            email: newUsuario.email
        }
    } else {
        formData.value = { name: '', email: '' }
    }
    errors.value = []
}, { immediate: true })

function getError(field: string): string | undefined {
    return errors.value.find(e => e.field === field)?.message
}

function handleSubmit() {
    errors.value = validateUsuario(formData.value)

    if (errors.value.length === 0) {
        emit('submit', { ...formData.value })
    }
}

const handleCancel = () => {
    // Limpiar campos localmente (útil en modo "crear") y notificar al padre
    formData.value = { name: '', email: '' }
    errors.value = []
    emit('cancel')
}

function resetForm() {
    formData.value = { name: '', email: '' }
    errors.value = []
}

defineExpose({ resetForm })

const formTitle = computed(() => props.usuario ? 'Editar Usuario' : 'Nuevo Usuario')
const submitText = computed(() => props.usuario ? 'Actualizar' : 'Crear')
</script>

<template>
    <form @submit.prevent="handleSubmit" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">{{ formTitle }}</h2>

        <div class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium mb-1">Nombre</label>
                <input id="name" type="text" v-model="formData.name" :disabled="loading"
                    class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <p v-if="getError('name')" class="text-red-500 text-sm mt-1">{{ getError('name') }}</p>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium mb-1">Email</label>
                <input id="email" type="email" v-model="formData.email" :disabled="loading"
                    class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                <p v-if="getError('email')" class="text-red-500 text-sm mt-1">{{ getError('email') }}</p>
            </div>
        </div>

        <div class="flex gap-2 justify-end mt-6">
            <button type="button" @click="handleCancel" :disabled="loading"
                class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
            <button type="submit" :disabled="loading"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{{ submitText }}</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Usuario, UsuarioFormData } from '@/@types/usuario'
import { useUsuarios } from '@/hooks/useUsuarios'
import UsuarioForm from '@/components/Users/UsuarioForm.vue';
import UsuarioTable from '@/components/Users/UsuarioTable.vue'

const {
    usuarios,
    loading,
    error,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} = useUsuarios()

const usuarioEditando = ref<Usuario | null>(null)
const usuarioFormRef = ref<any>(null)

const handleSubmit = async (data: UsuarioFormData) => {
    if (usuarioEditando.value) {
        const success = await actualizarUsuario(usuarioEditando.value.id, data)
        if (success) usuarioEditando.value = null
    } else {
        const success = await crearUsuario(data)
        if (success) usuarioFormRef.value?.resetForm()
    }
}

const handleCancel = () => {
    usuarioEditando.value = null
    usuarioFormRef.value?.resetForm()
}

const handleEdit = (usuario: Usuario) => {
    usuarioEditando.value = usuario
}

const handleDelete = async (id: number) => {
    await eliminarUsuario(id)
}
</script>

<template>
    <div class="space-y-8">
        <div v-if="error" class="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-4">
            <p class="text-sm text-red-700 dark:text-red-200 flex items-center gap-2">
                <span>⚠️</span> {{ error }}
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1">
                <UsuarioForm ref="usuarioFormRef" :usuario="usuarioEditando" :loading="loading" @submit="handleSubmit"
                    @cancel="handleCancel" />
            </div>
            <div class="lg:col-span-2">
                <UsuarioTable :usuarios="usuarios" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
            </div>
        </div>
    </div>
</template>
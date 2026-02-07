<script setup lang="ts">
import type { Usuario } from '@/@types/usuario'

defineProps<{
    usuarios: Usuario[]
    loading?: boolean
}>()

</script>

<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div class="mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Usuarios</h2>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">{{ usuarios.length }} usuario{{
                        usuarios.length !== 1 ? 's' : '' }} registrado{{ usuarios.length !== 1 ? 's' : '' }}</p>
                </div>
                <div v-if="loading" class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span class="text-sm">Cargando...</span>
                </div>
            </div>
        </div>

        <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table class="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-900">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            ID</th>
                        <th
                            class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Nombre</th>
                        <th
                            class="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Email</th>
                        <th
                            class="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                            Acciones</th>
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="usuario in usuarios" :key="usuario.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{{ usuario.id }}</td>
                        <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{{ usuario.name }}</td>
                        <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{{ usuario.email }}
                        </td>
                        <td class="px-6 py-4 text-sm flex gap-2 justify-center">
                            <button @click="$emit('edit', usuario)"
                                class="px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 font-medium transition-colors text-xs">Editar</button>
                            <button @click="$emit('delete', usuario.id)"
                                class="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 font-medium transition-colors text-xs">Eliminar</button>
                        </td>
                    </tr>
                    <tr v-if="usuarios.length === 0">
                        <td colspan="4" class="px-6 py-12 text-center">
                            <div class="text-gray-400 dark:text-gray-500">
                                <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a3 3 0 003-3v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2a3 3 0 003 3z">
                                    </path>
                                </svg>
                                <p class="text-sm">No hay usuarios registrados</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
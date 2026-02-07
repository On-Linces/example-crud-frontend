<script setup lang="ts">
import { useRoute } from 'vue-router'
import logo from '@/assets/logo.jpeg'

const route = useRoute()
</script>

<template>
    <header class="border-b" style="background-color: #282a36">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img :src="logo" alt="Logo" class="h-10 w-auto rounded">
                <h1 class="text-2xl font-bold text-white">CRUD</h1>
            </div>

            <nav class="flex gap-4">
                <router-link to="/productos" class="px-3 py-2 rounded font-medium transition-colors"
                    :class="route.name === 'productos' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'">
                    Productos
                </router-link>

                <router-link to="/usuarios" class="px-3 py-2 rounded font-medium transition-colors"
                    :class="route.name === 'usuarios' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'">
                    Usuarios
                </router-link>
            </nav>
        </div>
    </header>
</template>
import { createRouter, createWebHistory } from 'vue-router'
import ProductosPage from '@/pages/ProductosPage.vue'

// Definición de las rutas de la aplicación
const routes = [
    {
        // Ruta raíz redirige a la lista de productos
        path: '/',
        name: 'home',
        redirect: '/productos'
    },
    {
        // Ruta principal para la gestión de productos
        path: '/productos',
        name: 'productos',
        component: ProductosPage
    }
]

// Creación de la instancia del router
const router = createRouter({
    // Usamos createWebHistory para URLs limpias (sin #)
    history: createWebHistory(),
    routes
})

export default router

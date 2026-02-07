import { createRouter, createWebHistory } from 'vue-router'
import ProductosPage from '@/pages/ProductosPage.vue'
import UsuariosPage from '@/pages/UsuariosPage.vue'

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
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: UsuariosPage
    }
]

// Creación de la instancia del router
const router = createRouter({
    // Usamos createWebHistory para URLs limpias (sin #)
    history: createWebHistory(),
    routes
})

export default router

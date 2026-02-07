import { ref, onMounted } from 'vue'
import type { Producto, ProductoFormData } from '@/@types/producto'
import { productosApi } from '@/api/productos.api'

export function useProductos() {
    const productos = ref<Producto[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function cargarProductos() {
        loading.value = true
        error.value = null
        try {
            productos.value = await productosApi.getAll()
        } catch (e) {
            error.value = 'Error al cargar productos'
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    async function crearProducto(data: ProductoFormData) {
        loading.value = true
        error.value = null
        try {
            await productosApi.create(data)
            await cargarProductos()
            return true
        } catch (e) {
            error.value = 'Error al crear producto'
            console.error(e)
            return false
        } finally {
            loading.value = false
        }
    }

    async function actualizarProducto(id: number, data: ProductoFormData) {
        loading.value = true
        error.value = null
        try {
            await productosApi.update(id, data)
            await cargarProductos()
            return true
        } catch (e) {
            error.value = 'Error al actualizar producto'
            console.error(e)
            return false
        } finally {
            loading.value = false
        }
    }

    async function eliminarProducto(id: number) {
        if (!confirm('¿Está seguro de eliminar este producto?')) return false

        loading.value = true
        error.value = null
        try {
            await productosApi.delete(id)
            await cargarProductos()
            return true
        } catch (e) {
            error.value = 'Error al eliminar producto'
            console.error(e)
            return false
        } finally {
            loading.value = false
        }
    }

    onMounted(cargarProductos)

    return {
        productos,
        loading,
        error,
        cargarProductos,
        crearProducto,
        actualizarProducto,
        eliminarProducto
    }
}

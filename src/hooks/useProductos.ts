// Hook composable que centraliza toda la lógica de productos (CRUD).
// - Expone: productos (lista), loading (estado), error (mensaje) y funciones para operar (cargar, crear, actualizar, eliminar).
// - Diseñado para ser usado en componentes o páginas mediante: const { productos, cargarProductos } = useProductos()
import { ref, onMounted } from 'vue'
import type { Producto, ProductoFormData } from '@/@types/producto'
import { productosApi } from '@/api/productos.api'

export function useProductos() {
    // Lista reactiva de productos que se actualizará automáticamente en la UI
    const productos = ref<Producto[]>([])
    // Flag que indica si hay una operación de red en curso
    const loading = ref(false)
    // Mensaje de error (si ocurre), nulo cuando no hay error
    const error = ref<string | null>(null)

    // Carga la lista de productos desde la API y actualiza `productos` y `loading`/`error`
    async function cargarProductos() {
        loading.value = true
        error.value = null
        try {
            // Llamada al API que devuelve el arreglo de productos
            productos.value = await productosApi.getAll()
        } catch (e) {
            // Guardamos un mensaje de error legible para mostrar en la UI y log para debug
            error.value = 'Error al cargar productos'
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    // Crea un producto usando la API. Después refresca la lista. Devuelve true si fue exitoso.
    async function crearProducto(data: ProductoFormData) {
        loading.value = true
        error.value = null
        try {
            // POST al backend
            await productosApi.create(data)
            // Refrescar la lista para reflejar el nuevo elemento
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

    // Actualiza un producto por ID y refresca la lista. Retorna true si la actualización fue exitosa.
    async function actualizarProducto(id: number, data: ProductoFormData) {
        loading.value = true
        error.value = null
        try {
            // PUT al backend con id y datos
            await productosApi.update(id, data)
            // Refrescar para mostrar los cambios
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

    // Elimina un producto (confirmación local), luego refresca la lista. Retorna true si se eliminó correctamente.
    async function eliminarProducto(id: number) {
        // Confirmación simple en el cliente antes de llamar al backend
        if (!confirm('¿Está seguro de eliminar este producto?')) return false

        loading.value = true
        error.value = null
        try {
            await productosApi.delete(id)
            // Refrescar la lista para eliminar el elemento de la UI
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

// Hook composable que centraliza toda la lógica de productos (CRUD).
import { ref, onMounted } from 'vue'
import type { Usuario, UsuarioFormData } from '@/@types/usuario'
import { usuariosApi } from '@/api/usuarios.api'

export function useUsuarios() {
    // Lista reactiva de productos que se actualizará automáticamente en la UI
    const usuarios = ref<Usuario[]>([])

    // Flag que indica si hay una operación de red en curso
    const loading = ref(false)

    // Mensaje de error (si ocurre), nulo cuando no hay error
    const error = ref<string | null>(null)

    async function cargarUsuarios() {
        loading.value = true
        error.value = null

        try {
            // Llamada al API que devuelve el arreglo de productos
            usuarios.value = await usuariosApi.getAll()
        } catch (e) {
            // Guardamos un mensaje de error legible para mostrar en la UI y log para debug
            error.value = 'Error al cargar usuarios'
            console.error(e)
        } finally {
            loading.value = false
        }
    }

    async function crearUsuario(data: UsuarioFormData) {
        loading.value = true
        error.value = null

        try {
            // POST al backend
            await usuariosApi.create(data)
            // Refrescar la lista para reflejar el nuevo elemento
            await cargarUsuarios()
            return true
        } catch (e) {
            error.value = 'Error al crear usuario'
            console.error(e)
            return false
        } finally {
            loading.value = false
        }
    }

    async function actualizarUsuario(id: number, data: UsuarioFormData) {
        loading.value = true
        error.value = null
        try {
            // PUT al backend con id y datos
            await usuariosApi.update(id, data)
            // Refrescar para mostrar los cambios
            await cargarUsuarios()
            return true
        } catch (e) {
            error.value = 'Error al actualizar usuario'
            console.error(e)
            return false
        } finally {
            loading.value = false
        }
    }

    async function eliminarUsuario(id: number) {
        loading.value = true
        error.value = null

        try {
            // DELETE al backend
            await usuariosApi.delete(id)
            // Refrescar la lista para reflejar el cambio
            await cargarUsuarios()
            return true
        } catch (e) {
            error.value = 'Error al eliminar usuario'
            console.error(e)
            return false
        } finally {
            loading.value = false
        }
    }

    onMounted(cargarUsuarios)

    return {
        usuarios,
        loading,
        error,
        cargarUsuarios,
        crearUsuario,
        eliminarUsuario,
        actualizarUsuario
    }
}
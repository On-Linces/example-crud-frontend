import axios from 'axios'
import type { Usuario, UsuarioFormData } from '@/@types/usuario'

// Configuración de la instancia de Axios
// Se define la URL base desde las variables de entorno o un valor por defecto local
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5295/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Objeto que agrupa todas las llamadas API relacionadas con Usuarios
export const usuariosApi = {
    // GET: Obtener todos los usuarios del servidor
    async getAll(): Promise<Usuario[]> {
        const { data } = await api.get<Usuario[]>('/usuarios')
        return data
    },

    // GET: Obtener un usuario específico por su ID
    async getById(id: number): Promise<Usuario> {
        const { data } = await api.get<Usuario>(`/usuarios/${id}`)
        return data
    },

    // POST: Crear un nuevo usuario enviando los datos del formulario
    async create(usuario: UsuarioFormData): Promise<Usuario> {
        const { data } = await api.post<Usuario>('/usuarios', usuario)
        return data
    },

    // PUT: Actualizar un usuario existente
    // Se combina el ID y los datos del formulario para enviar el objeto completo
    async update(id: number, usuario: UsuarioFormData): Promise<void> {
        await api.put(`/usuarios/${id}`, { id, ...usuario })
    },

    // DELETE: Eliminar un usuario por su ID
    async delete(id: number): Promise<void> {
        await api.delete(`/usuarios/${id}`)
    }
}

// Exportar la instancia de axios por si se necesita configuración adicional en otro lugar
export { api }

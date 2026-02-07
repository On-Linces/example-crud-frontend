import axios from 'axios'
import type { Producto, ProductoFormData } from '@/@types/producto'

// Configuración de la instancia de Axios
// Se define la URL base desde las variables de entorno o un valor por defecto local
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Objeto que agrupa todas las llamadas API relacionadas con Productos
export const productosApi = {
    // GET: Obtener todos los productos del servidor
    async getAll(): Promise<Producto[]> {
        const { data } = await api.get<Producto[]>('/productos')
        return data
    },

    // GET: Obtener un producto específico por su ID
    async getById(id: number): Promise<Producto> {
        const { data } = await api.get<Producto>(`/productos/${id}`)
        return data
    },

    // POST: Crear un nuevo producto enviando los datos del formulario
    async create(producto: ProductoFormData): Promise<Producto> {
        const { data } = await api.post<Producto>('/productos', producto)
        return data
    },

    // PUT: Actualizar un producto existente
    // Se combina el ID y los datos del formulario para enviar el objeto completo
    async update(id: number, producto: ProductoFormData): Promise<void> {
        await api.put(`/productos/${id}`, { id, ...producto })
    },

    // DELETE: Eliminar un producto por su ID
    async delete(id: number): Promise<void> {
        await api.delete(`/productos/${id}`)
    }
}

// Exportar la instancia de axios por si se necesita configuración adicional en otro lugar
export { api }

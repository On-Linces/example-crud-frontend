// Tipos personalizados para Producto
export interface Usuario {
    id: number
    name: string
    email: string
}

// Tipo para los datos del formulario de creación/edición de producto (sin id)
export interface UsuarioFormData {
    name: string
    email: string
}

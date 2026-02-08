// Tipos personalizados para Producto
export interface Usuario {
    id: number
    nombre: string
    correo: string
}

// Tipo para los datos del formulario de creación/edición de producto (sin id)
export interface UsuarioFormData {
    nombre: string
    correo: string
}

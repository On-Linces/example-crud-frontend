// Tipos personalizados para Producto
export interface Producto {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

// Tipo para los datos del formulario de creación/edición de producto (sin id)
export interface ProductoFormData {
  nombre: string
  precio: number
  cantidad: number
}

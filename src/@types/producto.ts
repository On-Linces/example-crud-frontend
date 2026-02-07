// Tipos personalizados para Producto
export interface Producto {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

export interface ProductoFormData {
  nombre: string
  precio: number
  cantidad: number
}

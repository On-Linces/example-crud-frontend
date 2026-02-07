import type { ProductoFormData } from '@/@types/producto'

export interface ValidationError {
    field: string
    message: string
}

export function validateProducto(data: ProductoFormData): ValidationError[] {
    const errors: ValidationError[] = []

    if (!data.nombre || data.nombre.trim() === '') {
        errors.push({ field: 'nombre', message: 'El nombre es requerido' })
    } else if (data.nombre.length < 2) {
        errors.push({ field: 'nombre', message: 'El nombre debe tener al menos 2 caracteres' })
    }

    if (data.precio === undefined || data.precio === null) {
        errors.push({ field: 'precio', message: 'El precio es requerido' })
    } else if (data.precio < 0) {
        errors.push({ field: 'precio', message: 'El precio no puede ser negativo' })
    }

    if (data.cantidad === undefined || data.cantidad === null) {
        errors.push({ field: 'cantidad', message: 'La cantidad es requerida' })
    } else if (data.cantidad < 0) {
        errors.push({ field: 'cantidad', message: 'La cantidad no puede ser negativa' })
    } else if (!Number.isInteger(data.cantidad)) {
        errors.push({ field: 'cantidad', message: 'La cantidad debe ser un número entero' })
    }

    return errors
}

export function isValid(data: ProductoFormData): boolean {
    return validateProducto(data).length === 0
}

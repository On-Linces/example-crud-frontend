// Funciones de validación del formulario de Producto.
import type { UsuarioFormData } from '@/@types/usuario'

export interface ValidationError {
    field: string
    message: string
}

// Valida los datos del formulario de producto y devuelve un arreglo de errores (vacío si no hay errores)
export function validateUsuario(data: UsuarioFormData): ValidationError[] {
    const errors: ValidationError[] = []

    // Validación del campo "name"
    if (!data.name || data.name.trim() === '') {
        errors.push({ field: 'name', message: 'El nombre es requerido' })
    } else if (data.name.length < 2) {
        errors.push({ field: 'name', message: 'El nombre debe tener al menos 2 caracteres' })
    }

    // Validación del campo "email"
    if (!data.email || data.email.trim() === '') {
        errors.push({ field: 'email', message: 'El email es requerido' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push({ field: 'email', message: 'El email no es válido' })
    }

    return errors
}

// Retorna true si los datos del formulario son válidos (sin errores)
export function isValid(data: UsuarioFormData): boolean {
    return validateUsuario(data).length === 0
}

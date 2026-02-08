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
    if (!data.nombre || data.nombre.trim() === '') {
        errors.push({ field: 'nombre', message: 'El nombre es requerido' })
    } else if (data.nombre.length < 2) {
        errors.push({ field: 'nombre', message: 'El nombre debe tener al menos 2 caracteres' })
    }

    // Validación del campo "email"
    if (!data.correo || data.correo.trim() === '') {
        errors.push({ field: 'correo', message: 'El correo es requerido' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
        errors.push({ field: 'correo', message: 'El correo no es válido' })
    }

    return errors
}

// Retorna true si los datos del formulario son válidos (sin errores)
export function isValid(data: UsuarioFormData): boolean {
    return validateUsuario(data).length === 0
}

// Funciones utilitarias para formatear valores en la UI:
// - formatCurrency: formatea como moneda (MXN) para mostrar precios
// - formatNumber: formatea números con separadores de miles
// - formatDate: formatea fechas en español
// Úsalas en templates para mostrar valores consistentes

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(value)
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat('es-MX').format(value)
}

export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(d)
}

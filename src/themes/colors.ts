// Definición de colores para temas claro/oscuro

export const colors = {
    light: {
        primary: '#3498db',
        secondary: '#2ecc71',
        background: '#ffffff',
        surface: '#f5f5f5',
        text: '#333333',
        textSecondary: '#666666',
        border: '#dddddd',
        error: '#e74c3c',
        success: '#27ae60',
        warning: '#f39c12'
    },
    dark: {
        primary: '#5dade2',
        secondary: '#58d68d',
        background: '#1a1a2e',
        surface: '#16213e',
        text: '#ffffff',
        textSecondary: '#aaaaaa',
        border: '#333333',
        error: '#e74c3c',
        success: '#27ae60',
        warning: '#f39c12'
    }
}

export type Theme = 'light' | 'dark'
export type ColorScheme = typeof colors.light

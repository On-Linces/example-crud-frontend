// Crea la app Vue, configura el router y monta el componente raíz en #app.
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

// Crea la instancia de la aplicación Vue usando el componente raíz App
const app = createApp(App)

// Configura la aplicación para usar el enrutador (Vue Router)
app.use(router)

// Monta la aplicación en el elemento del DOM con id 'app' (definido en index.html)
app.mount('#app')

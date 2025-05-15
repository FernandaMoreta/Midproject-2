import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router) // Integrar el enrutador con la aplicación
    .mount('#app')

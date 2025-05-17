import { createApp } from 'vue'
import router from './router'
import {createPinia} from 'pinia'
import App from './App.vue'

createApp(App)
    .use(createPinia())
    .use(router) // Integrar el enrutador con la aplicación
    .mount('#app')

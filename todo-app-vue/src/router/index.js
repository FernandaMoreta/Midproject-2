//objetivo js: organizar las rutas dentro de la app 
import { createRouter, createWebHistory } from 'vue-router'
//registro
import Auth from '../pages/Auth.vue'
import signIn from '../components/SignIn.vue'
import signUp from '../components/SignUp.vue' 
//panel tareas
import Dashboard from '../pages/Dashboard.vue' 

const routes = [
    {path: '/autentication', component: Auth},
    { path: '/signin', component: signIn }, 
    { path: '/signup', component: signUp },
    { path: '/task', component: Dashboard }, 
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
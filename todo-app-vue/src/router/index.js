//objetivo js: organizar las rutas dentro de la app 
import { createRouter, createWebHistory } from 'vue-router'
//registro
import Home from '../pages/Home.vue'
import Auth from '../pages/Auth.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue' 
//panel tareas
import Dashboard from '../pages/Dashboard.vue' 

const routes = [
    {path: '/', component: Home },
    { path: '/autentication', component: Auth },
    { path: '/signin', component: SignIn }, 
    { path: '/signup', component: SignUp },
    { path: '/task', component: Dashboard }, 
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
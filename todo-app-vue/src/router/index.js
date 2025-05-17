import { createRouter, createWebHistory } from 'vue-router'
// Enrutador sirve para dirigir las páginas del navegador 
import signIn from '../components/SignIn.vue'
import signUp from '../components/SignUp.vue'

const routes = [
    {path: '/signIn', component: signIn},
    {path: '/signUp', component: signUp},
]

const router = createRouter ({
    history: createWebHistory(),
    routes,
})

export default router
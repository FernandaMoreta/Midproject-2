//objetivo js: organizar las rutas dentro de la app 
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
//autenticación
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue' 
//panel tareas
import Dashboard from '../pages/Dashboard.vue' 
// conexion con los datos de registro de supabase
import { supabase } from '../supabase'

const routes = [
    {path: '/', component: Home },
    { path: '/signin', component: SignIn }, 
    { path: '/signup', component: SignUp },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },//autorizacion para acceder
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

//Proteccion de rutas que solo se pueden acceder si el usuario esta identificado
router.beforeEach(async (to, from, next) => {
  const { data: { user } } = await supabase.auth.getUser()

  if (to.meta.requiresAuth && !user) {
    // Si la ruta requiere auth y NO hay usuario, redirige a la página de inicio
    next('/home')
  } else if ((to.path === '/signin' || to.path === '/') && user) {
    // Si está en signin o home y hay usuario, redirige a dashboard
    next('/dashboard')
  } else {
    next() // Deja pasar
  }
})

export default router
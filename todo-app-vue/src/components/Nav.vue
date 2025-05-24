
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const userEmail = ref('')
const isLoggedIn = ref(false)
//primero confirmamos si ha inciciado sesión o no, y luego mostramos el email del usuario
onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  isLoggedIn.value = !!data.session
  userEmail.value = data.session?.user?.email || ''

//cuando el estado de autenticación cambia, actualizamos las variables
  supabase.auth.onAuthStateChange((_event, session) => {
    isLoggedIn.value = !!session
    userEmail.value = session?.user?.email || ''
  })
})
// Función para cerrar sesión
const logout = async () => {
  await supabase.auth.signOut()
  router.push('/signin')
}
</script>




<template>
  <div nav-bar>
    <nav class="nav">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <!-- Solo se muestra si el usuario está logueado -->
            <li><router-link v-if="!isLoggedIn" to="/signin">Iniciar sesión</router-link></li>
            <li><router-link v-if="!isLoggedIn" to="/signup">Registrarse</router-link></li>
        </ul>
    

    <!-- Solo se muestra si el usuario está logueado -->
    <button v-if="isLoggedIn" @click="logout">Cerrar sesión</button>
    <h1 v-if="userEmail">Bienvenido {{ userEmail }}</h1>

  </nav>

  </div>
  
</template>

<style>

</style>
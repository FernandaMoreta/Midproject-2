
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'
import logo from '../assets/logo.png'

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
  <div class="nav-bar">
    <img :src="logo" alt="Logo" width="50" height="50">
    <nav class="nav" v-if="!isLoggedIn">
        <ul>
            <!-- Solo se muestra si el usuario no está logueado -->
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/signup">Registrarse</router-link></li>
            <li><router-link to="/signin">Iniciar sesión</router-link></li>
        </ul>
  
    </nav>
    <button v-if="isLoggedIn" @click="logout">Cerrar sesión</button>

  </div>
  
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.nav {
  display: flex;
}
.nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0;
}

.nav li {
  margin: 0;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}


.logged-in {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
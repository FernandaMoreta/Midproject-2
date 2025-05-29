
<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {useUserStore} from '../store/user.js'
import logo from '../assets/logo.png'

const router = useRouter()
const userStore = useUserStore()
const goToAuth = () => {
  router.push('/auth')
}
//primero confirmamos si ha inciciado sesión o no, y luego mostramos el email del usuario
onMounted(async () => {
  await userStore.fetchUser()
})

const isLoggedIn = computed(() => !!userStore.user)
const userEmail = computed(() => userStore.user?.email || '')

const logout = async () => {
  try {
    await userStore.signOut()
    router.push('/')
 } catch (error) {
    errorMessage.value = error.message
  }
}

</script>


<template>
  <div class="nav-bar">
    <img :src="logo" alt="Logo" width="50" height="50">
    <nav class="nav" v-if="!isLoggedIn">
        <ul>
            <!-- Solo se muestra si el usuario no está logueado -->
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/contactanos">Contáctanos!</router-link></li>
            <li><router-link to="/sobre-nosotros">Sobre Nosotros</router-link></li>
            <li v-if="!isLoggedIn.value"><router-link to="/signin">Iniciar sesión</router-link></li>
            <button @click="goToAuth" >Comienza Ya!</button>
          </ul>
    </nav>

    <div v-else class="logged-in">
      <span>Bienvenido, {{ userEmail }}</span>
      <button @click="logout">Cerrar sesión</button>
    </div>
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
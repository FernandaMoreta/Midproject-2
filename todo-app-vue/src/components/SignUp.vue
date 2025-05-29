<script setup>
// REGISTRARSE
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {useUserStore} from '../store/user.js'

const email = ref('')
const password = ref('')
const errorMessage = ref('') 
const router = useRouter()
const userStore = useUserStore()
const confirmPassword = ref('') 

const handleSingIn = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden'
    return
  }
  try {
    await userStore.signUp(email.value, password.value)
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="signup">
    <h2>Registrate</h2>
    <form @submit.prevent="handleSingIn">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Contraseña" v-model="password" />
      <input type="password" placeholder="Confirmar Contraseña" v-model="confirmPassword" />
      <p>¿Ya tienes cuenta? <router-link to="/signin">Inicia sesión</router-link></p>
      <button type="submit">Registrate</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
    </form>
  </div>
</template>

<style>

</style>
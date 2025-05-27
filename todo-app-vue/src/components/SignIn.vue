
<script setup>
// Este componente permite a los usuarios iniciar sesión en la aplicación
import { ref } from 'vue'
import { supabase } from '../supabase.js'
import { useRouter } from 'vue-router'
// iteración entre el usuario y la base de datos de supabase
const email = ref('')
const password = ref('')
const errorMessage = ref('') 
const router = useRouter()

const login = async () => {
  errorMessage.value = '' // Reiniciar el mensaje de error
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    errorMessage.value = error.message 
  } else {
    router.push('/')
}
}
</script>

<template>
  <div class="signin">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Contraseña" v-model="password" />
      <button type="submit">Entrar</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p> 
      <p>¿No tienes cuenta? <router-link to="/signup">Regístrate</router-link></p>
    </form>
  </div>
</template>

<style>

</style>
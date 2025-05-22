<script setup>
// REGISTRARSE
// Este componente permite a los usuarios Registrarse en la aplicación.
import { ref } from 'vue'
import { supabase } from '../supabase.js'
import { useRouter } from 'vue-router'
// iteracíon entre el usuario y la base de datos de supabase
const user = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('') // Variable para almacenar el mensaje de error
const router = useRouter()

const signUp = async () => {
  errorMessage.value = '' // Reiniciar el mensaje de error
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: user.value
      }
    }
  })
  if (error) {
    errorMessage.value = 'Error al registrarse' // Mostrar el mensaje de error
  } else {
    alert('Registro exitoso!') 
    router.push('/')
}
}
</script>

<template>
  <div class="signup">
    <h2>Registrate</h2>
    <form @submit.prevent="signUp">
      <input type="text" placeholder="Nombre de usuario" v-model="user" />
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Contraseña" v-model="password" />
      <button type="submit">Registrate</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
    </form>
  </div>
</template>

<style>

</style>
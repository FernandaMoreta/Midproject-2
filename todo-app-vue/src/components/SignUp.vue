<script setup>
// REGISTRARSE
import { ref } from 'vue'
import { supabase } from '../supabase.js'
import { useRouter } from 'vue-router'
// iteracíon entre el usuario y la base de datos de supabase
const email = ref('')
const password = ref('')
const errorMessage = ref('') 
const router = useRouter()

const signUp = async () => {
  errorMessage.value = '' 
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,

  })
  if (error) {
    errorMessage.value = 'Error al registrarse' 
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
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Contraseña" v-model="password" />
      <button type="submit">Registrate</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
    </form>
  </div>
</template>

<style>

</style>
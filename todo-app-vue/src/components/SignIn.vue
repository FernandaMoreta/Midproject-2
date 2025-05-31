
<script setup>
// Este componente permite a los usuarios iniciar sesión en la aplicación
import { ref } from 'vue'
import {useRouter } from 'vue-router'
import {useUserStore} from '../store/user.js'
// iteración entre el usuario y la base de datos de supabase
const email = ref('')
const password = ref('')
const errorMessage = ref('') 
const router = useRouter()
const userStore = useUserStore()

const handleLogin = async () => {
  try {
    await userStore.signIn(email.value, password.value)
    router.push('/dashboard') // Redirigir al dashboard después de iniciar sesión
  } catch (error) {
    errorMessage.value = error.message
  }
}

</script>

<template>
  <div class="signin">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Contraseña" v-model="password" />
      <button type="submit">Entrar</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p> 
      <p>¿No tienes cuenta? <router-link to="/auth">Regístrate</router-link></p>
    </form>
  </div>
</template>

<style scoped>
.signin {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.signin form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.signin h2 {
  padding-bottom: 20px;
  text-align: center;
}

.signin input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.signin p {
  margin: 10px 0;
}
.error {
  color: red;
  font-size: 0.9em;
}


button {
  width: 100%;
 
}

</style>
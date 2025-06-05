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
    router.push('/dashboard') 
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="signup">
    <h3>Registrate para continuar!</h3>
    <form @submit.prevent="handleSingIn">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Contraseña" v-model="password" />
      <input type="password" placeholder="Confirmar Contraseña" v-model="confirmPassword" />
      <button type="submit">Registrate</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
    </form>
  </div>
</template>

<style scoped>
.signup {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:10px
}
.signup h3 {
  margin-bottom: 10px;
}
.signup form {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.signup input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.signup p {
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
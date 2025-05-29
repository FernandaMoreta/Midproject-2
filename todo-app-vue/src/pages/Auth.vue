
<script setup>
import { ref } from 'vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'

</script>

<!--Page que centraliza los formularios de inicio y registro (Con la idea de hacer una ventana flotante en el futuro)-->
<template>
  <div class="auth">
    <h1>Únete!</h1>
    <router-link to="/signin" class="btn-auth">Iniciar sesión</router-link>
    <router-link to="/signup" class="btn-auth">Registrarse</router-link>
   
  </div>
</template>


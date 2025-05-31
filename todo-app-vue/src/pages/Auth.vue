
<script setup>
import { ref } from 'vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'

</script>

<!--Page que centraliza los formularios de inicio y registro (Con la idea de hacer una ventana flotante en el futuro)-->
<template>
  <div class="auth">
    <div class= "container">
      <div class= "title">
        <h1>ToDo App</h1>
        <h3>Regístrate para continuar</h3>
      </div>
      <SignUp />
    </div>
  </div>
</template>

<style scoped>
.auth {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>


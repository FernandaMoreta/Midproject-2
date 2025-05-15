<template>
  <div>
    <h2>Iniciar sesión</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="login">Entrar</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
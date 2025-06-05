<script setup>
</script>

<template>
  <div class="not-found">
    <div class="container">
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <router-link to="/">Volver al inicio</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  text-align: center;
  padding: 20px;
}
</style>
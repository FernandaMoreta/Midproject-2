<template>
  <div id="app">
    <h1>To do App prueba</h1>
    <button @click="$router.push('/signin')">Iniciar sesión</button>
    <button @click="$router.push('/signup')">Registrarse</button> 
    <button @click="$router.push('/task')">Tareas</button>
    <router-view></router-view>
  </div>
  
</template>
<script>
export default {


}
</script>

<style>

</style>
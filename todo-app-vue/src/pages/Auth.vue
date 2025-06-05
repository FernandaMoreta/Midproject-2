<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'


const route = useRoute()
const router = useRouter()

// Computa si la ruta actual es '/signup'
const isSignUp = computed(() => route.path.endsWith('/signup'))

// Cambia entre rutas /signup y /signin
const toggleForm = () => {
  router.push(isSignUp.value ? '/auth/signin' : '/auth/signup')
}
</script>

<template>
  <div class="auth">
    <div class="container">
      <div class="title">
        <h1>ToDo App</h1>
        <router-view />
      </div>

      <div class="switch">
        <p v-if="isSignUp">¿Ya tienes cuenta?</p>
        <p v-else>¿No tienes cuenta?</p>
        <button @click="toggleForm">
          {{ isSignUp ? 'Inicia sesión' : 'Regístrate' }}
        </button>
      </div>
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
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.switch {
  margin-top: 20px;
  text-align: center;
}
.switch p {
  padding-bottom: 10px;
}

</style>
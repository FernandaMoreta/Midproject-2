

<script setup>
import TaskItem from '../components/TaskItem.vue'
import { useTaskStore } from '../store/task.js'
import { computed, onMounted } from 'vue'

const taskStore = useTaskStore()
// Almacena las tareas en el store
onMounted(() => taskStore.fetchTasks())

// COMPUTED propiedad para acceder a las tareas del store automáticamente
const tasks = computed(() => taskStore.tasks)
const userEmail = computed(() => taskStore.userEmail)
</script>

<!--Dashboard de la aplicación, donde se muestran las tareas.-->
<template>
  <div class="dashboard">
    <p>Bienvenido, <br> {{ userEmail }}</p>
    <TaskItem />
  </div>
</template>

<style scoped>
.dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dashboard p  {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
</style>


<script setup>
import TaskItem from '../components/TaskItem.vue'
import { useTaskStore } from '../store/task.js'
import { computed, onMounted } from 'vue'

const taskStore = useTaskStore()
// Almacena las tareas en el store
onMounted(() => taskStore.fetchTasks())

// COMPUTED propiedad para acceder a las tareas del store automáticamente
const tasks = computed(() => taskStore.tasks)
</script>

<!--Dashboard de la aplicación, donde se muestran las tareas.-->
<template>
  <div class="dashboard">
    <TaskItem />
  </div>
</template>

<style scoped>
.dashboard {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
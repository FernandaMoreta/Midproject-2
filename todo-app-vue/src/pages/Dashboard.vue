<!--Dashboard de la aplicación, donde se muestran las tareas.-->
<template>
  <div>
    <TaskItem />
  </div>
</template>

<script setup>
import TaskItem from '../components/TaskItem.vue'
import { useTaskStore } from '../store/task.js'
import { computed, onMounted } from 'vue'

const taskStore = useTaskStore()
// Almacena las tareas en el store
onMounted(() => taskStore.fetchTasks())

// Creamos una propiedad computada con el objetvio de actualizar automáticamente las tareas cuando se interactua con ellas
const tasks = computed(() => taskStore.tasks)
</script>
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

// Creamos una propiedad computada para acceder a las tareas reactivamente que permite que la vista se actualice automáticamente cuando cambian las tareas
const tasks = computed(() => taskStore.tasks)
</script>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '../store/task.js'

const taskStore = useTaskStore()
const newTask = ref('')

const add = () => {
  if (newTask.value.trim() !== '') {
    taskStore.addTask(newTask.value)
    newTask.value = ''
  }
}

const toggle = (task) => {
  taskStore.toggleTask(task)
}

const remove = (id) => {
  taskStore.deleteTask(id)
}
// Almacena las tareas en el task store
onMounted(() => {
  taskStore.fetchTasks()
})

const tasks = computed(() => taskStore.tasks)
</script>

<template>
  <div>
    <h2>Mi lista de tareas</h2>
    <form @submit.prevent="add">
      <input v-model="newTask" placeholder="Nueva tarea" />
      <button type="submit">Agregar</button>
    </form>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" :checked="task.completed" @change="toggle(task)" />
        <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
          {{ task.title }}
        </span>
        <button @click="remove(task.id)">borrar</button>
      </li>
    </ul>
  </div>
</template>


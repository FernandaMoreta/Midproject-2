<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '../store/task.js'

const taskStore = useTaskStore()
const newTask = ref('')

const add = () => {
  if (newTask.value.trim() !== '') {
    taskStore.addTask({
      title: newTask.value,
      completed: false,
      inProgress: false
    })
    newTask.value = '' // Limpiar el campo de entrada después de agregar la tarea
  }
}

const toggle = (task) => {
  taskStore.toggleTask(task)
}
const deleteTask = (taskId) => {
  taskStore.deleteTask(taskId)
}
const setInProgress = (task) => {
  taskStore.setInProgress(task)
}
const completeTask = (task) => {
  taskStore.completeTask(task)
}
// Almacena las tareas en el task store
onMounted(() => {
  taskStore.fetchTasks()
})

const tasks = computed(() => taskStore.tasks)
</script>

<template>
  <div class="kanban-board">
    <form class="add-task" @submit.prevent="add">
      <input v-model="newTask" placeholder="Nueva tarea" />
      <button type="submit">Agregar</button>
    </form>

    <div class="columns">
      <div class="column">
        <h3>Pendientes</h3>
        <div v-for="task in tasks.filter(t => !t.completed && !t.inProgress)" :key="task.id" class="task-card">
          {{ task.title }}
          <button @click="setInProgress(task)">↪ En progreso</button>
        </div>
      </div>

      <div class="column">
        <h3>En Progreso</h3>
        <div v-for="task in tasks.filter(t => t.inProgress && !t.completed)" :key="task.id" class="task-card">
          {{ task.title }}
          <button @click="completeTask(task)">✅ Completar</button>
        </div>
      </div>

      <div class="column">
        <h3>Completadas</h3>
        <div v-for="task in tasks.filter(t => t.completed)" :key="task.id" class="task-card completed">
          {{ task.title }}
          <button @click="deleteTask(task.id)">🗑 Borrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  font-family: sans-serif;
}

.add-task {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.add-task input {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 300px;
}

.add-task button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.columns {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.column {
  flex: 1;
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  min-height: 300px;
}

.column h3 {
  text-align: center;
  margin-bottom: 1rem;
}

.task-card {
  background: white;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-card button {
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: #eee;
}

.task-card.completed {
  background-color: #d4edda;
  text-decoration: line-through;
}
</style>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '../store/task.js'

const taskStore = useTaskStore()
const newTask = ref('')

const add = () => {
  if (newTask.value.trim() !== '') {
    console.log('Agregando tarea con título:', newTask.value)
    taskStore.addTask({
      title: newTask.value,
      completed: false,
      in_progress: false,
    })
    newTask.value = '' // Limpiar input
  }
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
        <div v-for="task in tasks.filter(t => !t.completed && !t.in_progress)" :key="task.id" class="task-card pending">
          <p>{{ task.title }}</p>
          <div class="buttons">
            <button @click="setInProgress(task)">↪ En progreso</button>
            <button @click="deleteTask(task.id)">🗑 Borrar</button>
          </div>
        </div>
      </div>

      <div class="column">
        <h3>En Progreso</h3>
        <div v-for="task in tasks.filter(t => t.in_progress && !t.completed)" :key="task.id" class="task-card in-progress">
          <p>{{ task.title }}</p>
          <div class="buttons">
            <button @click="completeTask(task)">✅ Completar</button>
            <button @click="deleteTask(task.id)">🗑 Borrar</button>
          </div>
        </div>
      </div>

      <div class="column">
        <h3>Completadas</h3>
        <div v-for="task in tasks.filter(t => t.completed)" :key="task.id" class="task-card completed">
          <p>{{ task.title }}</p>
          <div class="buttons"></div>
            <button @click="deleteTask(task.id)">🗑 Borrar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.kanban-board {
  padding: 2rem;
  margin: 1rem;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  overflow: scroll;
  background-color: rgb(0, 0, 0);

}


.add-task {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.add-task input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.add-task button {
 background-color: aliceblue;
 color: black;
}

.columns {
  max-height: 900px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  overflow-y: auto;
}

.column {
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.column h3 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
}
.task-card button {
 width: 90px;
 height: 30px;

}
.task-card {
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
}
.task-card p {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  text-transform: capitalize;
}
.buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.task-card.pending {
  background-color: #5bc0de;
}
.task-card.in-progress {

  background-color: #e7e982;
}

.task-card.completed {
  background-color:#5cb85c;
  text-decoration: line-through;
}
</style>
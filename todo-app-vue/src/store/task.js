//Js de vinculación entre la tabla "tasks" de supabase y la interacción en la app de cada ususario que esta autenticado
import { defineStore } from 'pinia'
import { supabase } from '../supabase.js'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    userEmail: null
  }),
  actions: {
    async fetchTasks() {
      const { data: userData } = await supabase.auth.getUser()
      if (userData && userData.user.email){
        this.userEmail = userData.user.email
      }
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, completed, in_progress, user_id, created_at')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error al obtener tareas:', error)
      } else {
        console.log('Tareas actualizadas:', data)
        this.tasks = data || []
      }
    },

    async addTask(taskData) {
      console.log('addTask recibido:', taskData)
      if (typeof taskData.title !== 'string') {
        console.warn('El título de la tarea no es string:', taskData.title)
        // Aquí forzamos que sea string para evitar problemas
        taskData.title = String(taskData.title)
      }
      const { data: userData } = await supabase.auth.getUser()
      const { data, error } = await supabase.from('tasks').insert([
        {
          title: taskData.title,
          completed: taskData.completed,
          in_progress: taskData.in_progress,
          user_id: userData.user.id,
        },
      ]).select()

      if (error) {
        console.error('Error al agregar tarea:', error)
        alert('No se pudo agregar la tarea: ' + error.message)
      } else {
        this.tasks.push(...data)
      }
    },

    async deleteTask(id) {
      const { error } = await supabase.from('tasks').delete().eq('id', id)

      if (error) {
        console.error('Error al borrar tarea:', error)
        alert('No se pudo borrar la tarea: ' + error.message)
      } else {
        this.tasks = this.tasks.filter(task => task.id !== id)
      }
    },

    async setInProgress(task) {
      console.log('setInProgress recibido:', task.id)

      const { error } = await supabase
        .from('tasks')
        .update({ in_progress: true })
        .eq('id', task.id)

      if (error) {
        console.error('Error al actualizar tarea:', error)
        alert('No se pudo actualizar la tarea: ' + error.message)
      } else {
        console.log('Tarea actualizada a in_progress:')

        const currentTask = this.tasks.find(t => t.id === task.id)

        if (currentTask) {
          currentTask.in_progress = true;
        }
      }
    },

    async completeTask(task) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed: true, in_progress: false })
        .eq('id', task.id)
        .select('*')
      if (error) {
        console.error('Error al completar tarea:', error)
        alert('No se pudo completar la tarea: ' + error.message)
      } else {
        console.log('Tarea completada:', data)
        const currentTask = this.tasks.find(t => t.id === task.id)

        if (currentTask) {
          currentTask.completed = true;
        }
      }
    },
  },
})

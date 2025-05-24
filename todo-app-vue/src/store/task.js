//Js de vinculación entre la tabla "tasks" de supabase y la interacción en la app de cada ususario que esta autenticado
import { defineStore } from 'pinia'
import { supabase } from '../supabase.js'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: { // OBJETIVO eventos con los que puede interactuar el usuario con las tareas
    //fetchTasks registro del historial de la interación del usuario con las tareas
    async fetchTasks() {
      const {data: userData} = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, completed, created_at')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false })
    if (error) {
        console.error('Error al obtener tareas, error')
    }
      this.tasks = data || []
    },
    async addTask(title) {
        const { data: userData } = await supabase.auth.getUser()
        const { error } = await supabase.from('tasks').insert([
        {
        title,
        completed: false,
        user_id: userData.user.id
      }
    ])
      if (error) {
        console.error('Error al agregar tarea:', error)
        alert('No se pudo agregar la tarea: ' + error.message)
      } else {
        this.fetchTasks()
      }
    },
    //uso del toggle para marcar las tareas como completadas o no
    async toggleTask(task) {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', task.id)

      if (error) {
        console.error('Error al actualizar tarea:', error)
        alert('No se pudo actualizar la tarea: ' + error.message)
      } else {
        this.fetchTasks()
      }
    },

    async deleteTask(id) {
      const { error } = await supabase.from('tasks').delete().eq('id', id)

      if (error) {
        console.error('Error al borrar tarea:', error)
        alert('No se pudo borrar la tarea: ' + error.message)
      } else {
        this.fetchTasks()
      }
    }
  }
})
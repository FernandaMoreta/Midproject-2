//JS donde se almacena toda las información que puede hacer el usuario en la app gestionado por Pinia
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        //evita que supabase traiga la info del usuario antes de que haya iniciado sesion
      if (sessionError) throw sessionError
      if (!sessionData.session) {
        this.user = null
        return
      }

      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      this.user = userData.user
    },

    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error
      this.user = data.user
    },

    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) throw error
      this.user = data.user
    },

    async signOut() {
      const { error } = await supabase.auth.signOut()

      if (error) throw error
      this.user = null
    },
  },
//Conservación de los datos del usuario 
  persist: {
    enabled: true, // Permite la resistencia de los datos del usuario
    strategies: [
      {
        key: 'user',
        storage: localStorage,
      },
    ],
  },
})
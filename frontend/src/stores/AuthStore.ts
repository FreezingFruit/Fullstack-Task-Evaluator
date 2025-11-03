import { authApi } from '@/api/authApi'
import type { User } from '@/types/User'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register(registerData: { email: string; password: string }) {
      return await authApi.register(registerData)
    },

    async login(loginData: { email: string; password: string }) {
      const response = await authApi.login(loginData)
      this.token = response.token
      this.user = response.user

      localStorage.setItem('token', response.token)

      return response
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
  },
})

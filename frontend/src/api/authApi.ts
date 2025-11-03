import type { AuthResponse } from '@/types/Auth'
import axios from 'axios'

const url = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: url,
})

//AUTH FRONTEND API ENDPOINTS
export const authApi = {
  async login(loginData: { email: string; password: string }): Promise<AuthResponse> {
    const response = await api.post('/auth/login', loginData)
    return response.data
  },

  async register(registerData: { email: string; password: string }): Promise<AuthResponse> {
    const response = await api.post('/auth/register', registerData)
    return response.data
  },
}

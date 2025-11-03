import axios from 'axios'

const url = 'http://localhost:3000/api'
const api = axios.create({ baseURL: url })

//TOKEN CHECKING FOR JWT BACKEND
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

//TASK API FRONTEND ENDPOINT
export const taskApi = {
  async getTasks() {
    const response = await api.get('/tasks')
    return response.data
  },

  async createTasks(title: string) {
    const response = await api.post('/tasks', { title })
    return response.data
  },

  async updateTask(id: string, updates: { isDone?: boolean; title?: string }) {
    const response = await api.put(`/tasks/${id}`, updates)
    return response.data
  },

  async deleteTask(id: string) {
    await api.delete(`/tasks/${id}`)
  },
}

import { taskApi } from '@/api/taskApi'
import type { Task } from '@/types/Task'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    async fetchTask() {
      const tasks = await taskApi.getTasks()
      this.tasks = tasks
      return tasks
    },

    async createTask(title: string) {
      const newTask = await taskApi.createTasks(title)
      this.tasks.push(newTask)
      return newTask
    },

    async updateTask(id: string, updates: { isDone?: boolean; title?: string }) {
      const updatedTask = await taskApi.updateTask(id, updates)
      const index = this.tasks.findIndex((task) => task._id === id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
      return updatedTask
    },

    async deleteTask(id: string) {
      await taskApi.deleteTask(id)
      this.tasks = this.tasks.filter((task) => task._id !== id)
    },
  },
})

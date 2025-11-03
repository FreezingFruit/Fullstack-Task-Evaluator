import type { Task } from '@/types/Task'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
  }),
})

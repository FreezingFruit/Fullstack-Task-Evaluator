<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Tasks</h1>

        <el-button @click="handleLogout" type="danger" plain> Logout </el-button>
      </div>

      <!-- Add Task Form -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <el-form @submit.prevent="addTask" class="flex gap-4">
          <el-input v-model="newTaskTitle" placeholder="Enter task title?" class="flex-1" />
          <el-button type="primary" native-type="submit" :disabled="!newTaskTitle.trim()">
            Add Task
          </el-button>
        </el-form>
      </div>

      <!-- Tasks List -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <el-table :data="taskStore.tasks">
          <el-table-column prop="title" label="Task">
            <template #default="scope">
              <span
                :class="{ 'line-through text-gray-400': scope.row.isDone }"
                class="cursor-pointer"
                @click="toggleTask(scope.row._id, !scope.row.isDone)"
              >
                {{ scope.row.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="isDone" label="Status" width="120">
            <template #default="scope">
              <el-button
                @click="toggleTask(scope.row._id, !scope.row.isDone)"
                :type="scope.row.isDone ? 'success' : 'warning'"
                size="small"
              >
                {{ scope.row.isDone ? 'Done' : 'Pending' }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column label="Actions" width="120">
            <template #default="scope">
              <el-button @click="deleteTask(scope.row._id)" type="danger" size="small" link>
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- Empty State -->
        <div v-if="taskStore.tasks.length === 0" class="text-center py-8 text-gray-500">
          No tasks yet. Add your first task above!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/TaskStore'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const taskStore = useTaskStore()
const authStore = useAuthStore()
const router = useRouter()
const newTaskTitle = ref('')

onMounted(async () => {
  try {
    await taskStore.fetchTask()
  } catch (error) {
    console.error('Failed to load tasks:', error)
  } finally {
  }
})

const addTask = async () => {
  if (!newTaskTitle.value.trim()) return

  try {
    await taskStore.createTask(newTaskTitle.value)
    newTaskTitle.value = ''
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}

const toggleTask = async (id: string, isDone: boolean) => {
  try {
    await taskStore.updateTask(id, { isDone })
  } catch (error) {
    console.error('Failed to update task:', error)
  }
}

const deleteTask = async (id: string) => {
  try {
    await taskStore.deleteTask(id)
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>

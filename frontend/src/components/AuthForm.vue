<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
          {{ mode === 'login' ? 'Sign in to your account' : 'Create your account' }}
        </h2>
      </div>

      <el-form :model="form" @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <el-input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            required
            class="w-full"
            show-password
          />
        </div>

        <div class="flex flex-col space-y-4">
          <el-button native-type="submit" type="primary" class="w-full py-3">
            {{ mode === 'login' ? 'Sign in' : 'Register' }}
          </el-button>

          <button
            type="button"
            @click="switchMode"
            class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {{
              mode === 'login'
                ? 'Need an account? Register here'
                : 'Already have an account? Sign in here'
            }}
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const props = defineProps<{ mode: 'login' | 'register' }>()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const switchMode = () => {
  if (props.mode === 'login') {
    router.push('/register')
  } else {
    router.push('/login')
  }
}

const handleSubmit = async () => {
  try {
    if (props.mode === 'login') {
      await authStore.login(form)
      router.push('/tasks')
    } else {
      await authStore.register(form)
      router.push('/login')
    }
  } catch (error) {
    console.log('Something went wrong', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
          {{ mode === 'login' ? 'Sign in to your account' : 'Create your account' }}
        </h2>
      </div>

      <el-form
        ref="formRef"
        :rules="rules"
        :model="form"
        @submit.prevent="handleSubmit"
        class="mt-8 space-y-6"
      >
        <el-form-item prop="email">
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
        </el-form-item>

        <el-form-item prop="password">
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
        </el-form-item>

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
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{ mode: 'login' | 'register' }>()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

//FORM VALIDATION FOR EMAIL AND PASSWORD
const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
})

const switchMode = () => {
  if (props.mode === 'login') {
    router.push('/register')
  } else {
    router.push('/login')
  }
}

const handleSubmit = async () => {
  //FORM RULES CHECK
  if (!formRef.value) return
  const isValid = await formRef.value.validate()
  if (!isValid) return

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

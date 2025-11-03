<template>
  <section id="form">
    <el-form :model="form" label-width="auto" label-position="top" @submit.prevent="handleSubmit">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Enter your email" required />
      </el-form-item>

      <el-form-item label="Password" prop="email">
        <el-input v-model="form.password" placeholder="Enter your password" required />
      </el-form-item>
      <el-button>{{ props.mode === 'login' ? 'Register' : 'SignIn' }}</el-button>
      <el-button native-type="submit">Submit</el-button>
    </el-form>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import { reactive } from 'vue'

const props = defineProps<{ mode: 'login' | 'register' }>()

const form = reactive({
  email: '',
  password: '',
})
const authStore = useAuthStore()

//HANDLE FORM SUBMISSION
const handleSubmit = () => {
  try {
    if (props.mode === 'login') {
      authStore.login(form)
    } else {
      authStore.register(form)
    }
  } catch (error) {
    console.log('Something went wrong', error)
  }
}
</script>

<style scoped></style>

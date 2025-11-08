<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    
    <img src="/icon.png" class="w-32 h-32">

    <h1 class="font-bold text-2xl text-primary)">
      Tales of Emberreach
    </h1>
    <p v-if="success" class="text-amber-500">Registration successful, let's login!</p>
    <UInput v-model="email" placeholder="EMail"/>
    <UInput v-if="createAccount" v-model="username" placeholder="Username"/>
    <UInput v-model="password" placeholder="Password" type="password"/>
    <UInput v-if="createAccount" v-model="passwordConfirm" placeholder="Confirm Password" type="password"/>
    <p v-if="error" class="text-red-400">{{ error }}</p>
    <div class="flex items-center gap-2">
      
      <UButton
        v-if="!createAccount"
        label="Login"
        icon="i-lucide-pickaxe"
        class="grow"
        @click="onLogin"
      />

      <UButton
        v-if="createAccount"
        color="neutral"
        variant="outline"
        icon="i-lucide-arrow-left"
        class="grow"
        @click="createAccount = false"
      />

      <UButton
        v-if="!createAccount && !success"
        label="Register"
        color="neutral"
        variant="outline"
        icon="i-lucide-swords"
        class="grow"
        @click="createAccount = true"
      />

      <UButton
        v-if="createAccount"
        label="Create Account"
        color="primary"
        icon="i-lucide-swords"
        class="grow"
        @click="onRegister"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const { register, login } = useAuth()

const createAccount = ref(false);

const email = ref("")
const username = ref("")
const password = ref("")
const passwordConfirm = ref("")

const error = ref('')
const success = ref(false)


async function onRegister() {
  if (password.value !== passwordConfirm.value) {
    error.value = "Inconsistent passwords"
    return
  }

  if (email.value === "" || username.value === "" || password.value === "") {
    error.value = "Please fill all fields"
    return
  }

  try {
    await register({
      email: email.value,
      username: username.value,
      password: password.value    
    })
    success.value = true
    createAccount.value = false
    error.value = ""
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Registration failed.'
  }
}

async function onLogin() {
  try {
    await login({
      identifier: email.value, 
      password: password.value
    })
    navigateTo('/character')
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Login failed.'
  }
}


</script>
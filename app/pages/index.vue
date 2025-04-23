<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    
    <img src="/icon.png" class="w-32 h-32" />

    <h1 class="font-bold text-2xl text-(--ui-primary)">
      Tales of Emberreach
    </h1>
    <UInput v-model="email" placeholder="EMail"/>
    <UInput v-model="password" placeholder="Password" type="password"/>
    <div class="flex items-center gap-2">
      
      <UButton
        label="Login"
        icon="i-lucide-pickaxe"
      />

      <UButton
        label="Register"
        color="neutral"
        variant="outline"
        icon="i-lucide-swords"
      />
    </div>
  </div>
</template>
<script setup lang="ts">

const email = ref("")
const password = ref("")

</script>
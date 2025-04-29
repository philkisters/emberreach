<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Welcome {{ session?.username }}!</h1>

    <p class="mb-2">Manage your characters:</p>
    <!-- Hier kannst du später Charakter Auswahl und Erstellung einbauen -->
  </div>
</template>
<script setup lang="ts">
const { session } = useSession()
</script>


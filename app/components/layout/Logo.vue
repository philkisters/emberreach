<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <img src="/icon.png" class="w-32 h-32">

    <h1 v-if="useTitle" class="font-bold text-2xl text--primary">
      Tales of Emberreach
    </h1>
  </div>
</template>

<script setup lang="ts">
const {useTitle} = defineProps({
  useTitle: {
    type: Boolean,
    default: true
  }
})
</script>
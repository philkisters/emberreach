<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen p-6">
    <Logo :use-title="false" />
    <h1 class="text-2xl font-bold mb-4 text-(--ui-primary)">Welcome {{ session?.username }}!</h1>

    <div class="p-4 bg-amber-900 flex flex-col gap-4 items-center">
      <CharacterCard v-for="character in characters" :character="character" :add="false" :locked="false"/>
      <CharacterCard v-if="numberOfCharacters < 2" :character="null" :add="true" :locked="false" />
      <CharacterCard v-if="numberOfCharacters < 3" :character="null" :add="false" :locked="true" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CharacterDTO } from '~~/types/character';
const { session } = useSession()

const { data: characters, pending, error } = await useFetch<CharacterDTO[]>('/api/character/list')

const numberOfCharacters = computed(() => characters.value?.length ?? 0)

</script>


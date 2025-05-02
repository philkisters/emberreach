<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen p-6">
    <Logo :use-title="false" />
    <h1 class="text-2xl font-bold mb-4 text-(--ui-primary)">{{ !showCharacterCreation ? `Greetings ${session?.username}` : `Create new character` }}!</h1>

    <div class="p-4 bg-amber-900 flex flex-col gap-4 items-center" v-if="!showCharacterCreation">
      <CharacterCard v-for="character in characters" :character="character" :add="false" :locked="false"/>
      <CharacterCard v-if="numberOfCharacters < 2" :character="null" :add="true" :locked="false" @create="showCharacterCreation = true" />
      <CharacterCard v-if="numberOfCharacters < 3" :character="null" :add="false" :locked="true" />
    </div>
    <div class="p-4 bg-amber-900 flex flex-col gap-4 items-center" v-if="showCharacterCreation">
      <div class="text-2xl text-(--ui-primary)">
        Create Character
      </div>
      <UInput v-model="characterName" placeholder="Charactername" />
      <div class="text-2xl text-(--ui-primary)">
        Create Settlement
      </div>
      <UInput v-model="settlementName" placeholder="Settlementname" />
      <div class="text-xl text-(--ui-primary)">
        Position
      </div>
      <div class="flex flex-row gap-2">
        <UInput v-model="settlementLatitude" placeholder="Latitude" />
        <UInput v-model="settlementLongitude" placeholder="Longitude" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CharacterDTO } from '~~/types/character';
const { session } = useSession()

const { data: characters, pending, error } = await useFetch<CharacterDTO[]>('/api/character/list')

const numberOfCharacters = computed(() => characters.value?.length ?? 0)

const showCharacterCreation = ref(false)

const characterName= ref("")
const settlementName= ref("")
const settlementLatitude= ref("")
const settlementLongitude= ref("")

</script>


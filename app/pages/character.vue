<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen p-6">
    <LayoutLogo :use-title="false" />
    <h1 class="text-2xl font-bold text-primary">{{ `Greetings ${session?.username}`}}</h1>
    <h2 class="text-xl font-bold mb-4 text-primary text-center">{{ subheading }}</h2>

    <div 
      v-if="!showCharacterCreation && !showSettlementCreation"
      class="p-4 bg-amber-900 flex flex-col gap-4 items-center" >
      <CharacterCard v-for="character in characters" :key="character.id"  :character="character" :add="false" :locked="false" @set-settlement="startSettlementCreation"/>
      <CharacterCard v-if="numberOfCharacters < 2" :character="null" :add="true" :locked="false" @create="showCharacterCreation = true" />
      <CharacterCard v-if="numberOfCharacters < 3" :character="null" :add="false" :locked="true" />
    </div>
    <div
      v-if="showCharacterCreation"
      class="p-4 bg-amber-900 flex flex-col gap-4 items-center">
      <CharacterCreation @close="showCharacterCreation = false"/>
    </div>
    <div
      v-if="showSettlementCreation"
      class="p-4 bg-amber-900 flex flex-col gap-4 items-center">
      <SettlementCreation :character-id="selectedCharacter?.id" @close="showSettlementCreation = false"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterDTO } from '~~/types/character';

const { session } = useSession()
const { characters, selectedCharacter } = useCharacter()

const numberOfCharacters = computed(() => characters.value?.length ?? 0)

const showCharacterCreation = ref(false)
const showSettlementCreation = ref(false)

const subheading = computed(() => {
  if (showSettlementCreation.value) {
    return `Found or join a settlement with ${selectedCharacter.value?.name}`
  }
  if( showCharacterCreation.value) {
    return "Create a new character to embark on your journey."
  }
  if (numberOfCharacters.value === 0) {
    return "Create your first character to begin your adventure!"
  } else {
    return "Select a character to continue your journey or create a new one."
  }
})  

const startSettlementCreation = (character: CharacterDTO) => {
  if (!character) return;
  if (character.settlementName) {
    console.warn("Character already has a settlement");
    return;
  }
  showCharacterCreation.value = false
  showSettlementCreation.value = true
  selectedCharacter.value = character
}
</script>


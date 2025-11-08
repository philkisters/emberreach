<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen p-6">
    <LayoutLogo :use-title="false" />
    <h1 class="text-2xl font-bold text-primary">{{ `Greetings ${session?.username}`}}</h1>
    <h2 class="text-xl font-bold mb-4 text-primary">{{ !showCharacterCreation ? `Select a character to start your journey` : `Create new character` }}!</h2>

    <div 
      v-if="!showCharacterCreation"
      class="p-4 bg-amber-900 flex flex-col gap-4 items-center" >
      <CharacterCard v-for="character in characters" :key="character.id"  :character="character" :add="false" :locked="false"/>
      <CharacterCard v-if="numberOfCharacters < 2" :character="null" :add="true" :locked="false" @create="showCharacterCreation = true" />
      <CharacterCard v-if="numberOfCharacters < 3" :character="null" :add="false" :locked="true" />
    </div>
    <div
      v-if="showCharacterCreation"
      class="p-4 bg-amber-900 flex flex-col gap-4 items-center">
      <CharacterCreation @close="showCharacterCreation = false"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const { session } = useSession()
const { characters } = useCharacter()

watch (characters, () => {
  // You can add any logic here that needs to run when the characters change
  console.log("Characters updated:", characters.value);
})

const numberOfCharacters = computed(() => characters.value?.length ?? 0)

const showCharacterCreation = ref(false)
</script>


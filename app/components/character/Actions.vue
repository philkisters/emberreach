<template>
  <div class="flex flex-row gap-2">
    <UButton icon="i-lucide-trash" color="error" @click="remove" />
  </div>
</template>

<script lang="ts" setup>
import type { CharacterDTO } from '~~/types/character';

const { deleteCharacter } = useCharacter()

const props = defineProps<{
  character: CharacterDTO
}>()

async function remove() {
  try {
    await deleteCharacter(props.character.id);
  } catch (error) {
    console.error("Error deleting character:", error);
  }
}

</script>

<style>

</style>
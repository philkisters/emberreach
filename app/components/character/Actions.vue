<template>
  <div class="flex flex-row gap-2">
    <UButton color="warning" @click="editCharacter">Edit</UButton>
    <UButton color="error" @click="remove">Delete</UButton>
  </div>
</template>

<script lang="ts" setup>
import type { CharacterDTO } from '~~/types/character';

const { deleteCharacter } = useCharacter()

const props = defineProps<{
  character: CharacterDTO
}>()

const emit = defineEmits<{
  (e: "edit"): void
}>()

function editCharacter() {
  emit("edit");
}

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
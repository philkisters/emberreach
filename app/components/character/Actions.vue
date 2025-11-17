<template>
  <div class="flex flex-row gap-2">
    <UButton icon="i-lucide-trash" color="error" @click="remove" />
    <UButton v-if="props.character.settlementId" icon="i-lucide-play" color="success" @click="loadSettlement" />
  </div>
</template>

<script lang="ts" setup>
import type { CharacterDTO } from '~~/types/character';

const { deleteCharacter, selectedCharacter } = useCharacter()
const { loadActiveSettlement } = useSettlement()

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

async function loadSettlement() {
  if (!props.character.settlementId) return;
  try {
    loadActiveSettlement(props.character.settlementId).then(() => {
      selectedCharacter.value = props.character;
      useRouter().push('/settlement');
    });
  } catch (error) {
    console.error("Error loading settlement:", error);
  }
}
</script>

<style>

</style>
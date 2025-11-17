<template>
  <div class="rounded p-2 bg-primary text-zinc-800 flex flex-row justify-between items-center align-center cursor-pointer">
    <div v-if="character" class="rounded-full bg-amber-900 w-16 h-16 content-center text-center">
      Profile
    </div>
    <div v-if="character" class="flex flex-col ml-4">
      <div>{{ character.name }}</div>
      <div v-if="character.settlementName">{{ character.settlementName }}</div>
      <div v-else>
        <UButton size="sm" color="secondary" @click="setSettlement">Set Settlement</UButton>
      </div>
      <div class="flex flex-row justify-between">
        <div>Activity</div>
        <div class="ml-2">{{ calculateTimeSinceLastLogin(character.lastLogIn) }}</div>
      </div>
    </div>
    <div v-if="character" class="ml-4">
      <CharacterActions :character="character" />
    </div>
    <div v-if="add" class="flex rounded-full bg-amber-900 w-16 h-16 items-center justify-center text-center" @click="createCharacter">
      <UIcon name="i-lucide-plus" class="size-7" />
    </div>
    <div v-if="locked" class="flex rounded-full bg-amber-900 w-16 h-16 items-center justify-center text-center">
      <UIcon name="i-lucide-lock" class="size-7" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CharacterDTO } from '~~/types/character';

const { calculateTimeSinceLastLogin } = useCharacter();

const props = defineProps<{
  character: CharacterDTO | null,
  add: boolean,
  locked: boolean
}>()

const { character, add, locked } = props;
const emit = defineEmits<{
  (e: "create"): void,
  (e: "setSettlement", character: CharacterDTO): void
}>()

const createCharacter = () => {
  emit("create");
}

const setSettlement = () => {
  if (character) {
    emit("setSettlement", character);
  }
}
</script>

<style></style>
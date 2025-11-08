<template>
  <div
    class="p-4 bg-amber-900 flex flex-col gap-4 items-center">
    <div class="text-2xl text-primary">
      Create Character
    </div>
    <UInput v-model="characterName" placeholder="Charactername" />
    <div class="flex flex-row gap-4">
      <UButton @click="create">
        Create
      </UButton>
      <UButton @click="cancel">
        Cancel
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>

const characterName= ref("")
const toast = useToast()
const { createCharacter } = useCharacter()

const emit = defineEmits<{
  (e: "close"): void
}>()

async function create() {
  const newCharacter = await createCharacter(characterName.value);
  console.log("Character created:", newCharacter);
  toast.add({ title: `Character ${newCharacter.name} created successfully!`, color: 'success' });
  emit("close");
}

function cancel() {
  characterName.value = "";
  emit("close");
}

</script>

<style>

</style>
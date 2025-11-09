<template>
  <div>
    <div class="text-2xl text-primary mb-2">
      Join
    </div>
    <div class="flex flex-row gap-2 align-middle items-center">
      <UInput v-model="invitationCode" placeholder="Invitation Code" />
      <UButton color="primary">Join</UButton>
    </div>
    <USeparator class="my-4"/>
    <div class="text-2xl text-primary mb-2">
      Found
    </div>
    <div class="text-xl text-primary">
      Position
    </div>
    <div class="flex flex-row gap-2 my-2">
      <UInputNumber v-model="settlementLatitude" placeholder="Latitude" />
      <UInputNumber v-model="settlementLongitude" placeholder="Longitude" />
    </div>
    <div class="flex flex-row gap-2 align-middle items-center">
      <UInput v-model="settlementName" placeholder="Settlement name" />
      <UButton color="primary" @click="create">Found</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>

const { selectedCharacter } = useCharacter()
const { createSettlement } = useSettlement()
const toast = useToast()

const emit = defineEmits<{
  (e: "close"): void
}>()

const invitationCode= ref("")
const settlementName= ref("")
const settlementLatitude= ref(0.0)
const settlementLongitude= ref(0.0)

const create = async () => {
  if (!selectedCharacter.value) {
    console.error("No character selected for settlement creation");
    emit("close");
    return;
  }
  try {
    await createSettlement(
      settlementName.value,
      settlementLatitude.value,
      settlementLongitude.value,
      selectedCharacter.value.id
    );
    // Emit close event after successful creation
    toast.add({title: "Settlement created successfully!", color: "success"});
    emit("close");
  } catch (error) {
    console.error("Error creating settlement:", error);
  }
}

</script>

<style>

</style>
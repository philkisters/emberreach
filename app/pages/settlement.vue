<template>
  <div>
    <h1 class="text-center text-2xl font-bold">{{ activeSettlement?.name }}</h1>
    <h2 class="text-center mt-2">{{ `${activeSettlement?.latitude}, ${activeSettlement?.longitude}` }}</h2>
    <div class="mt-2">
      {{ selectedCharacter?.name }}'s Settlement Page
    </div>
  </div>
</template>

<script lang="ts" setup>
const { activeSettlement } = useSettlement();
const { selectedCharacter } = useCharacter();

if (!activeSettlement.value) {
  useRouter().push('/character');
}
</script>

<style>

</style>
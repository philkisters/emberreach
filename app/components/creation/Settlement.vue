<template>
  <div>
    <div class="text-2xl text-primary">
      Create Settlement
    </div>
    <UInput v-model="settlementName" placeholder="Settlement name" />
    <div class="text-xl text-primary">
      Position
    </div>
    <div class="flex flex-row gap-2">
      <UInput v-model="settlementLatitude" placeholder="Latitude" />
      <UInput v-model="settlementLongitude" placeholder="Longitude" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const settlementName= ref("")
const settlementLatitude= ref("")
const settlementLongitude= ref("")

</script>

<style>

</style>
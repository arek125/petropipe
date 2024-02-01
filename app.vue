<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex justify-center" style="min-height: 300px;">
      <NuxtPage />
    </v-main>
  </v-layout>
</template>

<script setup>
onMounted(async ()=>{
    const sdk = await getCustomUISDK();
})
</script>

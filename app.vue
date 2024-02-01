<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex justify-center" style="min-height: 300px;">
      <NuxtPage />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { getCustomUISDK } from '~/server/uisdk';
const route = useRoute()
onMounted(async ()=>{
    console.log(toRaw(route))
    const sdk = await getCustomUISDK();
})
</script>

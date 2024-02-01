<script setup lang="ts">
const { status, data, signOut }: any = useAuth()
const loading = ref<boolean>(false)
import { getCustomUISDK } from '~/server/uisdk';
const loadDeals = async ()=>{
  try{
    loading.value = true
    const data = await $fetch('/api/deals')
    console.log(data)
  }catch(err){
    console.log(err)
  }finally{
    loading.value = false
  }

}
onMounted(async ()=>{
    const sdk = await getCustomUISDK();
})

</script>

<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
            {{ status }}
            {{ data }}
          <v-btn @click="signOut()">Wyloguj</v-btn>
          <v-btn @click="loadDeals()" :loading="loading">Get deals</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>
<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex justify-center" style="min-height: 300px;">
      <v-container fluid>
          <v-row>
            <v-alert
                v-if="sign?.error"
                type="error"
                title="Błąd"
                :text="sign.error"
            ></v-alert>
            <v-col cols="12">
                {{ status }}
                {{ data }}
              <v-btn v-if="status=='authenticated'" @click="signOut()">Wyloguj</v-btn>
              <span v-else>Logowanie...</span>
              <v-btn v-if="status=='authenticated'" @click="loadDeals()" :loading="loading">Get deals</v-btn>
            </v-col>
            
          </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { getCustomUISDK } from '~/server/uisdk';
const url = useRequestURL()
onMounted(async ()=>{
    console.log(url)
    if(status.value != 'authenticated') sign.value = await signIn('pipedrive')
    const sdk = await getCustomUISDK();
})
const { status, data, signOut, signIn }: any = useAuth()
const loading = ref<boolean>(false)
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
const sign = ref<any>(null)

</script>

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
              <v-btn v-else @click="pipedrive">Logowanie...</v-btn>
              <a
        className="p-2 m-2"
        target="_blank"
        rel="noreferrer"
        :href="url.origin+'/api/auth/callback/pipedrive'"
      >
        Please re-authorize
      </a>
      and then
      <a
        href="#"
        @click="reaload"
      >
        refresh the page
      </a>
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
const pipedrive = async () =>{
    loading.value = true
    sign.value = await signIn('pipedrive')
    loading.value = false
}
const reaload=()=>{
    window.location.reload();
}
</script>

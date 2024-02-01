<script setup lang="ts">
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
        if (!sign.value?.error) {
            navigateTo("/")
        }
        loading.value = false
    }
</script>

<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
            {{ status }}
            {{ data }}
          <v-btn v-if="status=='authenticated'" @click="signOut()">Wyloguj</v-btn>
          <v-btn v-else @click="pipedrive">Logowanie...</v-btn>
          <v-btn v-if="status=='authenticated'" @click="loadDeals()" :loading="loading">Get deals</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>
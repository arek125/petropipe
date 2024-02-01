<script setup lang="ts">
import { onMounted } from 'vue';
    definePageMeta({
        auth: {
            unauthenticatedOnly: true,
            //navigateAuthenticatedTo: '/',
        }
    })
    const { signIn } = useAuth()
    const loading = ref<boolean>(true)
    const sign = ref<any>(null)
    const pipedrive = async () =>{
        loading.value = true
        sign.value = await signIn('pipedrive')
        if (!sign.value?.error) {
            navigateTo("/")
        }
        loading.value = false
    }
    onMounted(()=>{
        //pipedrive()
    })
</script>

<template>
    <v-card :loading="loading">
        <v-alert
            v-if="sign?.error"
            type="error"
            title="Błąd"
            :text="sign.error"
        ></v-alert>
        <v-btn v-else @click="pipedrive">Logowanie...</v-btn>
    </v-card>
</template>
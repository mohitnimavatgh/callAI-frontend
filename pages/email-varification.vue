<template>
    <div class="flex flex-col h-full">
        <!-- <div class="h-fit">
            <AppTopbar />
        </div> -->
        <div class="flex flex-col px-4 items-center justify-center h-full w-full">
            <div class="w-fit bg-white shadow rounded-xl px-10 py-6 text-center h-fit">
                <i class="fa-solid text-5xl text-primary-600 fa-envelope-circle-check"></i>
                <div class="text-primary-500 mt-6 text-center font-wrap text-xl sm:text-2xl">
                    {{ isVerified ? 'Email Verifiede successfully !' : 'Failed to verify Email' }}
                </div>
                <div class="text-primary-500 mt-4 text-center font-wrap text-xl sm:text-2xl">
                    {{ isVerified ? 'Thank you' : 'Please Try again' }}
                </div>
                <div class="text-primary-500 mt-4 text-center font-wrap text-xl sm:text-2xl">
                    Login
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import AppTopbar from '~/layouts/AppTopbar.vue';
import { useAuth } from "@/stores/auth";
const route = useRoute();
const router = useRouter()
const auth = useAuth()
const { $toast } = useNuxtApp()

definePageMeta({
    layout: 'login-layout'
})
const isVerified = ref<boolean>(false)

onMounted(async () => {
  await nextTick()
  await verifyEmail(route.query.token)
});
const verifyEmail = (tokenId:any) => {
    auth.emailVarification({token:tokenId}).then((resp:any) => {       
        if(resp.success){
            isVerified.value = true
            $toast.success('Email Varification sucessfully', { duration: 5000 })
        }else{
            isVerified.value = false
            $toast.error('Email is not Varification..', { duration: 5000 })
        }
    }).catch((error) => {
        isVerified.value = false
        catchResponse(error)               
    })
}

const catchResponse = (err:any) => {
  if(err?.response?.status == 422){
    let data = err?.response?.data?.data
    if(data){
        let keys = Object.keys(data)[0];
        let firstValue = data[keys];
        $toast.error(firstValue[0], { duration: 5000 })
    }else{
        if(!err?.response?.data?.success){
            $toast.error(err?.response?.data?.message, { duration: 5000 })
        }else{
            $toast.error('something went wrong...!', { duration: 5000 })
        }
    }
  }else{
    if(!err?.response?.data?.success){
        $toast.error(err?.response?.data?.message, { duration: 5000 })
    }else{
        $toast.error('something went wrong...!', { duration: 5000 })
    }
  }  
}


</script>
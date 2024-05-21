<script setup lang="ts">
import AppFooter from '@/layouts/AppFooter'
import { useAuth } from "@/stores/auth";
const auth = useAuth()
const { $toast } = useNuxtApp()
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
definePageMeta({
  layout: 'login-layout',
});
const reset = ref({
  email: null,
  redirect_url: window?.location?.origin + '/update-password'
})
const rules = {
  reset: {
    email: {
      required: helpers.withMessage("The Email field is required", required),
      email: helpers.withMessage("Please Enter a valid Email Address", email),
    },
  }
}
const v$ = useVuelidate(rules, { reset })
const resetSendLink = async () => {
  const result = await v$.value.$validate()
  if (result) {
    auth.resetSendLink(reset.value).then((resp: any) => {
      if (resp?.success) {
        reset.value.email = null
        reset.value.redirect_url = ''
        v$.value.$reset();
        $toast('success', 'Reset Password Send Link Successfully', { duration: 10000 })
      }else{
        $toast('danger', 'something went wrong...!', { duration: 5000 })
      }
    }).catch((error) => {
      catchResponse(error);
    })
  }
}

const catchResponse = (err) => {
  if(err?.response?.status == 422){
    let data = err?.response?.data?.data
    if(data){
        let keys = Object.keys(data)[0];
        let firstValue = data[keys];
        $toast('danger', firstValue[0], { duration: 5000 })
    }else{
        if(!err?.response?.data?.success){
            $toast('danger', err?.response?.data?.message, { duration: 5000 })
        }else{
            $toast('danger', 'something went wrong...!', { duration: 5000 })
        }
    }
  }else{
    if(!err?.response?.data?.success){
        $toast('danger', err?.response?.data?.message, { duration: 5000 })
    }else{
        $toast('danger', 'something went wrong...!', { duration: 5000 })
    }
  }  
}

</script>
<template>
  <div class="flex flex-col h-full pt-20 flowbit-lg:pt-0">
    <section class="dark:bg-gray-900 self-center h-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8">
      <AppLogo class="justify-center mb-6" />
      <h3 class="text-md font-semibold text-gray-600 mb-4 mt-6 text-center">Reset your Password</h3>
      <span class="text-sm text-gray-500 mt-3 px-4 md:px-4 flex justify-center text-center">No worries, we will mail you a
        like to your recovery email address to reset your password.</span>
      <div class="mt-6">
        <FormInput id="Email" label="Email" name="Email" v-model="v$.reset.email.$model" :errors="v$.reset.email.$errors"
          type="text" placeholder="Recovery email ID" />
        <Button :text="'Send Code'" class="mt-3" @click="resetSendLink()" />
        <span class="text-xs text-gray-500 mt-5 flex">Did not receive code? Send again</span>
      </div>
    </section>
    <div class="h-fit">
      <AppFooter />
    </div>
</div></template>
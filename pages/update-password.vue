<script setup lang="ts">
import AppFooter from '@/layouts/AppFooter'
import { useAuth } from "@/stores/auth";
const auth = useAuth()
const { $toast } = useNuxtApp()
const route = useRoute();
const router = useRouter();
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, sameAs ,helpers } from "@vuelidate/validators";
definePageMeta({
    layout: 'login-layout',
    middleware: 'is-authenticate'
});
const resetToken = ref(route.query?.token)
const reset = ref({   
    password: null,
    confirmPassword: null, 
});

const rules = {
    reset: {       
        password: {
            required: helpers.withMessage("The Password field is required", required),
            minLength:minLength(6),
            maxLength:maxLength(8),
        }, 
        confirmPassword: {
            required: helpers.withMessage("The Confirm password field is required.",required),
            sameAs: helpers.withMessage("The Confirm password must be same as password.",sameAs(computed(() => reset.value.password))),
        },
    }
}
const v$ = useVuelidate(rules, {reset})

const forgotPassword = async() =>{
    const result = await v$.value.$validate()
    if (result) {    
        let data = { rest_token: resetToken.value,newpassword : reset.value.password,}
        auth.forgotPassword(data).then((resp:any) => {
            if(resp.success) {   
                $toast('success', 'Password Updated Successfully', { duration: 10000 })
                router.push('/login');
            }
        }).catch((error) => {
            console.log("Error:", error);                  
        })
    }
}
</script>
<template>
    <div class="flex flex-col h-full pt-20 flowbit-lg:pt-0">
        <section class="dark:bg-gray-900 h-full self-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8">
        <AppLogo class="justify-center mb-6"/>
        <h3 class="text-md font-semibold text-gray-600 mb-4 mt-6 text-center">Update Your Password</h3>
        <span class="text-sm text-gray-500 mt-3 px-4 md:px-4 flex justify-center text-center">No worries, we will mail you a 6-digit code to your recovery email address to reset your password.</span>
        <div class="mt-6">
            <FormInput id="Password" label="Password" v-model="v$.reset.password.$model" :errors="v$.reset.password.$errors" name="Password" type="password" placeholder="New Password" />
            <FormInput id="confirmPassword" label="Confirm Password" v-model="v$.reset.confirmPassword.$model" :errors="v$.reset.confirmPassword.$errors" name="confirmPassword" type="password" placeholder="Confirm Password" class="mt-3" />
            <Button :text="'Update Password'" class="mt-3" @click="forgotPassword()" />
        </div>
        </section>
        <div class="h-fit">
            <AppFooter />
        </div>
    </div>
</template>
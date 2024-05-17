<script setup lang="ts">
import AppFooter from '@/layouts/AppFooter'
import { useAuth } from "@/stores/auth";
const auth = useAuth()
const { $toast } = useNuxtApp()
const route = useRoute();
const router = useRouter();
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, sameAs ,helpers } from "@vuelidate/validators";

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

onMounted(async () => {
    await nextTick();
})

const clearValidation = () => {
    reset.value.password = null
    reset.value.confirmPassword = null
    v$.value.$reset();
}

const changePassword = async() =>{
    const result = await v$.value.$validate()
    if (result) {    
        let data = { rest_token: resetToken.value,newpassword : reset.value.password,}
        auth.forgotPassword(data).then((resp:any) => {
            if(resp.success) { 
                v$.value.$reset();  
                $toast('success', 'Password Updated Successfully', { duration: 10000 })
                router.push('/login');
            }else{
                $toast('danger', resp?.message, { duration: 5000 })
            }
        }).catch((error) => {
            catchResponse(error); 
            clearValidation();          
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
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Bot Configuration</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Change your meeting bot settings</p>
        </div>
        <div class="p-5 mt-3 lg:w-1/2 w-full bg-white dark:bg-gray-800 rounded-lg">
            <FormInput id="Bot Name" class="mt-4" label="Bot Name" name="Bot Name" type="text" placeholder="Enter Bot Name"
                rules="required"  />

            <FormSelect class="mt-4" label="Action After Meeting Complete" id="action" name="action" placeholder="Select Action"
                :options="actionList" rules="required" />           
            <div class="mt-4 flex justify-end">
                <Button :text="'Save'" class="m-0" @click="changePassword()" />
            </div>
        </div>
    </div>
</template>
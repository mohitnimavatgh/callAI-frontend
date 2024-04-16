<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <AppLogo class="mb-6"/>
            <Loader :loading="loading"/>
            <div class="flex bg-white rounded-lg shadow dark:border md:mt-0 w-4/2 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white text-center">
                        Sign in
                    </h1>
                        <div>
                            <FormInput 
                                id="Email"
                                class="mt-3"
                                label="Email"
                                name="email"
                                type="email"
                                icon="fas fa-envelope"
                                placeholder="Email"
                                v-model="v$.login.email.$model"
                                :errors="v$.login.email.$errors"
                            />
                        </div>
                        <div>
                            <FormInput 
                                id="Password"
                                class="mt-3"
                                label="Password"
                                name="password"
                                type="password"
                                icon="fas fa-lock"
                                placeholder="password"
                                v-model="v$.login.password.$model"
                                :errors="v$.login.password.$errors"
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            
                            <a href="#" class="flex justify-end text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <Button :text="'Sign in'" class="flex text-center" @click="loginBtn"/>
                        
                </div>
                <div class="flex items-center">
                    <img  class="h-80" src="@/assets/image/user-computer.png">
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, email,helpers } from "@vuelidate/validators";
const router = useRouter()
definePageMeta({
    layout: 'loginLayout',
    // middleware: ["is-authenticate"]
})
const loading = ref(false)
const login = ref({
    email: '',
    password: ''
})
const rules = {
    login: {
        email: { 
            required: helpers.withMessage("The Email field is required", required),
            email: helpers.withMessage("Please Enter a valid Email Address", email),
        },
        password: { required: helpers.withMessage("The Password field is required", required) }
    }
}
const v$ = useVuelidate(rules, {login})
const auth = useAuth()
const { $toast } = useNuxtApp()


async function loginBtn() {
    $toast('success', 'Login Successfully', { duration: 10000 })
    const result = await v$.value.$validate()
        if (result) {
            loading.value = true
            auth.login(login.value).then((resp:any) => {
                if(resp.success) {
                    loading.value = false
                    $toast('success', 'Login Successfully', { duration: 10000 })
                    router.push(`call-ai`);
                }
            })
        }
}
</script>
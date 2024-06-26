<script setup lang="ts">
import AuthHeader from '@/layouts/AuthHeader'
import AppFooter from '@/layouts/AppFooter'
import { useAuth } from "@/stores/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, email,helpers } from "@vuelidate/validators";
const router = useRouter()
definePageMeta({
    layout: 'login-layout',
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

const catchResponse = (err) => {
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

async function loginBtn() {
    $toast.success('Login Successfully', { duration: 10000 })
    const result = await v$.value.$validate()
        if (result) {
            loading.value = true
            auth.login(login.value).then((resp:any) => {
                loading.value = false
                $toast.success('Login Successfully', { duration: 10000 })
                router.push(`call-ai`);
            }).catch((error) => {
                catchResponse(error)       
            })
        }
}
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <AuthHeader />
        <section class="flex-grow flex justify-center items-center h-full bg-white dark:bg-gray-900">
            <div class="flex justify-center h-full items-center px-4 ">
                <div class="container mx-auto px-4 lg:px-28 xl:px-60 py-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="md:mr-8">
                            <p class="text-2xl font-semibold text-gray-600 text-center">Welcome Back!</p>
                            <span class="text-sm text-gray-500 mt-3 px-4 xl:px-20 flex justify-center text-center">Log in to
                                access your Bot Creation Platform account.</span>
                            <ul class="mt-6">
                                <li class="flex items-center mt-1.5">
                                    <i class="fas fa-check mr-2 text-primary-500"></i>
                                    <span class="text-sm text-gray-500">Create bots for seamless integration with your
                                        favorite video conferencing platforms.</span>
                                </li>
                                <li class="flex items-center mt-1.5">
                                    <i class="fas fa-check mr-2 text-primary-500"></i>
                                    <span class="text-sm text-gray-500">Access call recordings and transcripts effortlessly
                                        after each session.</span>
                                </li>
                                <li class="flex items-center mt-1.5">
                                    <i class="fas fa-check mr-2 text-primary-500"></i>
                                    <span class="text-sm text-gray-500">Engage in post-call chat discussions to provide
                                        feedback and collaborate.</span>
                                </li>
                            </ul>
                            <div class="flex mt-5">
                                <div class="w-1/2 mr-2">
                                    <div
                                        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <a href="#">
                                            <img class="rounded-t-lg"
                                                src="https://hencework.com/theme/jampack/compact/dist/img/slide3.jpg"
                                                alt="" />
                                        </a>
                                        <div class="p-3 sm:p-5">
                                            <a href="#">
                                                <h5
                                                    class="mb-2 text-xs sm:text-md font-normal text-gray-700 dark:text-white">
                                                    Help Center</h5>
                                            </a>
                                            <p class="text-[10px] sm:text-sm mb-3 text-gray-500 dark:text-gray-400">This is
                                                a wider card with supporting text.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/2 ml-2">
                                    <div
                                        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <a href="#">
                                            <img class="rounded-t-lg"
                                                src="https://hencework.com/theme/jampack/compact/dist/img/slide4.jpg"
                                                alt="" />
                                        </a>
                                        <div class="p-3 sm:p-5">
                                            <a href="#">
                                                <h5
                                                    class="mb-2 text-xs sm:text-md font-normal text-gray-700 dark:text-white">
                                                    Research Center</h5>
                                            </a>
                                            <p class="text-[10px] sm:text-sm mb-3 text-gray-500 dark:text-gray-400">This is
                                                a wider card with supporting text.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span class="text-xs text-gray-500 mt-5 flex justify-center">Join us today and revolutionize
                                your virtual meetings! <a href="#" class="underline decoration-gray-400">Learn
                                    More</a></span>
                        </div>
                        <div class=" md:pl-8 md:border-l border-gray-200">
                            <h3 class="text-md flex justify-center font-semibold text-gray-600">Log In to Your Account</h3>
                            <div class="grid gap-2 mb-6 md:grid-cols-2 mt-8">
                                <div>
                                    <Button :text="'Sign Up with Google'" class="w-full flex justify-center"
                                        frontIcon="fa-brands fa-google" outline />
                                </div>
                                <div>
                                    <Button :text="'Sign Up with Facebook'" class="w-full flex justify-center"
                                        frontIcon="fa-brands fa-facebook" />
                                </div>
                            </div>
                            <div class="flex items-center my-5">
                                <div class="flex-grow border-b border-gray-300"></div>
                                <h2 class="px-3 text-xs text-gray-400">Or</h2>
                                <div class="flex-grow border-b border-gray-300"></div>
                            </div>
                            <div>
                                <div class="mb-6">
                                    <FormInput id="Email" class="mt-3" label="Email" name="email" type="email"
                                        icon="fas fa-envelope" placeholder="Email" v-model="v$.login.email.$model"
                                        :errors="v$.login.email.$errors" />
                                </div>
                                <div class="mb-6">
                                    <FormInput id="Password" class="mt-3" label="Password" name="password" type="password"
                                        icon="fas fa-lock" placeholder="password" v-model="v$.login.password.$model"
                                        :errors="v$.login.password.$errors" />
                                </div>
                                <div class="flex items-center justify-between">

                                    <a href="#"
                                        class="flex justify-end text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                                        password?</a>
                                </div>
                                <Button :text="'Sign in'" class="flex text-center mt-5" @click="loginBtn" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AppFooter />
    </div>
  </template>

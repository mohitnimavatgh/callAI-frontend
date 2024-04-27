<script setup lang="ts">
import AuthHeader from '@/layouts/AuthHeader'
import AppFooter from '@/layouts/AppFooter'
import FacebookBtn from '@/components/Facebook'
import { useAuth } from "@/stores/auth";
import { useVuelidate } from "@vuelidate/core";
import type { useTokenClient, AuthCodeFlowSuccessResponse } from "vue3-google-signin";
// import { decodeCredential} from "vue3-google-signin";
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

const loginData = ref({
    email: login.value.email,
    password : login.value.password,
    login_type: null,
    social_login_type: null,
    google_id:null,
    facebook_id:null
});

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

const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
    const responseData = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    });
    if (responseData.ok) {
      const userInfo = await responseData.json();
      console.log('User Information:', userInfo);
      loginData.value.email = userInfo.email
      loginData.value.google_id = userInfo.sub
      loginData.value.social_type = 'google';
      loginAction()
    } else {
      console.error('Failed to fetch user information');
    }
}

const handleOnError = () => {
  console.error("Login failed");
};

const { login : googleLogin } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});

const facebookLogin = (data:any) => {
    loginData.value.email = data.email
    loginData.value.facebook_id = data.social_id
    loginData.value.social_type = 'facebook';
    loginAction()
}

const loginAction = () => {
    console.log("loginData.value",loginData.value)
    auth.login(loginData.value).then((resp:any) => {
        if(resp?.success) {
            loading.value = false
            $toast('success', 'Login Successfully', { duration: 10000 })
            router.push(`call-ai`);
        }
    }).catch(error => {
        console.log("error: " + error)
    });
}

const loginBtn = async () =>{
    const result = await v$.value.$validate()
    if (result) {
        loginData.value.email = login.value.email,
        loginData.value.password = login.value.password,
        loading.value = true
        loginAction();
    }
}
</script>

<template>
    <div class="flex flex-col min-h-screen">
      <section class="flex-grow bg-white dark:bg-gray-900">
        <AuthHeader />
        <div class="flex justify-center items-center ">
            <div class="container mx-auto md:px-60 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="md:mr-8">
                    <p class="text-2xl font-semibold text-gray-600 text-center">Welcome Back!</p>
                    <span class="text-sm text-gray-500 mt-3 px-20 flex justify-center text-center">Log in to access your Bot Creation Platform account.</span>
                <ul class="mt-6">
                    <li class="flex items-center mt-1.5">
                    <i class="fas fa-check mr-2 text-primary-500"></i>
                    <span class="text-sm text-gray-500">Create bots for seamless integration with your favorite video conferencing platforms.</span>
                    </li>
                    <li class="flex items-center mt-1.5">
                    <i class="fas fa-check mr-2 text-primary-500"></i>
                    <span class="text-sm text-gray-500">Access call recordings and transcripts effortlessly after each session.</span>
                    </li>
                    <li class="flex items-center mt-1.5">
                    <i class="fas fa-check mr-2 text-primary-500"></i>
                    <span class="text-sm text-gray-500">Engage in post-call chat discussions to provide feedback and collaborate.</span>
                    </li>
                </ul>
                <div class="flex mt-5">
                    <div class="w-1/2 mr-2">
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                        <img class="rounded-t-lg" src="https://hencework.com/theme/jampack/compact/dist/img/slide3.jpg" alt="" />
                        </a>
                        <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-md font-normal text-gray-700 dark:text-white">Help Center</h5>
                        </a>
                        <p class="text-sm mb-3 text-gray-500 dark:text-gray-400">This is a wider card with supporting text.</p>
                        </div>
                    </div>
                    </div>
                    <div class="w-1/2 ml-2">
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                        <img class="rounded-t-lg" src="https://hencework.com/theme/jampack/compact/dist/img/slide4.jpg" alt="" />
                        </a>
                        <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-md font-normal text-gray-700 dark:text-white">Research Center</h5>
                        </a>
                        <p class="text-sm mb-3 text-gray-500 dark:text-gray-400">This is a wider card with supporting text.</p>
                        </div>
                    </div>
                    </div>
                </div>
                <span class="text-xs text-gray-500 mt-5 flex justify-center">Join us today and revolutionize your virtual meetings! <a href="#" class="underline decoration-gray-400">Learn More</a></span>
                </div>
                <div class=" md:pl-8 md:border-l border-gray-200">
                    <h3 class="text-md flex justify-center font-semibold text-gray-600">Log In to Your Account</h3>
                <div class="grid gap-2 mb-6 md:grid-cols-2 mt-8">
                    <div>
                    <Button :text="'Sign Up with Google'" id="googleAction" @click="googleLogin()" class="w-full flex justify-center" frontIcon="fa-brands fa-google" outline/>
                    </div>
                    <div>                    
                        <FacebookBtn @facebookData="facebookLogin" />
                    </div>
                </div>
                <div class="flex items-center my-5">
                    <div class="flex-grow border-b border-gray-300"></div>
                    <h2 class="px-3 text-xs text-gray-400">Or</h2>
                    <div class="flex-grow border-b border-gray-300"></div>
                </div>
                <div>
                    <div class="mb-6">
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
                    <div class="mb-6">
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
                        <NuxtLink to="reset-password" class="flex justify-end text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</NuxtLink>
                    </div>
                    <Button :text="'Log In'" class="flex text-center mt-5" @click="loginBtn"/>
                </div>
                </div>
            </div>
            </div>
        </div>
        <AppFooter/>
      </section>
    </div>
</template>
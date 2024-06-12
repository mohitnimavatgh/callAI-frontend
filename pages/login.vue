<script setup lang="ts">
import AuthHeader from '@/layouts/AuthHeader'
import AppFooter from '@/layouts/AppFooter'
import FacebookBtn from '@/components/Facebook'
import { useAuth } from "@/stores/auth";
import { useLoader } from "@/stores/loader";
import { useVuelidate } from "@vuelidate/core";
import type { useTokenClient, AuthCodeFlowSuccessResponse } from "vue3-google-signin";
// import { decodeCredential} from "vue3-google-signin";
import { required, email, helpers } from "@vuelidate/validators";
const router = useRouter();
const loader = useLoader();

definePageMeta({
    layout: 'login-layout',
    middleware: ['auth'],
})

const login = ref({
    email: 'harshadnariyaequipotech01@gmail.com',
    password: '123456',
    role_id: 3
})

const loginData = ref({
    email: login.value.email,
    password: login.value.password,
    login_type: null,
    social_login_type: null,
    google_id: null,
    facebook_id: null,
    role_id: 3
});

const rules = {
    login: {
        email: {
            required: helpers.withMessage("The Email field is required", required),
            email: helpers.withMessage("Please Enter a valid Email Address", email),
        },
        password: { required: helpers.withMessage("The Password field is required", required) },
        role_id: {}
    }
}
const v$ = useVuelidate(rules, { login })
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
        loginData.value.email = userInfo.email
        loginData.value.name = userInfo.name
        loginData.value.google_id = userInfo.sub
        loginData.value.social_type = 'google';
        loginAction()
    } else {
        $toast.error('Failed to fetch user information', { duration: 5000 })
    }
}

const handleOnError = () => {
    $toast.error('Login failed', { duration: 5000 })
};

const catchResponse = (err: any) => {
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

const clearData = () => {    
    loginData.value = {
        email: login.value.email,
        password: login.value.password,
        login_type: null,
        social_login_type: null,
        google_id: null,
        facebook_id: null,
        role_id: 3
    }
}

const { login: googleLogin } = useTokenClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
});

const facebookLogin = (data: any) => {
    loginData.value.email = data.email
    loginData.value.facebook_id = data.social_id
    loginData.value.social_type = 'facebook';
    loginAction()
}

const loginAction = () => {
    loader.loading = true
    auth.login(loginData.value).then((resp: any) => {
        loader.loading = false
        $toast.success('Login Successfully', { duration: 10000 })
        router.push('/');
    }).catch(error => {
        clearData();
        loader.loading = false
        catchResponse(error);
    });
}

const loginBtn = async () => {
    const result = await v$.value.$validate()
    if (result) {
        loginData.value.email = login.value.email,
        loginData.value.password = login.value.password,       
        loginAction();
    }
}
</script>

<template>
    <div class="flex dark:bg-gray-800 flex-col min-h-screen">
        <AuthHeader />
        <Loader />
        <section class="flex-grow flex items-center justify-center h-full bg-white relative dark:bg-gray-800">
            <div class="flex px-3 pb-3 justify-center items-center ">
                <div class="container mx-auto px-4 lg:px-28 xl:px-60 py-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="md:mr-8">
                            <p class="text-2xl font-semibold text-gray-600 dark:text-gray-300 text-center">Welcome Back!</p>
                            <span class="text-sm text-gray-500 dark:text-gray-300 mt-3 px-4 xl:px-20 flex justify-center text-center">Log in to
                                access
                                your Bot Creation Platform account.</span>
                            <ul class="mt-6">
                                <li class="flex items-center mt-1.5">
                                    <i class="fas fa-check mr-2 text-primary-500"></i>
                                    <span class="text-sm text-gray-500 dark:text-gray-300">Create bots for seamless integration with your
                                        favorite video conferencing platforms.</span>
                                </li>
                                <li class="flex items-center mt-1.5">
                                    <i class="fas fa-check mr-2 text-primary-500"></i>
                                    <span class="text-sm text-gray-500 dark:text-gray-300">Access call recordings and transcripts effortlessly
                                        after each session.</span>
                                </li>
                                <li class="flex items-center mt-1.5">
                                    <i class="fas fa-check mr-2 text-primary-500"></i>
                                    <span class="text-sm text-gray-500 dark:text-gray-300">Engage in post-call chat discussions to provide
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
                                                    class="mb-2 text-xs sm:text-md font-normal text-gray-700 dark:text-gray-300">
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
                                                    class="mb-2 text-xs sm:text-md font-normal text-gray-700 dark:text-gray-300 ">
                                                    Research Center</h5>
                                            </a>
                                            <p class="text-[10px] sm:text-sm mb-3 text-gray-500 dark:text-gray-400">This is
                                                a wider card with supporting text.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span class="text-xs text-gray-500 dark:text-gray-400 mt-5 flex justify-center">Join us today and revolutionize
                                your virtual meetings! <a href="#" class="underline decoration-gray-400">Learn
                                    More</a></span>
                        </div>
                        <div class="md:pl-8 md:border-l border-gray-200 dark:border-gray-500">
                            <h3 class="text-md flex justify-center font-semibold text-gray-600 dark:text-gray-300">Log In to Your Account</h3>
                            <div class="grid gap-2 mb-6 md:grid-cols-2 mt-8">
                                <div>
                                    <Button :text="'Sign Up with Google'" id="googleAction" @click="googleLogin()"
                                        class="w-full flex justify-center" frontIcon="fa-brands fa-google" outline />
                                </div>
                                <div>
                                    <FacebookBtn @facebookData="facebookLogin" />
                                </div>
                            </div>
                            <!-- <div class="grid gap-2 mb-6 md:grid-cols-2 mt-8">
                                <div>
                                    <Button :text="'Sign Up with Google'" class="w-full flex justify-center"
                                        frontIcon="fa-brands fa-google" outline />
                                </div>
                                <div>
                                    <Button :text="'Sign Up with Facebook'" class="w-full flex justify-center"
                                        frontIcon="fa-brands fa-facebook" />
                                </div>
                            </div> -->
                            <div class="flex items-center my-5">
                                <div class="flex-grow border-b border-gray-300 dark:border-gray-500"></div>
                                <h2 class="px-3 text-xs text-gray-400 dark:text-gray-300">Or</h2>
                                <div class="flex-grow border-b border-gray-300 dark:border-gray-500"></div>
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
                                    <NuxtLink to="reset-password"
                                        class="flex justify-end text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
                                        Forgot password?</NuxtLink>
                                </div>
                                <Button :text="'Log In'" class="flex text-center mt-5" @click="loginBtn" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AppFooter />
    </div>
</template>

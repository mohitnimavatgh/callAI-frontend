<script setup lang="ts">
import AuthHeader from '@/layouts/AuthHeader'
import AppFooter from '@/layouts/AppFooter'
import FacebookBtn from '@/components/Facebook'
import { useAuth } from "@/stores/auth";
import type { useTokenClient, AuthCodeFlowSuccessResponse } from "vue3-google-signin";
const auth = useAuth()
const { $toast } = useNuxtApp()
const router = useRouter()
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, sameAs, helpers } from "@vuelidate/validators";
definePageMeta({
    layout: 'login-layout',
});

const register = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    tac: false,
});

const signupData = ref({
    name: `${register.value.firstName} ${register.value.lastName}`,
    email: register.value.email,
    password: register.value.password,
    login_type: null,
    social_login_type: null,
    google_id: null,
    facebook_id: null
});

const rules = {
    register: {
        firstName: {
            required: helpers.withMessage("The First Name field is required", required),
        },
        lastName: {
            required: helpers.withMessage("The Last Name field is required", required),
        },
        email: {
            required: helpers.withMessage("The Email field is required", required),
            email: helpers.withMessage("Please Enter a valid Email Address", email),
        },
        password: {
            required: helpers.withMessage("The Password field is required", required),
            minLength: minLength(6),
            maxLength: maxLength(8),
        },
        confirmPassword: {
            required: helpers.withMessage("The Confirm password field is required.", required),
            sameAs: helpers.withMessage("The Confirm password must be same as password.", sameAs(computed(() => register.value.password))),
        },
        tac: {
            sameAs: helpers.withMessage("The Terms of use and Privacy policy is required.", sameAs(computed(() => true))),
        },
    }
}
const v$ = useVuelidate(rules, { register })

const handleOnError = () => {
    $toast.error('Login failed', { duration: 5000 })
};

const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
    console.log("onSuccess--", response)
    const responseData = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${response.access_token}`,
        },
    });
    if (responseData.ok) {
        const userInfo = await responseData.json();
        console.log('User Information:', userInfo);
        signupData.value.email = userInfo.email
        signupData.value.name = userInfo.name
        signupData.value.google_id = userInfo.sub
        signupData.value.social_type = 'google';
        if (userInfo) {
            userSignup()
        }
    } else {
        $toast.error('Failed to fetch user information', { duration: 5000 }) 
    }
}

const { login: googleRegister } = useTokenClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
});

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


const userSignup = () => {
    auth.signup(signupData.value).then((resp: any) => {
        $toast.success('Register Successfully', { duration: 10000 })
        router.push('/login');
    }).catch((error) => {
        catchResponse(error)
    })
}

const facebookRegister = (facebookData: any) => {
    // console.log("data: --asa--" + facebookData.social_id)
    signupData.value.email = facebookData.email
    signupData.value.name = facebookData.name
    signupData.value.facebook_id = facebookData.social_id
    signupData.value.social_type = 'facebook';
    console.log("data: ----" + signupData.value)
    userSignup()
}

const signup = async () => {
    const result = await v$.value.$validate()
    if (result) {
        signupData.value.name = `${register.value.firstName} ${register.value.lastName}`,
            signupData.value.email = register.value.email,
            signupData.value.password = register.value.password,
            userSignup()
    }
}
</script>
<template>
    <div class="flex flex-col dark:bg-gray-800 min-h-screen">
        <AuthHeader />
        <section class="flex-grow flex items-center overflow-y-auto justify-center h-full w-full bg-white relative dark:bg-gray-800">
            <div class="flex px-3 pb-3 justify-center items-center ">
                <div class="container mx-auto px-4 lg:px-20 xl:px-44 py-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="md:mr-8">
                            <p class="text-2xl font-semibold text-gray-600 dark:text-gray-300 text-center">Welcome to our Bot Creation Platform
                            </p>
                            <span class="text-sm text-gray-500 mt-3 px-4 xl:px-20 flex justify-center text-center dark:text-gray-300">Start
                                building
                                your intelligent bots for Microsoft Teams, Google Meet, and Zoom.</span>
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
                                                    Help
                                                    Center</h5>
                                            </a>
                                            <p class="text-[10px] sm:text-sm mb-3 text-gray-500 dark:text-gray-400">This is
                                                a wider card
                                                with supporting text.</p>
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
                                                    class="mb-2 text-xs sm:text-md font-normal text-gray-700 dark:text-gray-300">
                                                    Research
                                                    Center</h5>
                                            </a>
                                            <p class="text-[10px] sm:text-sm mb-3 text-gray-500 dark:text-gray-400">This is
                                                a wider card
                                                with supporting text.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span class="text-xs text-gray-500 dark:text-gray-400 mt-5 flex justify-center">Join us today and revolutionize
                                your virtual meetings! <a href="#" class="underline decoration-gray-400">Learn
                                    More</a></span>
                        </div>
                        <div class=" md:pl-8 md:border-l border-gray-200 dark:border-gray-500">
                            <h3 class="text-md flex justify-center font-semibold text-gray-600 dark:text-gray-300">Sign Up to Get Started</h3>
                            <div class="grid gap-2 mb-6 md:grid-cols-2 mt-8">
                                <div>
                                    <Button :text="'Sign Up with Google'" class="w-full sm:text-xs xl:text-sm flex justify-center"
                                        @click="googleRegister()" frontIcon="fa-brands fa-google" outline />
                                </div>
                                <div>
                                    <FacebookBtn @facebookData="facebookRegister" />
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
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <FormInput id="First Name" class="mt-3" v-model="v$.register.firstName.$model"
                                            :errors="v$.register.firstName.$errors" label="First Name" name="First Name"
                                            type="text" placeholder="Enter First Name" />
                                    </div>
                                    <div>
                                        <FormInput id="Last Name" class="mt-3" v-model="v$.register.lastName.$model"
                                            :errors="v$.register.lastName.$errors" label="Last Name" name="Last Name"
                                            type="text" placeholder="Enter Last Name" />
                                    </div>
                                </div>
                                <div class="mb-6">
                                    <FormInput id="Email" class="mt-3" v-model="v$.register.email.$model"
                                        :errors="v$.register.email.$errors" label="Email" name="Email" type="text"
                                        placeholder="Enter Email" />
                                </div>
                                <div class="mb-6">
                                    <FormInput id="Password" class="mt-3" v-model="v$.register.password.$model"
                                        :errors="v$.register.password.$errors" label="Password" name="Password"
                                        type="password" placeholder="Enter Password" />
                                </div>
                                <div class="mb-6">
                                    <FormInput id="Confirm Password" class="mt-3"
                                        v-model="v$.register.confirmPassword.$model"
                                        :errors="v$.register.confirmPassword.$errors" label="Confirm Password"
                                        name="Confirm Password" type="password" placeholder="Enter Confirm Password" />
                                </div>
                                <div class="items-start mb-6">
                                    <div class="flex items-center h-5">
                                        <input id="remember" type="checkbox" v-model="v$.register.tac.$model"
                                            :errors="v$.register.tac.$errors"
                                            class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="remember" class="ms-2 text-xs text-gray-500 dark:text-gray-300">By
                                            creating an account you specify that you have read and agree with our <a
                                                href="#"
                                                class="text-primary-500 hover:underline dark:text-primary-500">Terms of
                                                use</a> and <a href="#"
                                                class="text-primary-600 hover:underline dark:text-primary-500">Privacy
                                                policy</a>.</label>
                                    </div>
                                    <div v-if="v$?.register?.tac?.$errors" class="text-xs text-red-500 mt-3">
                                        {{ v$?.register?.tac?.$errors[0]?.$message }}
                                    </div>
                                </div>
                                <Button :text="'Create Account'" @click="signup()" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AppFooter />
    </div>
</template>

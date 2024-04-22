<template>
    <div class="flex flex-col min-h-screen">
      <section class="flex-grow bg-white dark:bg-gray-900">
        <AuthHeader />
        <div class="flex justify-center items-center ">
            <div class="container mx-auto md:px-60 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="md:mr-8">
                    <p class="text-2xl font-semibold text-gray-600 text-center">Welcome to our Bot Creation Platform</p>
                    <span class="text-sm text-gray-500 mt-3 px-20 flex justify-center text-center">Start building your intelligent bots for Microsoft Teams, Google Meet, and Zoom.</span>
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
                    <h3 class="text-md flex justify-center font-semibold text-gray-600">Sign Up to Get Started</h3>
                <div class="grid gap-2 mb-6 md:grid-cols-2 mt-8">
                    <div>
                    <Button :text="'Sign Up with Google'" class="w-full flex justify-center" frontIcon="fa-brands fa-google" outline/>
                    </div>
                    <div>
                    <Button :text="'Sign Up with Facebook'" class="w-full flex justify-center" frontIcon="fa-brands fa-facebook" />
                    </div>
                </div>
                <div class="flex items-center my-5">
                    <div class="flex-grow border-b border-gray-300"></div>
                    <h2 class="px-3 text-xs text-gray-400">Or</h2>
                    <div class="flex-grow border-b border-gray-300"></div>
                </div>
                <div>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <FormInput id="First Name" class="mt-3" label="First Name" name="First Name" type="text" placeholder="Enter First Name" />
                    </div>
                    <div>
                        <FormInput id="Last Name" class="mt-3" label="Last Name" name="Last Name" type="text" placeholder="Enter Last Name" />
                    </div>
                    </div>
                    <div class="mb-6">
                    <FormInput id="Email" class="mt-3" label="Email" name="Email" type="text" placeholder="Enter Email" />
                    </div>
                    <div class="mb-6">
                    <FormInput id="Password" class="mt-3" label="Password" name="Password" type="text" placeholder="Enter Password" />
                    </div>
                    <div class="mb-6">
                    <FormInput id="Confirm Password" class="mt-3" label="Confirm Password" name="Confirm Password" type="text" placeholder="Enter Confirm Password" />
                    </div>
                    <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                    <label for="remember" class="ms-2 text-xs text-gray-500 dark:text-gray-300">By creating an account you specify that you have read and agree with our <a href="#" class="text-primary-500 hover:underline dark:text-primary-500">Terms of use</a> and <a href="#" class="text-primary-600 hover:underline dark:text-primary-500">Privacy policy</a>.</label>
                    </div>
                    <Button :text="'Create Account'" />
                </div>
                </div>
            </div>
            </div>
        </div>
        <AppFooter/>
      </section>
    </div>
  </template>
  

<script setup lang="ts">
import AuthHeader from '@/layouts/AuthHeader'
import AppFooter from '@/layouts/AppFooter'
definePageMeta({
    layout: 'loginLayout',
});
</script>
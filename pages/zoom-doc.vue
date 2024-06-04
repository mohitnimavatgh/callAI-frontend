<template>
    <div class="flex h-full flex-col">
        <div class="h-fit">
            <AuthHeader />
        </div>
        <div class="container text-gray-500 h-full mx-auto px-8 lg:px-60 py-8">
            <h2 class="text-3xl font-semibold text-gray-600">Call Ai Documentation</h2>
            <p class="font-bold mt-2 text-gray-600">Integrating Zoom Calls with Confra: A Seamless Collaboration Solution</p>
            <p class="mt-4">
                Welcome to Confra's guide on integrating Zoom calls into your web application! Whether you're looking to
                enhance communication capabilities or streamline collaboration processes, our solution provides a seamless
                integration of Zoom functionality directly into your web platform. With Confra, users can enjoy the benefits
                of Zoom calls alongside advanced features tailored to meet their collaboration needs.
            </p>
            <div class="mt-6 font-bold text-gray-600">
                Documentation:
            </div>
            <p class="mt-4">
                Adding the Confra App to Your Zoom Account
            </p>
            <p class="mt-4">
                No installation is required.
            </p>
            <p class="mt-4">
                Once the integration is complete, users can leverage Confra's features to enhance their Zoom call
                experience:
            </p>
            <ul class="list-disc">
                <li class="mt-4">
                    Login to Confra: You can log in at the following URL with your email and password:
                    <a class="text-blue-500 underline"
                        href="https://confra.cuotainfotech.com/login">https://confra.cuotainfotech.com/login</a>
                </li>
                <li class="mt-4">
                    Seamless joining: Easily join meetings with the bot via provided meeting URLs and essential details.
                    Here's how it works

                    <ul class="ml-4 list-disc">
                        <li class="mt-1">
                            Create a meeting on Zoom.
                        </li>
                        <li class="mt-1">
                            Once the meeting is created, copy the Zoom URL.
                        </li>
                        <li class="mt-1">
                            Paste the Zoom URL into the designated section in the Create meeting interface for effortless access.
                        </li>
                    </ul>
                </li>
                <li class="mt-4">
                    Bot joining our Zoom call: The bot will automatically join your Zoom call, facilitating seamless collaboration.
                </li>
                <li class="mt-4">
                    Video viewing & recording: Access and view videos within meetings, and conveniently record sessions through the meeting bot.
                </li>
                <li class="mt-4">
                    Comprehensive transcriptions: Retrieve meeting transcriptions to capture missed information and grasp the meeting's progression effectively.
                </li>
            </ul>
            <div class="mt-6">
                No Uninstallation is required.
            </div>
            <div class="mt-4">
                Integrating Zoom calls with Confra offers an efficient and effective way to facilitate collaboration within your web application. Enhance your communication capabilities today with Confra!
            </div>
        </div>
        <div class="h-fit">
            <AppFooter />
        </div>
    </div>
</template>
<script setup lang="ts">
import AuthHeader from '@/layouts/AuthHeader'
import AppFooter from '@/layouts/AppFooter'
definePageMeta({
    layout: 'login-layout',
});
</script>
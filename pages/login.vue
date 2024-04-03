<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <AppLogo class="mb-6"/>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
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
                                rules="required|email"
                                v-model="login"
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
                                rules="required"
                                v-model="password"
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            
                            <a href="#" class="flex text-end text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <Button :text="'Sign in'" class="text-center" @click="increment"/>
                        
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions } from 'pinia'
 definePageMeta({
    layout: 'loginLayout'
})
import { useLoginStore } from '@/store/user/login'
export default defineComponent({
    data () {
        return {
            login: '',
            password: ''
        }
    },
    computed: {
    ...mapState(useLoginStore, ['count'])
    },
    methods: {
    // ...mapActions(useLoginStore, ['increment'])
    increment () {
        this.$router.push("/")
    }
    }
})
</script>
<style>

</style>
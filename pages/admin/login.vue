<script setup lang="ts">
import { adminAuth } from "@/stores/admin/auth"; 
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

const { $toast } = useNuxtApp()
const auth = adminAuth();
const router = useRouter();

definePageMeta({
    middleware: "admin-auth"
})

const loading = ref(false)
const login = ref({
    email: 'call.admin.ai@gmail.com',
    password: '123456',
    role_id : 2
})

const loginData = ref({
    email: login.value.email,
    password: login.value.password,
    role_id: login.value.role_id 
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

const loginAction = () => {
    auth.login(loginData.value).then((resp: any) => {
        if (resp?.success) {
            loading.value = false
            $toast('success', 'Login Successfully', { duration: 10000 })
            router.push('/admin/users');
        }
    }).catch(error => {
        console.log("error: " + error)
        $toast('error', 'Invalide Cradential', { duration: 10000 })
    });
}

const loginBtn = async () => {
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
    <div class="w-full h-full flex items-center justify-center px-4">
        <div
            class="xl:w-2/12 lg:w-3/12 sm:w-5/12 text-gray-800 dark:text-gray-400 w-full rounded-lg shadow-xl flex flex-col items-center h-fit bg-primary-50 py-4 px-6">
            <div class="text-2xl font-bold">
                Login
            </div>
            <div class="mt-4 w-full">
                <div class="text-base font-semibold">
                    <FormInput id="Email" class="mt-3" label="Email" name="email" type="email" icon="fas fa-envelope"
                        placeholder="Email" v-model="<any>v$.login.email.$model" :errors="v$.login.email.$errors" />
                </div>
                <div class="text-base mt-5 font-semibold">
                    <FormInput id="Password" class="mt-3" label="Password" name="password" type="password"
                        icon="fas fa-lock" placeholder="password" v-model="<any>v$.login.password.$model"
                        :errors="v$.login.password.$errors" />
                </div>
                <Button @click="loginBtn" :text="'Log In'" class="flex justify-center font-semibold w-full mt-5" />
            </div>
        </div>
    </div>
</template>
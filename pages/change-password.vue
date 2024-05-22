<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { useLoader } from "@/stores/loader";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, helpers } from "@vuelidate/validators";

definePageMeta({
    middleware: 'is-authenticate'
})

const loader = useLoader();
const userState = useAuth();
const router  = useRouter();
const { $toast } = useNuxtApp();

const formData = ref<any>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
})

const passwordRules = {
    formData: {
        currentPassword: {
            required: helpers.withMessage("The Current Password is required", required),
        },
        newPassword: {
            required: helpers.withMessage("The New Password is required", required),
        },
        confirmNewPassword: {
            required: helpers.withMessage("The Confirm Password is required", required),
            sameAs: helpers.withMessage("The Confirm Password must be same as New Password", sameAs(computed(() => formData.value.newPassword))),
        },
    }
}
const vv$ = useVuelidate(passwordRules, { formData })

const updatePassword = async () => {
    const result = await vv$.value.$validate()
    if (result) {
        loader.loading = true
        let data = {
            currentpassword: formData.value.currentPassword,
            newpassword: formData.value.newPassword
        }
        userState.changePassword(data).then((res: any) => {
            loader.loading = false
            clearData();
            $toast.success('Password changed successfully', { duration: 5000 })
        }).catch((err) => {
            loader.loading = false
            catchResponse(err);
        })
    }
}

const clearData = () => {
    formData.value = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }
    vv$.value.$reset()
    loader.loading = true
    userState.logout().then((res: any) => {
        loader.loading = false
        router.push('/login')
    }).catch((err: any) => {
        loader.loading = false
        catchResponse(err);
    });
}

const catchResponse = (err: any) => {
    if (err?.response?.status == 422) {
        let data = err?.response?.data?.data
        if (data) {
            let keys = Object.keys(data)[0];
            let firstValue = data[keys];
            $toast.error(firstValue[0], { duration: 5000 })
        } else {
            if (!err?.response?.data?.success) {
                $toast.error(err?.response?.data?.message, { duration: 5000 })
            } else {
                $toast.error('Something went wrong...!', { duration: 5000 })
            }
        }
    } else {
        if (!err?.response?.data?.success) {
            $toast.error(err?.response?.data?.message, { duration: 5000 })
        } else {
            $toast.error('Something went wrong...!', { duration: 5000 })
        }
    }
}

const typeData = ref<any>({
    current: true,
    new: true,
    confirm: true
})

const handleCurrentChangeType = () => {
    typeData.value.current = !typeData.value.current
}

const handleNewChangeType = () => {
    typeData.value.new = !typeData.value.new
}

const handleConfirmChangeType = () => {
    typeData.value.confirm = !typeData.value.confirm
}
</script>
<template>
    <div class="mt-5">
        <Loader />
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Change Password</h4>
        </div>
        <div class="p-5 mt-3 lg:w-1/2 w-full bg-white dark:bg-gray-800 rounded-lg">
            <div class="">
                <FormInput id="current" label="Current Password" iconPosition="right" name="current"
                    :type="typeData.current ? 'password' : 'text'" :pointer="false"
                    placeholder="Enter your current password" :icon="typeData.current ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    v-model="vv$.formData.currentPassword.$model" :errors="vv$.formData.currentPassword.$errors"
                    @changeType="handleCurrentChangeType" />
            </div>
            <div class="mt-5">
                <FormInput id="new" label="New Password" name="new" iconPosition="right"
                    :type="typeData.new ? 'password' : 'text'" :pointer="false" placeholder="Enter your new password"
                    :icon="typeData.new ? 'fas fa-eye-slash' : 'fas fa-eye'" v-model="vv$.formData.newPassword.$model"
                    :errors="vv$.formData.newPassword.$errors" @changeType="handleNewChangeType" />
            </div>
            <div class="mt-5">
                <FormInput id="confirm" label="Confirm Password" name="confirm" iconPosition="right"
                    :type="typeData.confirm ? 'password' : 'text'" :pointer="false"
                    placeholder="Enter your confirm password" :icon="typeData.confirm ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    v-model="vv$.formData.confirmNewPassword.$model" :errors="vv$.formData.confirmNewPassword.$errors"
                    @changeType="handleConfirmChangeType" />
            </div>                   
            <div class="mt-4 flex justify-end">
                <Button class="mt-6" text="Save" frontIcon="" @click="updatePassword" /> 
            </div>
        </div>
    </div>
</template>
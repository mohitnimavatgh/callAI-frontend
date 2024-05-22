<script setup lang="ts">
import { adminAuth } from '~/stores/admin/auth';
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, helpers } from "@vuelidate/validators";

definePageMeta({
    layout: 'admin',
    middleware: 'is-admin-authenticate'
})

const adminData = adminAuth();
const router  = useRouter();
const { $toast } = useNuxtApp();

const formData = ref<any>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
})

const botRules = {
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
const vv$ = useVuelidate(botRules, { formData })

const changePassword = async () => {
    const result = await vv$.value.$validate()
    if (result) {
        let data = {
            currentpassword: formData.value.currentPassword,
            newpassword: formData.value.newPassword
        }
        adminData.changePassword(data).then((res: any) => {
            clearData();
            $toast.success('Password changed successfully', { duration: 5000 })
        }).catch((err) => {
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
    adminData.logout().then((res: any) => {
        router.push('/admin/login')
    }).catch((err: any) => {
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
    <div class="w-full h-full pb-8 overflow-y-auto dark:text-gray-300">
        <div class="text-gray-700 text-3xl">
            Change Password
        </div>
        <div class="mt-6 w-4/12 py-2">
            <div class="">
                <FormInput id="current" label="Current Password" iconPosition="right" name="current"
                    :type="typeData.current ? 'password' : 'text'" :pointer="false"
                    placeholder="Enter your current password" :icon="typeData.current ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    v-model="vv$.formData.currentPassword.$model" :errors="vv$.formData.currentPassword.$errors"
                    @changeType="handleCurrentChangeType" />
            </div>
            <div class="mt-5">
                <FormInput id="new" label="New Password" name="new" iconPosition="right"
                    :type="typeData.new ? 'password' : 'text'" :pointer="false" placeholder="Enter your current password"
                    :icon="typeData.new ? 'fas fa-eye-slash' : 'fas fa-eye'" v-model="vv$.formData.newPassword.$model"
                    :errors="vv$.formData.newPassword.$errors" @changeType="handleNewChangeType" />
            </div>
            <div class="mt-5">
                <FormInput id="confirm" label="Confirm Password" name="confirm" iconPosition="right"
                    :type="typeData.confirm ? 'password' : 'text'" :pointer="false"
                    placeholder="Enter your current password" :icon="typeData.confirm ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    v-model="vv$.formData.confirmNewPassword.$model" :errors="vv$.formData.confirmNewPassword.$errors"
                    @changeType="handleConfirmChangeType" />
            </div>
            <Button class="mt-6" text="Submit" frontIcon="" @click="changePassword" />
        </div>
    </div>
</template>
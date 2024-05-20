<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, helpers } from "@vuelidate/validators";

definePageMeta({
    middleware: 'is-authenticate'
})

const userState = useAuth();
const router  = useRouter();
const { $toast } = useNuxtApp();

const formData = ref<any>({
    id: userState?.userInfo?.id,
    name: userState?.userInfo?.name,
    mobile_no: userState?.userInfo?.mobile_no,
    email: userState?.userInfo?.email,
    role: userState?.userInfo?.role_name,
    type: userState?.userInfo?.type
})

const profileRules = {
    formData: {
        name: {
            required: helpers.withMessage("The Name is required", required),
        },
        mobile_no: {
            required: helpers.withMessage("The Mobile No is required", required),
        },
    }
}
const v$ = useVuelidate(profileRules, { formData })

const saveProfile = async () => {
    const result = await v$.value.$validate()
    if (result) {
        let data = {
            id: formData.value.id,
            name: formData.value.name,
            email: formData.value.email,
            mobile_no: formData.value.mobile_no,
        }
        userState.updateProfile(data).then((res: any) => {      
            $toast('success', 'Updated Profile successfully', { duration: 5000 })
        }).catch((err) => {
            catchResponse(err);
        })
    }
}

const catchResponse = (err: any) => {
    if (err?.response?.status == 422) {
        let data = err?.response?.data?.data
        if (data) {
            let keys = Object.keys(data)[0];
            let firstValue = data[keys];
            $toast('danger', firstValue[0], { duration: 5000 })
        } else {
            if (!err?.response?.data?.success) {
                $toast('danger', err?.response?.data?.message, { duration: 5000 })
            } else {
                $toast('danger', 'Something went wrong...!', { duration: 5000 })
            }
        }
    } else {
        if (!err?.response?.data?.success) {
            $toast('danger', err?.response?.data?.message, { duration: 5000 })
        } else {
            $toast('danger', 'Something went wrong...!', { duration: 5000 })
        }
    }
}

</script>
<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Profile</h4>
        </div>
        <div class="p-5 mt-3 lg:w-1/2 w-full bg-white dark:bg-gray-800 rounded-lg">
            <div class="">
                <FormInput id="name" class="mt-3" v-model="v$.formData.name.$model"
                    :errors="v$.formData.name.$errors" label="Name" name="Name"
                    type="text" placeholder="Name" />
            </div>
            <div class="mt-5">
                <FormInput id="mobile_no" class="mt-3" v-model="v$.formData.mobile_no.$model"
                    :errors="v$.formData.mobile_no.$errors" label="Mobile No" name="Mobile No"
                    type="text" placeholder="Mobile No" />
            </div>
            <div class="mt-5">
                <FormInput id="email" class="mt-3" v-model="formData.email"
                     label="Email" name="Email" type="text" placeholder="Email" :disabled="true"/>
            </div> 
            <div class="mt-5">
                <FormInput id="role" class="mt-3" v-model="formData.role"
                     label="Role" name="role" type="text" placeholder="Role" :disabled="true"/>
            </div>       
            <div class="mt-5">
                <FormInput id="type" class="mt-3" v-model="formData.type"
                     label="type" name="type" type="text" placeholder="Type" :disabled="true" />
            </div>             
            <div class="mt-4 flex justify-end">
                <Button class="mt-6" text="Update" frontIcon="" @click="saveProfile()" /> 
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { adminAuth } from '~/stores/admin/auth';

definePageMeta({
    layout: 'admin',
    middleware: 'is-admin-authenticate'
})

const adminData = adminAuth();

const admin = adminData.adminInfo

onMounted(() => {
    console.log(admin.email);
})

const profileData = ref<any>({
    name: admin.name,
    email: admin.email,
    mobile_no: admin.mobile_no,
    role_name: admin.role_name
})

</script>

<template>
    <div class="w-full h-full pb-8 overflow-y-auto dark:text-gray-300">
        <div class="text-gray-700 text-3xl">
            Profile
        </div>
        <div class="">
            <div class="mt-6 w-4/12 py-2">
                <div class="">
                    <FormInput id="name" label="Name" name="name"
                        :type="'text'" :pointer="true"
                        placeholder="Enter your Name"
                        :icon="'fa fa-user'"
                        v-model="vv$.profileData.name.$model" :errors="vv$.profileData.name.$errors"/>
                </div>
                <div class="mt-5">
                    <FormInput id="email" label="Email" name="email"
                        :type="'text'" :pointer="true"
                        placeholder="Enter your Email"
                        :icon="'fa fa-envelope'"
                        v-model="vv$.profileData.email.$model" :errors="vv$.profileData.email.$errors"/>
                </div>
                <div class="mt-5">
                    <FormInput id="mobile_no" label="Mobile No." name="mobile_no"
                        :type="'text'" :pointer="true"
                        placeholder="Enter your Email"
                        :icon="'fa fa-envelope'"
                        v-model="vv$.profileData.email.$model" :errors="vv$.profileData.email.$errors"/>
                </div>
                <Button class="mt-6" text="Submit" frontIcon="" />
            </div>
        </div>
</div></template>
<script setup lang="ts">
import { usersStore } from '@/stores/user/users';
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, numeric, maxLength, minLength } from "@vuelidate/validators";

definePageMeta({
    middleware: 'is-authenticate',
})

const users = usersStore();
const router = useRouter()
const { $toast } = useNuxtApp();

onMounted(() => {
    getUserData();
})

const tableHeadings = ref([
    { title: "Name", value: "name" },
    { title: "Role", value: "role_name" },
    { title: "Email", value: "email" },
    { title: "Mobile No.", value: "mobile_no" },
    { title: "Type", value: "type" },
    { title: "Action", value: "action" }
]);

const userList = ref<any>([])
const confirmationPopUP = ref<boolean>(false)
const joinModal = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const deleteAction = ref<string>('')
const user_List_id = ref<any>()
const getUserParams = ref<any>({
    page: 1,
    search: ''
})

const formData = ref<any>({
    name: '',
    email: '',
    mobile_no: '',
    password: '',
})

const botRules = {
    formData: {
        name: {
            required: helpers.withMessage("The Name field is required", required),
        },
        email: {
            required: helpers.withMessage("The Email field is required", (value, helpers) => {
                if (!isEdit.value) {
                    return value ? true : helpers.message;
                }
                return true;
            }),
            email: helpers.withMessage("Please Enter a valid Email Address", email),
        },
        mobile_no: {
            required: helpers.withMessage("The Mobile No field is required", required),
            numeric: helpers.withMessage("Please enter valid Mobile No.", numeric),
            minLength: helpers.withMessage("Mobile no must be 10 letters", minLength(10)),
            maxLength: helpers.withMessage("Mobile no must be 10 letters", maxLength(10))
        },
        password: {
            required: helpers.withMessage("The Password field is required", (value, helpers) => {
                if (!isEdit.value) {
                    return value ? true : helpers.message;
                }
                return true;
            }),
        },
    }
}
const vv$ = useVuelidate(botRules, { formData })

const getUserData = async () => {
    await users.getUserList(getUserParams.value).then((response) => {
        userList.value = response
    })
}

const searchUser = (search: any) => {
    getUserParams.value.search = search
    getUserData()
};

const view = (index: any) => {
    let id = userList.value.data[index].id
    router.push(`/admin/users/${id}`);
}

const edit = (index: any) => {
    isEdit.value = true
    let data = userList.value.data[index]
    formData.value.name = data.name
    formData.value.id = data.id
    formData.value.mobile_no = data.mobile_no
    formData.value.email = data.email
    joinModal.value = true
}

const addUpdateUser = async () => {
    const result = await vv$.value.$validate()
    if (result) {
        if (isEdit.value) {
            let data = {
                name: formData.value.name,
                id: formData.value.id,
                mobile_no: formData.value.mobile_no,
                email: formData.value.email
            }
            users.update(data).then((resp: any) => {
                joinModal.value = false
                isEdit.value = false
                getUserData()
                resetFormData()
            }).catch((error) => {
                catchResponse(error)
            })
        }
        else {
            users.create(formData.value).then((resp: any) => {
                joinModal.value = false
                getUserData()
                resetFormData()
            }).catch((error) => {
                catchResponse(error)
            })
        }
    }
}

const catchResponse = (err) => {
  if(err?.response?.status == 422){
    let data = err?.response?.data?.data
    if(data){
        let keys = Object.keys(data)[0];
        let firstValue = data[keys];
        $toast('danger', firstValue[0], { duration: 5000 })
    }else{
        if(!err?.response?.data?.success){
            $toast('danger', err?.response?.data?.message, { duration: 5000 })
        }else{
            $toast('danger', 'something went wrong...!', { duration: 5000 })
        }
    }
  }else{
    if(!err?.response?.data?.success){
        $toast('danger', err?.response?.data?.message, { duration: 5000 })
    }else{
        $toast('danger', 'something went wrong...!', { duration: 5000 })
    }
  }  
}

const resetFormData = () => {
    formData.value = {
        name: '',
        email: '',
        mobile_no: '',
        password: '',
    }
    vv$.value.$reset()
}

const deleteUpcomingMeet = (index: any) => {
    confirmationPopUP.value = true
    deleteAction.value = 'upcoming'
    user_List_id.value = userList.value.data[index]?.id
    return;
}

const confirmation = (data: Boolean) => {
    confirmationPopUP.value = false
    if (data) {
        users.delete(user_List_id.value).then((resp: any) => {
            if (deleteAction.value = 'upcoming') {
                getUserData();
                $toast('success', 'User Deleted successfully', { duration: 5000 })
            } else {
                getUserData();
            }
        }).catch((error) => {
            catchResponse(error)
        })
    }
}

const handlePageChange = (page: any) => {
    getUserParams.value.page = page
    getUserData()
};

</script>

<template>
    <div class="w-full h-full pb-8 overflow-y-auto dark:text-gray-300">
        <div class="text-gray-700 text-3xl">
            Users
        </div>
        <div class="mt-4 sm:mt-6">
            <div class="flex justify-end">
                <Button @click="joinModal = true" :text="'Add User'" class="font-semibold w-fit mt-5" />
            </div>
            <div class="p-3 sm:p-5 mt-5 bg-white dark:bg-gray-800 rounded-[20px]">
                <Table title="Users" :isSearchable="true" :headings="tableHeadings"  @search="searchUser" :data="userList.data">
                    <template v-slot:action="{ item, value, index }">
                        <div class="flex space-x-2">
                            <i class="fas fa-pencil text-primary-400 cursor-pointer" @click="edit(index)"></i>
                            <i @click="deleteUpcomingMeet(index)" class="fas fa-trash text-red-400 cursor-pointer"></i>
                        </div>
                    </template>
                </Table>
                <Pagination v-if="userList.total > 10" class="mt-4 flex justify-end" :totalRecords="userList.total"
                    :currentPage="getUserParams.page" :recordsPerPage="userList.per_page" @pageChange="handlePageChange" />
            </div>
        </div>
        <Modal :title="isEdit ? 'Update User' : 'Add User'" :subTitle="'Confra will join and record the meeting'"
            :show="joinModal" @close="joinModal = false">
            <div class="modal-content  p-4 md:p-5">
                <div class="col-span-2 mb-3">
                    <FormInput id="Name" label="Name" name="Name" type="text" placeholder="Name" icon="fas fa-user"
                        v-model="vv$.formData.name.$model" :errors="vv$.formData.name.$errors" />
                </div>
                <div class="col-span-2 mb-3">
                    <FormInput id="mobile_no" label="Mobile No." name="mobile_no" type="text" placeholder="Mobile No."
                        icon="fas fa-phone" v-model="vv$.formData.mobile_no.$model"
                        :errors="vv$.formData.mobile_no.$errors" />
                </div>
                <div v-if="isEdit == false" class="col-span-2 mb-3">
                    <FormInput id="Email" class="mt-3" label="Email" name="email" type="email" icon="fas fa-envelope"
                        placeholder="Email" v-model="vv$.formData.email.$model" :errors="vv$.formData.email.$errors" />
                </div>
                <div v-if="isEdit == false" class="col-span-2">
                    <FormInput id="password" class="mt-3" label="Password" name="password" type="password" icon="fas fa-eye"
                        placeholder="Password" v-model="vv$.formData.password.$model"
                        :errors="vv$.formData.password.$errors" />
                </div>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button class="mr-2" :text="isEdit ? 'Update' : 'Create'" frontIcon="fas fa-plus" @click="addUpdateUser" />
                <Button :text="'Cancel'" @click="joinModal = false" outline />
            </div>
        </Modal>
        <confirmation-popup v-if="confirmationPopUP" @confirmation="confirmation" />
    </div>
</template>

<style></style>
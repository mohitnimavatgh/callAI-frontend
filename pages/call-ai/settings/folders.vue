<script setup lang="ts">
import { debounce } from 'lodash-es';
import { useFolders } from "@/stores/user/folders";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
definePageMeta({
       middleware: "is-authenticate",
})
const ShowAddModal = ref(false);
const folderUpdate = ref(false);
const { $toast } = useNuxtApp()
const folders = useFolders()
const search = ref('')
const filterText = ref('Filter')
const folderParams = ref({ page: 1, search: '', action: null })
const items = [
  { value: "private", icon: 'fas fa-lock', labelText: "Private Access", description: "Restrict visibility to admins only, hiding it from team members." },
  { value: "public", icon: 'fas fa-user-group', labelText: "Team Access", description: "Grant team members access, making the folder visible to all." },
]

const actions = [
  { value: '', name: 'select Filter' }, 
  { value: 'no_of_meeting', name : 'Number of meetings'},
  { value: 'public', name : 'Team Access'},
  { value: 'private', name : 'Private Access'}, 
  { value: 'last_updated', name : 'Last Updated'}, 
  { value: 'alpha_order', name: 'Alphabatical Order' }, 
]

const foldersLists = computed(() => folders.folderPagination);

const folder = ref({
  name: '',
  access_type: 'private',
})

const rules = {
  folder: {
    name: {
      required: helpers.withMessage("The Name field is required", required),
    },
    access_type: {
      required: helpers.withMessage("The Folder Access field is required", required),
    }
  }
}
const v$ = useVuelidate(rules, { folder })

const getFolder = () => {
  folders.list(folderParams.value)
}

onMounted(async () => {
  await nextTick();
  await getFolder();
})

async function createFolder() {
  const result = await v$.value.$validate()
  if (result) {
    folders.create(folder.value).then((resp: any) => {
        $toast('success', 'Folder Create Successfully', { duration: 10000 })
        ShowAddModal.value = false;
        resetFolderData()
        getFolder();
    }).catch((err: any) => {
      catchResponse(err)
    })
  }
}

const updateFolder = async () => {
  const result = await v$.value.$validate()
  if (result) {
    folders.update(folder.value).then((resp: any) => {
      ShowAddModal.value = false
      folderUpdate.value = false;
      $toast('success', 'Folder Updated Successfully', { duration: 10000 })
      getFolder();
    }).catch((err: any) => {
      catchResponse(err)
    })
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

const closeModal = () => {
  resetFolderData()
  v$.value.$reset();
  ShowAddModal.value = false
}

const resetFolderData = () => {
  folder.value = {
    name: '',
    access_type: 'private',
  }
  v$.value.$reset()
}

const handleSearch = debounce(() => {
  folderParams.value.page = 1
  folderParams.value.search = search.value
  getFolder();
}, 700);

const folderPageChange = (page: any) => {
  folderParams.value.page = page
  getFolder()
};

const onSelect = (item) => {
  if(item == null){
    folderParams.value.action = null;
    filterText.value = 'Action'
  }else{
    folderParams.value.action = item.value;
    filterText.value = item.name
  }
  getFolder()
}

const edit = (data: any) => {
  folderUpdate.value = true;
  folder.value.name = data.name
  folder.value.access_type = data.access_type
  folder.value.id = data.id
  ShowAddModal.value = true
}
</script>
<template>
  <div class="mt-5">
    <div class="flex flex-wrap justify-between">
      <div class="mr-3">
        <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Manage Folders</h4>
        <p class="text-xs mb-3 text-nowrap font-normal text-gray-500 mt-0.5">Organize and customize your folders</p>
      </div>
      <div>
        <Button @click="ShowAddModal = true" frontIcon="fas fa-plus" :text="'Folder'" />
      </div>
    </div>

    <div class="mt-3 sm:flex items-center flex-wrap justify-end">
      <div class="flex sm:w-fit w-full justify-end">
        <DropDown class="mb-2 sm:mb-0 sm:mr-2" :buttonText="filterText" :actions="actions" @select="onSelect"/>
      </div>
      <FormInput type="text" icon="fas fa-search" :placeholder="`Search Folders`" v-model="search" @input="handleSearch"
        class="sm:w-56 w-full" />
    </div>
    <div class="mt-5 flex flex-wrap items-center bg-white dark:bg-gray-800 p-5 py-5 rounded-[20px]">
      <div v-if="foldersLists?.data.length" v-for="folderItem in foldersLists?.data" :key="folderItem"
        class="relative px-2 py-3 w-full sm:w-6/12 lg:w-4/12 xl:w-3/12 bg-white dark:bg-gray-700">
        <div class="flex justify-between border border-gray-100 px-3 py-2 rounded-lg items-center dark:border-none">
          <div class="flex items-center">
            <div class="bg-primary-50 dark:bg-gray-800 w-12 h-12 rounded-md">
              <div class="flex w-full h-full items-center text-center justify-center">
                <i class="fas fa-folder-open text-md text-primary-400 dark:text-primary-500"></i>
              </div>
            </div>
            <div class="ml-3 p-5">
              <p class="text-xs font-semibold text-gray-500">{{ folderItem.name }}</p>
              <p class="text-xs text-gray-400">Meetings: {{ folderItem.meeting_count }}</p>
            </div>
          </div>
          <div class="flex items-center ">
            <i class="text-xs text-gray-300 mr-2"
              :class="`fas ${folderItem.access_type == 'public' ? 'fa-user-group' : 'fa-lock'}`"></i>
            <div @mouseleave="folderItem.active = false" class="cursor-pointer">
              <i class="fas fa-ellipsis text-gray-300" @mouseover="folderItem.active = true"
                @click="folderItem.active = true"></i>
              <div v-if="folderItem.active"
                class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-20 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a @click="edit(folderItem)"
                      class="text-gray-400 text-xs block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><i
                        class="fas fa-pen text-gray-400 mr-2"></i>Edit</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="w-full">
        <div
          class="mx-auto text-xl w-full py-5 px-8 flex items-center justify-center border border-gray-100 text-gray-500 rounded-lg">
          <i class="fa fa-folder-open"></i>
          <div class="ml-5">
            No folders found.
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <Pagination
        v-if="foldersLists && foldersLists.total && foldersLists.per_page && foldersLists.total > foldersLists.per_page"
        class="mt-4 flex justify-end" :totalRecords="foldersLists.total" :currentPage="folderParams.page"
        :recordsPerPage="foldersLists.per_page" @pageChange="folderPageChange" />
    </div>
    <Modal :title="'Add Folder'" :show="ShowAddModal" @close="closeModal()">
      <div class="modal-content  p-4 md:p-5">
        <div class="col-span-2 mb-3">
          <FormInput id="Name" label="Folder Name" name="Folder Name" type="text" placeholder="Add Folder Name"
            rules="required" v-model="v$.folder.name.$model" :errors="v$.folder.name.$errors" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-500 ">Folder Access</label>
          <ul class="w-full">
            <li v-for="(item, index) in items" :key="index" class="mt-2">
              <FormRadio :id="`radio-${index}`" name="access" :value="item.value" v-model="v$.folder.access_type.$model"
                :errors="v$.folder.access_type.$errors" />
              <FormRadioLabel :icon="item.icon" :id="`radio-${index}`" :labelText="item.labelText"
                :description="item.description" />
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <Button class="mr-2" :text="'Add Folder'" v-if="!folderUpdate" @click="createFolder" frontIcon="fas fa-plus" />
        <Button class="mr-2" :text="'Update Folder'" v-else @click="updateFolder" frontIcon="fas fa-plus" />
        <Button :text="'Cancel'" @click="closeModal()" outline />
    </div>
  </Modal>
</div></template>  
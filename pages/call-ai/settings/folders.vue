<template>
    <div class="mt-5">
      <div class="flex justify-between">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Manage Folders</h4>        
            <p class="text-xs font-normal text-gray-500 mt-0.5">Organize and customize your folders</p>
        </div>
        <div>
            <Button @click="ShowAddModal = true"  frontIcon="fas fa-plus" :text="'Folder'" />
        </div>
      </div>
  
      <div class="mt-3 flex justify-end">
        <FormInput type="text" icon="fas fa-search" :placeholder="`Search Folders`" v-model="search" @input="handleSearch" class="w-56 "/>
      </div>
      <div class="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">        
        <div v-for="folderItem in foldersLists?.data" :key="folderItem" class="relative col-span-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <div class="relative w-full mt-2">            
            <img src="@/assets/image/folder.svg" alt="Folder" class="w-full h-auto">            
            <div class="absolute top-10 right-4 flex">
              <i class="text-sm text-gray-400 fas fa-lock mr-2"></i>
              <i class="text-sm text-gray-400 fas fa-pen cursor-pointer"></i>
            </div>            
            <div class="absolute bottom-4 left-4">
              <p class="font-medium text-gray-500 text-sm">{{ folderItem.name }}</p>
              <p class="font-medium text-gray-400 text-xs">Meetings: 20</p>
            </div>
          </div>
        </div>   
      </div>
      <div class="flex justify-center">
        <Pagination v-if="foldersLists && foldersLists.total && foldersLists.per_page && foldersLists.total > foldersLists.per_page" class="mt-4 flex justify-end" :totalRecords="foldersLists.total" :currentPage="folderParams.page" :recordsPerPage="foldersLists.per_page" @pageChange="folderPageChange"/>
      </div>
      <Modal :title="'Add Folder'" :show="ShowAddModal" @close="ShowAddModal = false">
        <div class="modal-content  p-4 md:p-5">
          <div class="col-span-2 mb-3">
            <FormInput                
                id="Name"
                label="Folder Name"
                name="Folder Name"
                type="text"
                placeholder="Add Folder Name"
                rules="required"
                v-model="v$.folder.name.$model"
                :errors="v$.folder.name.$errors"                
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500 ">Folder Access</label>
            <ul class="w-full">
                <li v-for="(item, index) in items" :key="index" class="mt-2">
                    <FormRadio :id="`radio-${index}`" name="access" :value="item.value" v-model="v$.folder.access_type.$model" :errors="v$.folder.access_type.$errors" />
                    <FormRadioLabel :icon="item.icon" :id="`radio-${index}`" :labelText="item.labelText" :description="item.description" />
                </li>
            </ul>
          </div>
      </div>
       <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button class="mr-2" :text="'Add Folder'" @click="createFolder" frontIcon="fas fa-plus"/>
                <Button :text="'Cancel'" @click="ShowAddModal = false" outline/>
            </div>
        </Modal>
    </div>
  </template>
  
<script setup lang="ts">
  import { useFolders } from "@/stores/user/folders";
  import { useVuelidate } from "@vuelidate/core";
  import { required, helpers } from "@vuelidate/validators";
  const ShowAddModal = ref(false);
  const folders = useFolders()
  const search = ref('')
  const folderParams = { page: 1,search:'' }
  const items = [
        { value: "private", icon: 'fas fa-lock',labelText: "Private Access", description: "Restrict visibility to admins only, hiding it from team members." },
        { value: "public", icon: 'fas fa-user-group',labelText: "Team Access", description: "Grant team members access, making the folder visible to all." },
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
  const v$ = useVuelidate(rules, {folder})

  const getFolder = () => {
    folders.list(folderParams)
  }

  onMounted(async () => {
    await nextTick();
    await getFolder();
  })

  async function createFolder() {  
      const result = await v$.value.$validate()
      if (result) {
        folders.create(folder.value).then((resp:any) => {
              if(resp.success) {
                getFolder();
                ShowAddModal.value = false;
              }
          })
      }
  }

  const handleSearch = () => {
    folderParams.page = 1
    folderParams.search = search.value  
    getFolder();   
  };

  const folderPageChange = (page: any) => {
    folderParams.page = page
    getFolder()
  };
  
</script>
  
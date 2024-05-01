<script setup lang="ts">
  import { debounce } from 'lodash-es';
  import { useFolders } from "@/stores/user/folders";
  import { useVuelidate } from "@vuelidate/core";
  import { required, helpers } from "@vuelidate/validators";
  const ShowAddModal = ref(false);
  const folderUpdate = ref(false);
  const { $toast } = useNuxtApp()
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
                $toast('success', 'Folder Create Successfully', { duration: 10000 })
                getFolder();
                ShowAddModal.value = false;
              }
          })
      }
  }

  const updateFolder = async () =>{  
    const result = await v$.value.$validate()
    if (result) {     
      folders.update(folder.value).then((resp:any) => {
        if(resp.success) {
          ShowAddModal.value = false
          folderUpdate.value = false;
          getFolder();               
          fromRest();
        }
      })
    }
  }

  const handleSearch = debounce(() => {
    folderParams.page = 1
    folderParams.search = search.value  
    getFolder();   
  }, 700);

  const folderPageChange = (page: any) => {
    folderParams.page = page
    getFolder()
  };
  
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
      <div class="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white dark:bg-gray-800 p-5 py-10 rounded-[20px]">        
        <div v-for="folderItem in foldersLists?.data" :key="folderItem" class="relative col-span-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 bg-white dark:bg-gray-700">
          <div class="flex justify-between border border-gray-100 px-3 py-1 rounded-lg items-center dark:border-none">
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
              <i class="text-xs text-gray-300 mr-2" :class="`fas fa-lock${folderItem.access_type == 'public'?'-open':''}`"></i> 
              <div  @mouseleave="folderItem.active = false" class="cursor-pointer">
                <i class="fas fa-ellipsis text-gray-300" @mouseover="folderItem.active = true" @click="folderItem.active = true" ></i>
                <div v-if="folderItem.active" class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-20 dark:bg-gray-700 dark:divide-gray-600">
                  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a @click="edit(folderItem)" class="text-gray-400 text-xs block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><i class="fas fa-pen text-gray-400 mr-2"></i>Edit</a>
                    </li>
                  </ul>
                </div>
              </div>
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
                <Button class="mr-2" :text="'Add Folder'" v-if="!folderUpdate" @click="createFolder" frontIcon="fas fa-plus"/>
                <Button class="mr-2" :text="'Update Folder'" v-else @click="updateFolder" frontIcon="fas fa-plus"/>
                <Button :text="'Cancel'" @click="ShowAddModal = false" outline/>              
            </div>
        </Modal>
    </div>
</template>  
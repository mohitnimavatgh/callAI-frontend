<script setup lang="ts">
import { debounce } from 'lodash-es';
import { useFolders } from "@/stores/admin/folders";
const route = useRoute();
const folders = useFolders()
const search = ref('')
const filterText = ref('Filter')
const folderParams = ref({ 
    page: 1, 
    search: '', 
    action:'', 
    user_id: route.params.id
});

const actions = [
  { value: '', name: 'select Filter' }, 
  { value: 'no_of_meeting', name : 'Number of meetings'},
  { value: 'public', name : 'Team Access'},
  { value: 'private', name : 'Private Access'}, 
  { value: 'last_updated', name : 'Last Updated'}, 
  { value: 'alpha_order', name: 'Alphabatical Order' }, 
]

const foldersLists = computed(() => folders.folderPagination);

const getFolder = () => {
  folders.list(folderParams.value).then((resp: any) => {})
  .catch((error: any) =>{
    catchResponse(error);
  })
}

onMounted(async () => {
  await nextTick();
  await getFolder();
})

const catchResponse = (err) => {
    if(err?.response?.status == 422){
        let data = err?.response?.data?.data
        if(data){
            let keys = Object.keys(data)[0];
            let firstValue = data[keys];
            $toast('danger', firstValue[0], { duration: 5000 })
        }else{
            $toast('danger', 'something went wrong...!', { duration: 5000 })
        }
    }else{
        $toast('danger', 'something went wrong...!', { duration: 5000 })
    }  
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
  folderParams.value.action = item.value;
  filterText.value = item.name
  getFolder()
}


</script>
<template>
  <div class="mt-5">
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
   
</div></template>  
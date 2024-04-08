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
        <FormInput type="text" icon="fas fa-search" :placeholder="`Search Folders`" class="w-56 "/>
      </div>
      <div class="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">        
        <div v-for="i in 30" :key="i" class="relative col-span-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <div class="relative w-full mt-2">            
            <img src="@/assets/image/folder.svg" alt="Folder" class="w-full h-auto">            
            <div class="absolute top-10 right-4 flex">
              <i class="text-sm text-gray-400 fas fa-lock mr-2"></i>
              <i class="text-sm text-gray-400 fas fa-pen cursor-pointer"></i>
            </div>            
            <div class="absolute bottom-4 left-4">
              <p class="font-medium text-gray-500 text-sm">Mohit Nimavat's Folder</p>
              <p class="font-medium text-gray-400 text-xs">Meetings: 20</p>
            </div>
          </div>
        </div>
      </div>
      <Modal :title="'Add Folder'" :show="ShowAddModal" @close="ShowAddModal = false">
        <div class="modal-content  p-4 md:p-5">
          <div class="col-span-2 mb-3">
            <FormInput 
                v-model="folder_name"
                id="Name"
                label="Folder Name"
                name="Folder Name"
                type="text"
                placeholder="Add Folder Name"
                rules="required"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500 ">Folder Access</label>
            <ul class="w-full">
                <li v-for="(item, index) in items" :key="index" class="mt-2">
                    <FormRadio :id="`radio-${index}`" name="access" :value="item.value" v-model="access" />
                    <FormRadioLabel :icon="item.icon" :id="`radio-${index}`" :labelText="item.labelText" :description="item.description" />
                </li>
            </ul>
          </div>
      </div>
       <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Button class="mr-2" :text="'Add Folder'" @click="ShowAddModal = false" frontIcon="fas fa-plus"/>
                <Button :text="'Cancel'" @click="ShowAddModal = false" outline/>
            </div>
        </Modal>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ShowAddModal: false,
        access: 'private',
        items: [
            { value: "private", icon: 'fas fa-lock',labelText: "Private Access", description: "Restrict visibility to admins only, hiding it from team members." },
            { value: "public", icon: 'fas fa-user-group',labelText: "Team Access", description: "Grant team members access, making the folder visible to all." },
        ]
      };
    },
  };
  </script>
  
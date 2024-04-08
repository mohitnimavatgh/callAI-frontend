<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Manage Quick Questions</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Customize your Quick Questions</p>
        </div>    
        <div class="box mt-3 lg:w-2/3 w-full">
            <FormInput 
                id="Title"
                class="mt-4"
                label="Title"
                name="Title"
                type="text"
                placeholder="Enter Title"
                rules="required"
                v-model="title"
            />
            <div class="mt-3">
                <label class="text-sm font-medium text-gray-500 ">Folder Access</label>
                <ul class="grid w-full gap-3 md:grid-cols-2">
                    <li v-for="(item, index) in items" :key="index" class="mt-2">
                        <FormRadio :id="`radio-${index}`" name="access" :value="item.value" v-model="access" />
                        <FormRadioLabel :icon="item.icon" :id="`radio-${index}`" :labelText="item.labelText" :description="item.description" />
                    </li>
                </ul>
            </div>
            <div class="my-4 flex justify-end">
                <Button :text="'Add Quick Question'" frontIcon="fas fa-plus" class="m-0"/>
            </div>
        </div>

        <div class="box mt-5">
            <Table
               :headings="tableHeadings"
               :data="tableData"
               :isSearchable="true"
               title="Quick Questions"
               @search="handleSearch"
           >
            <template v-slot:action="{ item, value }">
                    <div class="flex justify-start">
                        <i @click="viewCall(item)" class="fas fa-pen text-blue-400 mr-3"></i>
                        <i class="fas fa-trash text-red-400"></i>
                    </div>
                    
                </template>
            </Table>                
            <Pagination class="mt-5 flex justify-end" :totalPage="10" :currentPage="3"/>
        </div>
    </div>
</template>

<script>
export default {
 data() {
   return {
    title: '',
    access: 'private',
    items: [
        { value: "private", icon: 'fas fa-lock',labelText: "Private Access", description: "Restrict visibility to admins only, hiding it from team members." },
        { value: "public", icon: 'fas fa-user-group',labelText: "Team Access", description: "Grant team members access, making the folder visible to all." },
    ],
    tableHeadings:[
        { title: 'Title', value: 'title' },
        { title: 'Access', value: 'access' },
        { title: 'Action', value: 'action' },
    ],
    tableData:[
        { title: 'Create a email copy', access: 'Private', action: 'Edit' },
        { title: 'Compose a comprehensive email summarizing the details.', access: 'Public', action: 'Edit' },
    ],
   };
 },
}
</script>

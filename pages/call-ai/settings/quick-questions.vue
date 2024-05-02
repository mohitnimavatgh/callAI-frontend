<script setup lang="ts">
  import { useQuickQuestions } from "@/stores/user/quickQuestions";
  import { useVuelidate } from "@vuelidate/core";
  import { required, helpers } from "@vuelidate/validators";
  const QuickQuestionUpdate = ref(false);
  const quickQuestions = useQuickQuestions()
  const { $toast } = useNuxtApp()
  const { $api } = useNuxtApp()
  const quickQuestionParams = ref({ page: 1,search:'' })
  const items = [
    { value: "private", icon: 'fas fa-lock',labelText: "Private Access", description: "Restrict visibility to admins only, hiding it from team members." },
    { value: "public", icon: 'fas fa-user-group',labelText: "Team Access", description: "Grant team members access, making the folder visible to all." },
  ];
 const tableHeadings = [
    { title: 'Id', value: 'id' },
    { title: 'Name', value: 'name' },
    { title: 'Access', value: 'access_type' },
    { title: 'Action', value: 'action' },
 ];

  const quickQuestionLists = computed(() => quickQuestions.quickQuestions);

  const quickQuestion = ref({
    name: '',
    access_type: 'private',   
  })

  const rules = {
    quickQuestion: {
      name: {
        required: helpers.withMessage("The Name field is required", required),
      },
      access_type: {
        required: helpers.withMessage("The Quick Question Access field is required", required),
      }       
    }
  }
  const v$ = useVuelidate(rules, {quickQuestion})

  const getQuickQuestion = () => {
    quickQuestions.list(quickQuestionParams.value)
  }

  onMounted(async () => {
    await nextTick();
    await getQuickQuestion();
  })

  const createQuickQuestion = async () =>{ 
    const result = await v$.value.$validate()
    if (result) {     
      quickQuestions.create(quickQuestion.value).then((resp:any) => {
        if(resp.success) {
          $toast('success', 'Quick Question Create Successfully', { duration: 10000 })
          fromRest();
          getQuickQuestion();               
        }
      })
    }
  }

  const fromRest = () =>{
    quickQuestion.value.name = '';
    quickQuestion.value.access_type = 'private'
    v$.value.$reset();
  }

  const edit = (data) =>{
    QuickQuestionUpdate.value = true;
    quickQuestion.value.name = data.name;
    quickQuestion.value.access_type = data.access_type
    quickQuestion.value.id = data.id
  }

  const deleteQuickQuestion = (data) =>{
    quickQuestions.delete(data.id).then((resp:any) => {
      if(resp.success) {        
        getQuickQuestion();               
      }
    })
  }

  const updateQuickQuestion = async () =>{  
    const result = await v$.value.$validate()
    if (result) {     
      quickQuestions.update(quickQuestion.value).then((resp:any) => {
        if(resp.success) {
          QuickQuestionUpdate.value = false;
          fromRest();
          getQuickQuestion();               
        }
      })
    }
  }

  const handleSearch = (value) => {
    quickQuestionParams.page = 1
    quickQuestionParams.search = value    
    getQuickQuestion();
  };

  const quickQuestionPageChange = (page: any) => {
    quickQuestionParams.page = page
    getQuickQuestion()
  };

</script>
<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Manage Quick Questions</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Customize your Quick Questions</p>
        </div>    
        <div class="box mt-3 lg:w-2/3 w-full bg-white dark:bg-gray-800">
            <FormInput 
                id="Title"
                class="mt-4"
                label="Title"
                name="Title"
                type="text"
                placeholder="Enter Title"
                v-model="v$.quickQuestion.name.$model"
                :errors="v$.quickQuestion.name.$errors" 
                :modelValue="quickQuestion.name"
            />
            <div class="mt-3">
                <label class="text-sm font-medium text-gray-500 ">Quick Question Access</label>
                <ul class="grid w-full gap-3 md:grid-cols-2">
                    <li v-for="(item, index) in items" :key="index" class="mt-2">
                        <FormRadio :id="`radio-${index}`" name="access" :value="item.value" v-model="v$.quickQuestion.access_type.$model" :errors="v$.quickQuestion.access_type.$errors" />
                        <FormRadioLabel :icon="item.icon" :id="`radio-${index}`" :labelText="item.labelText" :description="item.description" />
                    </li>
                </ul>
            </div>
            <div class="my-4 flex justify-end">
                <Button text="Add Quick Question" v-if="!QuickQuestionUpdate" @click="createQuickQuestion"  frontIcon="fas fa-plus" class="m-0"/>
                <Button text="Update Quick Question" v-else @click="updateQuickQuestion"  frontIcon="fas fa-plus" class="m-0"/>
            </div>
        </div>

        <div class="box mt-5 bg-white dark:bg-gray-800">
            <Table
               :headings="tableHeadings"
               :data="quickQuestionLists?.data"
               :isSearchable="true"
               title="Quick Questions"
               @search="handleSearch"
           >
            <template v-slot:action="{ item, value }">
                    <div class="flex justify-start">
                        <i @click="edit(item)" class="fas fa-pen text-blue-400 mr-3"></i>
                        <i @click="deleteQuickQuestion(item)" class="fas fa-trash text-red-400"></i>
                    </div>
                    
                </template>
            </Table>                
            <Pagination v-if="quickQuestionLists && quickQuestionLists.total && quickQuestionLists.per_page && quickQuestionLists.total > quickQuestionLists.per_page" class="mt-4 flex justify-end" :totalRecords="quickQuestionLists.total" :currentPage="quickQuestionParams.page" :recordsPerPage="quickQuestionLists.per_page" @pageChange="quickQuestionPageChange"/>
        </div>
    </div>
</template>

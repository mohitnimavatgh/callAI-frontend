<script setup lang="ts">
  import { useBots } from "@/stores/user/bots";
  import { useVuelidate } from "@vuelidate/core";
  import { required, helpers,email,requiredIf } from "@vuelidate/validators";   
  const bots = useBots()
  const { $toast } = useNuxtApp()

var action_type = 'Send Email';
const bot = ref({
    bot_name: null, 
    after_complete_run_actions: null,
    action: null,
    transcription_tool:null,
    recording_type:null,
    multiple_emails: null,
})

const rules = {
    bot:{
        bot_name: {
            required: helpers.withMessage("The Bot Name field is required", required),          
        },
        after_complete_run_actions: {
            required: helpers.withMessage("The Meeting Action field is required", required),          
        },
        action:{
            required: requiredIf(function (nestedModel) {
                return bot.value.after_complete_run_actions == action_type
            }),          
        },
        multiple_emails:{
            required: requiredIf(function (nestedModel) {
                return bot.value.after_complete_run_actions == action_type
            }),
            email: helpers.withMessage("Please Enter a valid Email Address", email),
        },
        transcription_tool:{},
        recording_type:{}
    }
}
const v$ = useVuelidate(rules, {bot})

const actionList = ref([
    { value: 'nothing', name: 'Nothing'},
    { value: 'action', name: 'Send Email'}
])

const emailArray = ref([]);

const botSave = async() => {
    const result = await v$.value.$validate()
    if (result) { 
        if(bot.value.after_complete_run_actions == 'Send Email') {
            bot.value.multiple_emails = emailArray.value
        }
        bots.create(bot.value).then((resp:any) => {
            if(resp?.success) {   
                $toast('success', 'bot create Successfully', { duration: 10000 })
            }
        }).catch((error) => {
            console.log("Error:", error);                  
        })
    }
}

const handleKeys = (event) => {
    // console.log("v$.value.$errors.length--",v$.value.$errors.length)
    if (event.key === 'Enter' && v$.value.$errors.length == 0) {
        event.preventDefault();
        if (bot.value.multiple_emails.length > 0 && bot.value.multiple_emails.trim().length > 0) {
            emailArray.value.push(bot.value.multiple_emails.trim());
            bot.value.multiple_emails = null;
        }
    }
}

const deleteField =(index) => {
    emailArray.value.splice(index, 1);
}

</script>

<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Bot Configuration</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Change your meeting bot settings</p>
        </div>    
        <div class="p-5 mt-3 lg:w-1/2 w-full bg-white dark:bg-gray-800 rounded-lg">
            <FormInput 
                id="Bot Name"
                class="mt-4"
                label="Bot Name"
                name="Bot Name"
                type="text"
                placeholder="Enter Bot Name"
                rules="required"
                v-model="v$.bot.bot_name.$model"
                :errors="v$.bot.bot_name.$errors"
            />

            <FormSelect class="mt-4" label="Action After Meeting Complete" id="action" name="action" v-model="v$.bot.after_complete_run_actions.$model" :errors="v$.bot.after_complete_run_actions.$errors" :options="actionList" rules="required" />
            <div v-if="bot.after_complete_run_actions == action_type">
                <FormInput 
                    
                    id="Action"
                    class="mt-4"
                    label="What Action You Want To Perform"
                    name="Action"
                    type="text"
                    placeholder="Enter Action"
                    rules="required"
                    v-model="v$.bot.action.$model" 
                    :errors="v$.bot.action.$errors"
                />
                <FormInput 
                    
                    id="Email"
                    class="mt-4"
                    label="Enter Email"
                    name="Email"
                    type="text"
                    placeholder="Enter Email"
                    rules="required|email"
                    v-model="v$.bot.multiple_emails.$model" 
                    :errors="v$.bot.multiple_emails.$errors"
                    @keydown="handleKeys"
                />
                <ul>
                    <li v-for="(item, index) in emailArray" :key="index">
                        <p class="mt-2 dark:text-white text-ref-500 w-fit">
                            <span  class="text-lg font-medium flex items-center px-2.5 py-0.5 rounded text-black-500 bg-gray-100 dark:bg-gray-900 dark:text-gray-300`">
                                {{ item }} <i class="text-sm text-black-400 fas fa-close ml-1" @click="deleteField(index)"></i>
                            </span>
                            
                        </p>
                    </li>
                </ul>
            </div>
            <div class="mt-4 flex justify-end">
                <Button :text="'Save'" class="m-0" @click="botSave()" />
            </div>
        </div>
    </div>
</template>

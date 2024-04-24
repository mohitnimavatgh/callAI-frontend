<script setup lang="ts">
  import { useBots } from "@/stores/user/bots";
  const bots = useBots()
import { useVuelidate } from "@vuelidate/core";
import { required, helpers,email,requiredIf } from "@vuelidate/validators";   

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

const botSave = async() => {
    const result = await v$.value.$validate()
    if (result) { 
        bots.create(bot.value).then((resp:any) => {
            if(resp?.success) {   
                $toast('success', 'bot create Successfully', { duration: 10000 })
            }
        }).catch((error) => {
            console.log("Error:", error);                  
        })
    }
}

</script>

<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Bot Configuration</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Change your meeting bot settings</p>
        </div>    
        <div class="box mt-3 lg:w-1/2 w-full bg-white dark:bg-gray-800">
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
                />
            </div>
            <div class="mt-4 flex justify-end">
                <Button :text="'Save'" class="m-0" @click="botSave()" />
            </div>
        </div>
    </div>
</template>

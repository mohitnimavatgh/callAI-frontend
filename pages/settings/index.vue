<script setup lang="ts">
import { useBots } from "@/stores/user/bots";
import { initFlowbite } from 'flowbite'
import { useLoader } from "@/stores/loader";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email, requiredIf } from "@vuelidate/validators";
definePageMeta({
       middleware: "is-authenticate",
})
const bots = useBots()
const loader = useLoader();
const { $toast } = useNuxtApp()

onMounted(() => {
    initFlowbite();
    getbot();
})

var action_type = 'action';
const bot = ref({
    bot_name: null,
    after_complete_run_actions: '',
    action: null,
    transcription_tool: null,
    recording_type: null,
    multiple_emails: null,
})
const emailArray = ref([]);

const rules = {
    bot: {
        bot_name: {
            required: helpers.withMessage("The Bot Name field is required", required),
        },
        after_complete_run_actions: {
            required: helpers.withMessage("The Meeting Action field is required", required),
        },
        // action: {
        //     required: requiredIf(function (nestedModel) {
        //         return bot.value.after_complete_run_actions == action_type
        //     }),
        // },
        multiple_emails: {
            email: helpers.withMessage("Please Enter a valid Email Address", email),
            required: requiredIf(function (nestedModel) {
                if(bot.value.after_complete_run_actions == action_type){
                    if(emailArray.value.length == 0){
                        return true
                    }
                }
            })
        },
        transcription_tool: {},
        recording_type: {}
    }
}
const v$ = useVuelidate(rules, { bot })

const actionList = ref([
    { id: 'nothing', name: 'Nothing' },
    { id: 'action', name: 'Send Email' }
])

const getbot = async () => {
    loader.loading = true
    bots.botList().then((resp: any) => {
        console.log("resp---",resp)
        loader.loading = false
        bot.value.bot_name = resp.bot_name
        bot.value.after_complete_run_actions = resp.after_complete_run_actions
        bot.value.action = resp.action
        emailArray.value = resp.multiple_emails
    }).catch((err) => {
        loader.loading = false
        catchResponse(err)
    })
}

const botSave = async () => {
    const result = await v$.value.$validate()
    if (result) {
        resetBotValidation();
        loader.loading = true
        if (bot.value.after_complete_run_actions == 'action') {
            bot.value.multiple_emails = emailArray.value
        }
        console.log("bot.value--",bot.value)
        bots.create(bot.value).then((resp: any) => {
            loader.loading = false
            resetBotValidation()
            $toast.success('Bot create Successfully', { duration: 5000 })
        }).catch((err) => {
            loader.loading = false
            catchResponse(err)
        })
    }
}

const catchResponse = (err: any) => {
  if(err?.response?.status == 422){
    let data = err?.response?.data?.data
    if(data){
        let keys = Object.keys(data)[0];
        let firstValue = data[keys];
        $toast.error(firstValue[0], { duration: 5000 })
    }else{
        if(!err?.response?.data?.success){
            $toast.error(err?.response?.data?.message, { duration: 5000 })
        }else{
            $toast.error('something went wrong...!', { duration: 5000 })
        }
    }
  }else{
    if(!err?.response?.data?.success){
        $toast.error(err?.response?.data?.message, { duration: 5000 })
    }else{
        $toast.error('something went wrong...!', { duration: 5000 })
    }
  }  
}

const resetBotValidation = () => {
    bot.value.multiple_emails = []
    v$.value.$reset()
}

const handleKeys = async (event: any) => {
    // console.log("v$.value.$errors.length--",v$.value.$errors.length)
    const result = await v$.value.$validate()
    if (result) {
        if (event?.key === 'Enter' || event?.key === ' ' || event === undefined) {
            event?.preventDefault();
            if (bot.value.multiple_emails.length > 0 && bot.value.multiple_emails.trim().length > 0) {
                if(!emailArray.value.includes(bot.value.multiple_emails.trim())){
                    emailArray.value.push(bot.value.multiple_emails.trim());
                }
                bot.value.multiple_emails = null;
            }
        }
    }
}

watch(() => bot.value.after_complete_run_actions, (val) => {  
  if(val == 'nothing'){
    emailArray.value = []
    bot.value.action = null
    bot.value.multiple_emails = null
    v$.value.$reset()
  }
});

const deleteField = (index : any) => {
    emailArray.value.splice(index, 1);
}

</script>

<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Bot Configuration</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Change your meeting bot settings</p>
        </div>
        <div class="p-5 mt-3 dark:p-0 lg:w-1/2 w-full bg-white dark:bg-gray-800 rounded-lg">
            <FormInput id="Bot Name" class="mt-4" label="Bot Name" name="Bot Name" type="text" placeholder="Enter Bot Name"
                rules="required" v-model="v$.bot.bot_name.$model" :errors="v$.bot.bot_name.$errors" />

            <FormSelect class="mt-4" label="Action After Meeting Complete" id="action" name="action" placeholder="Select Action"
                v-model="v$.bot.after_complete_run_actions.$model" :errors="v$.bot.after_complete_run_actions.$errors"
                :options="actionList" rules="required" />
            <div v-if="bot.after_complete_run_actions == action_type">
                <!-- <FormInput id="Action" class="mt-4" label="What Action You Want To Perform" name="Action" type="text"
                    placeholder="Enter Action" rules="required" v-model="v$.bot.action.$model"
                    :errors="v$.bot.action.$errors" /> -->
                <FormInput id="Email" class="mt-4" label="Enter Email" name="Email" type="text" placeholder="Enter Email"
                    rules="required|email" v-model="v$.bot.multiple_emails.$model" :errors="v$.bot.multiple_emails.$errors"
                    @keydown="handleKeys" @focusOut="handleKeys" :onBlur="true"/>
                <ul class="flex items-center flex-wrap">
                    <li v-for="(item, index) in emailArray" :key="index">
                        <p class="mt-2 mr-2 dark:text-white text-ref-500 w-fit">
                            <span
                                class="text-sm font-medium flex items-center px-2.5 py-0.5 rounded text-black-500 bg-gray-100 dark:bg-gray-900 dark:text-gray-300`">
                                {{ item }} <i class="text-sm text-black-400 fas fa-close ml-1"
                                    @click="deleteField(index)"></i>
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

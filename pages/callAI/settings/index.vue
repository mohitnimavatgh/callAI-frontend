<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Bot Configuration</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Change your meeting bot settings</p>
        </div>    
        <div class="box mt-3 lg:w-1/2 w-full">
            <FormInput 
                id="Bot Name"
                class="mt-4"
                label="Bot Name"
                name="Bot Name"
                type="text"
                placeholder="Enter Bot Name"
                rules="required"
                v-model="bot_name"
            />

            <FormSelect class="mt-4" label="Action After Meeting Complete" id="action" name="action" v-model="meeting_action" :options="actionList" rules="required" />
            <div v-if="meeting_action == 'action'">
                <FormInput 
                    
                    id="Action"
                    class="mt-4"
                    label="What Action You Want To Perform"
                    name="Action"
                    type="text"
                    placeholder="Enter Action"
                    rules="required"
                    v-model="action"
                />
                <FormInput 
                    
                    id="Email"
                    class="mt-4"
                    label="Enter Email"
                    name="Email"
                    type="text"
                    placeholder="Enter Email"
                    rules="required|email"
                    v-model="email"
                />
            </div>
            <div class="mt-4 flex justify-end">
                <Button :text="'Save'" class="m-0"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
 data() {
   return {
    meeting_action: 'nothing',
    bot_name: '',
    email: '',
    action :'',
     actionList: [
       { value: 'nothing', label: 'Nothing'},
       { value: 'action', label: 'Send Email'}
     ],
   };
 },
}
</script>

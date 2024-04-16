<template>
    <div class="mt-5">
        <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">Configure Your Calendar</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">Get started by connecting your calendar account </p>
        </div>
        <div class="flex flex-col lg:flex-row bg-white mt-3 box bg-white dark:bg-gray-800">
            <div class="flex-1 p-5 flex flex-col justify-center items-center">
                <div class="flex items-center mb-3">
                    <img class="w-6 mr-2" src="@/assets/image/google-calendar.png" alt="Google Calendar"/>
                    <span class="font-medium text-gray-500 text-sm">Google Calendar</span>
                </div>
                <Button :text="'Connect'" outline class="mt-2" />
            </div>
            <div class="lg:border-l border-gray-300 lg:flex-1 p-5 flex flex-col justify-center items-center">
                <div class="flex items-center mb-3">
                    <img class="w-6 mr-2" src="@/assets/image/teams-calendar.png" alt="Microsoft Teams Calendar"/>
                    <span class="font-medium text-gray-500 text-sm">Microsoft Teams Calendar</span>
                </div>
                <Button :text="'Disconnect'" class="mt-2" />
            </div>
        </div>
        <div>
            <p class="text-sm font-normal text-gray-500 mt-3">Change Your Calendar Meeting Settings</p>
        </div>
        <div class="box lg:w-1/2 w-full mt-2 bg-white dark:bg-gray-800">
            <div v-for="(option, key ) in recordingOption" class="flex justify-between p-3" :key="key" :class="{'bg-primary-50 mt-2 rounded-t-lg' : key == 0} ">
                <span class="font-medium text-gray-500 text-sm">{{option.text}}</span>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="option.value" class="sr-only peer">
                        <div class="relative w-11 h-6 bg-gray-200 dark:peer-focus:ring-primary-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                    </label>
            </div>
            <div class="flex justify-end  mt-4">
                <Button :text="'Save'" class="flex text-center mr-2" outline/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
 data() {
   return {
        recordingOption: [
            { text: 'Record All Meetings', value: true },
            { text: 'Record meetings where I am the host', value: true },
            { text: 'Record meetings where I am not the host', value: true },
            { text: 'Record external meetings', value: true },
            { text: 'Record internal meetings', value: true },
            { text: 'Record confirmed-only meetings', value: true }
        ]
   };
 },
}
</script>

<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import { useMeetings } from '@/stores/user/meetings'

const route = useRoute()
const { $toast } = useNuxtApp()
const props = defineProps(['data'])
const edit = ref<boolean>(false)
const meetings = useMeetings()
const nextActions = ref<any>([])
const ghhags = ref([]);

onMounted(async () => {
    await initFlowbite();
    ghhags.value = props.data
});

const SubmitAction = () => {
    meetings.updateNextActions({ id: route.params.id, action: nextActions.value }).then((res) => {
        $toast.success('Next Step updated successfully', { duration: 5000 })
    }).catch((err) => {
        catchResponse(err)
    })
    edit.value = false
}

const catchResponse = (err: any) => {
    if (err?.response?.status == 422) {
        let data = err?.response?.data?.data
        if (data) {
            let keys = Object.keys(data)[0];
            let firstValue = data[keys];
            $toast.error(firstValue[0], { duration: 5000 })
        } else {
            if (!err?.response?.data?.success) {
                $toast.error(err?.response?.data?.message, { duration: 5000 })
            } else {
                $toast.error('something went wrong...!', { duration: 5000 })
            }
        }
    } else {
        if (!err?.response?.data?.success) {
            $toast.error(err?.response?.data?.message, { duration: 5000 })
        } else {
            $toast.error('something went wrong...!', { duration: 5000 })
        }
    }
}

const updateNextAction = (event : any) => {
    if(event.target.value != ''){
        nextActions.value.push(event.target.value)
        event.target.value = ''
        SubmitAction()
    }
}

const cancelSubmit = () => {
    console.log(ghhags.value, '=============');
    nextActions.value = props.data
    edit.value = false
}

const deleteNextAction = (index: number) => {
    nextActions.value.splice(index, 1);
}


</script>

<template>
    <div id="accordion-color" data-accordion="collapse"
        data-active-classes="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
        <h2 id="accordion-color-heading-1">
            <button type="button"
                class="flex items-center justify-between shadow-md w-full p-5 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-500 dark:text-gray-400 dark:bg-gray-700 gap-3"
                data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
                <span class="dark:text-gray-300 text-gray-500 text-sm font-semibold">Next Actions</span>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5 5 1 1 5" />
                </svg>
            </button>
        </h2>
        <div id="accordion-color-body-1" class="hidden" aria-labelledby="accordion-color-heading-1">
            <div class="dark:bg-gray-700 bg-gray-100 p-5">
                <ul>
                    <li v-for="(item, index) in nextActions" :key="index" :class="{'mt-2' : index !== 0, 'py-2' : !edit}" class="flex px-4 py-1 justify-between items-center border dark:border-gray-500 border-gray-400">
                        <div v-if="!edit" class="font-medium text-gray-500 text-sm dark:text-gray-300">
                            {{ item }}
                        </div>
                        <input v-else type="text" :value="item" class="font-medium w-4/5 py-3 rounded-md px-3 border-0 focus:outline-none focus:border-0 focus:ring-0 text-gray-500 h-4 px-1 text-sm dark:text-gray-300 bg-transparent">
                        <button v-if="edit" @click="deleteNextAction(index)" class="font-bold text-gray-500 text-sm dark:text-gray-300">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </li>
                    <li v-if="edit" class="flex mt-2 border dark:border-gray-500 border-gray-400 justify-between items-center py-1 px-4">
                        <input type="text" @blur="updateNextAction" class="font-medium py-3 rounded-md px-3 h-4 py-3 border-0 focus:outline-none focus:border-0 focus:ring-0 text-gray-500 text-sm dark:text-gray-300 px-1 bg-transparent">
                    </li>
                </ul>
            </div>
            <div class="flex border-t border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-600 p-4 items-center justify-between">
                <div
                    class="flex space-x-3 items-center">
                    <Button v-if="edit" class="scale-90" text="Submit" @click="SubmitAction" />
                    <Button v-if="edit" class="scale-90" text="Cancel" @click="cancelSubmit" />
                </div>
                <Button class="scale-90" text="Add Next Step" @click="edit = true" />
            </div>
        </div>
    </div>
</template>
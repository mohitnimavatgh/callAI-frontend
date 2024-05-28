<script setup lang="ts">
import { useQuickQuestions } from "@/stores/user/quickQuestions";
import { useChatToCall } from "@/stores/user/chatToCall";
import { useRoute } from 'vue-router';
import { initFlowbite } from "flowbite";
const route = useRoute();
const quickQuestions = useQuickQuestions()
const chatToCall = useChatToCall()
const { $toast } = useNuxtApp()
const props = defineProps({
    meetingDetail: null,
});
const meetingId = ref(route.params.id)

const chat = ref({
    meeting_id: meetingId.value,
    chat_to_call_id: chatToCall.chatId,
    quick_question_id: null,
    question: '',
})
const collapse = ref<boolean>(false)

const detail = ref(null)
const faqsList = computed(() => {
    detail.value = props.meetingDetail
    if (props.meetingDetail?.faqs) {
        return JSON.parse(JSON.parse(props.meetingDetail?.faqs))
    }
    return [];
});

const quickQuestionParams = { page: null, search: '' }
const chatToCallParams = { meeting_id: meetingId.value }

onMounted(async () => {
    initFlowbite();
    await nextTick()
    await getChatToCall()
    await getQuickQuestions()
});

const getQuickQuestions = () => {
    quickQuestions.list(quickQuestionParams)
}
const getChatToCall = () => {
    chatToCall.list(chatToCallParams)
}
const quickQuestionPageChange = (page: any) => {
    quickQuestionParams.page = page
    getQuickQuestions()
};

const quickQuestionLists = computed(() => quickQuestions.allQuickQuestions);
const chatToCallLists = computed(() => chatToCall.getChatList);

const handleKeyEvent = () => {
    chat.value.quick_question_id = null;
}

const sendMessage = () => {
    chatToCall.create(chat.value).then((resp: any) => {
        chat.value.question = null;
        //@ts-ignore
        document.getElementById("question").value = null;
        getChatToCall();
    }).catch((error) => {
        catchResponse(error)
    })
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

const quickQuestionCall = (item: any) => {
    chat.value.question = null;
    chat.value.quick_question_id = item.id;
    //@ts-ignore
    document.getElementById("question").value = item.name;
}

const copyChat = () => {
    const chatString = chatToCall.getChatList.map(chat => `Q:- ${chat.question}\nA:- ${chat.answer}`).join('\n\n');

    // Create a temporary textarea to hold the text to copy
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = chatString;
    document.body.appendChild(tempTextArea);

    // Select the text
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, tempTextArea.value.length); // For mobile devices

    try {
        // Copy the text
        document.execCommand('copy');
        $toast.success('Chat Copied to clipboard', { duration: 100 });
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }

    // Clean up
    document.body.removeChild(tempTextArea); 
}

const downloadChat = () => {
    const chatString = chatToCall.getChatList.map(chat => `Q:- ${chat.question}\nA:- ${chat.answer}`).join('\n\n');

    // Create a blob from the string
    const blob = new Blob([chatString], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat.txt';

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
}


</script>
<template>
    <div class="mt-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="col-span-2 ">
                <div class="flex flex-col" :class="collapse ? 'fixed top-0 right-0 left-0 bottom-0' : ''">
                    <div class="py-2.5 h-fit text-gray-800 px-5 block bg-gray-200 sm:flex items-center justify-between">
                        <div>
                            <FormInput icon="fa fa-pencil" class="w-fit" id="question" placeholder="Chat title" @keypress="" />
                        </div>
                        <div class="">
                            <ul class="flex items-center space-x-3">
                                <li>
                                    <button @click="copyChat" data-tooltip-target="tooltip-copy" type="button"><i
                                            class="fa fa-copy"></i></button>

                                    <div id="tooltip-copy" role="tooltip"
                                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-500 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Copy
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </li>
                                <li>
                                    <button @click="downloadChat" data-tooltip-target="tooltip-download" type="button"><i
                                            class="fa fa-download"></i></button>

                                    <div id="tooltip-download" role="tooltip"
                                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-500 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Download
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </li>
                                <li>
                                    <button data-tooltip-target="tooltip-clear" type="button"><i
                                            class="fa fa-rotate-right"></i></button>

                                    <div id="tooltip-clear" role="tooltip"
                                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-500 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Clear
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </li>
                                <li>
                                    <button data-tooltip-target="tooltip-email" type="button"><i
                                            class="fa fa-envelope"></i></button>

                                    <div id="tooltip-email" role="tooltip"
                                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-500 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Send Email
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </li>
                                <li>
                                    <button @click="collapse = !collapse" class="text-xl transition duration-300" data-tooltip-target="tooltip-collapse"
                                        type="button"><i class="fa"
                                            :class="collapse ? 'fa-compress' : 'fa-expand'"></i></button>

                                    <div id="tooltip-collapse" role="tooltip"
                                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-500 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        {{ collapse ? 'Collapse' : 'Expand' }}
                                        <div class="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div :class="collapse ? 'h-full' : 'h-600 min-h-600'"
                        class="bg-white overflow-hidden flex flex-col">
                        <div class="p-5 h-full overflow-y-scroll">
                            <CallChatTiles id="chat" :lists="chatToCallLists" />
                        </div>
                        <div class="p-4 h-fit">
                            <FormInput size="large" id="question" v-model="chat.question" placeholder="Ask Someting"
                                @keypress="handleKeyEvent()" @submitChat="sendMessage()" />
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <label class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Quick Questions</label>
                    <div class="bg-white rounded-lg p-5 text-gray-600 text-sm leading-7">
                        <ul>
                            <li v-for="quickQuestion in quickQuestionLists" :key="index">
                                <button type="button" @click="quickQuestionCall(quickQuestion)"
                                    class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    {{ quickQuestion?.name }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div class="bg-white rounded">
                    <Accordion :title="`Meeting FAQ's`" :icon="'fas fa-circle-question'" :accordions="faqsList" />
                </div>
            </div>
        </div>
    </div></template>

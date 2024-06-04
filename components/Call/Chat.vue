<script setup lang="ts">
import { useQuickQuestions } from "@/stores/user/quickQuestions";
import { useChatToCall } from "@/stores/user/chatToCall";
import { useRoute } from 'vue-router';
import { initFlowbite } from "flowbite";
const route = useRoute();
const router = useRouter();
const quickQuestions = useQuickQuestions()
const chatToCall = useChatToCall()
const { $toast } = useNuxtApp()
const props = defineProps({
    meetingDetail: null,
});
const meetingId = ref(route.params.id)
const history_id = ref(route.query.history == 'undefined' ? null : route.query.history)
const chatContainer = ref<HTMLElement | null>(null);
const chat = ref({
    meeting_id: meetingId.value,
    chat_to_call_id: route.query.history == 'undefined' ? null : route.query.history,
    quick_question_id: null,
    question: '',
})

const detail = ref(null)
const faqsList = computed(() => {
    detail.value = props.meetingDetail
    if (props.meetingDetail?.faqs) {
        return JSON.parse(JSON.parse(props.meetingDetail?.faqs))
    }
    return [];
});

const quickQuestionParams = { page: null, search: '' }
const chatToCallParams = { meeting_id: meetingId.value, history_id: route.query.history }


onMounted(async () => {
    initFlowbite();
    chatToCall.getChatList = []
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
const chatList = ref(chatToCall.getChatList);
const chatToCallLists = computed({
    get() {
        return chatList.value;
    },
    set(newValue) {
        chatList.value = newValue;
    }
});

const handleKeyEvent = () => {
    chat.value.quick_question_id = null;
}

const addChat = () => {
        if (chat.value.question != '') {
            const setChat = {
                id: meetingId.value,
                chat_to_call_id: route.query.history,
                answer: '',
                question: chat.value.question
            }
            //@ts-ignore
            chatList.value.push(setChat);
            sendMessage()
        }
}

const sendMessage = () => {
    chat.value.chat_to_call_id = history_id.value
    chatToCall.create(chat.value).then((resp: any) => {
        // chat.value.question = null;
        // chatToCall.chatId = resp?.data?.chat_to_call_id
        if (history_id.value == null) {
            let chat_id = resp?.data?.chat_to_call_id;
            chatToCallParams.history_id = chat_id;
            history_id.value = chat_id;
            router.push({ query: { history: history_id.value } })
        }
        setTimeout(() => {
            chatList.value[chatList.value.length -1].answer = resp.data.answer
        }, 5000)
        //@ts-ignore
        document.getElementById("question").value = null;
        getChatToCall();
    }).catch((error) => {
        catchResponse(error)
    })
    chat.value.question = ''
}

const clearQueryParams = () => {
    const queryParams = { ...route.query };

    delete queryParams.history;

    router.replace({ query: queryParams });
    chatToCall.getChatList = []
    chatList.value = []
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
    sendMessage()
}

const collapse = ref<boolean>(false)

const handleCollapse = () => {
    collapse.value = !collapse.value
}

const handleClearChat = () => {
    chat.value.chat_to_call_id = null;
    history_id.value = null;
    chatToCall.chatId = null;
    clearQueryParams()
}

</script>
<template>
    <div class="mt-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="col-span-2 ">
                <div class="flex flex-col" :class="collapse ? 'fixed top-0 right-0 left-0 bottom-0' : ''">
                    <div v-if="chatList.length" class="h-fit">
                        <CallChatTopBar @collapse="handleCollapse" @clearData="handleClearChat" />
                    </div>
                    <div :class="collapse ? 'h-full' : 'h-600 min-h-600'" class="bg-white overflow-hidden flex flex-col">
                        <div id="chatContainer" ref="chatContainer" class="p-5 h-full overflow-y-scroll">
                            <CallChatTiles id="chat" :lists="chatToCallLists" />
                        </div>
                        <div class="p-4 h-fit">
                            <FormInput size="large" id="question" :onEnterPress="true" v-model="chat.question"
                                placeholder="Ask Someting" @keypress="handleKeyEvent()" @submitChat="addChat()" />
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <label class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Quick Questions</label>
                    <div class="rounded-lg bg-white p-5 text-gray-600 text-sm leading-7">
                        <ul class="w-full flex items-center flex-wrap">
                            <li class="me-2 mb-2" v-for="(quickQuestion, index) in quickQuestionLists" :key="index">
                                <button type="button" @click="quickQuestionCall(quickQuestion)"
                                    class="text-gray-900 w-fit bg-white hover:bg-gray-100 border border-primary-500 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
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
    </div>
</template>

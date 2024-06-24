<script setup lang="ts">
import { useChatToCall } from "@/stores/user/chatToCall";
import { initFlowbite } from "flowbite";
const chatToCall = useChatToCall()
const route = useRoute()
const { $toast } = useNuxtApp()

const emit = defineEmits(["collapse", 'clearData']);

const collapse = ref<boolean>(false)

const data = ref<any>({
    id : route.query.history,
    title : ''
})

const sendEmailData = ref<any>({
    meeting_id: route.params.id,
    history_id: route.query.history
})

const originalTitle = ref(data.value.title)

onMounted(async () => {
    initFlowbite();
    if(route.query.history){
        data.value.title = chatToCall.chatTitle
    }
});

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

const clearChat = () => {
    chatToCall.getChatList = []
    emit('clearData')
}

const handleCollapse = () => {
    collapse.value = !collapse.value
    emit('collapse');
}

const updatedTitle = () =>{
    if (data.value.title !== originalTitle.value) {
        chatToCall.updateChatName(data.value).then((res) => {
            $toast.success('Chat name updated successfully!', { duration: 100 });
        }).catch((err: any) => {
            catchResponse(err)
        })
    }
    originalTitle.value = data.value.title
}

const sendEmail = () => {
    chatToCall.sendChatEmail(sendEmailData.value).then((res) => {
        $toast.success('Email sent successfully!', { duration: 100 });
    }).catch((err) => {
        catchResponse(err)
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

</script>

<template>
    <div class="py-2.5 h-fit text-gray-800 dark:text-gray-300 px-5 block bg-gray-200 dark:bg-gray-900 sm:flex items-center justify-between">
        <div>
            <FormInput icon="fa fa-pencil" class="w-fit" v-model="data.title" :onBlur="true" @focusOut="updatedTitle" placeholder="Chat title" />
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
                    <button @click="clearChat" data-tooltip-target="tooltip-clear" type="button"><i class="fa fa-rotate-right"></i></button>

                    <div id="tooltip-clear" role="tooltip"
                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-500 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Clear
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </li>
                <li>
                    <button @click="sendEmail" data-tooltip-target="tooltip-email" type="button"><i class="fa fa-envelope"></i></button>

                    <div id="tooltip-email" role="tooltip"
                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-500 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Send Email
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </li>
                <li>
                    <button @click="handleCollapse" class="text-xl transition duration-300"
                        data-tooltip-target="tooltip-collapse" type="button"><i class="fa"
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
</template>
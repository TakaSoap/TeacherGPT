<template>
    <div style="display: flex">
        <n-input
            type="textarea"
            :autosize="{
                minRows: 1,
                maxRows: 5
            }"
            style="margin-right: 0.5rem"
            v-model:value="sparkStore.question"
            size="large"
            :loading="sparkStore.isWaiting"
            :disabled="sparkStore.isWaiting || !sparkStore.isFirstMessageSent"
            :status="inputStatus"
        ></n-input>

        <n-button secondary type="primary" style="margin-right: 0.5rem" size="large" @click="submitQuestion" :disabled="sparkStore.isWaiting || props.disabled || !sparkStore.isFirstMessageSent"
            ><template #icon>
                <n-icon>
                    <PaperPlaneOutline />
                </n-icon>
            </template>
        </n-button>
        <n-popconfirm style="margin-right: 0.5rem" @positive-click="sparkStore.resetConversation" :positive-button-props="{type: 'error'}">
            <template #trigger>
                <n-button size="large" secondary  type="error" :disabled="sparkStore.isWaiting"
                    ><template #icon>
                        <n-icon>
                            <TrashBinOutline />
                        </n-icon>
                    </template>
                </n-button>
            </template>
            确认清空记录？
        </n-popconfirm>
    </div>
</template>

<script setup lang="ts">
import { PaperPlaneOutline, TrashBinOutline } from '@vicons/ionicons5';
import { useSparkStore } from '@/stores/spark';
import { useMessage } from 'naive-ui';

const props = defineProps<{
    disabled: boolean;
}>();

const message = useMessage();
const sparkStore = useSparkStore();

const inputStatus = ref('');

const api = useAPI();

interface GPTMessage {
    role: string;
    content: string;
}

function submitQuestion() {
    sparkStore.isWaiting = true;

    // If empty input, show error
    if (sparkStore.question.replace(/\s/g, '').length === 0) {
        inputStatus.value = 'error';
        sparkStore.isWaiting = false;
        return;
    }

    let conversation: GPTMessage[] = [];

    // Add previous messages to conversation, role - user for question, role - assistant for answer
    for (const message of sparkStore.conversation) {
        conversation.push({
            role: 'user',
            content: message.question
        });
        conversation.push({
            role: 'assistant',
            content: message.answer
        });
    }

    api.sparkFollowupMessage(conversation, sparkStore.question, sparkStore.firstMessage.objective, sparkStore.firstMessage.level, sparkStore.firstAnswer)
        .then((response) => {
            sparkStore.setAnswer(response.data);
            sparkStore.addMessage(response.data);
            sparkStore.question = '';
            inputStatus.value = '';
        })
        .catch((error) => {
            console.error(error);
            message.error('服务器错误\n', error);

            inputStatus.value = 'error';
        })
        .finally(() => {
            sparkStore.isWaiting = false;
        });
}
</script>

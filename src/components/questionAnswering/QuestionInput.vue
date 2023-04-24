<template>
    <div style="display: flex">
        <n-input
            type="textarea"
            :autosize="{
                minRows: 1,
                maxRows: 5
            }"
            style="margin-right: 0.5rem"
            v-model:value="QAStore.question.content"
            size="large"
            :loading="QAStore.isWaiting"
            :disabled="QAStore.isWaiting"
            :status="inputStatus"
            placeholder="输入你的问题或需要解释的概念"
        ></n-input>
        <n-popover trigger="hover" placement="bottom">
            <template #trigger>
                <n-select
                    style="margin-right: 0.5rem; width: 6.5rem"
                    v-model:value="QAStore.question.audience"
                    size="large"
                    :options="audiences"
                    :disabled="QAStore.isWaiting"
                />
            </template>
            <n-text>在这里选择回答受众水平</n-text>
        </n-popover>

        <n-button secondary type="primary" style="margin-right: 0.5rem" size="large" @click="submitQuestion" :disabled="QAStore.isWaiting || props.disabled"
            ><template #icon>
                <n-icon>
                    <PaperPlaneOutline />
                </n-icon>
            </template>
        </n-button>
        <n-popconfirm style="margin-right: 0.5rem" @positive-click="QAStore.resetConversation" :positive-button-props="{type: 'error'}">
            <template #trigger>
                <n-button size="large" secondary  type="error" :disabled="QAStore.isWaiting"
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
import { useQuestionAnsweringStore } from '@/stores/questionAnswering';
import { useMessage } from 'naive-ui';

const props = defineProps<{
    disabled: boolean;
}>();

const message = useMessage();
const QAStore = useQuestionAnsweringStore();

const inputStatus = ref('');
const audiences = [
    {
        label: '默认',
        value: 'default'
    },
    {
        label: '小学',
        value: 'primary'
    },
    {
        label: '初中',
        value: 'middle'
    },
    {
        label: '高中',
        value: 'high'
    }
];

const api = useAPI();

interface GPTMessage {
    role: string;
    content: string;
}

function submitQuestion() {
    QAStore.isWaiting = true;

    // If empty input, show error
    if (QAStore.question.content.replace(/\s/g, '').length === 0) {
        inputStatus.value = 'error';
        QAStore.isWaiting = false;
        return;
    }

    let conversation: GPTMessage[] = [];

    // Add previous messages to conversation, role - user for question, role - assistant for answer
    for (const message of QAStore.conversation) {
        conversation.push({
            role: 'user',
            content: message.question.content
        });
        conversation.push({
            role: 'assistant',
            content: message.answer.content
        });
    }

    api.qaMessage(conversation, QAStore.question.content, QAStore.question.audience)
        .then((response) => {
            QAStore.setAnswer(response.data);
            QAStore.addMessage(response.data);
            QAStore.question.content = '';
            inputStatus.value = '';
        })
        .catch((error) => {
            console.error(error);
            message.error('服务器错误\n', error);

            inputStatus.value = 'error';
        })
        .finally(() => {
            QAStore.isWaiting = false;
        });
}
</script>

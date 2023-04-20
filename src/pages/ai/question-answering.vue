<template>
    <div>
        <n-layout position="absolute" style="min-height: var(--content-height)" :native-scrollbar="false" has-sider>
            <n-layout-content class="question-page">
                <n-space vertical size="large">
                    <n-h1 prefix="bar">
                        <n-text type="primary"> 通用问答 </n-text>
                    </n-h1>
                    <n-collapse-transition :show="QAStore.conversation.length === 0 && !QAStore.isWaiting">
                        <n-text depth="3" italic>暂无问题，开始提问吧！</n-text>
                    </n-collapse-transition>

                    <n-collapse-transition :show="QAStore.isWaiting || QAStore.conversation.length != 0">
                        <n-card style="max-width: 50rem">
                            <n-space vertical style="padding-bottom: 1.5rem">
                                <QuestionFeedback
                                    v-for="message in QAStore.conversation"
                                    :question="message.question"
                                    :answer="message.answer"
                                />

                                <QuestionFeedback v-if="QAStore.isWaiting" :question="QAStore.question" :answer="QAStore.answer" :waiting="true" />
                            </n-space>

                            <n-collapse-transition
                                :show="
                                    QAStore.conversation.length != 0 &&
                                    !QAStore.isWaiting &&
                                     QAStore.answer.suggestedFollowupMessages != null
                                "
                            >
                                <n-h3 class="feedback-aspect"><n-text> 追问 TeacherGPT </n-text></n-h3>
                                <n-space>
                                    <n-button
                                        v-for="(followupMessage, index) in QAStore.answer.suggestedFollowupMessages"
                                        :loading="loadingStates[index]"
                                        :disabled="anyLoading || isLimitReached"
                                        @click="submitFollowup(followupMessage, index)"
                                    >
                                        {{ followupMessage }}
                                    </n-button>
                                </n-space>
                                <n-collapse-transition style="padding-top: 1rem" :show="isLimitReached">
                                    <n-alert title="提问达限" type="warning"> 消耗的 Token 数量达到最高限制，无法继续提问 </n-alert>
                                </n-collapse-transition>
                            </n-collapse-transition>
                        </n-card>
                    </n-collapse-transition>
                </n-space>
            </n-layout-content>

            <n-layout-footer position="absolute">
                <QuestionInput class="question-input" :disabled="isLimitReached" />
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<script setup lang="ts">
import { useQuestionAnsweringStore } from '@/stores/questionAnswering';
import { useMessage } from 'naive-ui';

const QAStore = useQuestionAnsweringStore();
const api = useAPI();
const message = useMessage();

const isLimitReached = ref(false);
const loadingStates: Ref<boolean[]> = ref([]);
const anyLoading = computed(() => loadingStates.value.some((state) => state));

interface GPTMessage {
    role: string;
    content: string;
}

function submitFollowup(followupQuestion: string, index: number) {
    loadingStates.value[index] = true;
    QAStore.isWaiting = true;

    QAStore.question.content = followupQuestion;

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

    api.qaMessage(conversation, followupQuestion, QAStore.question.audience)
        .then((response) => {
            QAStore.setAnswer(response.data);
            QAStore.addMessage(response.data);
        })
        .catch((error) => {
            if (error.response?.data?.code === 'context_length_exceeded') {
                isLimitReached.value = true;
            } else {
                console.error(error);
                message.error('服务器错误\n', error);
            }
        })
        .finally(() => {
            QAStore.isWaiting = false;
            loadingStates.value[index] = false;
        });
}
</script>

<style scoped>
.question-page {
    margin: 2rem 3.5rem;
}
.question-input {
    margin: 1rem 3.5rem;
}
</style>

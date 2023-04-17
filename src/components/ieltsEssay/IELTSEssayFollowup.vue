<template>
    <div>
        <n-h3 class="feedback-aspect"
            ><n-text> {{ question }} </n-text></n-h3
        >
        <n-p>{{ answer }}</n-p>
        <n-collapse-transition :show="isButtonsShown">
            <n-h3 class="feedback-aspect"><n-text> 追问 TeacherGPT </n-text></n-h3>
            <n-space>
                <!-- TODO: Add skeleton for the buttons below -->
                <n-button
                    v-for="(followupMessage, index) in suggestedFollowupMessages"
                    :loading="loadingStates[index]"
                    :disabled="anyLoading || isLimitReached"
                    @click="submitFollowup(followupMessage, index)"
                >
                    {{ followupMessage }}
                </n-button>
            </n-space>
            <n-collapse-transition style="padding-top: 1rem;" :show="isLimitReached">
                <n-alert title="追问达限" type="warning"> 消耗的 Token 数量达到最高限制，无法继续追问 </n-alert>
            </n-collapse-transition>
        </n-collapse-transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useIELTSEssayStore } from '@/stores/ieltsEssay';

const message = useMessage();
const ieltsEssayStore = useIELTSEssayStore();
const api = useAPI();

// Make it lose reactivity on purpose.
const props = defineProps<{
    question: string;
    answer: string;
    suggestedFollowupMessages: string[];
}>();
const question = props.question;
const answer = props.answer;
const suggestedFollowupMessages = props.suggestedFollowupMessages;

const isButtonsShown = ref(true);
const isLimitReached = ref(false);
const loadingStates: Ref<boolean[]> = ref([]);
const anyLoading = computed(() => loadingStates.value.some((state) => state));

function submitFollowup(followupQuestion: string, index: number) {
    loadingStates.value[index] = true;

    api.ieltsEssayFollowupMessage(ieltsEssayStore.followupMessages, ieltsEssayStore.essay, {
        role: 'user',
        content: followupQuestion
    })
        .then((response) => {
            // If success, then record the followup question and answer
            ieltsEssayStore.addFollowupMessage({
                role: 'user',
                content: followupQuestion
            });
            ieltsEssayStore.addFollowupMessage({
                role: 'assistant',
                content: JSON.stringify(response.data)
            });
            ieltsEssayStore.addFollowupAnswer(response.data, followupQuestion);
            isButtonsShown.value = false;
        })
        .catch((error) => {
            if (error.response.data.code === 'context_length_exceeded') {
                isLimitReached.value = true;
            } else {
                console.error(error);
                message.error('服务器错误\n', error);
            }
        })
        .finally(() => {
            loadingStates.value[index] = false;
        });
}
</script>

<style scoped>
.n-form-item {
    padding-bottom: 1rem;
}

.score-grid {
    padding-bottom: 1rem;
}

.max-score {
    font-size: 1.1rem;
}

.feedback-aspect {
    margin: 0.5rem 0 0.5rem 0;
}
</style>

<template>
    <div>
        <n-spin style="max-width: 50rem" :show="essayStore.submissionStatus != 'Submitted'">
            <n-card size="medium" style="max-width: 50rem">
                <!-- Feedback -->
                <template #header>
                    <n-h2 style="margin: 0">
                        <n-text type="primary"> 批改结果 </n-text>
                    </n-h2>
                </template>

                <n-space vertical style="padding-bottom: 1.5rem">
                    <n-statistic label="等级">
                        <n-skeleton v-if="essayStore.submissionStatus != 'Submitted'" :width="30" :sharp="false" size="medium" />
                        <n-gradient-text v-else :type="gradeType">{{ essayStore.essayFeedback.grade }}</n-gradient-text>
                    </n-statistic>
                    <div>
                        <n-h3 prefix="bar" class="feedback-aspect"><n-text> 评语 </n-text></n-h3>
                        <div v-if="essayStore.submissionStatus != 'Submitted'">
                            <n-skeleton text :repeat="2" /><n-skeleton text style="width: 60%" />
                        </div>
                        <n-text v-else> {{ essayStore.essayFeedback.comment }} </n-text>
                    </div>
                    <n-collapse-transition :show="isButtonsShown">
                        <n-h3 class="feedback-aspect"><n-text> 追问 TeacherGPT </n-text></n-h3>
                        <n-space>
                            <n-skeleton v-if="essayStore.submissionStatus != 'Submitted'" :width="230" :sharp="false" size="medium" /><n-skeleton
                                v-if="essayStore.submissionStatus != 'Submitted'"
                                :width="320"
                                :sharp="false"
                                size="medium"
                            />
                            <n-skeleton v-if="essayStore.submissionStatus != 'Submitted'" :width="300" :sharp="false" size="medium" />
                            <n-button
                                v-else
                                v-for="(followupMessage, index) in essayStore.essayFeedback.suggestedFollowupMessages"
                                :loading="loadingStates[index]"
                                :disabled="anyLoading || isLimitReached"
                                @click="submitFollowup(followupMessage, index)"
                            >
                                {{ followupMessage }}
                            </n-button>
                        </n-space>
                    </n-collapse-transition>
                    <EssayFollowup
                        v-for="answer in essayStore.followupAnswers"
                        :question="answer.question"
                        :answer="answer.answer"
                        :suggested-followup-messages="answer.suggestedFollowupMessages"
                    />
                    <n-collapse-transition :show="isLimitReached">
                        <n-alert title="追问达限" type="warning"> 消耗的 Token 数量达到最高限制，无法继续追问 </n-alert>
                    </n-collapse-transition>
                </n-space>
            </n-card>
            <template #description>
                <div style="text-align: center">TeacherGPT 正在批改<br />约需 30 秒</div>
            </template>
        </n-spin>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useEssayStore } from '@/stores/essay';

const message = useMessage();
const essayStore = useEssayStore();

const api = useAPI();

const isButtonsShown = ref(true);
const isLimitReached = ref(false);
const loadingStates: Ref<boolean[]> = ref([]);
const anyLoading = computed(() => loadingStates.value.some((state) => state));

const gradeType = computed(() => {
    // A+ A -> 'success'
    // B+ B -> 'info'
    // C+ C -> 'warning'
    // F -> 'error'
    const grade = essayStore.essayFeedback.grade;
    if (grade === 'F') {
        return 'error';
    } else if (grade === 'C' || grade === 'C+') {
        return 'warning';
    } else if (grade === 'B' || grade === 'B+') {
        return 'info';
    } else {
        return 'success';
    }
})

function submitFollowup(followupQuestion: string, index: number) {
    loadingStates.value[index] = true;

    api.essayFollowupMessage(essayStore.followupMessages, essayStore.essay, {
        role: 'user',
        content: followupQuestion
    })
        .then((response) => {
            // If success, then record the followup question and answer
            essayStore.addFollowupMessage({
                role: 'user',
                content: followupQuestion
            });
            essayStore.addFollowupMessage({
                role: 'assistant',
                content: JSON.stringify(response.data)
            });
            essayStore.addFollowupAnswer(response.data, followupQuestion);
            isButtonsShown.value = false;
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

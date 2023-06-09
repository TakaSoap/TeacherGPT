<template>
    <div>
        <n-spin style="max-width: 50rem" :show="gaokaoEssayStore.submissionStatus != 'Submitted'">
            <n-card size="medium" style="max-width: 50rem">
                <!-- Feedback -->
                <template #header>
                    <n-h2 style="margin: 0">
                        <n-text type="primary"> 批改结果 </n-text>
                    </n-h2>
                </template>
                <n-grid class="score-grid">
                    <n-gi span="6">
                        <n-statistic label="总分">
                            <n-number-animation :from="0" :to="gaokaoEssayStore.totalScore" />
                            <template #suffix>
                                <n-text class="max-score" depth="3"> / 60 </n-text>
                            </template>
                        </n-statistic>
                    </n-gi>
                    <n-gi span="6">
                        <n-statistic label="内容">
                            <n-number-animation :from="0" :to="gaokaoEssayStore.essayFeedback.content.score" />
                            <template #suffix>
                                <n-text class="max-score" depth="3"> / 20 </n-text>
                            </template>
                        </n-statistic>
                    </n-gi>
                    <n-gi span="6">
                        <n-statistic label="表达">
                            <n-number-animation :from="0" :to="gaokaoEssayStore.essayFeedback.expression.score" />
                            <template #suffix> <n-text class="max-score" depth="3"> / 20 </n-text></template>
                        </n-statistic>
                    </n-gi>
                    <n-gi span="6">
                        <n-statistic label="特征">
                            <n-number-animation :from="0" :to="gaokaoEssayStore.essayFeedback.feature.score" />
                            <template #suffix> <n-text class="max-score" depth="3"> / 20 </n-text></template>
                        </n-statistic>
                    </n-gi>
                </n-grid>

                <n-space vertical style="padding-bottom: 1.5rem">
                    <div>
                        <n-h3 prefix="bar" class="feedback-aspect"><n-text> 总评 </n-text></n-h3>
                        <div v-if="gaokaoEssayStore.submissionStatus != 'Submitted'">
                            <n-skeleton text :repeat="2" /><n-skeleton text style="width: 60%" />
                        </div>
                        <n-text v-else> {{ gaokaoEssayStore.essayFeedback.overallComment }} </n-text>
                    </div>
                    <div>
                        <n-h3 prefix="bar" class="feedback-aspect"><n-text> 内容 </n-text></n-h3>
                        <div v-if="gaokaoEssayStore.submissionStatus != 'Submitted'">
                            <n-skeleton text :repeat="2" /><n-skeleton text style="width: 60%" />
                        </div>
                        <n-text v-else> {{ gaokaoEssayStore.essayFeedback.content.comment }} </n-text>
                    </div>
                    <div>
                        <n-h3 prefix="bar" class="feedback-aspect"><n-text> 表达 </n-text></n-h3>
                        <div v-if="gaokaoEssayStore.submissionStatus != 'Submitted'">
                            <n-skeleton text :repeat="2" /><n-skeleton text style="width: 60%" />
                        </div>
                        <n-text v-else> {{ gaokaoEssayStore.essayFeedback.expression.comment }} </n-text>
                    </div>
                    <div>
                        <n-h3 prefix="bar" class="feedback-aspect"><n-text> 特征 </n-text></n-h3>
                        <div v-if="gaokaoEssayStore.submissionStatus != 'Submitted'">
                            <n-skeleton text :repeat="2" /><n-skeleton text style="width: 60%" />
                        </div>
                        <n-text v-else> {{ gaokaoEssayStore.essayFeedback.feature.comment }} </n-text>
                    </div>
                    <n-collapse-transition :show="isButtonsShown">
                        <n-h3 class="feedback-aspect"><n-text> 追问 TeacherGPT </n-text></n-h3>
                        <n-space>
                            <n-skeleton
                                v-if="gaokaoEssayStore.submissionStatus != 'Submitted'"
                                :width="230"
                                :sharp="false"
                                size="medium"
                            /><n-skeleton
                                v-if="gaokaoEssayStore.submissionStatus != 'Submitted'"
                                :width="320"
                                :sharp="false"
                                size="medium"
                            /><n-skeleton v-if="gaokaoEssayStore.submissionStatus != 'Submitted'" :width="300" :sharp="false" size="medium" />
                            <n-button
                                v-else
                                v-for="(followupMessage, index) in gaokaoEssayStore.essayFeedback.suggestedFollowupMessages"
                                :loading="loadingStates[index]"
                                :disabled="anyLoading || isLimitReached"
                                @click="submitFollowup(followupMessage, index)"
                            >
                                {{ followupMessage }}
                            </n-button>
                        </n-space>
                    </n-collapse-transition>
                    <GaokaoEssayFollowup
                        v-for="answer in gaokaoEssayStore.followupAnswers"
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
                <div style="text-align: center">TeacherGPT 正在批改<br />约需 1 分钟</div>
            </template>
        </n-spin>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useGaokaoEssayStore } from '@/stores/gaokaoEssay';

const message = useMessage();
const gaokaoEssayStore = useGaokaoEssayStore();

const api = useAPI();

const isButtonsShown = ref(true);
const isLimitReached = ref(false);
const loadingStates: Ref<boolean[]> = ref([]);
const anyLoading = computed(() => loadingStates.value.some((state) => state));

function submitFollowup(followupQuestion: string, index: number) {
    loadingStates.value[index] = true;

    api.ieltsEssayFollowupMessage(gaokaoEssayStore.followupMessages, gaokaoEssayStore.essay, {
        role: 'user',
        content: followupQuestion
    })
        .then((response) => {
            // If success, then record the followup question and answer
            gaokaoEssayStore.addFollowupMessage({
                role: 'user',
                content: followupQuestion
            });
            gaokaoEssayStore.addFollowupMessage({
                role: 'assistant',
                content: JSON.stringify(response.data)
            });
            gaokaoEssayStore.addFollowupAnswer(response.data, followupQuestion);
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

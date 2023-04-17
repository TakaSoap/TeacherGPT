<template>
    <div>
        <n-space :size="6">
            <n-h3 class="feedback-aspect">
                <n-text> {{ question }} </n-text>
            </n-h3>
            <n-tag v-if="audience != 'default'" round size="small" :bordered="false" type="success"> {{ audienceMap[audience] }} </n-tag>
        </n-space>

        <div v-if="props.waiting">
            <n-skeleton text :repeat="2" />
            <n-skeleton text style="width: 60%" />
        </div>

        <n-p v-else style="margin-top: 0;">{{ answer }}</n-p>

        <n-collapse-transition :show="blocked">
            <n-alert title="无法回答" type="error" closable> 对不起，根据相关限制，TeacherGPT 无法为你提供创作类型的回答 </n-alert>
        </n-collapse-transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useQuestionAnsweringStore, Question, Answer } from '@/stores/questionAnswering';

const message = useMessage();
const QAStore = useQuestionAnsweringStore();
const api = useAPI();

// Make it lose reactivity on purpose.
const props = defineProps<{
    question: Question;
    answer: Answer;
    waiting: boolean;
}>();
const question = props.question.content;
const audience = props.question.audience;
const answer = props.answer.content;
const blocked = props.answer.blocked;

const isButtonsShown = ref(true);
const isLimitReached = ref(false);
const loadingStates: Ref<boolean[]> = ref([]);
const anyLoading = computed(() => loadingStates.value.some((state) => state));

interface AudienceMap {
    [key: string]: string;
}

const audienceMap: AudienceMap = {
    default: '默认',
    primary: '小学',
    junior: '初中',
    senior: '高中'
};

function submitFollowup(followupQuestion: string, index: number) {
    loadingStates.value[index] = true;
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

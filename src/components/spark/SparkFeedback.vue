<template>
    <div>
        <n-space :size="6">
            <n-h3 class="feedback-aspect">
                <n-text> {{ question }} </n-text>
            </n-h3>
        </n-space>

        <div v-if="props.waiting">
            <n-skeleton text :repeat="2" />
            <n-skeleton text style="width: 60%" />
        </div>
        <div v-else>
            <n-p v-for="(line, index) in answerLines" :key="index">
                {{ line }}
            </n-p>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    question: string;
    answer: string;
    waiting: boolean;
}>();
const question = props.question;
const answer = props.answer;

const answerLines = computed(() => {
    return answer.split('\n');
});

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

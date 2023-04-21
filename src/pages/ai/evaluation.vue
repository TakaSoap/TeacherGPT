<template>
    <div class="main-view">
        <n-space vertical size="large">
            <n-h1 prefix="bar">
                <n-text type="primary"> 学生评语生成 </n-text>
            </n-h1>

            <EvaluationInput />
            <div v-for="evaluationIns in evaluationStore.evaluations">
                <n-collapse-transition :show="evaluationStore.evaluations.length != 0 || evaluationStore.isWaiting">
                    <EvaluationFeedback
                        :name="evaluationIns.studentInfo.name"
                        :evaluation="evaluationIns.evaluation"
                        :isWaiting="false"
                    />
                </n-collapse-transition>
            </div>

            <div>
                <n-collapse-transition :show="evaluationStore.evaluations.length != 0 || evaluationStore.isWaiting">
                    <EvaluationFeedback
                        v-if="evaluationStore.isWaiting"
                        :name="evaluationStore.studentInfo.name"
                        :evaluation="null"
                        :isWaiting="true"
                    />
                </n-collapse-transition>
            </div>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { useEvaluationStore } from '@/stores/evaluation';

const evaluationStore = useEvaluationStore();
</script>

<style scoped>
.main-view {
    padding: 2rem 3.5rem;
}
</style>

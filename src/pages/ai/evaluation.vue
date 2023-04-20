<template>
    <div class="main-view">
        <n-space vertical size="large">
            <n-h1 prefix="bar">
                <n-text type="primary"> 学生评语生成 </n-text>
            </n-h1>
            <EvaluationInput />
            <EvaluationFeedback v-for="evaluationIns in evaluationStore.evaluations" :name="evaluationIns.studentInfo.name" :evaluation="evaluationIns.evaluation" />
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

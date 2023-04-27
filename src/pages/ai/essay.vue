<template>
    <div class="main-view">
        <n-space vertical size="large">
            <n-h1 prefix="bar">
                <n-text type="primary"> 普通作文批改 </n-text>
            </n-h1>
            <EssayInput />
            <n-collapse-transition :show="essayStore.submissionStatus != 'NotSubmitted'">
                <EssayFeedback />
            </n-collapse-transition>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { useEssayStore } from '@/stores/essay';

const essayStore = useEssayStore();
</script>

<style scoped>
.main-view {
    padding: 2rem 3.5rem;
}
</style>
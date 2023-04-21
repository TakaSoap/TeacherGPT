<template>
    <div>
        <n-card size="medium" style="max-width: 50rem;">
            <n-space :size="6">
                <n-h3 class="feedback-aspect">
                    <n-text> {{ name }} </n-text>
                </n-h3>
            </n-space>
            <div v-if="props.isWaiting">
                <n-skeleton text :repeat="2" />
            </div>
            <n-p v-for="(line, index) in evaluationLines" :key="index" style="margin: 0.2rem 0 ">
                {{ line }}
            </n-p>
        </n-card>
    </div>
</template>

<script setup lang="ts">
// Make it lose reactivity on purpose.
const props = defineProps<{
    name: string;
    evaluation: string | null;
    isWaiting: boolean;
}>();

// If name is null or empty, set name to "评语"
const name = computed(() => {
    if (props.name == null || props.name == '') {
        return '评语';
    }
    return '评语 - ' + props.name;
});

const evaluationLines = computed(() => {
    if (props.evaluation == null) {
        return [];
    }
    return props.evaluation.split('\n');
});
</script>

<style scoped>
.feedback-aspect {
    margin: 0.5rem 0 0.5rem 0;
}
</style>

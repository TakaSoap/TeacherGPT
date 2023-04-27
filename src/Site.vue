<template>
    <div>
        <NuxtLayout>
            <n-spin :show="loading">
                <div>
                    <NuxtPage v-if="!loading" />
                </div>
            </n-spin>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage } from 'naive-ui';
import { loadingBarRef } from '~~/src/composables/loadingBarAndTitleControl.js';

const router = useRouter();
loadingBarAndTitleControl(router);

const loading = ref(true);

const route = useRoute();
const loadingBar = useLoadingBar();

onMounted(() => {
    loadingBarRef.value = loadingBar;
    loadingBar.finish();
    loading.value = false;
});

watch(
    () => route.path,
    () => {
        console.log(route.path);
    }
);
</script>
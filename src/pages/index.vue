<template>
    <n-layout :native-scrollbar="false">
        <div class="banner" style="text-align: center">
            <n-h1 style="font-size: 5rem" class="title">
                <span>TeacherGPT</span>
            </n-h1>
            <n-p style="color: #777777; font-size: 0.875rem; margin-top: 0; margin-bottom: 1.75rem"> 一窥第四次工业革命，一探智能教育的未来 </n-p>

            <div>
                <n-button type="primary" ghost size="large" style="margin-right: 0.75rem" @click="onMainBtnClick">
                    {{ mainBtnText }}
                </n-button>
                <n-button type="info" ghost size="large" @click="$router.push('/paper')">
                    阅读论文
                </n-button>
            </div>
        </div>
    </n-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const mainBtnText = ref('开始使用');

function onMainBtnClick() {
    //TODO: Auth
    router.push('/ai');
}
</script>

<style scoped>
.title {
    line-height: 1;
    font-family: Metropolis, sans-serif;
    margin-bottom: 18px !important;
}

.banner {
    min-height: 9rem;
    height: var(--content-height);
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
}
</style>

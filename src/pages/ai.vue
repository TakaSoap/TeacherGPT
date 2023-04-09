<template>
    <n-space vertical>
        <n-layout has-sider>
            <n-layout-sider
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="240"
                style="min-height: var(--content-height)"
                :native-scrollbar="false"
                :collapsed="collapsed"
                show-trigger
                @collapse="collapsed = true"
                @expand="collapsed = false"
            >
                <n-menu v-model:value="menuValue" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptionsRef" />
            </n-layout-sider>
            <n-layout>
                <n-scrollbar style="max-height: var(--content-height)">
                    <div class="main-view">
                        <NuxtPage />
                    </div>
                </n-scrollbar>
            </n-layout>
        </n-layout>
    </n-space>
</template>

<script setup lang="ts">
import { MenuOption, NIcon, useMessage } from 'naive-ui';
import { LogOutOutline, BookOutline, SchoolOutline, PeopleCircleOutline, PersonCircleOutline, PersonOutline } from '@vicons/ionicons5';
import { Component, Ref, provide } from 'vue';
import { RouterLink } from 'vue-router';

const route = useRoute();

const message = useMessage();

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuValueRef = computed(() => {
    if (/\/gaokao-essay/.test(route.path)) return 'gaokao-essay';
    else if (/\/base/.test(route.path)) return 'base';
    else if (/\/subscribed/.test(route.path)) return 'subscribed';
    else if (/\/my/.test(route.path)) return 'my';
    else if (/\/manage/.test(route.path)) return 'manage';
    return null;
});

const menuValue = ref(menuValueRef);

const collapsed = ref(false);

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/ai/gaokao-essay'
                },
                () => '高考作文批改'
            ),
        key: 'gaokao-essay',
        icon: renderIcon(BookOutline)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/ai/essay'
                },
                () => '作文批改'
            ),
        key: 'essay',
        icon: renderIcon(SchoolOutline)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/ai/ielts-essay'
                },
                () => '雅思作文批改'
            ),
        key: 'ielts-essay',
        icon: renderIcon(PeopleCircleOutline)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/ai/question-answering'
                },
                () => '通用问答'
            ),
        key: 'my',
        icon: renderIcon(PersonCircleOutline)
    },
    {
        key: 'divider',
        type: 'divider'
    },
    {
        label: () =>
            h(
                'a',
                {
                    href: 'https://console.authing.cn/u?app_id=62a35e7d54fab18ac73c5932'
                },
                '个人中心'
            ),
        key: 'logout',
        icon: renderIcon(PersonOutline)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/logout'
                },
                () => '退出登录'
            ),
        key: 'logout',
        icon: renderIcon(LogOutOutline)
    }
];

const menuOptionsRef = ref(menuOptions);
</script>

<style scoped>
.main-view {
    padding: 2rem 3.5rem;
}
</style>

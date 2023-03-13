<template>
    <n-space vertical >
        <n-layout has-sider>
            <n-layout-sider
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="240"
                style="min-height: var(--content-height); max-height: var(--content-height);"
                :native-scrollbar="false"
                :collapsed="collapsed"
                show-trigger
                @collapse="collapsed = true"
                @expand="collapsed = false"
            >
                <n-menu v-model:value="menuValue" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptionsRef" />
            </n-layout-sider>
            <n-layout>
                <div class="main-view">
                    <NuxtPage />
                </div>
            </n-layout>
        </n-layout>
    </n-space>
</template>

<script setup lang="ts">
import { MenuOption, NIcon, useMessage } from 'naive-ui';
import {
    LogOutOutline,
    BookOutline,
    SchoolOutline,
    PeopleCircleOutline,
    PersonCircleOutline,
    FileTrayFullOutline,
    PersonOutline
} from '@vicons/ionicons5';
import { Component, Ref, provide } from 'vue';
import { RouterLink } from 'vue-router';

const route = useRoute();

const message = useMessage();

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuValueRef = computed(() => {
    if (/\/writing/.test(route.path)) return 'writing';
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
                    to: '/ai/writing'
                },
                () => '作文批改'
            ),
        key: 'writing',
        icon: renderIcon(BookOutline)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/ai/base'
                },
                () => '与我同校'
            ),
        key: 'base',
        icon: renderIcon(SchoolOutline)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/ai/subscribed'
                },
                () => '我的关注'
            ),
        key: 'subscribed',
        icon: renderIcon(PeopleCircleOutline)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/ai/my'
                },
                () => '我的动态'
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
                'a',
                {
                    href: 'https://console.authing.cn/u?app_id=62a35e7d54fab18ac73c5932'
                },
                '个人中心'
            ),
        key: 'logout',
        icon: renderIcon(PersonOutline)
    }
];

const menuOptionsRef = ref(menuOptions);
</script>

<style scoped>
.main-view{
    padding: 2rem 3.5rem;
}
</style>

// https://nuxt.com/docs/api/configuration/nuxt-config

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    srcDir: 'src/',
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
                : ['@juggle/resize-observer']
    },
    debug: process.env.NODE_ENV === 'development',
    vite: {
        optimizeDeps: {
            include: process.env.NODE_ENV === 'development' ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone'] : []
        },
        plugins: [
            AutoImport({
                imports: [
                    {
                        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
                    }
                ]
            }),
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ]
    },
    modules: ['@pinia/nuxt'],
    ssr: false
});

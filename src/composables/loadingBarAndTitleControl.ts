interface TitleMap {
    [path: string]: string;
}

const titleMap: TitleMap = {
    '/index': '',
    '/ai': '工作台',
    '/ai/gaokaoEssay': '作文评分',

};

export const loadingBarRef: Ref<any> = ref(null);

export default function (router: any) {
    router.beforeEach((to: any, from: any, next: any) => {
        if (!from || to.path !== from.path) {
            if (loadingBarRef.value) {
                loadingBarRef.value.start();
            }
        }
        next();
    });

    router.afterEach((to: any, from: any) => {
        if (!from || to.path !== from.path) {
            if (loadingBarRef.value) {
                loadingBarRef.value.finish();
            }
            if (to.hash && to.hash !== from.hash) {
                nextTick(() => {
                    const el = document.querySelector(to.hash);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                });
            }

            const title = titleMap[to.path];
            document.title = title + (title ? ' - ' : '') + 'TeacherGPT';
        }
    });

    router.onError((err: any) => {
        loadingBarRef.value.error();
        console.error(err);
    });
}

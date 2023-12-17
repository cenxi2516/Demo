import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { setRouterTitle } from '@/util/setTitle'
import { setTitle } from '@/util'
import { useStore } from '@/store/provide/userLogin'

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const { auth } = to.meta;
    let {
        loading,
        user,
    } = useStore().state;

    if(auth) {
        // 鉴权
        if(!loading && user) {
            next();
        } else if(!loading && !user) {
            next({ name: 'provideLogin' });
        } else {
            next({
                name: 'wait',
                query: {
                    target: to.fullPath,
                },
            });
        }
    } else {
        // 不需要鉴权
        next();
    }
});

router.afterEach((to, from) => {
    setRouterTitle(to.meta.title);
    setTitle();
})

export default router;


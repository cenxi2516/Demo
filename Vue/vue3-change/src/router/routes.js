import { getAsyncPage } from '@/util'
import VuexLogin from '@/views/vuex/Login.vue';
import GlobalLogin from '@/views/globalState/Login.vue';
import ProvideLogin from '@/views/provideInject/Login.vue';
import NotFound from '@/components/NotFount/index.vue';
import AuthWait from '@/components/Authwait/index.vue';

const Home = getAsyncPage(() => import('@/views/AsyncComponent/Home.vue'));
const About = getAsyncPage(() => import('@/views/AsyncComponent/About.vue'));


export default [
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: {
            auth: true,
            title: '首页',
        },
    },
    {
        name: 'about',
        path: '/about',
        component: About,
        meta: {
            auth: false,
            title: '关于',
        },
    },
    {
        name: 'vuexLogin',
        path: '/vuex-login',
        component: VuexLogin,
        meta: {
            auth: false,
            title: 'vuex登录',
        },
    },
    {
        name: 'globalLogin',
        path: '/global-login',
        component: GlobalLogin,
        meta: {
            auth: false,
            title: 'global登录',
        },
    },
    {
        name: 'provideLogin',
        path: '/provide-login',
        component: ProvideLogin,
        meta: {
            auth: false,
            title: 'provide登录',
        },
    },
    {
        name: 'wait',
        path: '/wait',
        component: AuthWait,
        meta: {
            auth: false,
            title: '登录中...',
        },
    },
    {
        name: 'notFount',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            auth: false,
            title: '404',
        },
    },
];
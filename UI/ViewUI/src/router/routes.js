import { callbackAsyncComponent } from '@/utils'


export default [
    {
        name: 'home',
        path: '/',
        component: callbackAsyncComponent(() => import('@/views/IconView.vue'))
    },
    {
        name: 'button',
        path: '/button',
        component: callbackAsyncComponent(() => import('@/views/ButtonView.vue'))
    },
    {
        name: 'card',
        path: '/card',
        component: callbackAsyncComponent(() => import('@/views/CardView.vue'))
    },
    {
        name: 'dialog',
        path: '/dialog',
        component: callbackAsyncComponent(() => import('@/views/DialogView.vue'))
    },
    {
        name: 'collapse',
        path: '/collapse',
        component: callbackAsyncComponent(() => import('@/views/CollapseView.vue'))
    },
    {
        name: 'pager',
        path: '/pager',
        component: callbackAsyncComponent(() => import('@/views/PagerView.vue'))
    },
    {
        name: 'tooltip',
        path: '/tooltip',
        component: callbackAsyncComponent(() => import('@/views/TooltipView.vue'))
    },
    {
        name: 'dropdown',
        path: '/dropdown',
        component: callbackAsyncComponent(() => import('@/views/DropdownView.vue'))
    }
];
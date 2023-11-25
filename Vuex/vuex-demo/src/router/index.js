import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history', routes
});


// 全局导航前置守卫：待路由确认
router.beforeEach((to, from, next) => {
    // 检测跳转路径是否需要鉴权
    if (to.meta.auth) {
        console.log(store.getters['loginUser/isLogin'], store.state.loginUser.user);
        // 检测是否登录、或正在恢复登录
        // state必须这样写
        if (store.state.loginUser.isLoading) {
            console.log('loading');
            // 正在恢复验证
            next({
                name: 'loading', query: {
                    target: to.fullPath
                }
            });
        } else if (store.getters['loginUser/isLogin']) {
            // 已登录
            console.log('login');
            next();
        } else {
            console.log('unlogin');
            // 未登录，记录跳转目标地址，跳转到登录页面
            next({
                name: 'login', query: {
                    target: to.fullPath
                }
            })
        }
        console.log()
    } else {
        // 不需要鉴权，直接跳转
        next();
    }
});


// 全局导航后置守卫：路由已确认，组件还未渲染到路由导航区域
router.afterEach((to, from) => {
    console.log(to);
    // 设置网页标题
    const {title} = to.meta;
    if(title) {
        // 路由标题
        document.title = title;
    } else if(to.name === 'user'){
        // 页面标题
        document.title = store.state.loginUser.user.name;
    }
})


export default router;
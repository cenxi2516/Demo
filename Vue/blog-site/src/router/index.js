import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import {setDataTitle, setRouteTitle} from '@/tools/setPageTittle'

if (!window.VueRouter) {
	// 没有使用传统的方式导入vue-router
	Vue.use(VueRouter);
}


const router = new VueRouter({
	routes,
	mode: 'history'
});

export default router;


router.afterEach((to, from) => {
	setRouteTitle(to.meta.title);
	if(to.name !== 'blog-detail') {
		setDataTitle(null);
	}
})
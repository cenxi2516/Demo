import './mock';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import './styles/global.less';
import './directives';
import './prototype';

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');


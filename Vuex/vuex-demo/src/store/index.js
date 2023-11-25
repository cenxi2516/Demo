import Vuex from 'vuex';
import Vue from 'vue';
import modules from '@/store/modules'

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    modules
});


// 恢复登录状态：页面刷新，首次加载都要做
store.dispatch('loginUser/whoAmI').catch(() => {});

export default store;
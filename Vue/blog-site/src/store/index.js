import Vue from 'vue'
import Vuex from 'vuex';
import modules from '@/store/modules'

if (!window.Vuex) {
    // 没有使用传统的方式导入vuex
    Vue.use(Vuex);
}

const store = new Vuex.Store({
    strict: true, modules
});


// 加载全局数据
store.dispatch('setting/getSetting').then(data => {
    const headHTML = `
            ${document.head.innerHTML}
            <link rel="shortcut icon" type="image/x-icon" href="${store.state?.setting?.data?.favicon}">
    `;

    document.head.innerHTML = headHTML;
});


export default store;
import {getSetting} from '@/api/setting'


export default {
    namespaced: true,
    state() {
        return {
            data: null,
            isLoading: false
        }
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        setIsLoading(state, payload) {
            state.isLoading = payload;
        }
    },
    actions: {
        async getSetting(ctx) {
            if(ctx.state.data) return;

            ctx.commit('setIsLoading', true);
            const resp = await getSetting();

            ctx.commit('setData', resp);
            ctx.commit('setIsLoading', false);

            return resp;
        }
    }
}
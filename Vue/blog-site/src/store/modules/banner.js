import {getBanner} from '@/api/banner'


export default {
    namespaced: true,
    state() {
        return {
            data: [],
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
        async getBanner(ctx) {
            if (ctx.state.data.length) return;

            ctx.commit('setIsLoading', true);
            const resp = await getBanner();

            ctx.commit('setData', resp);
            ctx.commit('setIsLoading', false);

            return resp;
        }
    }
}
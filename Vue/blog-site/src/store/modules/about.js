import {getAbout} from '@/api/about'


export default {
    namespaced: true,
    state() {
        return {
            data: null,
            isLoading: false,
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
        async getAbout(ctx) {
            if (ctx.state.data !== null) return;

            ctx.commit('setIsLoading', true);
            const resp = await getAbout();

            ctx.commit('setData', resp);
            ctx.commit('setIsLoading', false);

            return resp;
        }
    }
};
import * as userAPI from '@/api/user'


export default {
    namespaced: true,
    state() {
        return {
            user: null, // 用户信息
            isLoading: false // 是否正在进行登录、注销、恢复登录状态
        }
    },
    getters: {
        isLogin(state) {
            return !!state.user;
        }
    },
    mutations: {
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async login(ctx, payload) {
            ctx.commit('setIsLoading', true);

            const {loginId, loginPwd} = payload;
            const resp = await userAPI.login(loginId, loginPwd);

            ctx.commit('setUser', resp);
            ctx.commit('setIsLoading', false);

            return resp;
        },
        async loginOut(ctx) {
            ctx.commit('setIsLoading', true);

            await userAPI.loginOut();
            ctx.commit('setUser', null);

            ctx.commit('setIsLoading', false);
        },
        async whoAmI(ctx) {
            ctx.commit('setIsLoading', true);

            const resp = await userAPI.whoAmI();
            ctx.commit('setUser', resp);

            ctx.commit('setIsLoading', false);

            return resp;
        }
    }
};
import { inject, reactive, readonly } from 'vue'
import * as userServ from '@/api/userLogin'

const KEY = Symbol.for('userLogin');

export const provideStore = (app) => {
    const state = reactive({
        user: null,
        loading: false,
    });

    // 登录
    async function login(loginId, loginPwd) {
        state.loading = true;
        const user = await userServ.login(loginId, loginPwd);
        state.loading = false;
        state.user = user;

        return user;
    }

    // 退出
    async function loginOut() {
        state.loading = true;
        await userServ.loginOut();
        state.loading = false;
        state.user = null;
    }

    // 恢复登录状态
    async function whoAmI() {
        state.loading = true;
        const user = await userServ.whoAmI();
        state.loading = false;
        state.user = user;
    }

    const provideData = {
        state: readonly(state),
        login,
        loginOut,
        whoAmI,
    };

    app?.provide(KEY, provideData);

    return provideData;
};

export function useStore(defaultValue = null) {
    return inject(KEY, defaultValue) ?? provideStore();
}
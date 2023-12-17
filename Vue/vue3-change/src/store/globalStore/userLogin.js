import { reactive, readonly } from 'vue'
import * as userServ from '@/api/userLogin'


const state = reactive({
    user: null,
    loading: false,
});

export const userLoginState = readonly(state);

// 登录
export async function login(loginId, loginPwd) {
    state.loading = true;
    const user = await userServ.login(loginId, loginPwd);
    state.loading = false;
    state.user = user;

    return user;
}

// 退出
export async function loginOut() {
    state.loading = true;
    await userServ.loginOut();
    state.loading = false;
    state.user = null;
}

// 恢复登录状态
export async function whoAmI() {
    state.loading = true;
    const user = await userServ.whoAmI();
    state.loading = false;
    state.user = user;
}
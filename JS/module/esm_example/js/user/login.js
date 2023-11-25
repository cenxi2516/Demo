import { login } from '../api.js';
import * as doms from '../doms.js';
import { lock, preventEventDefault } from '../tools.js';

export const userLogin = async () => {
    const loginId = doms.userName.value;
    const loginPwd = doms.userPassword.value;

    if (!loginId) return alert('账号不能为空');

    if (!loginPwd) return alert('密码不能为空');

    const loginResult = await login({ loginId, loginPwd });

    if (!loginResult) return console.log('登录失败，账号或密码错误');

    console.log(`登陆成功，欢迎${loginResult.nickname}登录!`);
};

const loginBefore = () => {
    doms.btnSubmit.value = '登录中...';
};

const loginAfter = () => {
    doms.btnSubmit.value = '登录';
};

const userLoginLock = lock(userLogin, loginBefore, loginAfter);

doms.formContainer.addEventListener('submit', (e) => {
    preventEventDefault(e);
    userLoginLock();
});
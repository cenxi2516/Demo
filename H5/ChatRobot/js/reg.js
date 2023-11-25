import {
    $,
    FieldValidator,
    formSubmit
} from './common.js';
import {
    isExistAccount,
    register
} from './api.js';

const loginIdValidator = new FieldValidator('txtLoginId', async (value) => {
    if (!value) return '账号不能为空';

    const {
        data
    } = await isExistAccount(value);

    if (data) return '账号已经存在';
});

const nicknameValidator = new FieldValidator('txtNickname', async (value) => {
    if (!value) return '昵称不能为空';
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', async (value) => {
    if (!value) return '密码不能为空';
});

const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', async (value) => {
    if (!value) return '确认密码不能为空';

    if (loginPwdValidator.input.value !== value) return '确认密码不一致';
}, true, false);

const userRegister = () => {
    const validators = [loginIdValidator, nicknameValidator, loginPwdValidator, loginPwdConfirmValidator];
    const initHandler = () => {
        console.log('start register');
    };
    const successHandler = data => {
        window.alert(`注册成功，请点击“确定”，跳转到登录页面`);
        location.href = `./login.html?loginId=${data.loginId}`;
    };
    const failHandler = reason => {
        window.alert(`注册失败 ${reason}`);
    };

    formSubmit('.user-form', register, validators, initHandler, successHandler, failHandler);
};

userRegister();

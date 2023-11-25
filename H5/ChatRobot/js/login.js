import {
    $,
    FieldValidator,
    formSubmit,
    urlParamParse
} from './common.js';
import {
    login
} from './api.js';


const loginIdValidator = new FieldValidator('txtLoginId', async (value) => {
    if (!value) return '账号不能为空';
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', async (value) => {
    if (!value) return '密码不能为空';
});

const autoFillAccount = () => {
    const loginIdValue = urlParamParse(location).loginId;
    if (loginIdValue) {
        loginIdValidator.input.value = loginIdValue;
    }
};

const userLogin = () => {
    const validators = [loginIdValidator, loginPwdValidator];
    const initHandler = () => {
        console.log('start login');
    };
    const successHandler = data => {
        location.href = './index.html';
    };
    const failHandler = reason => {
        window.alert(`登录失败 ${reason}`);
    };

    formSubmit('.user-form', login, validators, initHandler, successHandler, failHandler);
};

autoFillAccount();
userLogin();

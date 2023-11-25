import {
    saveToken,
    getToken,
    removeToken
} from './common.js';

const URL_ORIGIN = 'https://study.duyiedu.com';

const getFetch = async (url) => {
    const FULL_URL = URL_ORIGIN + url;
    const token = getToken();

    if (!token) return {
        code: 401,
        msg: '未登录，或登录已过期',
        data: null
    };

    const response = await fetch(FULL_URL, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return await response.json();
};

const postFetch = async (url, config, responseSuccess) => {
    const FULL_URL = URL_ORIGIN + url;
    const {
        headers = {}, body, ...otherConfig
    } = config;

    const response = await fetch(FULL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body),
        ...otherConfig
    });

    const result = await response.json();
    result.data && responseSuccess?.(response);

    return result;
};

/**
 * 注册账号
 * @param  {Object} regInfo 注册信息
 * @return {Promise}     	Promise对象，服务器响应数据
 */
export const register = async (regInfo) => postFetch('/api/user/reg', {
    body: regInfo
});

/**
 * 账号登录，登录成功并存储令牌信息
 * @param  {Object} loginInfo 	登录信息
 * @return {Promise} 			Promise对象
 */
export const login = async (loginInfo) => postFetch('/api/user/login', {
    body: loginInfo
}, response => saveToken(response.headers.get('Authorization')));

/**
 * 验证账号是否存在
 * @param  {String} account 账号
 * @return {Promise}        Promise对象
 */
export const isExistAccount = async (account) => {
    const url = `${URL_ORIGIN}/api/user/exists`;
    const param = `?loginId=${account}`;
    const response = await fetch(url + param);

    return await response.json();
};

/**
 * 获取当前登录的用户信息
 * @return {Promise} Promise对象
 */
export const getUserInfo = async () => getFetch('/api/user/profile');

/**
 * 发送消息给机器人
 * @param  {Object} msgInfo 聊天信息对象
 * @return {Promise}        Promise对象
 */
export const sendChatMsg = async (msgInfo) => {
    const token = getToken();

    if (!token) return {
        code: 401,
        msg: '未登录，或登录已过期',
        data: null
    };

    return postFetch('/api/chat', {
        headers: {
            authorization: `Bearer ${token}`
        },
        body: msgInfo
    });
};

/**
 * 获取当前登录用户聊天历史记录（已升序排序）
 * @return {Promise} Promise对象
 */
export const getChatHistory = async () => getFetch('/api/chat/history');

/**
 * 退出当前账号
 * @return {Promise} Promise对象
 */
export const exitAccount = async () => removeToken();

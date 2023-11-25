const baseURL = 'https://study.duyiedu.com';

/**
 *
 * @param {Object} loginInfo 包含账号和密码
 * @returns {Promise} Promise对象，登录成功为true，否则为false
 */
export const login = async (loginInfo) => {
    const response = await fetch(`${baseURL}/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    });

    const loginResult = await response.json();

    return loginResult.data;
};
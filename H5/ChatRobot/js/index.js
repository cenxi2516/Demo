import {
    $,
    $$,
    scrollToBottom,
    FieldValidator,
    formSubmit
} from './common.js';

import {
    getUserInfo,
    sendChatMsg,
    getChatHistory,
    exitAccount
} from './api.js';

import DateTime from './DateTime.js';
import formatHTMLEntity from './formatHTMLEntity.js';

const doms = {
    aside: {
        nickname: $('#nickname'),
        loginId: $('#loginId')
    },
    close: $('.close'),
    chatContainer: $('.chat-container')
};

const setUserInfo = (user) => {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
};

const validateUserLogin = async () => {
    const user = (await getUserInfo()).data;

    if (!user) {
        window.alert('未登录，请先登录');
        location.href = './login.html';
    }

    setUserInfo(user);

    return user;
};

const addChat = ({
    content,
    createdAt = Date.now(),
    from,
    to = null,
}) => {
    const isSendRobot = to === null;
    const ChatItem = $$('div');
    ChatItem.className = `chat-item${isSendRobot ? ' me' : ''}`;

    const ROBOT_AVATAR = './asset/robot-avatar.jpg';
    const USER_AVATAR = './asset/avatar.png';
    const msgContent = formatHTMLEntity`${content}`;
    const msgDateTime = formatHTMLEntity`${new DateTime(createdAt).format()}`;

    ChatItem.innerHTML = `
    	<img class="chat-avatar" src="${isSendRobot ? USER_AVATAR : ROBOT_AVATAR}" />
        <div class="chat-content">${msgContent}</div>
        <div class="chat-date">${msgDateTime}</div>
    `;

    const {
        chatContainer
    } = doms;
    chatContainer.append(ChatItem);

    scrollToBottom(chatContainer);
}

const removeChat = () => {
    doms.chatContainer.lastElementChild?.remove();
}

const restoreChatHistory = async () => {
    const AllChatHistory = (await getChatHistory()).data;

    AllChatHistory && AllChatHistory.forEach(addChat);
};

const sendMsg = async (user) => {
    const contentValidator = new FieldValidator('txtMsg', async (value) => {
        if (!value) return '发送';
    }, false);
    const validators = [contentValidator];

    const initHandler = () => {
        console.log('start sendMsg');
        const contentInput = contentValidator.input;
        addChat({
            content: contentInput.value,
            from: user.loginId,
        });
        contentInput.value = '';
    };
    const successHandler = data => {
        addChat({
            from: null,
            to: user.loginId,
            ...data
        });
    };
    const failHandler = reason => {
        removeChat();
        window.alert(`信息发送失败 ${reason}`);
    };

    formSubmit('.msg-container', sendChatMsg, validators, initHandler, successHandler, failHandler);
};

const logoutLogin = async () => {
    doms.close.addEventListener('click', (e) => {
        exitAccount();
        location.href = './login.html';
    });
};

const init = async () => {
    const user = await validateUserLogin();
    logoutLogin();
    restoreChatHistory();
    sendMsg(user);
};

init();


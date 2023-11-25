import Icon from '@/components/Icon';
import getComponentRootDom from '@/tools/getComponentRootDom';
import styles from './index.module.less';
import {transitionAnimation} from '@/tools'

const createMessage = async(content, type, container) => {
    const divDom = document.createElement('div');
    divDom.classList.add(styles.message, styles[`message-${type}`]);

    if (container && window.getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }

    const iconDOM = getComponentRootDom(Icon, {type});
    const template = `
        ${iconDOM.outerHTML}
        <span>${content}</span>
    `;

    divDom.innerHTML = template;

    (container || document.body).appendChild(divDom);

    await showMessageAnimation(divDom);

    return divDom;
};

const removeMessage = message => {
    if (!message.divDom) return;

    clearTimeout(message.divDom.timer);
    message.divDom.remove();
    message.divDom = null;
};

const showMessageAnimation = divDom => new Promise(resolve => {
    transitionAnimation(() => {
        divDom.addEventListener('transitionend', resolve, {once: true});
        divDom.style.transform = `translate(-50%, calc(-50% + 100px))`;
    }, () => {
        divDom.style.transform = 'translate(-50%, -50%)';
        divDom.style.opacity = 1;
    });
});

const hideMessageAnimation = (divDom, duration) => new Promise(resolve => {
    divDom.timer = setTimeout(() => {
        transitionAnimation(() => {
            divDom.addEventListener('transitionend', resolve, {once: true});
        }, () => {
            divDom.style.transform = 'translate(-50%, calc(-50% - 100px))';
            divDom.style.opacity = 0;
        });
    }, duration);
});

const initMessage = async(type, message, options = {}) => {
    const newOptions = Object.assign({}, message, options);
    const {
        container, duration, callback, content
    } = newOptions;

    const divDom = await createMessage(content, type, container);
    console.log(divDom);
    message.divDom = divDom;

    await hideMessageAnimation(divDom, duration);
    console.log(1);

    removeMessage(message);
    callback?.();
}

const Message = {
    divDom: null, duration: 2000, content: '', container: null,
    info(options) {
        initMessage('info', this, options);
    },
    success(options) {
        initMessage('success', this, options);
    },
    warn(options) {
        initMessage('warn', this, options);
    },
    error(options) {
        initMessage('error', this, options);
    }
}


export default Message;
const TOKEN_KEY = 'token';

/**
 * 在本地缓存登录令牌token
 * @param  {String} token 登录令牌token
 * @return {undefined}    undefined
 */
export const saveToken = token => localStorage.setItem(TOKEN_KEY, token);

/**
 * 移除本地缓存的登录令牌token
 * @return {undefined} undefined
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * 获取本地缓存的登录令牌token
 * @return {null|String} 不存在返回null，否则返回字符串值
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY);


/**
 * 根据selector获取element中第一个选择元素
 * @param  {String} selector 				CSS选择器
 * @param  {Document|HTMLElement} element  	默认值为document
 * @return {HTMLElement}          			html元素
 */
export const $ = (selector, element = document) => element.querySelector(selector);

/**
 * 根据标签名创建元素
 * @param  {String} tagName 标签名
 * @return {HTMLElement}    html元素
 */
export const $$ = tagName => document.createElement(tagName);

// 一类表单元素校验
export class FieldValidator {
    /**
     * FieldValidator构造器
     * @param  {String} id 				元素id属性值
     * @param  {Function} validatorFunc 元素值校验规则函数，传入元素值，返回错误信息。返回undefined则没有错误。
     * @return {FieldValidator}         FieldValidator实例对象
     */
    constructor(id, validatorFunc, isShowErr = true, isInputValidate = true) {
        this.input = $(`#${id}`);
        this.isShowErr = isShowErr;
        this.validatorFunc = validatorFunc;
        // 在失去焦点、提交表单时校验
        this.input.addEventListener('blur', this.validate.bind(this));

        if(isInputValidate){
            const validatorHandler = debounce(this.validate.bind(this));
            this.input.addEventListener('input', validatorHandler);
        }
    }

    async validate() {
        const inputDom = this.input;
        const errorMsg = await this.validatorFunc(inputDom.value);
        const tipDom = inputDom.nextElementSibling;

        if (!this.isShowErr) return !errorMsg;

        return !(tipDom.innerText = errorMsg ?? '');
    }

    static async validate(...validators) {
        const promiseResults = validators.map(v => v.validate());
        const dataResults = await Promise.all(promiseResults);
        const result = dataResults.every(Boolean);

        return result;
    }
}

/**
 * 表单提交
 * @param  {String} selector   		表单CSS选择器
 * @param  {Function} doAction   	表单提交具体行为
 * @param  {Function} successHandler   成功回调
 * @param  {Function} failHandler     失败回调
 * @param  {Array}  validators 		校验的表单项
 * @return {Promise}            	Promise对象
 */
export const formSubmit = (selector, doAction, validators, initHandler, successHandler, failHandler) => {
    const form = $(selector);
    const submitHandler = lock(async (e) => {
        if (e.cancelable && !e.defaultPrevented) e.preventDefault();
        const vResult = await FieldValidator.validate(...validators);

        if (vResult) {
            const formData = new FormData(form);
            const params = Object.fromEntries(formData);
            initHandler?.();
            const doResult = await doAction(params);

            if (doResult.data) {
                successHandler?.(doResult.data);
            } else {
                failHandler?.(doResult.msg);
            }
        }
    });
    form.addEventListener('submit', submitHandler);
};

/**
 * 将url中参数解析为对象
 * @param  {Location|String|URL} url
 * @return {Object}     键值对形式
 */
export const urlParamParse = (url) => {
    const urlObj = new URL(url);

    return Object.fromEntries(urlObj.searchParams);
};

/**
 * 元素平滑滚动到元素底部
 * @param  {HTMLElement} element 滚动元素
 * @return {undefined}           undefined
 */
export const scrollToBottom = element => {
    const top = element.scrollHeight;
    element.scrollTo({
        top,
        left: 0,
        behavior: 'smooth'
    });
};

/**
 * 函数防抖
 * @param  {Function} fn    要防抖的函数
 * @param  {Number}   delay 延迟执行的毫秒数
 * @return {Proxy}          防抖后的代理
 */
export const debounce = (fn, delay = 200) => {
    let timer = null

    return new Proxy(fn, {
        apply(target, thisRef, argsList) {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                Reflect.apply(target, thisRef, argsList);
                timer = null;
            }, delay);
        }
    });
};

export const lock = (fn) => {
    let locked = false;

    return new Proxy(fn, {
        async apply(target, thisRef, argsList) {
            if (locked) throw Error('You can only continue after the task is completed and unlocked');
            locked = true;
            const result = await Reflect.apply(target, thisRef, argsList);

            locked = false;

            return result;
        }
    });
};

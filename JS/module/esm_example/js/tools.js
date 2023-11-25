/**
 * 根据css选择器获取第一个选中的元素
 * @param {string} selector css选择器
 * @param {HTMLElement} element dom元素
 * @returns {HTMLElement} dom元素
 */
export const $ = (selector, element = document) => element.querySelector(selector);


/**
 * 任务开始加锁，直到任务结束解锁
 * @param {function} fn 任务
 * @param {function} taskBefore 任务开始前行为
 * @param {function} taskAfter 任务结束后行为
 * @returns {Promise} Promise对象，任务结果
 */
export const lock = (fn, taskBefore, taskAfter) => {
    let locked = false;

    return new Proxy(fn, {
        async apply(target, thisRef, argsList) {
            try {
                if (locked) return;
                locked = true;
                taskBefore?.(...argsList);

                const result = await Reflect.apply(target, thisRef, argsList);

                locked = false;
                taskAfter?.(result);

                return result;
            } catch (err) {
                locked = false;

                taskAfter?.(null);

                return Promise.reject(err);
            }
        }
    });
};

/**
 * 阻止事件默认行为
 * @param {Event} event 事件触发时创建的对象
 */
export const preventEventDefault = event => {
    const { cancelable, defaultPrevented } = event;

    if (cancelable && !defaultPrevented) {
        event.preventDefault();
    }
};
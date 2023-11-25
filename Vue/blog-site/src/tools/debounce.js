const debounce = (fn, delay = 200) => {
    let timer = null;

    return new Proxy(fn, {
        apply(target, thisArg, argArray) {
            timer && clearTimeout(timer);

            timer = setTimeout(() => {
                Reflect.apply(target, thisArg, argArray);
                timer = null;
            }, delay);
        }
    });
};


export default debounce;
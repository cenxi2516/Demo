import {vwHeight, vwWidth} from '@/Tools/vwSize'

export const isNormalCompatMode = () => document.compatMode === 'CSS1Compat';

export const debounce = (fn, delay = 200) => {
    let timer = null;

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

export const throttle = (fn, delay = 2E2, immediate = true) => {
    let timer = null;

    return new Proxy(fn, {
        apply(target, thisArg, argArray) {
            if (immediate) {
                if (timer) return;
                Reflect.apply(target, thisArg, argArray);
                timer = setTimeout(() => {
                    timer = null;
                }, delay);
            } else {
                if (timer) return;
                timer = setTimeout(() => {
                    Reflect.apply(target, thisArg, argArray);
                    timer = null;
                }, delay);
            }
        }
    });
};

export const isInViewPort = dom => {
    const [vpWidth, vpHeight] = [vwWidth(), vwHeight()];
    const {
        top,
        left,
        width,
        height,
    } = dom.getBoundingClientRect();

    const isInVerticalVP = top < 0 && Math.abs(top) < height || top > 0 && top < vpHeight;
    const isInHorizontalVP = left < 0 && Math.abs(left) < width || left > 0 && left < vpWidth;

    return isInVerticalVP && isInHorizontalVP;
};
import {isNormalCompatMode} from '@/Tools/common';

export const vwWidth = () => {
    return (isNormalCompatMode() ? document.documentElement : document.body).clientWidth;
};

export const vwHeight = () => {
    return (isNormalCompatMode() ? document.documentElement : document.body).clientHeight;
};
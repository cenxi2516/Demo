import {isNormalCompatMode} from '@/Tools/common';

export const scrollTop = () => {
    return (isNormalCompatMode() ? document.documentElement:document.body).scrollTop;
};

export const scrollLeft = () => {
    return (isNormalCompatMode() ? document.documentElement : document.body).scrollLeft;
};
import {debounce, isInViewPort} from '@/Tools/common';

export const imageLazyLoadHandler = debounce(() => {
    const showImg = dom => {
        dom.style.cssText = `
                        z-index: 1;
                        opacity: 1;
                    `;
        dom.removeAttribute('data-src');
    };
    const allLazyLoadImg = document.querySelectorAll('img[data-src]');
    allLazyLoadImg.forEach(dom => {
        const isInVP = isInViewPort(dom);
        if (isInVP) {
            dom.onerror = dom.onload = () => showImg(dom);
            dom.src = dom.dataset.src;
        }
    });

}, 5E2);


export const imageLazyLoad = () => {
    window.addEventListener('scroll', imageLazyLoadHandler);
};
import $ from 'jquery';
import styles from './index.module.less';
import {initMovieContainer} from '@/movie/list'

const SHOW_NUM_COUNT = 10;

/**
 * 每个按钮：
 * 1、显示文本
 * 2、状态：正常、禁用、激活
 * 3、当前页面
 */
const NORMAL_STATUS = 'normal';
const DISABLED_STATUS = 'disabled';
const ACTIVE_STATUS = 'active';
let pagerContainer = null;

export const initPager = (pageNth, pageSize, total) => {
    pagerContainer && pagerContainer.remove();
    pagerContainer = $('<div>').addClass(styles.container);

    $('#app').append(pagerContainer);

    pagerContainer.on('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const targetDom = e.target;
        const dataset = targetDom.dataset;
        if (!Object.hasOwn(dataset, 'canClick')) return;
        if(dataset.canClick !== NORMAL_STATUS) return;


        initMovieContainer(+dataset.page);

    });

    const endPage = Math.ceil(total / pageSize);
    const startIndex = Math.max(1, Math.floor(pageNth - SHOW_NUM_COUNT / 2));
    const endIndex = SHOW_NUM_COUNT + startIndex - 1;

    // 创建首尾
    createTag('首页', pageNth === 1 ? DISABLED_STATUS : NORMAL_STATUS, 1);
    // 创建上一页
    createTag('上一页', pageNth === 1 ? DISABLED_STATUS : NORMAL_STATUS, pageNth - 1);
    // 创建数值页码
    for(let i = startIndex; i < endIndex; i++){
        createTag(i, pageNth === i ? ACTIVE_STATUS: NORMAL_STATUS, i);
    }
    // 创建下一页
    createTag('下一页', pageNth === endPage ? DISABLED_STATUS : NORMAL_STATUS, pageNth + 1);
    // 创建尾页
    createTag('尾页', pageNth === endPage ? DISABLED_STATUS : NORMAL_STATUS, endPage);
};

const createTag = (text, status, pageNth) => {
    const $tag = $('<span>').addClass(styles[status]).text(text);
    $tag.attr('data-can-click', status);
    $tag.attr('data-page', pageNth);

    pagerContainer.append($tag);
};
import $ from 'jquery';
import styles from './index.module.less';
import {getMovies} from '@/api/movies';
import {SUCCESS_CODE} from '@/api';
import {initPager} from '@/movie/pager';
import {imageLazyLoad, imageLazyLoadHandler} from '@/Tools'

const FIRST_PAGE = 1;
const ONE_PAGE_SIZE = 30;
let movieListContainer = null;


export const initMovieContainer = async (pageNth, pageSize = ONE_PAGE_SIZE) => {
    // 根据数据生成首页电影列表
    const resp = await getMovies(pageNth, pageSize);
    let movieList = [], movieTotal = 0;

    if(resp.code === SUCCESS_CODE){
        ({movieList, movieTotal} = resp.data);
    }

    initMovieList(movieList);
    initPager(pageNth, pageSize, movieTotal);
    imageLazyLoadHandler();
};

const initMovieList = (movieData) => {
    if(!movieData.length) {
        $('#app').append(`<div class="${styles.empty}">当前页面无电影数据</div>`);
    }

    movieListContainer && movieListContainer.remove();
    const lis = movieData.map(item => {
        const {cover, rate, title, url} = item;
        return `
        <li class="${styles.listItems}">
            <a class="${styles.imgLink}" href="${url}" target="_blank">
                <img class="${styles.img}" data-src="${cover}" alt="${title}">
            </a>
            <a class="${styles.title}" href="${url}" target="_blank">${title}</a>
            <p class="${styles.rate}">${rate}</p>
        </li>`;
    }).join('');

    movieListContainer = $('<ul>').addClass(styles.container).append(lis);

    $('#app').append(movieListContainer);
};

const init = () => {
    imageLazyLoad();
    initMovieContainer(FIRST_PAGE, ONE_PAGE_SIZE);
};

init();

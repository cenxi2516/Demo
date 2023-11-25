import $ from 'jquery';
import styles from './index.module.less';
import videoURL from '@/assets/movie.mp4';
import audioURL from '@/assets/music.mp3';
import {debounce, scrollTop, vwHeight} from '@/Tools';

const init = () => {

    // 初始化cover
    initCoverTemplate();

    // 交互
    initCoverInteractive();
};

const initCoverTemplate = () => {
    const coverTemplate = `
        <div class="${styles.container}">
            <h1 class="${styles.title}">豆瓣电影</h1>
            <video src="${videoURL}" autoplay muted loop></video>
            <audio src="${audioURL}" autoplay loop></audio>
        </div>
    `;

    $('#app').append(coverTemplate);
};

const initCoverInteractive = () => {
    const clientHeight = vwHeight();
    const video = $('video')[0],
            audio = $('audio')[0];
    let currentPlayState = false;

    const mediaPlay = async () => {
        video?.play();
        const audioPromise = audio?.play();
        if (audioPromise !== undefined) {
            audioPromise.then(_ => {
                // Autoplay started!
                audio.play();
            }).catch(error => {
                $(video).one('click', () => audio.play());
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }
    };

    const mediaPause = () => {
        video?.pause();
        audio?.pause();
    };

    // 滚动超过首屏，停止视频和音乐播放，在首屏内开始播放
    window.addEventListener('scroll', debounce(() => {
        const scrollHeight = scrollTop();
        if(scrollHeight > clientHeight){
            mediaPause();
        } else {
            mediaPlay();
        }
    }));

    // 当前页面状态不可见则，暂停播放。
    document.addEventListener('visibilitychange', () => {
        const documentState = document.visibilityState;
        if(documentState === 'visible'){
            if(currentPlayState){
                mediaPlay();
            }
        } else {
            currentPlayState = !video.paused;
            if(currentPlayState) {
                mediaPause();
            }
        }
    });
};


init();
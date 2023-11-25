(() => {
    const $Id = id => document.getElementById(id);
    const $ = (selector, element = document) => element.querySelector(selector);

    // 获取dom
    const doms = {
        video: $('.video-wrapper video'),
        controlsWrapper: $('.controls-wrapper'),
        playBtn: $Id('btnPlay'),
        progress: {
            range: $Id('progress'),
            current: $Id('current'),
            total: $Id('total')
        },
        rateConatiner: $Id('rate'),
        volume: {
            range: $Id('volume-range'),
            percentage: $Id('percentage')
        },
        volumeContainer: $Id('volume'),
        saveBtn: $Id('save'),
        loadBtn: $Id('load')
    };

    // 初始化
    const init = () => {
        // 1. 显示controls
        doms.controlsWrapper.style.display = 'block';

        // 2、初始化设置
        loadSetting();
    };

    // 将秒数格式化为: hh:mm:ss格式的字符串
    const formatSeconds = seconds => {
        const hour = Math.floor(seconds / 3600);
        seconds -= hour * 3600;
        const minute = Math.floor(seconds / 60);
        seconds -= minute * 60;
        seconds = Math.floor(seconds);

        const _padStartZero = value => String(value).padStart(2, '0');

        return `${_padStartZero(hour)}:${_padStartZero(minute)}:${_padStartZero(seconds)}`;
    };

    // 设置播放进度
    const setPlayProgress = () => {
        const {
            video,
            progress: {
                range,
                current,
                total
            }
        } = doms;
        // 设置文本
        const totalTime = video.duration,
            currentTime = video.currentTime;

        current.innerText = formatSeconds(totalTime);
        total.innerText = formatSeconds(currentTime);

        // 设置进度条
        const min = range.min,
            max = range.max;

        range.value = currentTime / totalTime * +(max - min);
    };

    // 设置播放速率
    const setPlayRate = () => {
        const rateBtns = [...doms.rateConatiner.children];
        const curPlayRate = doms.video.playbackRate;

        rateBtns.forEach((rateBtn) => {
            if (+rateBtn.dataset.rate === curPlayRate) {
                rateBtn.classList.add('active');
            } else {
                rateBtn.classList.remove('active');
            }
        });
    };

    // 设置播放音量
    const setPlayVolume = () => {
        const {
            video,
            volume: {
                range,
                percentage
            }
        } = doms;
        // 设置文本
        const curVolume = video.volume;
        let perValue = Math.round(curVolume * 100);
        if (video.muted) {
            perValue = 0;
        }

        percentage.innerText = `${perValue}%`;
        // 设置进度
        const min = range.min,
            max = range.max;

        range.value = perValue / 100 * +(max - min);
    };

    // 1、在第一帧数据加载完后，初始化
    doms.video.addEventListener('loadeddata', init);

    // 交互

    // 1、禁止在播放器中鼠标右键，显示菜单
    doms.video.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // 2、点击播放暂停
    doms.playBtn.addEventListener('click', (e) => {
        const video = doms.video;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    doms.video.addEventListener('dblclick', (e) => {
        doms.playBtn.click();
    });

    // 3、视频currentTime变更触发
    doms.video.addEventListener('timeupdate', setPlayProgress);

    // 4、滑动滚动条
    doms.progress.range.addEventListener('input', (e) => {
        const rangeDom = e.target,
            rangeValue = rangeDom.value,
            min = rangeDom.min,
            max = rangeDom.max;
        const totalTime = doms.video.duration;
        const curTime = rangeValue / (max - min) * totalTime;

        doms.video.currentTime = curTime;
    });

    // 5、更改播放速率
    doms.rateConatiner.addEventListener('click', (e) => {
        const targetDom = e.target;
        if (targetDom.tagName.toUpperCase() !== 'BUTTON') return;

        const playRate = +targetDom.dataset.rate;
        doms.video.playbackRate = playRate;

        setPlayRate();
    });

    // 6、更改播放音量
    doms.volume.range.addEventListener('input', (e) => {
        const rangeDom = e.target,
            rangeValue = rangeDom.value,
            min = rangeDom.min,
            max = rangeDom.max;
        const curVolume = rangeValue / (max - min);

        doms.video.volume = curVolume;

        setPlayVolume();
    });

    // 7、保存设置
    const SAVE_KEY = 'video';
    const saveSetting = () => {
        const video = doms.video;
        const setting = {
            currentTime: video.currentTime,
            playbackRate: video.playbackRate,
            volume: video.volume
        };

        localStorage.setItem(SAVE_KEY, JSON.stringify(setting));
    };
    doms.saveBtn.addEventListener('click', saveSetting);

    // 8、加载设置
    const loadSetting = () => {
        // 1、获取设置
        const setting = localStorage.getItem(SAVE_KEY);
        Object.assign(doms.video, JSON.parse(setting) || {});

        // 2. 设置播放进度
        setPlayProgress();
        // 3. 设置播放速率
        setPlayRate();
        // 4、设置播放音量
        setPlayVolume();
    };
    doms.loadBtn.addEventListener('click', (e) => {
        loadSetting();
        doms.video.play();
    });

    // 9、播放暂停时，自动保存设置
    doms.video.addEventListener('pause', saveSetting);

    // 10、切换页面、离开浏览器自动暂停
    let isPlayOfLeave = false;
    document.addEventListener('visibilitychange', (e) => {
        const video = doms.video;
        switch (document.visibilityState) {
            case 'visible': // 回到当前页面
                isPlayOfLeave && video.play();
                break;
            case 'hidden': // 离开当前页面
                isPlayOfLeave = !video.paused;
                video.pause();
                break;
        }
    });

    // 11、页面刷新或关闭，自动保存播放设置
    window.addEventListener('pagehide', saveSetting);

    // 12、播放结束时，删除保存的播放设置
    const delSetting = () => {
        localStorage.removeItem(SAVE_KEY);
    };

    doms.video.addEventListener('ended', delSetting);
})();

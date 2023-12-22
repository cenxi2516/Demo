/**
 * 从网络获取歌词数据
 * @returns Promise
 */
const getLrc = async () => {
    return await fetch('https://study.duyiedu.com/api/lyrics')
        .then((resp) => resp.json())
        .then((resp) => resp.data);
};

const LyricHeight = 30, RowNum = 15, lyricWrapperHeight = LyricHeight * RowNum;

const dom = {
    oAudio: document.querySelector('audio'),
    oLyricList: document.querySelector('.lyric-list'),
};



const init = async () => {
    const data = await getLrc();
    const lyricHTMLContents = [];
    const lyrics = data.split('\n').filter(Boolean).map(lyric => {
        let time;
        const words = lyric.replace(/\[(?:(\d{2}):(\d{2})\.(\d{2,3}))\]/, (_, minute, second, milliseconds) => {
            time = +`${+second + minute * 60}.${milliseconds}`;
            return '';
        });

        dom.oLyricList.parentNode.style.height = lyricWrapperHeight+'px';
        lyricHTMLContents.push(`<li class="lyric-item" style="height: ${LyricHeight}px; line-height: ${LyricHeight}px">${words}</li>`);

        return { time, words };
    });

    dom.oLyricList.innerHTML = lyricHTMLContents.join('');

    return lyrics;
}

(async () => {
    // 初始化
    const lyrics = await init();

    const allLyricItem = dom.oLyricList.children;
    let currentActiveDom = null;
    const MidIndex = Math.floor(RowNum / 2);

    const setStatus = (time) => {
        currentActiveDom && currentActiveDom.classList.remove('active');
        let index = Math.max(lyrics.findIndex(lyric => time < lyric.time) - 1, 0);
        currentActiveDom = allLyricItem[index];
        currentActiveDom.classList.add('active');

        if(index <= MidIndex) {
            index = MidIndex;
        }
        const moveY = -(index - MidIndex) * LyricHeight;
        dom.oLyricList.style.transform = `translateY(${moveY}px)`;
    };

    // 交互
    dom.oAudio.addEventListener('timeupdate', function () {
        setStatus(this.currentTime);
    });
})();


const fetchHeroList = async () => {
    const response = await fetch('https://study.duyiedu.com/api/herolist');
    const responseData = await response.json();

    if (responseData.code !== 0) return [];

    return responseData.data;
};

const $ = (selector, element = document) => element.querySelector(selector);
const $$ = (selector, element = document) => element.querySelectorAll(selector);

const dom = {
    oHeroList: $('.hero-list'),
    oHeroItemContainer: $('.hero-items'),
    oHeroTypes: $$('.hero-item'),
    oAllTypeHero: $('.hero-item.all'),
    oSearchInput: $('.keyword-input input'),
    oSearchBtn: $('.keyword-input .btn')
};

const init = async () => {
    const heroList = await fetchHeroList();

    switchHeroType(heroList, dom.oAllTypeHero);

    return heroList;
};

const setHeroList = (heroList) => {
    dom.oHeroList.innerHTML = '';
    const heroListContent = heroList.toReversed().map(({ ename, cname }) => `
    <li class="hero-item">
        <a href="https://pvp.qq.com/web201605/herodetail/${ename}.shtml">
            <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}.jpg" alt="">
            <strong class="hero-name">${cname}</strong>
        </a>
    </li>`);

    dom.oHeroList.innerHTML = heroListContent.join('');
};

let nextCheckedTypeDom = null;
const switchHeroType = (heroList, currentCheckedTypeDom) => {
    nextCheckedTypeDom && nextCheckedTypeDom.classList.remove('checked');
    currentCheckedTypeDom.classList.add('checked');
    nextCheckedTypeDom = currentCheckedTypeDom;

    const { heroType } = currentCheckedTypeDom.dataset;
    heroList = +heroType === 0 ? heroList : heroList.filter(({ hero_type, hero_type2, pay_type }) => {
        return [hero_type, hero_type2, pay_type].includes(+heroType);
    });

    setHeroList(heroList);
};

const keywordFilterHero = (heroList, keyword) => {
    heroList = heroList.filter(({ cname }) => cname.includes(keyword));

    switchHeroType(heroList, dom.oAllTypeHero);
};

const handleKeyWorldFilter = (heroList, inputDom) => {
    const keyword = inputDom.value;

    keywordFilterHero(heroList, keyword);
}

(async () => {
    const heroList = await init();

    dom.oHeroItemContainer.addEventListener('click', (event) => {
        const targetDom = event.target;
        const { heroType } = targetDom.dataset;
        if (heroType && targetDom !== nextCheckedTypeDom) {
            switchHeroType(heroList, targetDom);
        }
    });

    dom.oSearchInput.addEventListener('input', (event) => handleKeyWorldFilter(heroList, event.target));

    dom.oSearchBtn.addEventListener('click', () => handleKeyWorldFilter(heroList, dom.oSearchInput));
})();
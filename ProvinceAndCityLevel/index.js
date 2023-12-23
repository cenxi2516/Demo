const getAreaData = async () => {
    const response = await fetch('https://study.duyiedu.com/api/citylist');
    const responseData = await response.json();

    if (responseData.code !== 0) return [];

    return responseData.data;
};

const $ = (selector, element = document) => element.querySelector(selector);
const $$ = (selector, element = document) => element.querySelectorAll(selector);

const dom = {
    oSelects: $$('.select-wrapper'),
    oProvinceSelect: $('#province'),
    oCitySelect: $('#city'),
    oAreaSelect: $('#area'),
};

const disableSelect = (selectDom) => selectDom?.classList.add('disabled');
const allowSelect = (selectDom) => selectDom?.classList.remove('disabled');
const isAllowSelect = (selectDom) => !selectDom?.classList.contains('disabled');
const toggleExpand = (selectDom) => selectDom?.classList.toggle('expand');
const closeExpand = (selectDom) => selectDom?.classList.remove('expand');
const setSelected = (optionDom) => optionDom?.classList.add('selected');
const removeSelected = (optionDom) => optionDom?.classList.remove('selected');

const setSelectOption = (selectOptionDom, selectOptionContent) => {
    if (!selectOptionDom || !selectOptionContent) return;

    selectOptionContent = selectOptionContent.map(({ value, label }) => `<li class="option-item" data-value="${value}">${label}</li>`);

    selectOptionDom.innerHTML = selectOptionContent.join('');
};

const setTitle = (selectDom, title) => $('.title', selectDom).innerHTML = title;
const { oSelects, oProvinceSelect, oCitySelect, oAreaSelect } = dom;

const init = async () => {
    disableSelect(oProvinceSelect);
    disableSelect(oCitySelect);
    disableSelect(oAreaSelect);

    const areaData = await getAreaData();

    if (!areaData.length) return [];

    allowSelect(oProvinceSelect);
    setSelectOption($('.select-list', oProvinceSelect), areaData);

    return areaData;
};


(async () => {
    const areaData = await init();

    if (!areaData.length) return;

    let curOpenExpandDom = null;
    const address = {};

    oSelects.forEach(oSelect => {
        oSelect.addEventListener('click', (event) => {
            if (!isAllowSelect(oSelect)) return;

            curOpenExpandDom !== oSelect && closeExpand(curOpenExpandDom);
            curOpenExpandDom = oSelect;
            toggleExpand(oSelect);

            const targetDom = event.target;
            if (oSelect.selectDom === targetDom) return;

            if (targetDom.classList.contains('option-item') && targetDom.tagName === 'LI') {
                removeSelected($('.selected', oSelect))
                setSelected(targetDom);
                oSelect.selectDom = targetDom;

                setTitle(oSelect, targetDom.innerHTML);

                const { value } = targetDom.dataset;
                address[oSelect.id] = value;
                switch (oSelect.id) {
                    case 'province':
                        oCitySelect.areaData = areaData.find(selectItem => selectItem.value === value).children;

                        setTitle(oCitySelect, `请选择${oCitySelect.dataset.name}`);
                        allowSelect(oCitySelect);
                        setSelectOption($('.select-list', oCitySelect), oCitySelect.areaData);

                        setTitle(oAreaSelect, `请选择${oAreaSelect.dataset.name}`);
                        disableSelect(oAreaSelect);

                        break;
                    case 'city':
                        oAreaSelect.areaData = oCitySelect.areaData.find(selectItem => selectItem.value === value).children;

                        setTitle(oAreaSelect, `请选择${oAreaSelect.dataset.name}`);
                        allowSelect(oAreaSelect);
                        setSelectOption($('.select-list', oAreaSelect), oAreaSelect.areaData);

                        break;
                    case 'area':
                        break;
                }
            }

        });
    });
})();
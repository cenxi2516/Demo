$(() => {
    // 在DOM解析完后开始，即DOMContentLoaded事件触发
    /**
     * 1、点击“全选”，所有的复选框跟着变化。
     *  a、获取选中商品件数。
     *  b、获取商品总金额。
     * 2、点击“-”或“+”按钮
     *  a、对应商品数量变化。（至少是1）
     *  b、对应商品金额变化，总金额变化。
     * 3、点击“删除”按钮
     *  a、删除购物车商品。
     *  b、总金额变化，商品件数变化。
     * 4、点击“删除选中商品”
     *  a、选中商品删除。
     *  b、总金额变化，商品件数变化。
     * 5、点击“清空购物车”
     *  a、删除购物车中所有商品。
     *  b、总金额变化，商品件数变化。
     * 6、手动输入某件商品的数量。
     *  a、商品数量不能少于0，非数值始终为1。
     *  b、总金额变化。
     */
    const $FullSelects = $('.checkAll:checkbox'),
        $SingleSelects = $('.checkItem:checkbox'),
        $SelectItems = $SingleSelects.parents('.item');

    const disabledInputNaN = (e) => {
        const oNum = e.target,
            defaultNum = oNum.defaultValue,
            value = oNum.value,
            num = +value,
            MIN_VALUE = 0;
        console.log(defaultNum);
        if (value === '' || Number.isFinite(num) && Number.isSafeInteger(num) && num >= MIN_VALUE) {
            oNum.defaultValue = value;
            return value;
        }

        e.preventDefault();

        return defaultNum;
    };

    const removeGoodsItem = ($GoodsItem) => {
        $GoodsItem.find(':checkbox').prop('checked', false);
        $GoodsItem.remove();
        setTotalMoneyAndNum();
    };

    const preventEventDefault = (e) => {
        if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
    };

    const setGoodsNum = ($Num, num) => {
        let curNum = 1;
        if (Number.isFinite(num) && Number.isSafeInteger(num) && num >= curNum) {
            curNum = num;
        }

        $Num.val(curNum);


        return curNum;
    }

    const setGoodsTotalMoney = ($Num, curNum) => {
        const $Item = $Num.parents('.item');
        const price = +$Item.find('.price>em').text().slice(1);
        const $TotalMoney = $Item.find('.sum>em');
        const totalMoney = price * curNum;

        $TotalMoney.text(`￥${totalMoney.toFixed(2)}`);
    };

    const setGoodsNumAndMoney = ($Num, num) => {
        setGoodsTotalMoney($Num, setGoodsNum($Num, num));
        setTotalMoneyAndNum();
    };

    const autoCancelFullSelect = () => {
        const isHasOneSelect = [...$SingleSelects].every(dom => dom.checked);

        $FullSelects.prop('checked', isHasOneSelect);
    };

    const setTotalMoneyAndNum = () => {
        const $CheckedItem = $SingleSelects.filter(':checked');
        const count = $CheckedItem.length;
        let money = 0;

        $CheckedItem.parents('.item').each((i, dom) => {
            money += +$(dom).find('.sum>em').text().slice(1);
        });

        $('.footer .nums > em').text(count);
        $('.footer .sums > em').text(`￥${money.toFixed(2)}`);
    };


    $FullSelects.change(function () {
        $(':checkbox').not(this).prop('checked', this.checked);
        setTotalMoneyAndNum();
    });

    $SingleSelects.change(function () {
        setTotalMoneyAndNum();
        autoCancelFullSelect();
    });

    $SelectItems.find('.decr').click(function (e) {
        preventEventDefault(e);
        const $Num = $(this).nextAll('.txt');
        const num = +$Num.val() - 1;

        setGoodsNumAndMoney($Num, num);
    });

    $SelectItems.find('.incr').click(function (e) {
        preventEventDefault(e);
        const $Num = $(this).prevAll('.txt');
        const num = +$Num.val() + 1;

        setGoodsNumAndMoney($Num, num);
    });

    $SelectItems.find('.del > a').click(function (e) {
        preventEventDefault(e);

        const $Item = $(this).parents('.item');
        removeGoodsItem($Item);
    });

    $('.footer .delChecked').click((e) => {
        preventEventDefault(e);
        const $CheckedItem = $SingleSelects.filter(':checked');

        $CheckedItem.prop('checked', false);
        $CheckedItem.parents('.item').remove();
        setTotalMoneyAndNum();
    });

    $('.footer .clearAll').click((e) => {
        preventEventDefault(e);

        $SingleSelects.prop('checked', true);
        $('.footer .delChecked').click();
    });


    $SelectItems.find('.txt').focus(function (e){
        $(this).prop('defaultValue', $(this).val());
    }).on('input', function (e) {
        const value = disabledInputNaN(e);
        const $Num = $(this);

        $Num.val(value);
        setGoodsTotalMoney($Num, +value);
        setTotalMoneyAndNum();
    }).blur(function(e){
        const $Num = $(this);
        const num = +$Num.val();

        setGoodsNumAndMoney($Num, num);
    });
});
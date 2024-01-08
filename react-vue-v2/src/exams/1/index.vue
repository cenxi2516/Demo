<!-- 第一题 -->
<template>
    <div class="card">
        <div class="content">
            <div class="title">{{ title }}</div>
            <div class="sub-title">{{ subTitle }}</div>
        </div>
        <div class="aside">
            <button type="button" :disabled="disabledStatus" @click="handlePurchase" class="btn">{{ btnText }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { h, ref, onMounted, computed, Ref } from 'vue';
import { purchaseShopping } from './api/purchase'

// 倒计时
const useCountDown = () => {
    const timeRef = ref<number>(10);
    let timer: number | null = null;

    onMounted(() => {
        timer = setInterval(() => {
            timeRef.value--;
            if (timeRef.value === 0 && typeof timer === 'number') {
                clearInterval(timer);
                timer = null;
            }
        }, 1E3);
    });

    return {
        timeRef
    };
};

// 抢购
const usePurchase = (timeRef: Ref<number>) => {
    const isPurchaseRef = ref(false); // 是否抢购，决定：抢购 & 已抢购
    const lockRef = ref(false); // 抢购锁，决定：抢购中，避免重复抢购
    const canPurchaseRef = computed(() => timeRef.value === 0 && !isPurchaseRef.value && !lockRef.value); // 能否抢购

    const purchase = async () => {
        if (!canPurchaseRef.value) return;

        lockRef.value = true; // 加锁
        const data = await purchaseShopping();

        isPurchaseRef.value = data.value; // 改变抢购状态
        lockRef.value = false; // 解锁
    };

    return {
        isPurchaseRef,
        lockRef,
        purchase
    };
};

/**
 * 测试数据
 */
const cardDataList = [
    {
        title: '杭州市通用5元券',
        subTitle:
            '杭味面馆非常好吃，太好吃了，相当不错，味道鲜美，特别划算，快快抢购，聚划算',
    },
    {
        title: '杭州市10元券',
        subTitle: '兰州拉面非常好吃',
    },
];

const Card = {
    setup() {
        const { timeRef } = useCountDown();
        const { isPurchaseRef, purchase, lockRef } = usePurchase(timeRef);

        const btnText = computed(() => {
            if (timeRef.value !== 0) return `${timeRef.value}s`;
            if (!isPurchaseRef.value && !lockRef.value) return '抢购';
            if (!isPurchaseRef.value && lockRef.value) return '抢购中...';
            if (isPurchaseRef.value) return '已抢购';
        });

        const disabledStatus = computed(() => {
            if (timeRef.value !== 0) return true;
            if (lockRef.value) return true;
            if (!isPurchaseRef.value) return false;
            if (isPurchaseRef.value) return true;
        });

        const handlePurchase = () => purchase();

        return {
            btnText,
            handlePurchase,
            disabledStatus
        }
    },
    props: ['title', 'subTitle'],
    __test__: () => { },
    components: {},
};

export default Card;


/**
 * 以下为测试用例，无需修改
 */
Card.__test__ = () =>
    cardDataList && cardDataList.map(data => h(Card, { ...data, key: data.title }));
</script>

<style lang="less" scoped>
@import './styles/mixins.less';

.card {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.36rem;
    width: 4.3rem;
    margin: 0 auto;
    margin-bottom: 0.1rem;
    padding-left: 0.3rem;
    padding-right: 0.24rem;
    border-radius: 0.12rem;
    background-color: #fff0f1;
    border: 0.01rem solid #ffdadb;

    .content {
        flex: 1;
        padding-right: 1em;

        .title {
            font-size: 0.24rem;
            font-weight: bold;
        }

        .sub-title {
            font-size: 0.22rem;
            color: #666;
            .multi-line-overflow(2);
        }
    }

    .aside {
        width: 1.08rem;
        flex: 0 0 auto;

        .btn {
            width: 100%;
            height: 0.45rem;
            border-radius: 0.08rem;
            font-size: 0.2rem;
            font-weight: bold;
            color: #fff;
            background-color: #f00;
            border: none;
            cursor: pointer;

            &:disabled {
                background-color: darken(#f00, 10%);
                cursor: not-allowed;
            }
        }
    }
}
</style>

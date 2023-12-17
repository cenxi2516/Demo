<template>
    <div class="bar1">
        <div class="item" v-for="item in bars" :key="item.country">
            <label>{{ item.country }}</label>
            <div class="bar" :style="{ background: item.color, width: item.width + 'px' }"></div>
            <div class="value">{{ valueSlice(item.value) }}万亿</div>
        </div>
    </div>
</template>

<script>
import { toRef } from 'vue';
import useBar from './useBar.js';

export default {
    props: {
        gdp: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    setup(props) {

        return {
            ...useBar(toRef(props, 'gdp'), 450)
        };
    },
}
</script>

<style lang="less" scoped>
.bar1 {
    width: 500px;
    box-sizing: border-box;
    margin: 3em;
    border-left: 1px solid #333;
}

.item {
    display: flex;
    height: 35px;
    line-height: 35px;
    margin: 1em 0;
    position: relative;

    label {
        position: absolute;
        left: -50px;
    }
}

.bar {
    width: 100px;
    height: 100%;
    margin-right: 1em;
    flex: 0 0 auto;
}

.value {
    flex: 0 0 auto;
}
</style>
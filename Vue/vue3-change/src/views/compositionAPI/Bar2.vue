<template>
    <div class="bar2">
        <div class="item" v-for="item in bars" :key="item.country">
            <label>{{ item.country }} {{ valueSlice(item.value) }}</label>
            <div class="bar" :style="{ background: item.color, width: item.width + 'px' }"></div>
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
            ...useBar(toRef(props, 'gdp'), 500)
        };
    }
}
</script>

<style lang="less" scoped>
.bar2 {
    width: 600px;
    box-sizing: border-box;
    margin: 3em;
    position: relative;

    &::before {
        content: "";
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        background: #666;
        left: 50%;
    }
}

.item {
    display: flex;
    height: 35px;
    line-height: 35px;
    margin: 1em 0;
    position: relative;
    justify-content: center;
    color: #fff;

    label {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
}

.bar {
    width: 100px;
    height: 100%;
    margin-right: 1em;
    flex: 0 0 auto;
}
</style>
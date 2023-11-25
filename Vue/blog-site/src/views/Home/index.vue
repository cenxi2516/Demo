<template>
    <div
        class="home-container"
        ref="container"
        @mousemove="handleMouseMove($event)"
        @mouseleave="handleMouseLeave()"
        v-loading="isLoading"
    >
        <ul
            class="carousel-wrapper"
            :style="{
				height: carouselWrapperHeight,
				width: `${100 * scaleRate}%`,
				transform: `translate(${translateXDistance}, ${translateYDistance})`,
				transition: isLoading ? 'none' : 'transform 0.5s',
			}"
            @wheel="handleWheel($event)"
            @transitionend="handleTransitionEnd()"
        >
            <li
                class="carousel-item"
                v-for="item in data"
                :key="item.id"
                :style="{
					height: `${containerHeight * scaleRate}px`,
					width: '100%',
				}"
            >
                <CarouselItem
                    @load="handleLoad($event)"
                    :carousel="item"
                    ref="carouselItem"
                />
            </li>
        </ul>
        <ul class="indicator-wrapper" v-if="lastIndex > 0">
            <li
                class="indicator-item"
                v-for="(item, i) in data"
                :key="item.id"
                :class="{ active: i === curIndex }"
                @click="switchTo(i)"
            ></li>
        </ul>
        <div
            class="arrow arrow-up"
            v-show="curIndex > 0"
            @click="switchTo(curIndex - 1)"
        >
            <Icon type="arrowUp" />
        </div>
        <div
            class="arrow arrow-down"
            v-show="curIndex < lastIndex"
            @click="switchTo(curIndex + 1)"
        >
            <Icon type="arrowDown" />
        </div>
    </div>
</template>

<script>
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";
import {fetchData} from "@/mixins";
import {getBanner} from "@/api/banner";
import {debounce} from "@/tools";
import {mapState} from 'vuex'

const handleWheel = debounce(function(e) {
    const {deltaY} = e; // 垂直方向滚动量，往上滚动为正值，往下滚动为负值
    const {deltaConst, switching} = this;

    if ((deltaY >= -deltaConst && deltaY <= deltaConst) || switching) return;

    const targetIndex = deltaY > 0 ? this.curIndex - 1 : this.curIndex + 1;

    this.switchTo(targetIndex);
});
const handleMouseMove = debounce(function(e) {
    const {
        containerLeft,
        containerTop,
        containerWidth,
        containerHeight,
        restWidth,
        restHeight,
        switching,
        isLoading,
    } = this;
    if (switching || isLoading) return;

    const mouseX = e.clientX - containerLeft;
    const mouseY = e.clientY - containerTop;

    this.debounceX = (-mouseX / containerWidth) * restWidth;
    this.debounceY = (-mouseY / containerHeight) * restHeight;
}, 0);

export default {
    components: {
        CarouselItem,
        Icon,
    },
    data() {
        return {
            curIndex: 0,
            containerHeight: 0,
            containerWidth: 0,
            containerTop: 0,
            containerLeft: 0,
            debounceX: 0,
            debounceY: 0,
            deltaConst: 5,
            scaleRate: 1.1,
            switching: false
        };
    },
    computed: {
        ...mapState('banner', ['isLoading', 'data']),
        lastIndex() {
            return this.data.length - 1;
        },
        carouselWrapperHeight() {
            return (
                this.containerHeight * this.scaleRate * this.data.length + "px"
            );
        },
        translateXDistance() {
            return this.debounceX + "px";
        },
        translateYDistance() {
            return (
                -this.containerHeight * this.scaleRate * this.curIndex +
                this.debounceY +
                "px"
            );
        },
        restWidth() {
            return this.containerWidth * (this.scaleRate - 1);
        },
        restHeight() {
            return this.containerHeight * (this.scaleRate - 1);
        },
    },
    methods: {
        handleWheel,
        handleMouseMove,
        updateContainerHeight() {
            const {container} = this.$refs;
            if (!container) return;

            this.containerHeight = container.clientHeight;
            this.containerWidth = container.clientWidth;
            const {top, left} = container.getBoundingClientRect();
            this.containerTop = top;
            this.containerLeft = left;
        },
        async switchTo(targetIndex) {
            if (targetIndex < 0 || targetIndex > this.lastIndex || this.switching) return;
            this.switching = true;
            this.curIndex = targetIndex;

           this.$refs.carouselItem[this.curIndex].loadBigImg();
        },
        handleTransitionEnd() {
            this.switching = false;
        },
        initDebounceDistance() {
            const {containerWidth, containerHeight} = this;
            const mouseX = containerWidth / 2;
            const mouseY = containerHeight / 2;

            this.debounceX = (-mouseX / containerWidth) * this.restWidth;
            this.debounceY = (-mouseY / containerHeight) * this.restHeight;
        },
        handleMouseLeave() {
            this.initDebounceDistance();
        },
        handleLoad() {
            this.switching = false;
        },
    },
    async created() {
        const resp = await this.$store.dispatch('banner/getBanner');
    },
    mounted() {
        this.switchTo(this.curIndex);
        this.updateContainerHeight();
        this.initDebounceDistance();
        this.$eventBus.$on('windowResize', this.updateContainerHeight);
    },
    destroyed() {
        this.$eventBus.$off('windowResize', this.updateContainerHeight);
    },
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@import '~@/styles/mixin.less';

.home-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.carousel-wrapper {
    position: relative;
}

.indicator-wrapper {
    .self-y-centered();
    right: 20px;

    .indicator-item {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: 1px solid #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        cursor: pointer;

        & ~ .indicator-item {
            margin-top: 4px;
        }

        &.active {
            background-color: #fff;
        }
    }
}

.arrow {
    .self-x-centered();
    color: @gray;
    animation: 2s infinite;

    .icon-container {
        font-size: 1.3em;
        cursor: pointer;
    }

    @border-distance: 15px;

    &-up {
        top: @border-distance;
        animation-name: jump-up;
    }

    &-down {
        bottom: @border-distance;
        animation-name: jump-down;
    }

    @jump-distance: 5px;

    @keyframes jump-up {
        0% {
            transform+: translateY(-@jump-distance);
        }

        50% {
            transform+: translateY(@jump-distance);
        }

        100% {
            transform+: translateY(-@jump-distance);
        }
    }

    @keyframes jump-down {
        0% {
            transform+: translateY(@jump-distance);
        }

        50% {
            transform+: translateY(-@jump-distance);
        }

        100% {
            transform+: translateY(@jump-distance);
        }
    }
}
</style>
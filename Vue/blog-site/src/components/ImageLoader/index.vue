<template>
    <div
        class="image-loader-container"
        @transitionend.once="handleTransitionEnd"
        :class="{ transition: isLoaded }"
        :style="{
			transitionDuration: `${duration}ms`,
		}"
    >
        <img
            class="img-item origin"
            :data-src="src"
            @load="handleLoad()"
            alt=""
            v-show="isLoaded"
            draggable="false"
            ref="bigImg"
        />
        <img
            class="img-item placeholder"
            :src="placeholder"
            alt=""
            v-show="!isLoaded"
            draggable="false"
        />
    </div>
</template>

<script>
import {gaussBlur, imageHandler} from '@/tools'

export default {
    props: {
        src: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 500,
        },
        isLoadBigImg: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            isLoaded: false,
        };
    },
    methods: {
        handleLoad() {
            this.isLoaded = true;
        },
        handleTransitionEnd() {
            this.$emit("load");
        },
    },
    watch: {
        isLoadBigImg: {
            handler() {
                const {bigImg} = this.$refs;
                if (!bigImg || bigImg?.dataset?.loaded) return;

                const imgDom = new Image();
                const bigImgURL = bigImg.dataset.src;
                imgDom.src = bigImgURL;

                imgDom.addEventListener('load', () => {
                    bigImg.src = bigImgURL;
                    bigImg.dataset.loaded = 'true';
                });

            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.image-loader-container {
    position: relative;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    filter: blur(2vw);
    transition-property: opacity, filter;

    .img-item {
        position: absolute;
        left: 0;
        top: 0;

        &.placeholder {
            z-index: 1;
        }

        &.origin {
            z-index: 0;
        }
    }

    &.transition {
        opacity: 1;
        filter: blur(0);

        .placeholder {
            z-index: 0;
        }

        .origin {
            z-index: 1;
        }
    }
}
</style>
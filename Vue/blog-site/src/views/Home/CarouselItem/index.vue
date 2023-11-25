<template>
	<div class="carousel-item-container" ref="container">
		<div class="img">
			<ImageLoader
				:src="carousel.bigImg"
				:placeholder="carousel.midImg"
                @load="handleLoad()"
				:duration="3000"
                :isLoadBigImg="isLoadBigImg"
			/>
		</div>
		<p class="title" ref="title">{{ carousel.title }}</p>
		<p class="desc" ref="desc" @transitionend="handleTransitionEnd">{{ carousel.description }}</p>
	</div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
import { transitionAnimation } from "@/tools";
import isInScollContainerArea from '@/tools/isInScollContainerArea'


export default {
	props: {
		carousel: {
			type: Object,
			required: true,
		},
	},
	components: {
		ImageLoader,
	},
	data() {
		return {
            title: null,
            titleWidth: 0,
            desc: null,
            descWidth: 0,
            isLoadBigImg: false
        };
	},
	methods: {
		textShow() {
            const {title, desc, titleWidth, descWidth} = this;

            title.transition = '1s';
            desc.transition = '2s 1s';

			transitionAnimation(
				() => {
					title.style.width = 0;
					title.style.opacity = 1;
                    title.style.transition = title.transition;
				},
				() => {
					title.style.width = titleWidth;
				}
			);

            transitionAnimation(
				() => {
					desc.style.width = 0;
					desc.style.opacity = 1;
                    desc.style.transition = desc.transition;
				},
				() => {
					desc.style.width = descWidth;
				}
			);
		},
        handleLoad(){
            this.textShow();
			this.$emit('load');
        },
		handleTransitionEnd(){
			this.title.style.transition = 'none';
            this.desc.style.transition = 'none';
		},
        loadBigImg(){
            this.isLoadBigImg = true;
        }

	},
	mounted() {
		const { title, desc, container } = this.$refs;
		if (!(title && desc)) return;


        this.title = title;
        this.titleWidth = title.offsetWidth + "px";
        this.desc = desc;
        this.descWidth = desc.offsetWidth + "px";
        if(isInScollContainerArea(container)) {
            this.loadBigImg();
        }
	},
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

.carousel-item-container {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;

	.img {
		width: 100%;
		height: 100%;
	}

	.title,
	.desc {
		.self-y-centered();
		left: 10vw;
		letter-spacing: 3px;
        white-space: nowrap;
        overflow: hidden;
		color: #fff;
		text-shadow: 0 -1px 0 @self-transparent, 1px 0 0 @self-transparent, 0 1px 0 @self-transparent,
			-1px 0 0 @self-transparent;
		opacity: 0;
	}

	.title {
		font-size: 1.3em;
	}

	.desc {
		margin-top: 40px;
        color: lighten(#fff, 10%);
	}
}
</style>
<template>
	<div class="item-container">
		<a class="link" :href="href" :target="target" draggable="false">
			<Icon :type="type" />
			<span class="desc">{{ text }}</span>
			<div class="qr-code" v-if="qrCodeURL">
				<img :src="qrCodeURL" alt="" />
			</div>
		</a>
	</div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
	components: {
		Icon,
	},
	props: {
		text: {
			type: String,
			required: true,
		},
		href: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		qrCodeURL: {
			type: String,
		},
		target: {
			type: String,
			default: "_self"
		}
	},
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.item-container {
	position: relative;
	color: @lightWords;

	.link {
		display: inline-flex;
		align-items: center;

		.desc {
			margin-left: 6px;
		}

		.icon-container {
			font-size: 24px;
		}

		&:hover {
			.qr-code {
				will-change: transform;
				transform: scale(1);
			}
		}
	}

	.qr-code {
		position: absolute;
		left: 0;
		bottom: 150%;
		padding: 20px;
		width: 150px;
		height: 150px;
		border-radius: 5px;
		background-color: #fff;
		transform-origin: center bottom;
		transform: scale(1, 0);
		transition: 0.6s ease-in-out;

		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 10px;
			height: 10px;
			background-color: #fff;
			transform: rotate(45deg) translate(15%, 60%);
		}
	}
}
</style>
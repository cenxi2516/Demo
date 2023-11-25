<template>
	<div class="empty-container">
		<Icon type="empty" />
		<p class="desc">{{ text }}</p>
	</div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
	props: {
		text: {
			type: String,
			default: "无数据",
		},
	},
	components: {
		Icon,
	},
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.empty-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: @gray;

	.icon-container {
		font-size: calc(16px * 6);
	}

	.desc {
		margin-top: 20px;
	}
}
</style>
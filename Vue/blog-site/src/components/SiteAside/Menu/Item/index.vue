<template>
		<RouterLink
			:to="{ name }"
			:exact-path="exact"
			class="item-container"
			active-class="active"
			exact-active-class=""
		>
			<Icon :type="type" />
			<span class="desc">{{ title }}</span>
		</RouterLink>
</template>

<script>
import Icon from "@/components/Icon";

export default {
	components: {
		Icon,
	},
	props: {
		type: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		name: {
			// 路由名
			type: String,
			required: true,
		},
		exact: {
			// 是否精确匹配
			type: Boolean,
			required: true,
		},
	},
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.item-container {
	display: block;
	padding: 10px 0 10px 30px;
	color: @lightWords;

	.desc {
		margin-left: 6px;
	}

	&.active,
	&:hover {
		background-color: lighten(@dark, 5%);
		color: #fff;
	}
}
</style>
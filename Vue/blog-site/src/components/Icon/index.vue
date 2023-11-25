<template>
	<i class="iconfont icon-container" :class="className"></i>
</template>

<script>
import classMap from "./IconMap";

export default {
	props: {
		type: {
			type: String,
			required: true,
		},
	},
	computed: {
		className() {
			return classMap[this.type];
		},
	},
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/font_2164449_nalfgtq7il.css";
</style>
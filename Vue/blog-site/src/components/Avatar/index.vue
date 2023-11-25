<template>
	<img
		class="avatar-container"
		draggable="false"
		:src="url"
		:style="{
			width: size + 'px',
			height: size + 'px',
		}"
	/>
</template>

<script>
export default {
	props: {
		url: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			default: 100,
		},
	},
};
</script>

<style lang="less" scoped>
.avatar-container {
	border-radius: 50%;
}
</style>

<template>
	<div class="layout-container">
		<div class="main">
			<slot></slot>
		</div>
		<div class="left-side-aside">
			<slot name="left"></slot>
		</div>
		<div class="right-side-aside">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-container {
	display: flex;
	width: 100%;
	height: 100%;

	.main,
	.left-side-aside,
	.right-side-aside {
		overflow: hidden;
	}

	.main {
		order: 2;
		flex: 1;
	}

	.left-side-aside {
		order: 1;
		flex: 0 0 auto;
	}

	.right-side-aside {
		order: 3;
		flex: 0 0 auto;
	}
}
</style>
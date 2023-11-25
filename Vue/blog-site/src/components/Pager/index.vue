<template>
	<div class="pager-container" v-if="totalPage > 1">
		<span
			class="item"
			:class="{ disabled: current === 1 }"
			@click="handleClick(1)"
			>|&lt;&lt;</span
		>
		<span
			class="item"
			:class="{ disabled: current === 1 }"
			@click="handleClick(current - 1)"
			>&lt;&lt;</span
		>
		<span
			class="item"
			v-for="(item, i) in visibleNum"
			:class="{ active: item === current }"
			v-show="visibleNum.includes(item)"
			@click="handleClick(item)"
			:key="i"
		>
			{{ item }}
		</span>
		<span
			class="item"
			:class="{ disabled: current === totalPage }"
			@click="handleClick(current + 1)"
			>&gt;&gt;</span
		>
		<span
			class="item"
			:class="{ disabled: current === totalPage }"
			@click="handleClick(totalPage)"
			>&gt;&gt;|</span
		>
	</div>
</template>

<script>
export default {
	props: {
		current: {
			// 当前页码
			type: Number,
			default: 1,
		},
		total: {
			// 总数
			type: Number,
			default: 0,
		},
		limit: {
			// 每页数量
			type: Number,
			default: 10,
		},
		visibleNumber: {
			// 显示的页码数
			type: Number,
			default: 10,
		},
	},
	computed: {
		// 总页数
		totalPage() {
			return Math.ceil(this.total / this.limit);
		},
		visibleMin() {
			let min = Math.floor(this.current - this.visibleNumber / 2);
			min = Math.max(1, min);

			return min;
		},
		visibleMax() {
			let max = this.visibleMin + this.visibleNumber - 1;
			max = Math.min(max, this.totalPage);

			return max;
		},
		visibleNum() {
			const arr = [];
			for (
				let start = this.visibleMin, end = this.visibleMax;
				start <= end;
				start++
			) {
				arr.push(start);
			}

			return arr;
		},
	},
	methods: {
		handleClick(newPage) {
			newPage = Math.max(newPage, 1);
			newPage = Math.min(newPage, this.totalPage);
			if (newPage === this.current) return;

			this.$emit("pageChange", newPage);
		},
	},
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.pager-container {
	display: flex;
	justify-content: center;

	.item {
		flex: 0 0 auto;
		margin: 0 5px;
		cursor: pointer;
		color: @primary;
	}

	.active {
		color: @dark;
		cursor: text;
	}

	.disabled {
		color: @lightWords;
		cursor: not-allowed;
	}
}
</style>

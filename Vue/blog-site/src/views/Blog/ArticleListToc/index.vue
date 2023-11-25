<template>
	<div class="article-list-toc-container" v-loading="isLoading">
		<h2 class="title">文章分类</h2>
		<TocList
			:listData="listData"
			@switchList="handleSwitchList($event)"
			v-if="data.length"
		/>
	</div>
</template>

<script>
import { fetchData } from "@/mixins";
import { getBlogTypes } from "@/api/blog";
import TocList from "./../TocList";

export default {
	mixins: [fetchData([])],
	components: {
		TocList,
	},
	computed: {
		routeInfo() {
			const {
				query: { limit = 10 },
				params: { categoryId = -1 },
			} = this.$route;

			return {
				limit,
				categoryId,
			};
		},
		listData() {
			const sortData = this.data.toSorted((a, b) => a.order - b.order);
			const combineData = [
				{
					name: "全部",
					articleCount: sortData.reduce(
						(a, b) => a + b.articleCount,
						0
					),
					id: -1,
				},
				...sortData,
			].map((item) => ({
				...item,
				isSelect: +this.routeInfo.categoryId === +item.id,
				aside: `${item.articleCount}篇`,
			}));

			return combineData;
		},
	},
	methods: {
		async fetchData() {
			return await getBlogTypes();
		},
		handleSwitchList(data) {
			const { limit } = this.routeInfo;
			const query = {
				limit,
				page: 1,
			};
			if (+data.id === -1) {
				this.$router.push({
					name: "blog",
					query,
				});
			} else {
				this.$router.push({
					name: "blog-cate",
					query,
					params: { categoryId: data.id },
				});
			}
		},
	},
};
</script>

<style lang="less" scoped>
.article-list-toc-container {
	position: relative;
	width: 250px;
	height: 100vh;
	padding: 20px;
	font-size: 14px;
	overflow: auto;

	.title {
        font-size: 16px;
		margin-bottom: 20px;
		font-weight: bold;
	}
}
</style>
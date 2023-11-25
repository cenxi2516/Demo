<template>
	<div class="article-container" v-loading="isLoading">
		<Layout v-if="data">
			<template #default>
                <ArticleDetail :data="data" />
			</template>
			<template #right>
				<ArticleDetailToc :dataToc="data?.toc || []" />
			</template>
		</Layout>
	</div>
</template>

<script>
import Layout from "@/components/Layout";
import ArticleDetail from "./ArticleDetail";
import ArticleDetailToc from "./ArticleDetailToc";
import { fetchData } from "@/mixins";
import { getSingleBlog } from "@/api/blog";

export default {
	mixins: [fetchData(null)],
	components: {
		Layout,
		ArticleDetail,
		ArticleDetailToc
	},
	computed: {
		blogId() {
			return this.$route.params.blogId;
		},
	},
	methods: {
		async fetchData() {
			return (await this.blogId) ? getSingleBlog(this.blogId) : null;
		},
	},
};
</script>

<style lang="less" scoped>
.article-container {
	position: relative;
	width: 100%;
	height: 100vh;
}
</style>
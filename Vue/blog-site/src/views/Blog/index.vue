<template>
	<div class="blog-container">
		<Layout>
			<template #default> <ArticleList /> </template>
			<template #right> <ArticleListToc /> </template>
		</Layout>
	</div>
</template>

<script>
import Layout from "@/components/Layout";
import ArticleList from "./ArticleList";
import ArticleListToc from "./ArticleListToc";

export default {
	components: {
		Layout,
		ArticleList,
		ArticleListToc
	}
};
</script>

<style lang="less" scoped>
</style>
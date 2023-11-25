<template>
    <div class="article-detail-container" ref="container">
        <h1 class="title">{{ data.title }}</h1>
        <aside class="info">
            <span class="info-item">日期：{{ formatDate(data.createDate) }}</span>
            <span class="info-item">浏览：{{ data.scanNumber }}</span>
            <a class="info-item" href="#article-comment" target="_self">评论：{{ data.commentNumber }}</a>
            <RouterLink
                :to="{
					name: 'blog-cate',
					query: {
						limit: 10,
						page: 1,
					},
					params: {
						categoryId: data.category.id,
					},
				}"
            >
                {{ data.category.name }}
            </RouterLink>
        </aside>
        <div class="markdown-body" v-html="data.htmlContent"></div>
        <ArticleComment v-show="data" id="article-comment" />
    </div>
</template>

<script>
import "./markdown.less";
import "highlight.js/styles/github.css";
import {formatDate, locationToHash} from "@/tools";
import {emitiMainScroll, scrollToTop} from '@/mixins';
import ArticleComment from '@/views/Blog/Article/ArticleComment';
import {setDataTitle} from '@/tools/setPageTittle'

export default {
    mixins: [scrollToTop('container'), emitiMainScroll('container')],
    components: {
        ArticleComment
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        formatDate(ms) {
            return formatDate(new Date(+ms), "YYYY-MM-DD");
        }
    },
    beforeCreate() {
        locationToHash();
    },
    async created() {
        await setDataTitle(this.data.title);
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.article-detail-container {
    width: 100%;
    height: 100vh;
    padding: 35px 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;

    .title {
        font-size: 24px;
        font-weight: bold;
    }

    .info {
        color: @gray;
        font-size: 12px;
        margin: 15px 0 30px;

        &-item {
            margin-right: 15px;
        }
    }

    .desc {
        font-size: 14px;
    }
}
</style>
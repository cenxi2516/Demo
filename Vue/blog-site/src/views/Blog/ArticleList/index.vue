<template>
    <div class="article-list-container" v-loading="isLoading" ref="container">
        <div class="article-list">
            <RouterLink
                class="article-list-item"
                v-for="article in data.rows"
                :key="article.id"
                :to="{
					name: 'blog-detail',
					params: {
						blogId: article.id
					}
				}"
            >
                <img
                    class="img-thumb"
                    v-imgLazy="article.thumb"
                    v-if="article.thumb"
                    alt=""
                />
                <div class="content">
                    <h2 class="title">{{ article.title }}</h2>
                    <aside class="info">
                        <span class="info-item">日期：{{ formatDate(article.createDate) }}</span>
                        <span class="info-item">浏览：{{ article.scanNumber }}</span>
                        <RouterLink class="info-item" :to="{
                            name: 'blog-detail',
                            params: {
                                blogId: article.id
                            }
                        }">评论：{{ article.commentNumber }}</RouterLink>
                        <RouterLink class="info-item" :to="{
							name: 'blog-cate',
							query: {
								...routeInfo,
								page: 1
							},
							params: {
								categoryId: article.category.id
							}
						}">{{ article.category.name }}
                        </RouterLink>
                    </aside>
                    <p class="desc">{{ article.description }}</p>
                </div>
            </RouterLink>
        </div>
        <Pager
            :current="+this.routeInfo.page"
            :total="+data.total"
            :limit="+this.routeInfo.limit"
            @pageChange="handlePageChange($event)"
        />
    </div>
</template>

<script>
import {emitiMainScroll, fetchData, scrollToTop} from "@/mixins";
import {getPageBlogs} from "@/api/blog";
import {formatDate} from "@/tools";
import Pager from "@/components/Pager";


export default {
    mixins: [fetchData([]), scrollToTop('container'), emitiMainScroll('container')],
    components: {
        Pager,
    },
    computed: {
        routeInfo() {
            const {
                query: {limit = 10, page = 1},
                params: {categoryId = -1},
            } = this.$route; // 依赖$route

            return {
                limit,
                page,
                categoryId,
            };
        },
    },
    methods: {
        formatDate(ms) {
            return formatDate(new Date(+ms), "YYYY-MM-DD");
        },
        async fetchData() {
            const {limit, page, categoryId} = this.routeInfo;
            return await getPageBlogs(page, limit, categoryId);
        },
        handlePageChange(newPage) {
            // 无刷新更改同源url地址（路由信息变更）
            const {categoryId, limit} = this.routeInfo;
            const query = {
                page: newPage,
                limit,
            };
            if (+categoryId === -1) {
                this.$router.push({
                    name: 'blog',
                    query
                });
            } else {
                this.$router.push({
                    name: 'blog-cate',
                    query,
                    params: {
                        categoryId
                    }
                })
            }
        },
    },

    watch: {
        $route: {
            async handler(newValue, oldValue) {
                if (newValue.params.categoryId !== oldValue.params.categoryId) {
                    this.scrollToTop();
                }
                this.isLoading = true;
                this.data = await this.fetchData();
                this.isLoading = false;
            },
            deep: false,
            immediate: false
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.article-list-container {
    width: 100%;
    height: 100vh;
    padding: 20px 20px 40px 40px;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;

    @gap: 10px;

    .article-list-item {
        display: flex;
        padding: @gap 0;
        margin: @gap 0;

        & + .article-list-item {
            border-top: 1px solid lighten(@gray, 15%);
        }

        @img-width: 180px;

        .img-thumb {
            flex: 0 0 auto;
            width: @img-width;
            height: 120px;
            margin-right: @gap;
            border-radius: 5px;
        }

        .content {
            flex: auto;

            .title {
                font-size: 18px;
            }

            .info {
                color: @gray;
                font-size: 12px;
                margin: 5px 0 10px;

                &-item {
                    margin-right: 15px;
                }
            }

            .desc {
                font-size: 14px;
            }
        }
    }

    .pager-container {
        margin: 20px 0;
    }
}
</style>
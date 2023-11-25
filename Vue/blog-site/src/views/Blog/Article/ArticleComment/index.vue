<template>
    <div class="article-comment-container">
        <MessageForm @submit="handleSubmit" />
        <MessageList title="文章列表"
                     :subTitle="totalComment"
                     :listData="listData"
                     :isListLoading="isLoading"
                     :total="data.total" />
    </div>
</template>

<script>
import MessageForm from '@/components/MessageForm'
import MessageList from '@/components/MessageList'
import fetchData from '@/mixins/fetchData'
import {getPageComment, postComment} from '@/api/comment'
import {debounce} from '@/tools'

const loadNextPageComment = debounce(async function() {
    this.page += 1;
    const nextPageList = await getPageComment(this.page, this.limit, this.blogId);
    this.isLoading = false;
    this.data.rows.push(...(nextPageList?.rows || []));
}, 500);

export default {
    mixins: [fetchData({total: 0, rows: []})],
    components: {
        MessageForm,
        MessageList
    },
    data() {
        return {
            page: 1,
            limit: 10
        }
    },
    computed: {
        totalComment() {
            return `（${this.data.total}）`;
        },
        blogId() {
            return this.$route.params.blogId;
        },
        listData() {
            return this.data.rows;
        },
        maxPage() {
            return Math.ceil(this.data.total / this.limit);
        }
    },
    methods: {
        loadNextPageComment,
        async fetchData() {
            return await getPageComment(this.page, this.limit, this.blogId);
        },
        async handleSubmit(formData, callback) {
            const commentResult = await postComment({
                ...formData,
                blogId: this.blogId
            });

            if (commentResult) {
                this.data.rows.unshift(commentResult);
            }

            callback(!!commentResult);
        },
        async fetchComment(scrollContainer) {
            const {scrollTop, clientHeight, scrollHeight} = scrollContainer;
            const distance = 50;
            
            if (this.page >= this.maxPage || this.isLoading) return;
            if (scrollHeight - (scrollTop + clientHeight) <= distance) {
                this.isLoading = true;
                this.loadNextPageComment();
            }
        }

    },
    mounted() {
        this.$eventBus.$on('mainScroll', this.fetchComment);
    },

    destroyed() {
        this.$eventBus.$off('mainScroll', this.fetchComment);
    }
}
</script>

<style lang="less" scoped>

</style>
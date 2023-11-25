<template>
    <div v-show="showTop" class="to-top-container" @click="handleClick($event)">Top</div>
</template>

<script>
const showScrollDistance = 300;
export default {
    data() {
        return {
            showTop: false
        }
    },
    methods: {
        handleClick(e) {
            this.$eventBus.$emit('clickToTop');
        },
        handleMainScroll(scrollContainer) {
            this.showTop = scrollContainer?.scrollTop >= showScrollDistance;
        }
    },
    mounted() {
        this.$eventBus.$on('mainScroll', this.handleMainScroll);
    },
    destroyed() {
        this.$eventBus.$off('mainScroll', this.handleMainScroll);
    }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.to-top-container {
    position: fixed;
    bottom: 100px;
    right: 50px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: @primary;
    opacity: .5;
    border-radius: 50%;
    cursor: pointer;
}
</style>
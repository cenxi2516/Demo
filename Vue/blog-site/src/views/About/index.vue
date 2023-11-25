<template>
    <div class="about-container" v-loading="showLoading">
        <iframe class="iframe" :src="data" @load="handleLoad()" v-show="data"></iframe>
        <Empty v-if="showEmpty" />
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Empty from '@/components/Empty'
import loading from '@/directives/loading'

export default {
    components: {
        Empty
    },
    data() {
        return {
            isLoaded: false,
        }
    },
    computed: {
        ...mapState('about', ['isLoading', 'data']),
        showLoading() {
            return this.isLoading || !this.isLoaded;
        },
        showEmpty() {
            return !this.showLoading && !this.data;
        }
    },
    methods: {
        handleLoad() {
            this.isLoaded = true;
        }
    },
    async created() {
        const resp = await this.$store.dispatch('about/getAbout');
    }
}
</script>

<style lang="less" scoped>
.about-container {
    position: relative;
    width: 100%;
    height: 100vh;

    .iframe {
        border: none;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
}

</style>
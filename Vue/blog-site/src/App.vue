<template>
    <div id="app" v-loading="isLoading">
        <Layout v-if="data || !isLoading">
            <template #left>
                <SiteAside />
            </template>
            <template #default>
                <RouterView />
            </template>
        </Layout>
        <ToTop />
    </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import ToTop from '@/components/ToTop/index.vue'
import {globalEventReg} from '@/mixins'
import {mapState} from 'vuex'

export default {
    name: "App",
    mixins: [globalEventReg],
    components: {
        Layout,
        SiteAside,
        ToTop
    },
    computed: {
        ...mapState('setting', ['data', 'isLoading'])
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

#app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .site-aside-container {
        width: 225px;
    }
}
</style>

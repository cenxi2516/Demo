<template>
    <div class="user-name">
        <!--    是否正在加载中    -->
        <span v-if="isLoading">loading...</span>
        <!--    是否已经登录    -->
        <template v-else-if="isLogin">
            <span>{{user.name}}</span>
            <a href="javascript:void(0);" @click.prevent="handleLoginOut">退出</a>
        </template>
        <!--    没有登录    -->
        <router-link :to="{name: 'login'}" v-else exact-path>Login</router-link>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
    computed: {
        ...mapGetters('loginUser', ['isLogin']),
        ...mapState('loginUser', ['isLoading', 'user'])
    },
    methods: {
        async handleLoginOut() {
            await this.$store.dispatch('loginUser/loginOut');
            this.$router.push({name: 'login'});
        }
    }
};
</script>

<style scoped>
.user-name {
    display: inline-block;
}
.user-name a,
.user-name span {
    margin-right: 15px;
}
</style>

<template>
    <div id="nav">
    <router-link :to="{name: 'home'}">Home</router-link>
    |
    <span v-if="loading">loading...</span>
    <template v-else-if="user">
        <span>{{ user.name }}</span>
        <a class="ml-5" href="" @click.prevent="handleLoginOut">退出</a>
    </template>
    <router-link v-else :to="{name: 'vuexLogin'}">Login</router-link>
    </div>
    <router-view />
</template>

<script>

import { useStore } from 'vuex'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const store = useStore();
        const {
            user,
            loading,
        } = toRefs(store.state.userLogin);

        const router = useRouter();
        const handleLoginOut = async () => {
            await store.dispatch('userLogin/loginOut');
            await router.push({
                name: 'home',
            });

            await router.push({
                name: 'vuexLogin'
            })
        };

        return {
            user,
            loading,
            handleLoginOut,
        }
    },
}
</script>
<style>
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

#nav .ml-5 {
    margin-left: 5px;
}
</style>
<template>
  <h1>请稍等，正在登录中...</h1>
</template>

<script>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store/provide/userLogin'

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();

        watch(useStore().state, ({ loading }) => {
            if(!loading) {
                router.push(route.query.target ?? '');
            }
        }, {
            deep: true,
            immediate: true,
        });
    },
}
</script>
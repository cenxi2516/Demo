<template>
    <div class="container">
        <div class="list">
            <strong>编辑:</strong>
            <div style="display: flex;">
                <CheckEditor v-for="item in saleList" :key="item.id" v-model="item.sell" v-model:title.trim="item.title" />
            </div>
        </div>
        <div class="list">
            <strong>销售中:</strong>
            <div>
                <template v-for="(item, i) in sellList" :key="item.id">
                    <span>{{ i }}. </span>
                    <strong>{{ item.title }}</strong>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import CheckEditor from './CheckEditor/index.vue';

export default {
    components: {
        CheckEditor
    },
    setup() {
        const saleListRef = ref([
            {
                id: 1,
                sell: true,
                title: "iphone12",
            },
            { id: 2, sell: false, title: "xiaomi" },
            { id: 3, sell: true, title: "huawei" },
            { id: 4, sell: true, title: "vivo" },
        ]);

        const sellListRef = computed(() => saleListRef.value.filter(({ sell }) => sell));

        return {
            saleList: saleListRef,
            sellList: sellListRef
        }
    }
}
</script>

<style scoped>
.container {
    margin-top: 50px;
    width: 880px;
    margin: 50px auto;
}

.list {
    display: flex;
    margin: 1em 0;
    align-items: center;
}

strong {
    margin-right: 1em;
}
</style>
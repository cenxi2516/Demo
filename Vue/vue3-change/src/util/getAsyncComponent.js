import { defineAsyncComponent, h } from "vue";
import Loading from '@/components/Loading/index.vue';
import Error from '@/components/Error/index.vue';


export default (asyncCallback) => defineAsyncComponent({
    loader: asyncCallback,
    loadingComponent: Loading,
    errorComponent: {
        render: () => h(Error, '组件加载出错')
    }
});
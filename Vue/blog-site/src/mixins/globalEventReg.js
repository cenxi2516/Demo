import {debounce} from '@/tools'

const handleGlobalResize = debounce(function(){
    this.$eventBus.$emit('windowResize');
});

export default {
    methods: {
        handleGlobalResize
    },
    mounted() {
        window.addEventListener("resize", this.handleGlobalResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleGlobalResize);
    }
};
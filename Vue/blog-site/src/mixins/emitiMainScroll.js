import {debounce} from '@/tools'

const handleEmitMainScroll = debounce(function(){
    this.$eventBus.$emit('mainScroll', this.$refs.container);
}, 50);


export default (container) => ({
    methods: {
        handleEmitMainScroll
    },
    mounted(){
        this.$refs[container].addEventListener('scroll', this.handleEmitMainScroll);
    },
    beforeDestroy() {
        this.$refs[container].removeEventListener('scroll', this.handleEmitMainScroll);
    },
    destroyed() {
        this.$eventBus.$emit('mainScroll', null);
    }
});
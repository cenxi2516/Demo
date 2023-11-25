export default (container) => ({
    methods: {
        scrollToTop() {
            this.$refs[container].scrollTo({
                top: 0, left: 0, behavior: 'smooth'
            });
        }
    }, mounted() {
        this.$eventBus.$on('clickToTop', this.scrollToTop);
    }, destroyed() {
        this.$eventBus.$off('clickToTop', this.scrollToTop);
    },
});
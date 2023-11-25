<template>
    <h1>正在恢复登录状态，请稍等片刻</h1>
</template>

<script>
export default {
    name: "Loading",
    created() {
        this.unWatch = this.$watch(function(){
            // getters必须如此写
            console.log(this.$store.getters['loginUser/isLogin']);
            return this.$store.getters['loginUser/isLogin'];
        }, function(newValue){
            if (newValue) {
                this.$router.push(this.$route.query.target).catch(()=>{});
            }
        }, {
            immediate: true
        })
    },
    destroyed() {
        this.unWatch();
    }
}
</script>

<style scoped>

</style>
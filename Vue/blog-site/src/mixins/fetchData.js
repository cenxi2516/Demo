export default (defaultData = null) => ({
    data(){
        return {
            isLoading: true,
            data: defaultData
        }
    },
    async created(){
        this.data = await this.fetchData();
        this.isLoading = false;
    }
});


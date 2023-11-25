<template>
	<div class="article-detail-toc-container">
		<h2 class="title">目录</h2>
		<TocList
			:listData="listData"
			@switchList="handleSwitchList($event)"
			v-if="listData.length"
		/>
	</div>
</template>

<script>
import TocList from "./../../TocList";

export default {
	components: { TocList },
	props: {
		dataToc: {
			type: Array,
			default: () => [],
		},
	},
    data(){
        return {
            curSelect: '',
            listenerDomSet: null
        };
    },
	computed: {
		listData() {
			const mapSelect = (list) =>
				list?.map((item) => ({
					...item,
					isSelect: item.anchor === this.curSelect,
					children: item.children ? mapSelect(item.children) : null,
				}));
			return mapSelect(this.dataToc);
		},
	},
	methods: {
		handleSwitchList(data) {
			location.hash = data.anchor;
		},
        setSelected(scrollMain){
            if(!this.listenerDomSet.length) return;

            const showDistance = scrollMain?.clientHeight / 2 ?? 250;
            this.curSelect = '';
            for(const {top, id} of this.getTitleDomClientTop()){
                if(top < 0 || top <= showDistance){
                    this.curSelect = id;
                }
            }
        },
        getTitleDomSet(){
            const domSet = [];
            const iterateData = (dataToc) => {
                if(!Array.isArray(dataToc)) return;

                for(const item of dataToc){
                    domSet.push(document.getElementById(item.anchor));
                    iterateData(item.children);
                }
            };

            iterateData(this.dataToc);


            return domSet.filter(Boolean);
        },
        getTitleDomClientTop(){
            return this.listenerDomSet.map(dom => ({
                top: dom.getBoundingClientRect().top,
                id: dom.id
            }));
        },
	},
    mounted() {
        this.listenerDomSet = this.getTitleDomSet();
        this.setSelected();
        this.$eventBus.$on('mainScroll', this.setSelected);
    },
    destroyed() {
        this.$eventBus.$off('mainScroll', this.setSelected);
    }
};
</script>

<style lang="less" scoped>
.article-detail-toc-container {
	position: relative;
	width: 250px;
	height: 100vh;
	padding: 20px;
	font-size: 14px;
	overflow: auto;

	.title {
        font-size: 16px;
		margin-bottom: 20px;
		font-weight: bold;
	}
}
</style>
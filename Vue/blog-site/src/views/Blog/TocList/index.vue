<template>
	<ul class="toc-list-container">
        <li class="toc-list-item" v-for="(item, i) in listData" :key="i">
            <div class="title" :class="{active: item.isSelect}" @click="handleClick(item)">
                <span>{{item.name}}</span>
                <span class="aside" v-if="item.aside">{{item.aside}}</span>
            </div>
            <TocList v-if="item.children?.length" :listData="item.children || []" @switchList="handleClick($event)"/>
        </li>
    </ul>
</template>

<script>
export default {
	name: "TocList",
	props: {
		listData: {
			type: Array,
			default: []
		},
	},
    methods: {
        handleClick(item) {
            this.$emit("switchList", item);
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.toc-list-container {
    line-height: 2.5em;

    .toc-list-item {
        .title {
            display: inline-flex;
            cursor: pointer;

            .aside {
                margin-left: 1em;
            }

            &.active {
                color: @warn;
            }
        }
    }

    .toc-list-container {
        padding-left: 1.5em;
    }
}
</style>
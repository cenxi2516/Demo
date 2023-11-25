<template>
	<div class="menu-container">
        <div class="menu-item" v-for="item in menus" :key="item.type">
            <Item v-bind="item" />
        </div>
    </div>
</template>

<script>
import Item from "./Item";
export default {
	components: {
		Item,
	},
	data() {
		return {
			menus: [
				{
					type: "home",
					title: "首页",
					name: "home",
					exact: true,
				},
				{
					type: "blog",
					title: "文章",
					name: "blog",
					exact: false,
				},
				{
					type: "info",
					title: "关于我",
					name: "about",
					exact: true,
				},
				{
					type: "code",
					title: "项目&效果",
					name: "project",
					exact: true,
				},
				{
					type: "chat",
					title: "留言板",
					name: "message",
					exact: true,
				},
			],
		};
	},
};
</script>

<style lang="less" scoped>
.menu-container {
	width: 100%;
	user-select: none;
}
</style>
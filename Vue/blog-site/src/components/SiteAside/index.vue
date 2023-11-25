<template>
	<div class="site-aside-container">
		<div class="avatar-wrapper">
			<Avatar :url="data.avatar" :size="120" />
			<p class="nick-name">{{data.siteTitle}}</p>
		</div>
		<Menu />
        <Contact />
	</div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import {mapState} from 'vuex'

export default {
	components: {
		Avatar,
		Contact,
		Menu,
	},
	computed: {
        ...mapState('setting', ['isLoading', 'data'])
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';

.site-aside-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
    font-size: 14px;
	overflow: auto;
	background-color: @dark;

	.avatar-wrapper {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
        width: 100%;
		padding: 20px 0;

		.nick-name {
			margin-top: 10px;
			font-size: 1.5rem;
			color: #fff;
		}
	}

    .menu-container {
        flex: 1 0 auto;
    }

	.contact-container {
		flex: 0 0 auto;
		margin-bottom: 7vh;
	}
}
</style>
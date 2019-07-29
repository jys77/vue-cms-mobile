<template>
    <div class="app-container">
    <mt-header fixed title="Vue-CMS-Mobile">
		<router-link v-show="isBack" to slot="left">
			<mt-button icon='back' @click="prevWeb">Back</mt-button>
		</router-link>
	</mt-header>
    <transition>
	<router-view></router-view>
	</transition>

    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-f" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">Home</span>
			</router-link>
			<router-link class="mui-tab-item-f" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">Profile</span>
			</router-link>
			<router-link class="mui-tab-item-f" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">Cart</span>
			</router-link>
			<router-link class="mui-tab-item-f" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">Search</span>
			</router-link>
		</nav> 
    </div>
</template>

<script>
export default {
	data(){
		return{}
	},
	computed:{
		isBack() {
			return this.$route.path !="/home"
		}
	},
	methods: {
		prevWeb() {
			this.$router.go(-1)
		}
	}
}
</script>

<style scoped lang="scss">
.mint-header {
	z-index: 99 !important;
}

.app-container {
    padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;
}

.v-enter{
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}
.mui-active {
	color: #007aff !important;
}

.mui-bar-tab .mui-tab-item-f {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-f .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-f .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>



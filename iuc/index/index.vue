<template>
	<view class="flex flex-direction padding">
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go2('5516da53-739f-454a-a3a9-7e7824987a6d')">以普通学生身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go2('d9824e8c-c998-45e2-8156-34d723049855')">以普通老师身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go2('99cf2fcb-c7d9-4773-8cc2-b157157a7ee4')">以分管领导身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go2('b15f7cdb-9f96-4041-a7b2-4cfeebabaa8d')">以实验室管理员身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="goCreate">列表页面</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go1('44213f8a-c90a-422b-88c0-815f4de5a000')">以管理员身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go1('d9824e8c-c998-45e2-8156-34d723049855')">以普通老师身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go1('8094cf84-01e6-484d-bb01-04a299f5ef5b')">以维修者主管身份登录</a>
		<a href="javascript:;" class="cu-btn bg-green lg margin-top" @click="go1('b15f7cdb-9f96-4041-a7b2-4cfeebabaa8d')">以普通维修者身份登录</a>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		methods: {
			goCreate () {
				uni.navigateTo({
					url: "/iuc/softwareInstall/v1/list"
				})
			},
			go1 (id) {
				uni.post("/uc/getCurrentUserGuid", {id}, msg => {
					uni.setStorage({
						key:'currentUserGuid',
						data: msg.currentUserGuid,
					});
					app.currentUserGuid = msg.currentUserGuid;
					app.userInfo = msg.userInfo;
					let ps = app.userInfo.permissons;
					app.checkPermission = (p) => {
						return ps && ps.indexOf(p) >= 0;
					};
					
					uni.navigateTo({
						url: "/iuc/softwareInstall/v1/list"
					})
				});
			},
			go2 (id) {
				uni.post("/uc/getCurrentUserGuid", {id}, msg => {
					uni.setStorage({
						key:'currentUserGuid',
						data: msg.currentUserGuid,
					});
					app.currentUserGuid = msg.currentUserGuid;
					app.userInfo = msg.userInfo;
					let ps = app.userInfo.permissons;
					app.checkPermission = (p) => {
						return ps && ps.indexOf(p) >= 0;
					};
					
					uni.navigateTo({
						url: "/iuc/roomApplication/v1/list"
					})
				});
			}
		},
		data () {
			return {
				app
			}
		}
	}
</script>

<style lang="less">
</style>

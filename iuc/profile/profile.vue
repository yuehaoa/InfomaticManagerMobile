<template>
	<view>
		<view class="head border" :style="{'background-image': 'url('+userInfo.Avatar+')'}"></view>
		<view class="info-bar">
			<view class="cf text-xxl">
				<navigator class="fr cuIcon-settings text-white justify-end padding-lr padding-top" url="../userInfo/userInfo"></navigator>
			</view>
			<view class="flex justify-center">
				<view class="basis-xs"></view>
				<view class="basis-xs margin">
					<image class="cu-avatar round xl center" v-bind:src="userInfo.Avatar" v-on:click="navToInfor()" />
				</view>
				<view class="basis-lg margin">
					<view class="text-white">
						<text class="text-xxl block margin-bottom-xs">{{userInfo.RealName}}</text>
						<text>detail information</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list grid no-border col-4 margin margin-lr-xl navs-bar shadow">
			<view class="cu-item" v-for="(item,index) in navs" :key="index" @click="navTo(item.url)">
				<view :class="'cuIcon-'+item.cuIcon" class="text-informatic-brown "></view>
				<text class="text-informatic-brown text-bold ">{{item.name}}</text>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="arrow cu-item" v-for="(item,index) in list" :key="index" @click="navTo(item.url)">
				<view class="content margin-lr" :class="{'margin-top':index == 4}">
					<text class="text-informatic-brown" :class="'cuIcon-'+item.cuIcon"></text>
					<text class="text-informatic-brown text-bold">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="arrow cu-item" @click="navTo()">
				<view class="content margin-lr">
					<text class="text-informatic-brown cuIcon-roundcheckfill"></text>
					<text class="text-informatic-brown text-bold">联系管理员</text>
				</view>
			</view>
		</view>
		<navTab :selection='3' />
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				userInfo: {},
				realName: "",
				avatar: "",
				navs: [{
					name: "我的待办",
					url: "../roomApplication/v2/todoList",
					cuIcon: "profilefill"
				}, {
					name: "我的申请",
					url: "../roomApplication/v2/myAttend",
					cuIcon: "newshotfill"
				}, {
					name: "实验室列表",
					url: "../roomView/labList?type=-1",
					cuIcon: "formfill"
				}, {
					name: "通讯录",
					url: "../addressBook/addressBook",
					cuIcon: "card"
				}],
				list: [{
					name: "实验室列表",
					url: "../roomView/labList?type=-1",
					cuIcon: "presentfill"
				}, {
					name: "测试入口",
					url: "../index/testEntry",
					cuIcon: "babyfill"
				}, {
					name: "历史记录",
					url: "",
					cuIcon: "newsfill"
				}, {
					name: "其他功能",
					url: "",
					cuIcon: "roundcheckfill"
				}]
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.GetInfo();
		},
		methods: {
			GetInfo() {
				uni.post("/uc/GetUserInfo", {
				}, msg => {
					if (msg.success) {
						this.userInfo = msg.data;
					}
				})
			},
			navToInfor() {
				uni.navigateTo({
					url: '../userInfo/userInfo',
				})
			},
			navTo(e) {
				if (!e) return;
				uni.navigateTo({
					url: e
				})
			}
		},
	}
</script>

<style lang="less">
	.head {
		height: 360rpx;
		width: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		filter: blur(8px);
		position: fixed;
		z-index: -1;
	}

	.info-bar {
		height: 360rpx;
	}

	.navs-bar {
		margin-top: -70rpx;
		border-radius: 28rpx;
		box-shadow: 3px 3px 4px rgba(109, 59, 94, 0.3);
		;
		padding: 10px 20px;
	}

	.cu-list.menu>.cu-item.arrow:before {
		right: 40px;
	}
</style>

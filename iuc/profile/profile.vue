<template>
	<view class="content">
		<view class="head">
			<p>
				<span>
					<navigator class="cuIcon-home" url="../index/index" open-type="reLaunch"></navigator>
				</span>
				<span>
					<navigator class="cuIcon-settings" url="../userInfo/userInfo"></navigator>
				</span>
			</p>
		</view>
		<view class="info">
			<image v-bind:src="avatar" v-on:click="navToInfor()" />
			<p class="info_name">
				<span style="font-size: 40upx;">{{realName}}</span>
			</p>
		</view>

		<view class="iconCon">
			<navigator url="../roomApplication/v1/labList">
				<text class="cuIcon-list icon_comment icon-list"></text>
				<p>实验室列表</p>
			</navigator>
			<navigator url="../roomApplication/v1/list">
				<i class="cuIcon-edit icon-edit icon_comment"></i>
				<p>我的待办</p>
			</navigator>
			<navigator url="../roomApplication/v1/alllist">
				<i class="cuIcon-write icon-write icon_comment"></i>
				<p>所有申请</p>
			</navigator>
			<navigator url="../roomApplication/v1/create">
				<i class="cuIcon-search icon_comment icon-search"></i>
				<p>申请实验室</p>
			</navigator>
		</view>

		<view class="ui-table">
			<navigator class="ui-table-cell" url="../roomApplication/v1/labList">
				<span>实验室列表</span>
				<i class="cuIcon-right"></i>
			</navigator>
			<navigator url="../roomApplication/v1/list">
				<span>我的申请流程</span>
				<i class="cuIcon-right"></i>
			</navigator>
			<navigator url="../index/testEntry">
				<span>测试入口</span>
				<i class="cuIcon-right"></i>
			</navigator>
		</view>
		<navTab :selection='3' />
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				realName: "",
				avatar: "",
				currentUserGuid: "",
			}
		},
		onLoad() {
			this.avatar = app.userInfo.avatar;
			this.currentUserGuid = app.userInfo.token;
		},
		onShow() {
			this.GetInfo();
		},
		methods: {
			GetInfo() {
				let currentUserGuid = this.currentUserGuid;
				uni.post("/uc/GetUserInfo", {
					currentUserGuid
				}, msg => {
					if (msg.success) {
						this.userInfo = msg.data;
						this.realName = msg.data.RealName;
					}
				})
			},
			navToInfor() {
				uni.navigateTo({
					url: '../userInfo/userInfo',
				})
			},
		},
	}
</script>

<style lang="less">
	@import'../../colorui/icon.css';

	* {
		margin: 0;
		padding: 0;
		font-family: 微软雅黑;
		font-size: 30rpx;
	}

	.head {
		/* 头部包含背景图 */
		color: #FFF;
		background-color: rgba(255, 218, 25, 0.6);
		width: 100%;
		overflow: hidden;
		height: 160px;
	}

	.head>p {
		/* 放我的和设置图标 */
		height: 50px;
		line-height: 50px;
	}

	.head>p>span:nth-of-type(1) {
		display: inline-block;
		float: left;
		padding-left: 10px;
		font-size: 36rpx;
		font-weight: bold;
	}

	.head>p>span:nth-of-type(2) {
		display: inline-block;
		float: right;
		padding: 0rpx 0rpx 0 0;
		font-size: 36rpx;
	}

	.head>p>span>navigator {
		text-align: center;
		font-size: 44rpx;
		width: 90rpx;
		margin-right: 20rpx;
	}


	.info {
		/* 存放个人信息的 */
		width: calc(100% - 32px);
		background-color: #FFFFFF;
		margin-left: 18px;
		margin-top: -48px;
		float: left;
		height: 180rpx;
		border-radius: 8px;
		box-shadow: 0 0 6px rgba(255, 218, 25, 0.6);
	}

	.info>image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 66px;
		margin: 0 auto;
		display: block;
		margin-top: -70rpx;
		border: 1px solid #ffda19;
	}

	.info_name {
		margin: 5rpx 0;
		text-align: center;
		font-size: 44rpx;
		color: #444444;
		height: 30px;
		line-height: 30px;
	}

	.iconCon {
		/* 放功能的图标 */
		width: 100%;
		float: left;
		overflow: hidden;
		margin-top: 32rpx;
		margin-bottom: 20rpx;
		margin-left: 2px;
		padding: 0rpx 15rpx;
	}

	.iconCon>navigator {
		float: left;
		width: calc(100% / 4);
		text-align: center;
		padding: 0rpx 0rpx;
	}

	.ui-table {
		float: left;
		width: calc(100%);
		background-color: #FFFFFF;
		border-top: 8px solid #EFEFF4;
	}

	.ui-table>navigator {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #EFEFF4;
		padding: 0 32px;
	}

	.ui-table>navigator>span {
		float: left;
	}

	.ui-table>navigator>i {
		float: right;
	}

	.icon_comment {
		border-radius: 100px;
		font-size: 44rpx;
		width: 70rpx;
		height: 70rpx;
		display: inline-block;
		line-height: 70rpx;
		color: #FFFFFF;
		margin-bottom: 12rpx;
	}

	.icon-write {
		background-color: #fbdc58;
	}

	.icon-list {
		background-color: #94ede2;
	}

	.icon-search {
		background-color: #bceccd;
	}

	.icon-edit {
		background-color: #ffbadc;
	}
</style>

<template>
	<view class="center">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人信息</block>
		</cu-custom>
		<view class="center_box_bg">
			<view class="center_menu">
				<navigator class="menu_item">
					<text style="flex:1;">头像</text>
					<view class="detail-info">
						<image :src="avatar" mode="aspectFit" class="info-img"></image>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<navigator class="menu_item" url="./modifyRealName">
					<text style="flex:1;">姓名</text>
					<view class="detail-info">
						<text>{{userInfo.RealName?userInfo.RealName:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<navigator class="menu_item" url="./modifyMobile">
					<text style="flex:1;">手机号码</text>
					<view class="detail-info">
						<text>{{userInfo.Mobile?userInfo.Mobile:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<navigator class="menu_item">
					<text style="flex:1;">邮箱</text>
					<view class="detail-info">
						<text>{{userInfo.Email?userInfo.Email:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<navigator class="menu_item" url="./modifyGrade">
					<text style="flex:1;">年龄</text>
					<view class="detail-info">
						<text>{{userInfo.Grade?userInfo.Grade:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
				<navigator class="menu_item">
					<text style="flex:1;">性别</text>
					<view class="detail-info">
						<text>{{userInfo.Gender?userInfo.Gender:"未填写"}}</text>
					</view>
					<view class="cuIcon-right"></view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		onLoad() {
			this.avatar = app.userInfo.avatar;
			this.currentUserGuid = app.userInfo.token;
		},
		onShow(){
			this.GetInfo();
		},
		data() {
			return {
				avatar:'',
				currentUserGuid:'',
				userInfo:''
			};
		},
		methods: {
			GetInfo () {
				let currentUserGuid = this.currentUserGuid;
				uni.post("/uc/GetUserInfo",{currentUserGuid},msg=>{
					if(msg.success) {
						this.userInfo = msg.data;
						uni.setStorage({
							key:'userInfo',
							data:msg.data,
						});
					}
				}
				)
			}
		},
		
	}
</script>

<style lang="scss">
	@import'../../colorui/icon.css';
	.info-img
	{
		height: 100upx;
		width: 100upx;
		margin: 5px;
		border-radius: 4px;
	}
	.detail-info
	{
		display:flex;
		flex:1;
		flex-direction:row-reverse;
		margin-right: 35rpx;
	}
	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 32rpx;
			letter-spacing: 2rpx;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			display: flex;
			align-items: center;

			&.navigator-hover{
				/*按钮点击效果*/
				background: #B0B0B0;
			}

			text:nth-of-type(1) {
				margin-left: 8px;
			}

			&:nth-of-type(2) {
				margin-top: 10px;
			}
		}
	}


</style>

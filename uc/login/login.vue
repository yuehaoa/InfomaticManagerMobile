<template>
	<view class="zai-box">
		<image src="../../static/register.png" class="zai-logo"></image>
		<view class="zai-title">用户登录</view>
		<view class="zai-form">
			<input v-model="mobile" class="zai-input" placeholder-class placeholder="请输入手机号码" type="number" maxlength=11 />
			<view class="zai-input-btn">
				<input v-model="Code" class="zai-input" placeholder-class placeholder="请输入验证码" type="number" maxlength=6 />
				<button class="zai-checking" @tap="getCode" :loading="gettingCode">获取验证码</button>
			</view>
			<button class="zai-btn" @tap="Login">登录</button>
			<view class="tip-text">
				<text v-if="secrettip!=''">{{secrettip}}</text>
				<text v-else></text>
			</view>
			<!-- <navigator url="./regist" class="zai-label">还没有账号？点此注册.</navigator> -->
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				gettingCode:false,
				mobile:'',
				sceneId:'',
				Code:'',
				secrettip:'',
				
			}
		},
		onLoad() {
	
		},
		methods: {
			getCode() {
				if(this.mobile.length != 11)
				{
					this.secrettip='手机号码长度错误';
					return;
				}
				this.gettingCode=true;
				uni.post("/api/security/GetVerifyCode", { mobile: this.mobile }, msg => {
					if(msg.success === false)
					{
						this.secrettip = msg.msg;
						return;
					}
					this.Code = msg.Code;
					this.sceneId = msg.sceneId;
					this.tip = '';
					this.gettingCode = false;
				})
			},	
			Login() {
				uni.post("/api/security/Login", {
					username:this.mobile,
					pwd:this.Code,
					sceneId:this.sceneId,
					method:'mobile',
				}, msg => {
					if(!msg.success)
					{
						this.secrettip = msg.msg;
						return;
					}
					uni.setStorage({
						key:'currentUserGuid',
						data: msg.currentUserGuid,
					});
					app.currentUserGuid = msg.currentUserGuid;
					app.userInfo = msg.userInfo;
					let ps = app.userInfo.permissons;
					app.checkPermission = (p) => {
						return ps && ps.indexOf(p) >= 0;
					}
				});
				uni.navigateTo({
					url: app.dashboard
				})
			},
		},
	}
</script>

<style>
.tip-text
	{
		margin-top: 50upx;
		text-align: center;
		color: red;
	}
	.zai-box{
		padding: 0 50upx;
		position: relative;
	}
	.zai-logo{
		margin-top: 150rpx;
		width: 100%;
		width: 100%;
		height: 310upx;
	}
	.zai-title{
		padding-top: 120rpx;
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left:-50upx;
	}
	.zai-form{
		margin-top: 300upx;
	}
	.zai-input{
		height: auto;
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .zai-input{
		color: #94afce;
	}
	.zai-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.zai-btn{
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		color: #ffffff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		margin-top: 60upx;
	}
	.zai-btn:after{
		border: 0;
	}
	
	/*验证码输入框*/
	.zai-input-btn{
		position: relative;
	}
	.zai-input-btn .zai-input{
		padding-right: 260upx;
	}
	.zai-checking{
		position: absolute;
		right: 0;
		top: 0;
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		color: #ffffff;
		border: 0;
		border-radius: 110upx;
		font-size: 34upx;
		margin-left: auto;
		margin-right: auto;
		padding-left: 28upx;
		padding-right: 28upx;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
		line-height: 2.3;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		padding-top: 2upx;
		padding-bottom: 2upx;
	}
	.zai-checking.zai-time{
		background: #a7b6d0;
	}
	
	/*按钮点击效果*/
	.zai-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
	.zai-checking.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>

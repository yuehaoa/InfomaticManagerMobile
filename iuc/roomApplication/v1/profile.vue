<template>
	<view class="content">
		<view class="head">
			<p>
				<span><navigator class="cuIcon-home" url="../../index/index" open-type="reLaunch"></navigator></span>
				<span><navigator class="cuIcon-settings"></navigator></span>
			</p>
		</view>	
		<view class="info">
			<image v-bind:src="avtar"/>
			<p class="info_name">
				<span style="font-size: 40upx;">{{realName}}</span>
			</p>
		</view>
			
		<view class="iconCon">
			<view @click="goLabList">
				<i class="iconfont icon-yanjing icon_comment"></i>
				<p>实验室列表</p>
			</view>
			<view>
				<i class="iconfont icon-shaixuan icon_comment"></i>
				<p>我的待办</p>
			</view>
			<view>
				<i class="iconfont icon-xiezuo icon_comment"></i>
				<p>我的申请</p>
			</view>
			<view>
				<i class="iconfont icon-search icon_comment"></i>
				<p>我的机位</p>
			</view>
		</view>
		
		<view class="ui-table">
			<navigator class="ui-table-cell" url="labList">
				<span>实验室列表</span>
				<i class="iconfont icon-you1"></i>
			</navigator>
			<navigator url="list">
				<span>我的申请流程</span>
				<i class="iconfont icon-you1"></i>
			</navigator>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				realName:"",
				avtar:"",
				
		}},
		onLoad() {
			this.realName = app.userInfo.realName;
			this.avatar = app.userInfo.avatar;
		},
		onShow() {
			
		},
		methods: {
			goLabList () {
				uni.navigateTo({
					url: "./labList"
				})
			},
		},
	}
</script>

<style lang="less">
	@import'../../../colorui/icon.css';
	*{
		margin: 0;
		padding: 0;
		font-family: 微软雅黑;
		font-size:30rpx;
	}
	.head{
		/* 头部包含背景图 */
		color: #FFF;
		background-color: rgba(255,218,25,0.6);
		width: 100%;
		overflow: hidden;
		height: 160px;
	}
	.head > p{
		/* 放我的和设置图标 */
		height: 50px;
		line-height: 50px;
	}
	.head > p > span:nth-of-type(1){
		display: inline-block;
		float: left;
		padding-left: 10px;
		font-size: 36rpx;
		font-weight: bold;
	}
	.head > p > span:nth-of-type(2){
		display: inline-block;
		float: right;
		padding:0rpx 0rpx 0 0;
		font-size: 36rpx;
	}
	.head > p > span> navigator{
		text-align: center;
		font-size: 44rpx;
		width: 90rpx;
		margin-right: 20rpx;
	}
	
	
	.info{
		/* 存放个人信息的 */
		width: calc( 100% - 32px );
		background-color: #FFFFFF;
		margin-left: 16px;
		margin-top: -48px;
		float: left;
		border-radius: 8px;
		box-shadow: 0 0 6px rgba(255,218,25,0.6);
	}
	.info > image{
		width: 140rpx;
		height: 140rpx;
		border-radius: 66px;
		margin: 0 auto;
		display: block;
		margin-top: -70rpx;
		border: 1px solid #ffda19;
	}
	.info_name{
		margin:5rpx 0;
		text-align: center;
		font-size: 44rpx;
		color: #444444;
		height: 30px;
		line-height: 30px;
	}
	
	.iconCon{
		/* 放功能的图标 */
		width: 100%;
		float: left;
		overflow: hidden;
		margin-top: 32rpx;
		margin-bottom: 32rpx;
		padding: 0rpx 15rpx;
	}
	.iconCon > view{
		float: left;
		width: calc( 100% / 4 );
		text-align: center;
		padding: 0rpx 0rpx;
	}
	
	.ui-table{
		float: left;
		width: calc(100%);
		background-color: #FFFFFF;
		border-top: 8px solid #EFEFF4;
	}
	.ui-table > navigator{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #EFEFF4;
		padding: 0 32px;
	}
	.ui-table > navigator > span{
		float: left;
	}
	.ui-table > navigator > i{
		float: right;
	}
	
	.icon_comment{
		border-radius: 100px;
		font-size: 44rpx;
		width: 70rpx;
		height: 70rpx;
		display: inline-block;
		line-height: 70rpx;
		color: #FFFFFF;
	}
	
	.icon-xiezuo{
		background-color: #fbdc58;
	}
	.icon-yanjing{
		background-color: #94ede2;
	}
	.icon-search{
		background-color: #bceccd;
	}
	.icon-shaixuan{
		background-color: #ffbadc;
	}
</style>

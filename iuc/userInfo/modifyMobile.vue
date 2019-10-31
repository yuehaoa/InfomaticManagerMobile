<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改手机号</block>
		</cu-custom>
		<view class="margin">
			<view class="input-group">
				<input class="solids-bottom margin-lr padding-left-sm" style="border-radius:30px;" 
				focus=true v-bind:placeholder='preMobile' placeholder-class="text-lg" type="number" maxlength=11 v-model="telenum">
			</view>
			<view class="text-lg margin-lr-lg margin-top-xs">请输入新手机号</view>
			<view class="padding flex flex-direction margin-top-lg">
				<button class="cu-btn bg-blue lg" v-on:click="modifytele" >保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default
	{
		data() 
		{
			return {
				preMobile:'',
				telenum: '',
				currentUserGuid:'',
				tip:''
			};
		},
		onLoad()
		{
			this.currentUserGuid = app.userInfo.token;
			uni.getStorage({
				key:'userInfo',
				success:(res)=>{
					this.preMobile=res.data.Mobile;
				}
			});
		},
		methods:
		{
			modifytele()
			{
				uni.request
				({
					url: 'http://hh.ricebird.cn/uc/ModifyMobile',//接口地址
					method: 'POST',//方法
					data: {
						currentUserGuid:this.currentUserGuid,
						mobile:this.telenum,
					},//参数
					header:{
						'content-type':"application/x-www-form-urlencoded",
					},
					success: res => {
						this.tip=res.data.msg;
						uni.showToast({
							icon: 'none',
							title: this.tip,
							duration:3000,
							position:'center',
						})
						this.preMobile=this.telenum;
					},//成功之后操作
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>


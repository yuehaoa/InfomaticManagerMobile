<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改年龄</block>
		</cu-custom>
		<view class="margin">
			<view class="input-group">
				<input class="solids-bottom margin-lr padding-left-sm" style="border-radius:30px;" 
				focus=true :placeholder='preAge' placeholder-class="text-lg" type="number" maxlength=3 v-model="age">
			</view>
			<view class="margin-lr-lg text-lg margin-top-xs">请输入新年龄</view>
			<view class="padding flex flex-direction margin-top-lg">
				<button class="cu-btn bg-blue lg" v-on:click="modifyage" >保存</button>
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
				preAge:'',
				age: '',
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
					this.preAge=res.data.Grade;
				}
			});
		},
		methods:
		{
			modifyage()
			{
				uni.request
				({
					url: 'http://hh.ricebird.cn/uc/ModifyGrade',//接口地址
					method: 'POST',//方法
					data: {
						currentUserGuid:this.currentUserGuid,
						grade:this.age,
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
						this.Grade=this.age;
						//if(this.tip==='年龄格式不正确。')this.tip='年龄格式不正确：如9岁应输入09';
					}
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
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改年龄</block>
		</cu-custom>
		<view class="margin">
			<view class="input-group">
				<input class="solids-bottom margin-lr padding-left-sm" style="border-radius:30px;" focus=true :placeholder='preAge'
				 placeholder-class="text-lg" type="number" maxlength=3 v-model="age">
			</view>
			<view class="margin-lr-lg text-lg margin-top-xs">请输入新年龄</view>
			<view class="padding flex flex-direction margin-top-lg">
				<button class="cu-btn bg-blue lg" v-on:click="Modifyage">保存</button>
			</view>
		</view>
	</view>
</template>
<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				preAge: '',
				age: '',
				currentUserGuid: '',
				tip: ''
			};
		},
		onLoad() {
			this.currentUserGuid = app.userInfo.token;
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.preAge = res.data.Grade;
				}
			});
		},
		methods: {
			Modifyage() {
				let currentUserGuid = this.currentUserGuid;
				let grade = this.age;
				uni.post("/uc/ModifyGrade", {
					currentUserGuid,
					grade
				}, msg => {
					if (msg.success) {
						this.tip = msg.msg;
						uni.showMessage(this.tip);
						this.preage = this.age;
					} else {
						this.tip = msg.msg;
						uni.showMessage(this.tip);
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>

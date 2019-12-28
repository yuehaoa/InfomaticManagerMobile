<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改昵称</block>
		</cu-custom>
		<view class="margin">
			<view class="input-group">
				<input class="solids-bottom margin-lr padding-left-sm" style="border-radius:30px;" focus=true v-bind:placeholder="preNickName"
				 placeholder-class="text-lg" type="text" maxlength=100 v-model="nickname">
			</view>
			<view class="text-lg margin-lr-lg margin-top-xs">请输入新昵称</view>
			<view class="padding flex flex-direction margin-top-lg">
				<button class="cu-btn bg-blue lg" size="mini" type="primary" v-on:click="ModifyNickName()">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				preNickName: '',
				nickname: '',
				currentUserGuid: '',
				tip: ''
			};
		},
		onLoad() {
			this.currentUserGuid = app.userInfo.token;
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.preNickName = res.data.RealName;
				}
			});
		},
		methods: {
			ModifyNickName() {
				let currentUserGuid = this.currentUserGuid;
				let userName = this.nickname;
				uni.post("/uc/ModifyNickName", {
					currentUserGuid,
					userName
				}, msg => {
					if (msg.success) {
						this.tip = msg.msg;
						uni.showMessage(this.tip);
						this.preNickName = this.nickname;
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

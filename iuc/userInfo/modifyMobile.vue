<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改手机号</block>
		</cu-custom>
		<view class="margin">
			<view class="input-group">
				<input class="solids-bottom margin-lr padding-left-sm" style="border-radius:30px;" focus=true v-bind:placeholder='preMobile'
				 placeholder-class="text-lg" type="number" maxlength=11 v-model="telenum">
			</view>
			<view class="text-lg margin-lr-lg margin-top-xs">请输入新手机号</view>
			<view class="padding flex flex-direction margin-top-lg">
				<button class="cu-btn bg-blue lg" v-on:click="Modifytele">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		data() {
			return {
				preMobile: '',
				telenum: '',
				currentUserGuid: '',
				tip: ''
			};
		},
		onLoad() {
			this.currentUserGuid = app.userInfo.token;
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.preMobile = res.data.Mobile;
				}
			});
		},
		methods: {
			Modifytele() {
				let currentUserGuid = this.currentUserGuid;
				let mobile = this.telenum;
				uni.post("/uc/ModifyMobile", {
					currentUserGuid,
					mobile
				}, msg => {
					if (msg.success) {
						this.tip = msg.msg;
						uni.showMessage(this.tip);
						this.preMobile = this.telenum;
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

<template>
	<view id="software-confirm">
		<cu-custom bgColor="bg-gradual-blue" :isBack="'/iuc/softwareInstall/v1/list'">
			<block slot="backText">返回</block>
			<block slot="content">软件安装申请表</block>
		</cu-custom>
		<stepInfo v-model="model" />
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">申请人</view>
				<input :value="model.owner" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input :value="model.telephone" disabled />
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">所属部门</view>
				<input :value="model.belongDepart" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请时间</view>
				<input disabled="true" :value="model.createdTime"></input>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">选择实验室</view>
				<input :value="model.roomName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">待装软件</view>
				<input :value="model.applicationName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">软件版本</view>
				<input :value="model.version || '未设置'" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">下载地址</view>
				<input :value="model.download || '未设置'" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">安装人</view>
				<input :value="model.handlerName || '未设置'" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">安装时间</view>
				<input :value="model.handleTime || '未设置'" disabled />
			</view>
			<view class="action-list cu-list grid col-2 margin-top margin-bottom">
				<view class="cu-item" @click="submit('')">
					<view class="cuIcon-roundcheckfill text-green"></view>
					<text>安装完成</text>
				</view>
				<view class="cu-item" @click="submit('安装未完成', '您是否已经与安装人员线下沟通，确认软件无法安装？')">
					<view class="cuIcon-roundclosefill text-red"></view>
					<text>未完成</text>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import stepInfo from './StepInfo.vue'
	let guidEmpty = '00000000-0000-0000-0000-000000000000';
	let enums = require("../enumsv1.js");
	let app = require("@/config");
	export default {
		components: { stepInfo },
		onLoad (opt) {
			this.id = opt.id;
			this.getData();
		},
		methods: {
			submit (reason, tip) {
				if (reason && !confirm(tip)) {
					return;
				}
				uni.post("/api/installApp/v1/Confirm", {
					ID: this.model.ID,
					CheckOpinion: reason || '已确认安装'
				}, msg => {
					uni.navigateTo({
						url: '/iuc/softwareInstall/v1/list'
					})
				})
			},
			getData () {
				let id = this.id;
				if (!id || id === guidEmpty) {
					uni.navigateTo({
						url: '/iuc/softwareInstall/v1/list'
					})
					return;
				}
				uni.post("/api/installApp/v1/GetApplication", {id}, msg => {
					this.model = msg.data;
				})
			}
		},
		data () {
			return {
				id: guidEmpty,
				isLoading: false,
				model: {}
			};
		}
	}
</script>

<style lang="less">
	#software-confirm {
		form .title {
			width: 6em;
		}
	}
</style>

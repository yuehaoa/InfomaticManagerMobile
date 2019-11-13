<template>
	<view id="software-process">
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
			<view class="action-list cu-list grid col-4 margin-top margin-bottom">
				<view class="cu-item" @click="submit('')">
					<view class="cuIcon-roundcheckfill text-green"></view>
					<text>确认安装</text>
				</view>
				<view class="cu-item" @click="submit('人员分配错误', '执行该操作会将流程发回给主管，是否继续？')">
					<view class="cuIcon-refresh text-green"></view>
					<text>分配错误</text>
				</view>
				<view class="cu-item" @click="submit('修改软件名称', '执行该操作会将流程发回给申请老师，是否继续？')">
					<view class="cuIcon-writefill text-green"></view>
					<text>修改软件名称</text>
				</view>
				<view class="cu-item" @click="submit('软件不存在或已经安装', '执行操作会以软件不存在或已经安装的理由将关闭流程，是否继续？')">
					<view class="cuIcon-roundclosefill text-red"></view>
					<text>软件不存在</text>
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
				
				uni.post("/api/installApp/v1/Handle", {
					ID: this.model.ID,
					HandleOpinion: reason || '软件已经安装'
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
	#software-process {
		form .title {
			width: 6em;
		}
	}
</style>

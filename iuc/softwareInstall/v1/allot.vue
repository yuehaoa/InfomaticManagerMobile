<template>
	<view id="software-assign">
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
			<view class="cu-form-group margin-top">
				<view class="title">选择执行者</view>
				<picker :range="users" range-key="RealName" @change="userChange">
					<view class="content">
						{{currentUser}}
					</view>
				</picker>
			</view>
			<view class="action-list cu-list grid col-3 margin-top margin-bottom">
				<view class="cu-item" @click="submit('')">
					<view class="cuIcon-roundcheckfill text-green"></view>
					<text>确认分配</text>
				</view>
				<view class="cu-item" @click="submit('修改软件名称', '执行该操作会将流程发回给申请老师，是否继续？')">
					<view class="cuIcon-writefill text-green"></view>
					<text>修改软件名称</text>
				</view>
				<view class="cu-item" @click="submit('软件不存在或流程无法继续', '执行操作将关闭流程，是否继续？')">
					<view class="cuIcon-roundclosefill text-red"></view>
					<text>取消流程</text>
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
				if (!reason && this.model.HandlerId === guidEmpty) {
					alert("必须选择用户才能分配工作。");
					return;
				}
				if (reason && !confirm(tip)) {
					return;
				}
				uni.post("/api/installApp/v1/AssignForm", {
					ID: this.model.ID,
					HandlerId: this.model.HandlerId,
					ReviewOpinion: reason || '同意'
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
				uni.post("/api/installApp/v1/GetAssignApplication", { id }, msg => {
					this.users = msg.users;
					this.model = msg.data;
				})
			},
			userChange (e) {
				let u = this.users[e.detail.value];
				this.currentUser = u.realName || "请选择执行者";
				this.model.handlerId = u.ID || guidEmpty;
			}
		},
		data () {
			return {
				id: guidEmpty,
				isLoading: false,
				model: {},
				users: [],
				currentUser: "请选择执行者"
			};
		}
	}
</script>

<style>
</style>

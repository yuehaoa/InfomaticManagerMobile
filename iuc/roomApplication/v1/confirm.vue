<!--邵良颖于2019年10月14日编辑 用于实验室管理员确认实验室申请-->
<template>
	<view id="lab-apply-confirm">
		<cu-custom bgColor="bg-gradual-blue" :isBack="'/iuc/roomApplication/v1/list'">
			<block slot="backText">返回</block>
			<block slot="content">实验室申请表</block>
		</cu-custom>
		<lab-Steps v-model="model" />
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">申请人</view>
				<input :value="model.Owner" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请事由</view>
				<input :value="model.ApplicationReason" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">起止时间</view>
				<input disabled="true" :value="model.CreatedTime+'-'+model.EndDate"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">申请房间号</view>
				<input :value="model.RoomName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师</view>
				<input :value="model.GuideTeacher" disabled />
			</view>

			<!--confirm操作-->
			<view class="action-list cu-list grid col-4 margin-top margin-bottom">
				<view class="cu-item" @click="submit('')">
					<view class="cuIcon-roundcheckfill text-green"></view>
					<text>同意申请</text>
				</view>
				<view class="cu-item" @click="submit('无法得到空闲机房', '您是否确认无法得到空闲机房或不存在机房？')">
					<view class="cuIcon-roundclosefill text-red"></view>
					<text>取消流程</text>
				</view>
				<view class="cu-item" @click="submit('分配错误', '您是否确认分配错误？')">
					<view class="cuIcon-warnfill text-red"></view>
					<text>分配错误</text>
				</view>
				<view class="cu-item" @click="submit('修改', '执行该流程会将流程发回给申请人，是否继续？')">
					<view class="cuIcon-writefill text-red"></view>
					<text>退回修改</text>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	let guidEmpty = '00000000-0000-0000-0000-000000000000';
	let enums = require("../enumsv1.js");
	let app = require("@/config");
	export default {
		onLoad(opt) {
			this.id = opt.id;
			this.getData();
		},
		methods: {
			submit(reason, tip) { //点击不通过申请并且确认不通过申请的原因
				if (reason && !confirm(tip)) { //取消不通过操作
					return;
				}
				uni.post("/api/roomApp/v1/Confirm", {
					ID: this.model.ID, //传申请表id
					HandleOpinion: reason || '同意' //传递审核意见，没有审核意见就确认分配，有审核意见就是打回重做
				}, msg => {
					uni.navigateTo({
						url: '/iuc/roomApplication/v1/list' //回到list列表页
					})
				})
			},
			getData() {
				let id = this.id;
				if (!id || id === guidEmpty) {
					uni.navigateTo({
						url: '/iuc/roomApplication/v1/list'
					})
					return;
				}
				uni.post("/api/roomApp/v1/GetApplication", {
					id
				}, msg => {
					this.model = msg.data;
				})
			}
		},
		data() {
			return {
				id: guidEmpty,
				isLoading: false,
				model: {}
			};
		}
	}
</script>

<style lang="less">
	#lab-apply-confirm {
		form .title {
			width: 6em;
		}
	}
</style>

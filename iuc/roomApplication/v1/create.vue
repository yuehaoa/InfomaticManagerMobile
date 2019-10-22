<!--宋润涵于2019-10-16编辑 用于创建新申请-->
<template>
	<view id="lab-apply-creat">
		<cu-custom bgColor="bg-gradual-blue" :isBack="'/iuc/roomApplication/v1/list'">
			<block slot="backText">返回</block>
			<block slot="content">创建申请表</block>
		</cu-custom>
		<form>
			<view class="cu-steps magin-top">
				<view class="cu-item" :class="item.id < model.State ? 'text-blue':''" v-for="(item,index) in steps" :key="item.id">
					<text class="num" :data-index="index+1"></text>
					{{item.name}}
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">申请原因</view>
				<input name="input" v-model="model.ApplicationReason" maxlength="200"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">选择申请实验室</view>
				<picker mode="multiSelector" :range="[buildings, rooms]" range-key="Name" @columnchange="columnChange" @change="selectRoom"
				 v-model="roomIndex">
					<view class="content">
						{{currentRoom}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">选择起止日期</view>
				<picker mode="date" :start="model.startDate" end="2099-12-31" v-model="model.startDate" @change="selectDate1">
					<view class="content">
						{{model.startDate}}
					</view>
				</picker>
				<picker mode="date" :start="model.startDate" end="2099-12-31" v-model="model.endDate" @change="selectDate2">
					<view class="content">
						{{model.endDate}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">选择指导老师</view>
				<picker :range="teachers" range-key="RealName" @change="selectTeacher">
					<view class="content">
						{{currentTeacher}}
					</view>
				</picker>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green lg" :loading="isSubmitting" @click="submit()">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	let steps = require("../stepsv1.js")
	export default {
		onLoad(opt) {
			this.ID = opt.id;
			this.getInfo();
		},
		methods: {
			selectTeacher(e) {
				let u = this.teachers[e.detail.value];
				this.currentTeacher = u.RealName || "请选择指导教师";
				this.model.GuideTeacherId = u.ID || guidEmpty;
			},
			selectRoom(e) {
				let index = e.detail.value[1];
				let v = this.rooms[index];
				this.currentRoom = v.ID === this.guidEmpty ? "选择实验室" : `${v.Building.Name} ${v.Name}`;
				this.model.RoomId = v.ID;
			},
			selectDate1(e) {
				this.model.startDate = e.detail.value || "请选择开始日期";
				if (Date.parse(this.model.startDate) > Date.parse(this.model.endDate)) {
					this.model.endDate=this.model.startDate;
					uni.showToast({
						title: "结束时间不能早于开始时间"
					});
				}
			},
			selectDate2(e) {
				this.model.endDate = e.detail.value || "请选择结束日期";
				if (Date.parse(this.model.startDate) > Date.parse(this.model.endDate)) {
					uni.showToast({
						title: "结束时间不能早于开始时间"
					});
				}
			},
			submit() {
				this.isSubmitting = true;
				uni.post("/api/roomApp/v1/GetApplication", {}, msg => {
					if (msg.success == true) {
						this.model.ID = msg.data.ID;
						uni.post("/api/roomApp/v1/CreateApplication", this.model, msg => {
							this.isSubmitting = false;
							if (msg.success) {
								uni.showToast({
									title: '提交成功',
									icon: 'success',
									position: 'center'
								})
								setTimeout(function() {
									uni.navigateBack({
										
									});
									uni.hideToast();
								}, 1500);
							}
						})
					}
				})
			},
			getInfo() {
				let THIS = this;
				uni.post("/api/roomApp/v1/GetCreateApplication", {}, msg => {
					if (msg.success) {
						THIS.model.State = msg.data.State;
						console.log(msg.data.CreatedTime);
						THIS.model.startDate = msg.data.CreatedTime.
							replace("年","-").replace("月","-").replace("日","");
						THIS.buildings = msg.buildings;
						THIS.allRooms = msg.rooms;
						THIS.teachers = msg.teachers;
					}
				})
			},
			columnChange(e) {
				let column = e.detail.column
				let value = e.detail.value;
				if (column) return;

				let buildingId = this.buildings[value].ID;
				//逐个查找
				this.rooms = this.allRooms.filter(e => e.BuildingId === buildingId);
			}
		},
		data() {
			return {
				model: {
					ID: '',
					ApplicationReason: '',
					RoomId: '',
					GuideTeacherId: '',
					startDate: '请选择开始日期',
					State: 0,
					endDate: '请选择结束日期'
				},
				isSubmitting: false,
				buildings: [],
				allrooms: [],
				guidEmpty: '00000000-0000-0000-0000-000000000000',
				rooms: [],
				teachers: [],
				currentTeacher: "请选择指导教师",
				currentRoom: "请选择房间号",
				ID: '',
				roomIndex: [0, 0],
				steps
			}
		}
	}
</script>

<style>
</style>

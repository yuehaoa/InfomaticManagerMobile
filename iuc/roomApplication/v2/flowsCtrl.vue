<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">查看申请表</block>
		</cu-custom>

		<form>
			<view class="cu-form-group" v-show="io.fieldAccess.Owner">
				<view class="title">申请人名称</view>
				<input placeholder="三字标题" v-model="io.data.Owner" :disabled="io.fieldAccess.Owner==='r'"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.StartDate">
				<view class="title">申请开始日期</view>
				<input placeholder="三字标题" v-model="io.data.StartDate" :disabled="io.fieldAccess.StartDate==='r'"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.EndDate">
				<view class="title">申请结束日期</view>
				<input placeholder="三字标题" v-model="io.data.EndDate" :disabled="io.fieldAccess.EndDate==='r'"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.Telephone">
				<view class="title">申请人电话</view>
				<input placeholder="三字标题" v-model="io.data.Telephone" :disabled="io.fieldAccess.Telephone==='r'"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.ApplicationReason">
				<view class="title">申请事由</view>
				<input placeholder="三字标题" v-model="io.data.ApplicationReason" :disabled="io.fieldAccess.ApplicationReason==='r'"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.RoomId">
				<view class="title">房间号</view>
				<picker mode="multiSelector" :range='[assistInfo.buildings,assistInfo.roomTemp]' range-key="Name"  @columnchange="selectBuilding" @change="selectRoom"
				 :value="assistInfo.roomIndex">
					<view class="content">
						{{assistInfo.roomName}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师审核意见</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师名称</view>
				<picker :range="assistInfo.teachers" range-key="RealName" @change="selectTeacher">
					<view class="content">
						{{assistInfo.teacherName}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师审核时间</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">管理组审核人意见</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">管理组审核人名称</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">管理组审核时间</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">中心办公室主任名称</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">中心办公室主任意见</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">中心办公室主任审核时间</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室管理人员名称</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室管理人员意见</view>
				<input placeholder="三字标题"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室管理人员审核时间</view>
				<input placeholder="三字标题"></input>
			</view>
		</form>
		<view>
			<button @click="onSubmit()" v-if="io.submitBtns.length===1">{{io.submitBtns[0].Text}}</button>
			<view class="cu-list grid" :class="['col-'+io.submitBtns.length]" v-else>
				<view class="cu-item" @click="submit('通过')">
					<view class="cuIcon-roundcheckfill text-green"></view>
					<text>审核通过</text>
				</view>
				<view class="cu-item" @click="submit('修改')">
					<view class="cuIcon-writefill text-red"></view>
					<text>退回修改</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(opt) {
			if (opt.create) {
				uni.post("/api/workflow/CreateInstance", {
					workflowName: "按团队申请实验室"
				}, msg => {
					this.io = msg;
				});
				uni.post("/api/roomApp/v1/GetRoomAndTeacher",{},msg=>{
					this.assistInfo={...this.assistInfo,...msg};
				});
			}
			else{
				uni.post("/api/workflow/LoadInstance",{InstanceId:opt.InstanceId,
				workflowName: "按团队申请实验室"
				},msg=>{
					
				})
			}
		},
		methods: {
			onSubmit() {
				this.io.shouldUpload.forEach(value => {
					this.upLoad[value] = this.io[value] || this.io.data[value]
				});
				uni.post("/api/workflow/SubmitInstance", { ...this.upLoad
				}, msg => {
					
				})
			},
			selectBuilding(e) {
				let column = e.detail.column
				let value = e.detail.value;
				let buildingId = this.assistInfo.buildings[value].ID;
				this.assistInfo.roomTemp = this.assistInfo.rooms.filter(e => e.BuildingId === buildingId);
			},
			selectRoom(e) {
				let index = e.detail.value[1];
				let v = this.assistInfo.roomTemp[index];
				this.io.data.RoomId = v.ID;
				this.assistInfo.roomName = `${v.Building.Name} ${v.Name}`;
			},
			selectTeacher(e) {
				let u = this.assistInfo.teachers[e.detail.value];
				this.assistInfo.teacherName = u.RealName || "请选择指导教师";
				this.io.data.GuideTeacherId= u.ID;
			}
		},
		data() {
			return {
				io: {
					fieldAccess: {},
					data: {},
					submitBtns: [],
					shouldUpload: []
				},
				assistInfo:{
					buildings:[],
					rooms:[],
					teachers:[],
					roomTemp:[],
					roomIndex:[0,0],
					roomName:'请选择房间号',
					teacherName: '请选择指导老师'
				},
				upLoad: [],
			}
		}
	}
</script>

<style>
</style>

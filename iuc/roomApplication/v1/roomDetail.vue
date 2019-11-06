<template>
	<view id="room-detail">
		<cu-custom bgColor="bg-gradual-blue" isBack="">
			<block slot="backText">返回</block>
			<block slot="content">实验室详细信息</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==tabCur?'text-blue cur':''" v-for="(item,index) in arrays" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view class="margin-tb bg-white" v-if="tabCur==0">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">实验室名称</view>
					<input :value="labInfo.Name" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">所在楼栋</view>
					<input :value="buildingDic[labInfo.BuildingId]" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">实验室联系人</view>
					<input :value="labInfo.Administrator" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">实验室联系人电话</view>
					<input :value="labInfo.AdminTelephone" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">实验室安全负责人</view>
					<input :value="labInfo.SecurityOfficer" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">安全负责人电话</view>
					<input :value="labInfo.SOTelephone" disabled></input>
				</view>
				<view class="cu-form-group">
					<view class="title">实验室类型</view>
					<input :value="roomType[labInfo.RoomType]" disabled></input>
				</view>
			</form>
		</view>
		<view class="margin-tb padding bg-white text-center" v-else-if="tabCur==1">
			<text>1暂无内容</text>
		</view>
		<view class="margin-tb padding bg-white text-center" v-else-if="tabCur==2">
			<text>2暂无内容</text>
		</view>
		<view class="margin-tb padding bg-white text-center" v-else-if="tabCur==3">
			<text>3暂无内容</text>
		</view>
		<view class="padding flex flex-direction" @click="create()">
			<button class="cu-btn bg-blue lg">申请</button>
		</view>
	</view>
</template>

<script>
	let enums = require("../enumsv1.js");
	export default{
		onLoad(opt) {
			this.labInfo.ID = opt.id;
			this.getData();
			uni.getStorage({
				key: 'buildingDic',
				success: res =>{
					this.buildingDic = res.data;
				}
			})
		},
		methods:{
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			create() {
				uni.navigateTo({
					url: "./create?buildingID="+this.labInfo.BuildingId+"&roomID="+this.labInfo.ID
				})
			},
			getData(){
				if (!this.labInfo.ID) return;
				uni.post("/api/building/GetRoom", { ID: this.labInfo.ID }, msg => {
					this.labInfo = msg.data;
				});
			}
		},
		data(){
			return{
				roomType: enums.RoomType,
				arrays: [
					"实验室详情",
					"时间安排表",
					"申请记录"
				],
				tabCur: 0,
				scrollLeft: 0,
				labInfo: {
					ID: "",
					Name: "",
					BuildingId: "",
					administrator: "",
					AdminTelephone: "",
					SecurityOfficer: "",
					SOTelephone: "",
					displayOrder: "",
					CreatedOn: "",
					RoomType: ""
				},
				buildingDic: {}
			}
		}
	}
</script>

<style>
</style>

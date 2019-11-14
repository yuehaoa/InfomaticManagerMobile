<template>
	<view id="room-detail">
		<cu-custom bgColor="bg-gradual-blue shadow" isBack="">
			<block slot="backText">返回</block>
			<block slot="content">实验室详细信息</block>
		</cu-custom>
		<view class="bg-gradual-blue shadow radius margin-sm">
			<view class="flex padding-lr solid-bottom justify-between align-center padding-sm">
				<view class="cu-avatar round"></view>
				<view class="text-xl text-black">{{labInfo.Name}}</view>
			</view>
			<view class="text-xxl text-black flex justify-center padding-sm">
				{{labInfo.Name}}
			</view>
			<view class="flex flex-wrap text-black text-sm padding-sm">
				<view class="basis-xl">管理员:{{labInfo.Administrator}}</view>
				<view class="basis-xl">管理员联系电话:{{labInfo.AdminTelephone}}</view>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav text-center cardPosition shadow">
			<view class="cu-item" :class="index==tabCur?'text-blue cur':''" v-for="(item,index) in arrays" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view class="margin-tb padding bg-white text-center" v-if="tabCur==0">
			<text>0暂无内容</text>
		</view>
		<view class="margin-tb padding bg-white text-center" v-else-if="tabCur==1">
			<text>1暂无内容</text>
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
			//document.selectByName
			this.labInfo.ID = opt.id;
			this.getData();
			uni.getStorage({
				key: 'buildingDic',
				success: res =>{
					this.buildingDic = res.data;
				}
			})
			console.log(this.cuCustomHeight);
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
				roomType: enums.roomType,
				arrays: [
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
	.cardPosition
	{
		position: sticky;
		top: 90rpx;
	}
</style>

<template>
	<view id="lab-detail">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">实验室详细信息</block>
		</cu-custom>
		<labInfoCard class="margin-lr-xl" :lab="labInfo"></labInfoCard>
		<view v-if="labInfo.RoomType===10" class="text-center">
			<button class="cu-btn bg-blue lg">以团队申请该实验室</button>
		</view>
		<view v-else-if="labInfo.RoomType===20">
			<view class="bg-blue">机位列表</view>
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) in applicationData" :key="index">
					<view class="content">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">
							机位{{item.Code+'\t'}}配置：{{item.Memo}}
						</text>
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow" :disabled="item.State!==0">
							<text class="cuIcon-upload"></text>申请</button>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="text-center">
			<text>开放实验室无需申请</text>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	let enums = require("../roomApplication/enumsv1.js");
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
			getData(){
				if (!this.labInfo.ID) return;
				uni.post("/api/building/GetRoom", { ID: this.labInfo.ID }, msg => {
					this.labInfo = msg.data;
				});
				uni.post("/api/roomApp/v1/GetApplicationByRoom",{ ID: this.labInfo.ID },msg=>{
					this.applicationData = msg.data;
				});
				uni.post("/api/building/GetSeats",{ID: this.labInfo.ID},msg=>{
					this.applicationData = msg.data;
				})
			}
		},
		data(){
			return{
				workflow: enums.workflow,
				wColor: enums.workflowColor,
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
					Building: "",
					administrator: "",
					AdminTelephone: "",
					SecurityOfficer: "",
					SOTelephone: "",
					displayOrder: "",
					CreatedOn: "",
					RoomType: ""
				},
				applicationData: [],
				buildingDic: {},
				labs:[]
			}
		}
	}
</script>

<style>
	.cardPosition
	{
		z-index: 100;
		position: sticky;
		top: 90rpx;
	}
</style>

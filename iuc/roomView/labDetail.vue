<template>
	<view id="lab-detail">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">实验室详细信息</block>
		</cu-custom>
		<labInfoCard class="margin-lr-xl" :lab="labInfo"></labInfoCard>
		<view v-if="labInfo.RoomType===10" class="text-center">
			<view v-if="labInfo.RoomDisplayState!=='待填写'">
				<button class="cu-btn bg-blue lg margin" @click="submit(labInfo.ID,'按团队申请实验室')">以团队申请该实验室</button>
			</view>
			<view v-else>
				<!--view class="text-gray text-df margin">从{{applicationData[0].StartDate}}到{{applicationData[0].EndDate}}</view-->
				<button disabled class="cu-btn bg-blue lg" type="">{{labInfo.RoomDisplayState}}</button>
				</br>
				<button v-if="app.checkPermission('ItemManager.ReleaseRoom')" class="cu-btn bg-blue lg margin-top" type="" @click="releaseRoom(labInfo.ID)">强制释放</button>
			</view>
		</view>
		<view v-else-if="labInfo.RoomType===20">
			<view class="action text-xl bg-white solids-bottom padding-sm">
				<text class="cuIcon-title text-blue text-xl"></text>
				<text class="text-bold text-xl">机位列表</text>
			</view>
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) in applicationData" :key="index">
					<view class="content">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">
							机位{{item.Code+'\t'}}配置：{{item.Memo}}
						</text>
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow" :disabled="item.State!==0" @click="submit(item.ID)">
							<text class="cuIcon-upload"></text>申请</button>
					</view>
					<view class="action">
						<button v-if="app.checkPermission('ItemManager.ReleaseSeat')" class="cu-btn round bg-green shadow" :disabled="item.State===0" @click="release(item.ID)">
							<text class="cuIcon-upload"></text>释放</button>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="margin-lr-xl padding-lr-xl">
			<image mode="aspectFit" src="../../static/无需申请.png"></image>
		</view>
		<navTab :selection='0' />
	</view>
</template>

<script>
	let app = require("@/config");
	let enums = require("../roomApplication/enumsv1.js");
	export default {
		onShow() {
			this.getData();
		},
		onLoad(opt) {
			this.labInfo.ID = opt.id;
			this.getData();
		},
		methods: {
			getData() {
				if (!this.labInfo.ID) return;
				uni.post("/api/building/GetRoom", {
					ID: this.labInfo.ID
				}, msg => {
					this.labInfo = msg.data;
					this.applicationData = msg.useState;
					if (this.labInfo.RoomType === 20) {
						uni.post("/api/building/GetSeats", {
							pid: this.labInfo.ID,
							page: 1,
							pageSize: 1000
						}, msg => {
							this.applicationData = msg.data;
						});
					}
				});
			},
			submit(id, description) {
				if (description === "按团队申请实验室") {
					uni.setStorage({
						key: 'labid',
						data: id,
						success: () => {
							uni.navigateTo({
								url: "../roomApplication/v2/roomFlowsCtrl?create=true"
							})
						}
					})
				} else {
					uni.setStorage({
						key: 'seatid',
						data: id,
						success: () => {
							uni.navigateTo({
								url: "../roomApplication/v2/seatFlowsCtrl?create=true"
							})
						}
					})
				}
			},
			release(seatID) {
				uni.post("/api/seatApp/v1/Release", {
					id: seatID
				}, msg => {
					if (msg.success) {
						this.getData();
					} else {
						uni.showMessage(msg.msg);
					}
				})
			},
			releaseRoom(roomID) {
				uni.post("/api/roomApp/v1/Release", {
					id: roomID
				}, msg => {
					if (msg.success) {
						this.getData();
					} else {
						uni.showMessage(msg.msg);
					}
				})
			}
		},
		data() {
			return {
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
				app,
				applicationData: [],
				labs: []
			}
		}
	}
</script>

<style>
	.cardPosition {
		z-index: 100;
		position: sticky;
		top: 90rpx;
	}
</style>

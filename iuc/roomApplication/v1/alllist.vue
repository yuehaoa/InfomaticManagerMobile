<template>
	<view id="lab-apply-list">
		<cu-custom bgColor="bg-informatic-brown" isBack="">
			<block slot="backText">返回</block>
			<block slot="content">所有申请</block>
			<view class="action" slot="right" @click="addApplication()">添加</view>
		</cu-custom>
		<transition-group class="cu-list menu" name="list">
			<view v-for="(item,index) in data" :key="index" @click="toExecute(item)" @touchstart="ListTouchStart"
			 @touchmove="listTouchMove" @touchend="listTouchEnd" :data-target="'move-box-' + index" :class="modalName=='move-box-'+ index?'move-cur':''"
			 class="cu-item" :style="{'transition-delay': index/8+'s'}">
				<!--view class="cu-avatar round lg" :style="{ backgroundImage: `url('${icon}')` }"></view-->
				<view class="margin-left content">
					<view class="text-black text-lg">
						<view class="text-cut text-xl">{{item.RoomName}}申请表</view>
						<view class="cu-tag round sm" :class="'bg-' + wColor[item.State]">{{ workflow[item.State] }}</view>
					</view>
					<view class="text-gray padding-tb-xs">
						<view class="text-cut" style="line-height: 36rpx;">
							<text>申请人：{{item.Owner}}\n申请时段：{{item.StartDate.slice(5)}}-{{item.EndDate.slice(5)}}</text>
						</view>
					</view>
				</view>
				<view class="move">
					<view class="bg-green" v-if="item.IsMyStep" @click.stop="toExecute(item)">执行</view>
					<view class="bg-blue" @click.stop="toDetail(item.ID)">详细</view>
				</view>
			</view>
		</transition-group>
	</view>
</template>

<script>
	let app = require("@/config");
	let enums = require("../enumsv1.js");
	export default {
		onShow() {
			this.getData(1);
		},
		onLoad() {
			this.getData(1);
		},
		methods: {
			getData(p) {
				let page = p || this.page;
				let pageSize = this.pageSize;
				uni.post("/api/roomApp/v1/GetAllApplications", {
					page,
					pageSize,
				}, msg => {
					if (msg.success) {
						this.data = msg.data;
					}
				})
			},
			addApplication() {
				uni.navigateTo({
					url: "/iuc/roomApplication/v1/create"
				})
			},
			toExecute(item) {
				uni.navigateTo({
					url: item.RouteData
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: "/iuc/roomApplication/v1/detail?id=" + id
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			listTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			listTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		},
		data() {
			return {
				workflow: enums.workflow,
				wColor: enums.workflowColor,
				icon: app.webInfo.avatar,
				page: 1,
				pageSize: 10,
				data: [],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null
			}
		}
	}
</script>

<style>
	.cu-list>.cu-item {
		padding-top: 16rpx;
		padding-bottom: 6rpx;
		transition: all 1s;
	}
	.list-enter{
		opacity: 0;
		transform: translateX(120rpx);
	}
</style>

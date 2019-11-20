<template>
	<view id="software-install-list">
		<cu-custom bgColor="bg-gradual-blue" :isBack="'/iuc/index/index'">
			<block slot="backText">返回</block>
			<block slot="content">查看所有申请表</block>
			<view class="action" slot="right" @click="toAdd()">添加</view>
		</cu-custom>
		<view class="cu-list menu-avatar margin-top">
			<template v-if="data.length > 0">
				<view class="cu-item" v-for="(item, index) in data" :key="index" @click="toExecute(item)"
				@touchstart="listTouchStart" @touchmove="listTouchMove" @touchend="listTouchEnd" :data-target="'move-box-' + index"
				:class="modalName=='move-box-'+ index?'move-cur':''">
					<view class="cu-avatar round lg" :style="{ backgroundImage: `url('${icon}')` }">
					</view>
					<view class="content">
						<view class="text-black text-lg">
							<view class="cu-tag round sm margin-right-xs" :class="'bg-' + wColor[item.state]">{{ workflow[item.state] }}</view>
							<view class="text-cut text-xl">{{item.ApplicationName || "还未填写"}}</view>
						</view>
						<view class="text-gray flex">
							<view class="text-cut">
								地址：{{item.roomName}} 申请人：{{item.owner}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-black text-sm">{{ item.createdTime.slice(5) }}</view>
					</view>
					<view class="move">
						<view class="bg-green" v-if="item.isMyStep" @click.stop="toExecute(item)">执行</view>
						<view class="bg-blue" @click.stop="toDetail(item.ID)">详细</view>
						<!-- <view class="bg-red">删除</view> -->
					</view>
				</view>
			</template>
			<view v-else class="text-center">
				<view class="text-xl padding">
					<text class="text-grey text-bold">暂无内容</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = require("@/config");
	let steps = require("../stepsv1.js");
	let enums = require("../enumsv1.js")
	export default {
		onLoad: function(opt) {
			this.getData(1);
		},
		methods: {
			getData(p) {
				let page = p || this.page;
				let pageSize = this.pageSize;
				uni.post("/api/installApp/v1/GetAllApplications", {
					page,
					pageSize
				}, msg => {
					if (msg.success) {
						this.page = msg.page;
						this.pageSize = msg.pageSize;
						this.totalRow = msg.totalRow;
						this.data = msg.data;
					}
				})
			},
			toDetail (id) {
				uni.navigateTo({
					url: "/iuc/softwareInstall/v1/detail?id=" + id
				})
			},
			toExecute (item) {
				uni.navigateTo({
					url: item.routeData
				})
			},
			toAdd () {
				uni.navigateTo({
					url: "/iuc/softwareInstall/v1/create"
				})
			},
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
			let status = {};
			for (let ele of steps) {
				status[ele.id] = ele.value;
			}
			return {
				workflow: enums.workflow,
				wColor: enums.workflowColor,
				icon: app.webInfo.avatar,
				page: 1,
				pageSize: 10,
				totalRow: 0,
				data: [],
				listTouchStart: 0,
				listTouchDirection: null,
				modalName: null
			};
		}
	}
</script>

<style lang="less">
	#software-install-list {}
</style>

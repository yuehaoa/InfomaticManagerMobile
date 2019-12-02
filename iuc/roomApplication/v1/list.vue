<template>
	<view id="lab-apply-list">
		<cu-custom bgColor="bg-informatic-brown" isBack="">
			<block slot="backText">返回</block>
			<block slot="content">我的待办</block>
			<view class="action" slot="right" @click="addApplication()">添加</view>
		</cu-custom>
		<view>
			<transition-group appear name="list" class="cu-card">
				<view class="cu-item bg-informatic-brown shadow"
				v-for="(item,index) in data" :key="index" @click="toExecute(item)">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg">{{item.Owner.substr(0,1)}}</view>
							<view class="content flex-sub">
								<view class="text-black text-lg">
									<view class="text-cut text-xl">{{item.Owner}}提交的实验室申请</view>
									<!--view class="cu-tag round sm" :class="'bg-' + wColor[item.State]">{{ workflow[item.State] }}</view-->
								</view>
								<view class="text-gray">
									<view class="text-cut padding-tb-xs" style="line-height: 36rpx;">
										<text>申请时段：{{item.StartDate.slice(5)}}-{{item.EndDate.slice(5)}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</transition-group>
			<template v-if="data.length===0">
				<view class="padding-tb text-center text-lg">
					<text class="text-bold text-gray">暂无数据</text>
				</view>
			</template>
		</view>
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
			
		},
		methods: {
			getData(p) {
				let page = p || this.page;
				let pageSize = this.pageSize;
				uni.post("/api/roomApp/v1/GetMyPending", {
					page,
					pageSize
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
			}
			/* ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}*/
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
	.cu-list>.cu-item{
		padding-top: 18rpx;
		padding-bottom: 8rpx;
		transition: all 0.8s;
	}
	.list-move{
		transition: all 0.8s;
	}
	.list-enter{
		opacity: 0;
		transform: translateY(-30px);
	}
	.list-leave-to{
		opacity: 0;
		transform: translateY(-30px);
	}
	.list-appare{
		opacity: 0;
		transform: translateY(-30px);
	}
</style>

<template>
	<view id="lab-apply-list">
		<cu-custom bgColor="bg-gradual-blue" isBack="">
			<block slot="backText">返回</block>
			<block slot="content">我的待办</block>
			<view class="action" slot="right" @click="addApplication()">添加</view>
		</cu-custom>
		<view class="cu-bar bg-white solids-bottom">
			<view class="action text-xxl">
				<text class="cuIcon-title text-blue text-xxl"></text>
				<text class="text-bold text-xxl">实验室申请</text>
			</view>
			<view class="action" @click="foldUp">
				<text class="text-df">{{display?'收起':'展开'}}</text>
				<text class="padding-lr-xs text-bold" :class="display?'cuIcon-fold':'cuIcon-unfold'"></text>
			</view>
		</view>
		<view>
			<transition-group class="cu-list menu" name="application-list">
				<view class="cu-item" v-show="display" v-for="(item,index) in data" :key="index" @click="toExecute(item)" @touchstart="ListTouchStart"
				 @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" :class="modalName=='move-box-'+ index?'move-cur':''">
					<!--view class="cu-avatar round lg" :style="{ backgroundImage: `url('${icon}')` }"></view-->
					<view class="margin-left content">
						<view class="text-black text-lg">
							<view class="text-cut text-xl">{{item.RoomName}}申请表</view>
							<view class="cu-tag round sm" :class="'bg-' + wColor[item.State]">{{ workflow[item.State] }}</view>
						</view>
						<view class="text-gray">
							<view class="text-cut padding-tb-xs" style="line-height: 36rpx;">
								<text>申请人：{{item.Owner}}\n</text>
								<text>申请时段：{{item.StartDate.slice(5)}}-{{item.EndDate.slice(5)}}</text>
							</view>
						</view>
					</view>
					<view class="move">
						<view class="bg-green" v-if="item.IsMyStep" @click.stop="toExecute(item)">执行</view>
						<view class="bg-blue" @click.stop="toDetail(item.ID)">详细</view>
					</view>
				</view>
			</transition-group>
			<template v-if="display &&data.length===0">
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
			},
			toDetail(id) {
				uni.navigateTo({
					url: "/iuc/roomApplication/v1/detail?id=" + id
				})
			},
			foldUp() {
				this.display = !this.display;
			},
			// ListTouch触摸开始
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
				listTouchDirection: null,
				display: true
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
	.application-list-move{
		transition: transform 1s;
	}
	.application-list-enter{
		opacity: 0;
		transform: translateY(-30px);
	}
	.application-list-leave-to{
		opacity: 0;
		transform: translateY(-30px);
	}
</style>

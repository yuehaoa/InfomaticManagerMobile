<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的参与</block>
		</cu-custom>
		<view class="cu-bar bg-white solids-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue text-xxl"></text>
				<text class="text-xxl text-bold">实验室申请</text>
			</view>
			<view class="action" @click="foldUp">
				<text class="text-df">{{display?'收起':'展开'}}</text>
				<text class="padding-lr-xs" :class="display?'cuIcon-fold':'cuIcon-unfold'"></text>
			</view>
		</view>
		<transition-group class="cu-list cu-card" name="list">
			<view class="cu-item bg-informatic-brown shadow"
			 v-for="(item,index) in data" :key="index" @click="toExecute(item)" v-show="display">
				<sticky :item="item" />
			</view>
		</transition-group>
		<template v-if="data.length===0 && display">
			<view class="padding-tb text-center text-lg">
				<text class="text-bold text-gray">暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	let app = require("@/config");
	let enums = require("../enumsv1.js");
	export default {
		onShow() {
			this.getData();
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				uni.post("/api/workflow/MyAttend", {name:'按团队申请实验室'
				}, msg => {
					this.data = msg.data;
				})
			},
			toExecute(item) {
				uni.setStorage({
					key : 'jmpInfo',
					data:item,
					success: () => {	//如果缓存成功则跳转
						uni.navigateTo({
							url: './flowsCtrl'
						})
					}
				})
			},
			/*// ListTouch触摸开始
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
			},*/
			foldUp() {
				this.display = !this.display
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
	.cu-list>.cu-item {
		padding-top: 16rpx;
		padding-bottom: 6rpx;
		transition: all 1s;
	}

	.list-move {
		transition: all 1s;
	}

	.list-enter {
		opacity: 0;
		transform: translateY(-30px);
	}

	.list-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}
</style>

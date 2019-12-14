<template>
	<view id="lab-apply-list">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的申请</block>
		</cu-custom>
		<transition-group class="cu-card" name="list">
			<view class="cu-item bg-informatic-brown shadow"
			v-for="(item,index) in data" :key="index" @click="toExecute(item)">
				<sticky :item="item" />
			</view>
		</transition-group>
		<template v-if="data.length===0">
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
			this.getData(1);
		},
		onLoad() {
			
		},
		methods: {
			getData() {
				uni.post("/api/workflow/MyFlow", {}, msg => {
					this.data = msg.data;
					//this.data = this.data.filter(e => e.State != 0);
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
			}
		},
		data() {
			return {
				workflow: enums.workflow,
				wColor: enums.workflowColor,
				data: [],
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null
			}
		}
	}
</script>
	
<style>
	.cu-card>.cu-item {
		transition: all 1s;
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
	
</style>

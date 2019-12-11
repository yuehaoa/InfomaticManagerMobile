<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">我的待办</block>
		</cu-custom>
		<transition-group class="cu-card" name="list">
			<view class="cu-item bg-informatic-brown shadow"
			v-for="(item,index) in todoList" :key="index" @click="toExecute(item)">
				<sticky :item="item" />
			</view>
		</transition-group>
	</view>
</template>

<script>
	export default {
		onShow() {
			
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				uni.post("/api/workflow/Pending",{},msg=>{
					this.todoList=msg.data;
				})
			},
			toExecute(item) {
				uni.navigateTo({
					url: './flowsCtrl?InstanceId='+item.InstanceId
				})
			}

		},
		data() {
			return {
				todoList:[]
			}
		}
	}
</script>
	
<style>
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

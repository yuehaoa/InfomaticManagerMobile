<template>
	<view id="lab-apply-allot">
		<cu-custom bgColor="bg-gradual-blue" isBack="">
			<block slot="backText">返回</block>
			<block slot="content">分管领导分配</block>
		</cu-custom>
		<!--此处有一个自定义组件 -->
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">申请人</view>
				<input value="" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请原因</view>
				<input value="" disabled />
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">起止时间</view>
				<input value="" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请房间号</view>
				<input value="" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师</view>
				<input value="" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">机房管理员</view>
				<picker :range="array" :value="index" @change="managerChange">
					<view class="picker">{{array[index]}}</view>
				</picker>
			</view>
			<view class="action-list cu-list grid col-3 margin-top margin-bottom">
				<view class="cu-item" @click="submit('确认')">
					<view class="cuIcon-roundcheckfill text-green"></view>
					<text>确认分配</text>
				</view>
				<view class="cu-item" @click="submit('修改')">
					<view class="cuIcon-writefill text-red"></view>
					<text>需要修改</text>
				</view>
				<view class="cu-item" @click="submit('取消')">
					<view class="cuIcon-roundclosefill text-red"></view>
					<text>取消流程</text>
				</view>
			</view>
		</form>
	</view>
</template>
<script>
	export default {
		onLoad:function(id) {
			this.ID=id;
			this.getData(id);
		},
		data () {
			return {
				array:['未设置','宋润涵','补补还能用','不言骑'],
				index:0,//picker的数组
				ID:"",//申请表
				HandlerId:"",//被分配的执行人ID
				model:{}
			}
		},
		methods:{
			getData(ID) {
				console.log(this.ID);
				uni.post("/api/roomApp/v1/GetAssignApplication",{ID},msg=>{
					if(msg.success) {
						console.log(msg);
						this.model=msg.data;
					}
				}
				)
				
			},
			managerChange (e) {
				this.index=e.target.value;
			},
			submit (opinion) {
				uni.post("/api/roomApp/v1/AssignForm", {
					ID:this.ID,HandlerId:this.HandlerId,ReviewOpinion:opinion},msg=>{
						if(msg.success) {
							
						}
					})
			}
			
		}
	}
</script>

<style>
</style>

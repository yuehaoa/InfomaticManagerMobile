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
				<input :value="model.Owner" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请原因</view>
				<input :value="model.ApplicationReason" disabled />
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">起止时间</view>
				<input :value="time" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请房间号</view>
				<input :value="model.RoomName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">指导老师</view>
				<input :value="model.GuideTeacher" disabled />
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
		onLoad:function(opt) {
			this.ID=opt.id;
			this.getAssignData(this.ID);
			this.getData(this.ID);
		},
		data () {
			return {
				managerIDs:[],
				array:[],
				index:0,//picker的数组
				ID:"",//申请表
				HandlerId:"",//被分配的执行人ID
				model:{},
				assignModel:{},
				time:"",
				
			}
		},
		methods:{
			getAssignData(ID) {
				console.log(this.ID);
				uni.post("/api/roomApp/v1/GetAssignApplication",{ID},msg=>{
					if(msg.success) {
						console.log(msg);
						this.Assignmodel=msg.data;
						this.SetManager(msg);
					}
				}
				)
			},
			getData(ID) {
				console.log(this.ID);
				uni.post("/api/roomApp/v1/GetApplication",{ID},msg=>{
					if(msg.success) {
						console.log(msg);
						this.model=msg.data;
						this.TimeCombine();
					}
				}
				)
				
			},
			managerChange (e) {
				this.index=e.target.value;
				this.getManagerID(e.target.value);
			},
			submit (opinion) {
				uni.post("/api/roomApp/v1/AssignForm", {
					ID:this.ID,HandlerId:this.HandlerId,ReviewOpinion:opinion},msg=>{
						if(msg.success) {
							console.log(msg);
						}
					})
			},
			TimeCombine(){
				this.time=this.model.StartDate+" — "+this.model.EndDate;
			},
			SetManager(msg){
				this.array=["未设置"];
				this.managerArray=msg.users;
				console.log(this.managerArray);
				for(var i=1;i<=msg.users.length;i++){
					this.array[i]=msg.users[i-1].RealName;
				}
			},
			getManagerID(value){
				for(var i=0;i<this.managerArray.length;i++)
				{
					if(this.managerArray[i].RealName==this.array[value])
					{
						this.HandlerId=this.managerArray[i].ID;
						console.log(this.HandlerId);
						break;
					}
				}
			}
			
		}
	}
</script>

<style>
</style>

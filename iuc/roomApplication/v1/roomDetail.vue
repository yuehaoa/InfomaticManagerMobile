<template>
	<view id="room-detail">
		<cu-custom bgColor="bg-gradual-blue" isBack="">
			<block slot="backText">返回</block>
			<block slot="content">实验室详细信息</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">实验室名称</view>
				<input :value="labInfo.Name" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">所在楼栋</view>
				<input :value="buildingDic[labInfo.BuildingId]" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室联系人</view>
				<input :value="labInfo.Administrator" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室联系人电话</view>
				<input :value="labInfo.AdminTelephone" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室安全负责人</view>
				<input :value="labInfo.SecurityOfficer" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">安全负责人电话</view>
				<input :value="labInfo.SOTelephone" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室ID</view>
				<input :value="labInfo.ID" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">实验室类型（暂时为枚举值）</view>
				<input :value="labInfo.RoomType" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">排序号</view>
				<input :value="labInfo.DisplayOrder" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">创建日期</view>
				<input :value="labInfo.CreatedOn" disabled></input>
			</view>
		</form>
	</view>
</template>

<script>
	export default{
		onLoad(opt) {
			this.labInfo.ID = opt.id;
			this.getData();
			uni.getStorage({
				key: 'buildingDic',
				success: res =>{
					this.buildingDic = res.data;
				}
			})
		},
		methods:{
			getData(){
				if (!this.labInfo.ID) return;
				uni.post("/api/building/GetRoom", { ID: this.labInfo.ID }, msg => {
					this.labInfo = msg.data;
				});
			}
		},
		data(){
			return{
				labInfo: {
					ID: "",
					Name: "",
					BuildingId: "",
					Administrator: "",
					AdminTelephone: "",
					SecurityOfficer: "",
					SOTelephone: "",
					DisplayOrder: "",
					CreatedOn: "",
					RoomType: ""
				},
				buildingDic: {}
			}
		}
	}
</script>

<style>
</style>

<template>
	<view id="software-install-create">
		<cu-custom bgColor="bg-gradual-blue" :isBack="'/iuc/softwareInstall/v1/list'">
			<block slot="backText">返回</block>
			<block slot="content">软件安装申请表</block>
		</cu-custom>
		<form>
			<view class="cu-steps margin-top">
				<view class="cu-item" :class="item.id < model.State ? 'text-blue' : ''" v-for="(item, index) in steps" :key="item.id">
					<text class="num" :data-index="index + 1"></text>
					{{item.name}}
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">申请人</view>
				<input disabled="true" name="input" :value="model.owner"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input disabled="true" name="input" :value="model.telephone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">所属部门</view>
				<input disabled="true" :value="model.belongDepart"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">申请时间</view>
				<input disabled="true" :value="model.createdTime"></input>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">选择实验室</view>
				<picker mode="multiSelector" :range="[buildings, rooms]" range-key="Name"
				@columnchange="columnChange" @change="selectRoom" v-model="roomIndex">
					<view class="picker">
						{{roomName}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">待装软件<span class="must">*</span></view>
				<input placeholder="(必填)请填写软件的名称" v-model="model.applicationName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">软件版本</view>
				<input placeholder="(可选)请填写需要安装的软件版本" v-model="model.version"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">下载地址</view>
				<input placeholder="(可选)请填写软件的下载地址" v-model="model.download"></input>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green lg" :disabled="isLoading" @click="submit()">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	let app = require("@/config");
	let guidEmpty = '00000000-0000-0000-0000-000000000000';
	let steps = require("../stepsv1.js")
	export default {
		methods: {
			submit () {
				if (this.model.roomId === guidEmpty) {
					alert("必须选择实验室");
					return;
				}
				if (!this.model.applicationName) {
					alert("必须填写待装软件的名称");
					return;
				}
				this.isLoading = true;
				uni.post("/api/installApp/v1/CreateApplication", this.model, msg => {
					this.isloading = false;
					uni.navigateTo({
						url: "/iuc/softwareInstall/v1/list"
					})
				})
			},
			columnChange (e) {
				let column = e.detail.column
				let value = e.detail.value;
				if (column) return;
				
				let buildingId = this.buildings[value].ID;
				this.rooms = this.allRooms.filter(e => e.buildingId === buildingId);
			},
			selectRoom (e) {
				let index = e.detail.value[1];
				let v = this.rooms[index];
				this.roomName = v.ID === guidEmpty ? "选择实验室" : `${v.Building.Name} ${v.Name}`;
				this.model.roomId = v.ID;
			},
			goBack () {
				uni.navigateTo({
					url: "/iuc/softwareInstall/v1/list"
				})
			}
		},
		data () {
			return {
				isLoading: false,
				model: {},
				roomName: "",
				buildings: [{ID: guidEmpty, Name: '置空'}],
				rooms: [{ID: guidEmpty, Name: '置空'}],
				roomIndex: [0, 0],
				allRoom: [],
				steps
			}
		},
		onLoad: function (opt) {
			let id = opt.id || null;
			uni.get("/api/installApp/v1/GetApplication", {id}, msg => {
				if (msg.success) {
					this.model = msg.data;
					this.buildings = msg.buildings;
					this.allRooms = msg.rooms;
					this.roomName = msg.data.roomName === "暂无设置" ? "选择实验室" : msg.data.roomName;
				}
			})
		}
	}
</script>

<style lang="less">
	#software-install-create {
		.title {
			width: 6em;
			text-align: justify;
		}
	}
</style>

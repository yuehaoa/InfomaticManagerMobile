<!--邵良颖于2019-10-16编辑 用于查看实验室-->
<template>
	<view class="bg-white">
		<cu-custom bgColor="bg-gradual-blue" isBack="">
			<block slot="backText">返回</block>
			<block slot="content">实验室列表页</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in buildings" :key="index" @tap="tabSelect($event, item.ID)"
			 :data-id="index">
				<span>{{item.Name}}</span>
			</view>
		</scroll-view>
		<view class="padding-sm bg-white" v-for="(item,index) in labs" :key="index" @click="labDetail(item.ID)">
			<view class="shadow shadow-lg bg-gradual-blue radius">
				<view class="flex padding-lr solid-bottom justify-between align-center padding-tb-xs">
					<view class="cu-avatar round lg" :style="{ backgroundImage: `url('${icon}')` }"></view>
					<view class="text-xl text-white">{{`${item.Building.SubCampus} ${item.Building.Name}`}}</view>
				</view>
				<view class="text-sl text-white flex justify-center padding-sm">
					{{item.Name}}
				</view>
				<view class="flex flex-wrap text-white text-df margin-sm">
					<view class="basis-xl">管理员:{{item.Administrator}}</view>
					<view class="basis-xl">管理员联系电话:{{item.AdminTelephone}}</view>
					<view class="basis-xs text-xl padding-bottom-xs">
						<text class="cuIcon-roundright text-xxl" style="float: right;display: block;"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getBuildings(true);
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				buildings: [],
				buildingDic: {},
				icon: '../../../static/XMU.png',
				labs: {}
			};
		},
		methods: {
			tabSelect(e, ID) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.getLabs(ID);
			},
			getBuildings() {
				uni.post("/api/building/GetBuildings", {}, msg => {
					this.buildings = msg.data;
					this.buildings = this.buildings.filter(e => e.ID !== '00000000-0000-0000-0000-000000000000');
					this.buildings.map(e => this.buildingDic[e.ID] = e.Name);
					uni.setStorage({
						key: 'buildingDic',
						data: this.buildingDic,
					});
					this.getLabs(this.buildings[0].ID);
				});
			},
			getLabs(pid) {
				uni.post("/api/building/GetRooms", {
					pid
				}, msg => {
					this.labs = msg.data;
					this.labs = this.labs.filter(e => e.ID !== '00000000-0000-0000-0000-000000000000');
				})
			},
			labDetail(id) {
				uni.navigateTo({ 
					url: './roomDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
</style>

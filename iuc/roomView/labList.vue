<template>
	<view class="bg-white">
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-informatic-brown text-bold cur':''" v-for="(item,index) in buildings" :key="index" @tap="tabSelect($event, item.ID)"
			 :data-id="index">
				<span>{{item.Name}}</span>
			</view>
		</scroll-view>
		<view v-if="labs.length>0">
			<view v-for="(item,index) in labs" :key="index" @click="labDetail(item.ID)">
				<labInfoCard class="margin-lr-xl" :lab="item" displayArrow></labInfoCard>
			</view>
		</view>
		<view v-else class="text-center padding-top-xl"><text>暂无内容</text></view>
		<navTab :selection='0' />
	</view>
</template>

<script>
	export default {
		onLoad (query) {
			var type = query.type;
			this.type = type;
			var titles = {
				[-1]: "实验室列表",
				1: "基础实验室列表",
				10: "面向团队的开放实验室列表",
				20: "面向个人的开放实验室列表"
			};
			this.title = titles[type];
			this.getBuildings();
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				buildings: [],
				buildingDic: {},
				title: "实验室列表",
				type: -1,
				labs: []
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
					this.getLabs(this.buildings[0].ID);
				});
			},
			getLabs(pid) {
				uni.post("/api/building/GetRooms", { pid, type: this.type }, msg => {
					this.labs = msg.data;
					//this.labs = this.labs.filter(e => e.ID !== '00000000-0000-0000-0000-000000000000');
				})
			},
			labDetail(id) {
				uni.navigateTo({ 
					url: './labDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
</style>

<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown">
			<block slot="content">通知公告</block>
		</cu-custom>
		<view :key="index" v-for="(item,index) in news" @click="toDetail(item.ID)">
			<view class="solids-bottom padding bg-white">
				<view class="padding-bottom-xs">
					<text class="text-xxl">{{item.Topic}}</text>
				</view>
				<view class="text-grey">
					<text class="text-df margin-right-sm">{{item.Author}}</text>
					<text class="text-df">{{item.ReleaseTime}}</text>
				</view>
			</view>
			
		</view>
		<navTab :selection='1' />
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getDatas();
		},
		data() {
			return{
			
				TabCur: 0,
				tabNav:[
					"学校新闻",
					"学院公告",
					"实验室公告",
					"综合公告",
					"平台通知",
					"党团通知",
				],
				news:[]
			};
		},
		
		methods:{
			getDatas()
			{
				uni.post("/api/cms/getArticles",{},msg=>{
					this.news = msg.data;
					this.news = this.news.filter(e => e.ID !== '00000000-0000-0000-0000-000000000000');
				});
				
				
			},
			
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			toDetail(id) {
				uni.navigateTo({
					url: './newsDetail?id=' + id,
					
				})
			}
		}
	}
</script>

<style>
</style>

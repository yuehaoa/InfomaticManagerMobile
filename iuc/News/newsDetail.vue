<template> 
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
		</cu-custom>
		<view class="bg-white padding">
			<view>
				<view class="text-bold text-center text-xxl">{{news.Topic}}</view>
				<view class="text-grey margin-tb flex justify-between">
					<text>来源：信息学院</text>
					<text>{{news.ReleaseTime}}</text>
				</view>
			</view>
			<view v-html="news.Content"></view>
			<view>
				<p class="text-grey margin-tb">责任编辑：{{news.Author}}</p></view>
			</view>
		</view>
</template>

<script>
	export default{
		onLoad(opt)
		{
			this.news.ID=opt.id;
			this.getData();
			},
		data(){
			return{
				data:0,
				news: {
					ID: "",
					Author: "",
					CategoryId: "",
					CategoryName: "",
					Content: "",
					ReleaseTime: "",
					Topic: ""
					
				},
			}
		},
		methods:{
			getData()
			{
				if (!this.news.ID) return;
				uni.post("/api/cms/getArticle",{ID: this.news.ID},msg=>{
					this.news = msg.data;
				});
				
			}
		}
	}
</script>

<style>
</style>

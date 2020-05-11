<template>
	<view>
		<swiper class="screen-swiper" autoplay="true" indicator-dots="true" indicator-active-color="white" indicator-color="grey"
		 circular="true">
			<swiper-item v-for='(item,index) in swiperList' :key='index'>
				<image :src="item" mode="aspectFit" style="height: 423rpx;"></image>
			</swiper-item>
		</swiper>
		<view class="bg-white flex solids-bottom padding-tb-sm justify-between align-center">
			<view class="margin-left text-xl">
				<text class="cuIcon-notification"></text>
				<text class="text-bold margin-lr-xs">通知公告</text>
			</view>
			<swiper style="height: 40rpx;width: 400rpx;" class="swiper" autoplay="true" interval="4000" duration="500" circular="true"
			 vertical="true">
				<swiper-item v-for="(item,index) in swiperArray" :key='index' @click="toNewsDetail(item.url)" class="text-cut">
					{{item.text}}
				</swiper-item>
			</swiper>
			<view class="margin-right text-informatic-brown" @click="navToNews">更多<text class="cuIcon-playfill"></text></view>
		</view>
		<view class="padding-bottom bg-white">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold text-xl">我的</text>
				</view>
				<view class="action text-informatic-brown" @click="mineClick()">{{mineShow ? "收起" : "展开"}}<text :class="mineShow ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"
					 style="font-size:25px;"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border" v-show="mineShow">
				<view v-if="p(item.permission)" class="cu-item" v-for='(item,index) in mine' :key='index' @click="navTo(item.source)">
					<view>
						<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
					</view>
					<text class="text-df">{{item.text}}</text>
				</view>
			</view>
		</view>
		<view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold text-xl">申请实验室</text>
				</view>
				<view class="action text-informatic-brown" @click="labShow=!labShow">{{labShow ? "收起" : "展开"}}<text :class="functionshow ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"
					 style="font-size:25px;"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border" v-show="labShow">
				<view v-if="p(item.permission)||true" class="cu-item" v-for='(item,index) in labList' :key='index' @click="navTo(item.source)">
					<view>
						<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold text-xl">功能</text>
				</view>
				<view class="action text-informatic-brown" @click="functionClick">{{functionshow ? "收起" : "展开"}}<text :class="functionshow ? 'cuIcon-triangleupfill' : 'cuIcon-triangledownfill'"
					 style="font-size:25px;"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border" v-show="functionshow">
				<view v-if="p(item.permission)||true" class="cu-item" v-for='(item,index) in functionList' :key='index' @click="navTo(item.source)">
					<view>
						<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<navTab :selection='0' />
	</view>
</template>

<script>
	let app = require("@/config");
	export default {
		onLoad() {
			this.loadNews()
		},
		data() {
			return {
				swiperArray: [
					{
						text: "加载中",
						url: ""
					}
				],
				swiperList: {
					img1: "../../static/轮播图片画板1.png",
					img2: "../../static/轮播图片画板2.png",
					img3: "../../static/轮播图片画板3.jpg"
				},
				mine: [{
						image: "../../static/我的申请.png",
						text: "我的申请",
						source: "../roomApplication/v2/myApplication"
					},
					{
						image: "../../static/我的待办.png",
						text: "我的待办",
						source: "../roomApplication/v2/todoList",
					},
					{
						image: "../../static/我的参与.png",
						text: "我的参与",
						source: "../roomApplication/v2/myAttend",
					},
					{
						image: "../../static/扫一扫.png",
						text: "扫一扫",
						source: "../alert/developing"
					}
				],
				labList: [
					{
						image: "../../static/申请机位.png",
						text: "按个人申请",
						source: "../roomView/labList?type=20"
					},
					{
						image: "../../static/实验室列表.png",
						text: "按团队申请",
						source: "../roomView/labList?type=10"
					}
					/*{
						image: "../../static/实验室列表.png",
						text: "基础实验室",
						source: "../roomView/labList?type=1"
					}*/
				],
				functionList: [{
						image: "../../static/通讯录.png",
						text: "通讯录",
						source: "../addressBook/addressBook"
					} //,
					// {
					// 	image: "../../static/实验室申请.png",
					// 	text: "申请实验室",
					// 	source: "../roomApplication/v2/flowsCtrl?create=true",
					// 	permission: "ItemManager.CreateRoomApplicationWorkflow"
					// },
					// {
					// 	image: "../../static/实验室列表.png",
					// 	text: "所有申请",
					// 	source: "../roomApplication/v2/allList"
					// },
					// {
					// 	image: "../../static/申请机位.png",
					// 	text: "机位申请",
					// 	soure: "../roomApplication/v1/alllist"
					// }
				],
				mineShow: true,
				functionshow: true,
				labShow: true
			}
		},
		methods: {
			loadNews () {
				uni.post("/api/cms/getArticles",{ page: 1, pageSize: 5},msg=>{
					this.swiperArray = msg.data
					.filter(e => e.ID !== '00000000-0000-0000-0000-000000000000')
					.map(e => {
						return {
							text: e.Topic,
							url: `../News/newsDetail?id=${e.ID}`
						}
					});
				});
			},
			toNewsDetail (url) {
				uni.navigateTo({
					url
				})
			},
			functionClick() {
				this.functionshow = !this.functionshow;
			},
			mineClick() {
				this.mineShow = !this.mineShow;
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			navToNews() {
				uni.navigateTo({
					url: '../News/newsList'
				})
			},
			p: e => {
				return e ? app.checkPermission(e) : true;
			}
		}
	}
</script>

<style lang="scss">

</style>

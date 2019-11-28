<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">实验室管理系统</block>
		</cu-custom>
		<swiper class="screen-swiper" autoplay="true" indicator-dots="true" 
		indicator-active-color="white" indicator-color="grey" circular="true">
			<swiper-item v-for='(item,index) in swiperList' :key='index'>
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="bg-white flex solids-bottom padding-tb-sm justify-between align-center">
			<view class="margin-left text-xl">
				<text class="cuIcon-notification"></text>
				<text class="text-bold margin-lr-xs">通知公告</text>
				<text class="text-lg">实验室管理系统又炸啦!</text>
			</view>
			<view class="margin-right more">查看更多<text class="cuIcon-playfill"></text></view>
		</view>
		<view class="padding-bottom bg-white">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold text-xl">我的</text>
				</view>
				<view class="action more" @click="mineClick()">{{mineShow ? "收起" : "展开"}}<text class="cuIcon-playfill"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border" v-show="mineShow">
				<view class="cu-item" v-for='(item,index) in mine' :key='index' @click="navTo(item.soure)">
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
				<view class="action more" @click="functionClick">{{functionshow ? "收起" : "展开"}}<text class="cuIcon-playfill"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border" v-show="functionshow">
					<view class="cu-item" v-for='(item,index) in functionList' :key='index' @click="navTo(item.soure)">
						<view>
							<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
						</view>
						<text>{{item.text}}</text>
					</view>
			</view>
		</view>
		<view style="height: 100rpx;">
			<view class="cu-bar tabbar bg-white foot">
				<view v-for="(item,index) in tabInfo" class="action" :key="index" @click="navTo(item.nav)">
					<view :class="{'text-blue':index === 0}">
						<text :class="item.icon"></text>
						<text class="text-lg">{{item.text}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
		},
		data() {
			return {
				swiperList: {
					img1: "https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg",
					img2: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
					img3: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"
				},
				mine: [{
						image: "../../static/needToDo.png",
						text: "我的待办" ,
						soure: "../roomApplication/v1/list"
					},
					{
						image: "../../static/myJoint.png",
						text: "我的参与",
						soure: ""
					},
					{
						image: "../../static/myApplication.png",
						text: "我的申请",
						soure: "../roomApplication/v1/list"
					},
					{
						image: "../../static/labList.png",
						text: "待开发",
						soure: ""
					},
				],
				functionList: [{
						image: "../../static/labList.png",
						text: "查看实验室",
						soure: "../roomApplication/v1/labList"
					},
					{
						image: "../../static/labAppointment.png",
						text: "申请实验室",
						soure: "../roomApplication/v1/create"
					},
					{
						image: "../../static/labList.png",
						text: "所有申请",
						soure: "../roomApplication/v1/alllist"
					},
					{
						image: "../../static/labList.png",
						text: "功能待开发",
						soure: ""
					},
				],
				tabInfo: [{
						icon: 'cuIcon-home',
						text: '主页',
						nav: ''
					},
					{
						icon: 'cuIcon-notice',
						text: '通知公告',
						nav: ''
					},
					{
						icon: 'cuIcon-notice',
						text: '待开发',
						nav: ''
					},
					{
						icon: 'cuIcon-my',
						text: '我的',
						nav: '../profile/profile'
					}
				],
				mineShow: true,
				functionshow: true
			}
		},
		methods: {
			functionClick(){
				this.functionshow = !this.functionshow;
			},
			mineClick() {
				this.mineShow = !this.mineShow;
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.more {
		color: rgb(0, 167, 244);
	}
</style>

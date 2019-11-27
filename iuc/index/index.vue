<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">实验室管理系统</block>
		</cu-custom>
		<swiper autoplay="true" indicator-dots="true" indicator-active-color="white" indicator-color="grey" class="margin-tb margin-lr radius padding-lr">
			<swiper-item v-for='(item,index) in swiperList' :key='index'>
				<image class="radius" :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="bg-white flex margin-bottom padding-tb-xs justify-between align-center">
			<view class="margin-left-sm text-xl">
				<text class="cuIcon-notification"></text>
				<text class="text-bold margin-lr-xs">通知公告</text>
				<text class="text-lg">实验室管理系统又炸啦!</text>
			</view>
			<view class="margin-right-xs more">查看更多<text class="cuIcon-playfill"></text></view>
		</view>
		<view>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="text-bold">我的</text>
				</view>
				<view class="action more">收起<text class="cuIcon-playfill"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for='(item,index) in mine' :key='index'>
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
					<text class="text-bold">功能</text>
				</view>
				<view class="action more">收起<text class="cuIcon-playfill"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for='(item,index) in functionList' :key='index'>
					<view>
						<image :src="item.image" class="cu-avatar bg-white lg" mode="aspectFit"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;">
			<view class="cu-bar tabbar bg-white foot">
				<view v-for="(item,index) in tabInfo" class="action" :key="index">
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
		onLoad() {},
		data() {
			return {
				swiperList: {
					img1: "https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg",
					img2: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
					img3: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"
				},
				mine: [{
						image: "../../static/needToDo.png",
						text: "我的代办"
					},
					{
						image: "../../static/myJoint.png",
						text: "我的参与"
					},
					{
						image: "../../static/myApplication.png",
						text: "我的申请"
					},
					{
						image: "../../static/labList.png",
						text: "待开发"
					},
				],
				functionList: [{
						image: "../../static/labList.png",
						text: "查看实验室"
					},
					{
						image: "../../static/labAppointment.png",
						text: "申请实验室"
					},
					{
						image: "../../static/labList.png",
						text: "功能待开发"
					},
					{
						image: "../../static/labList.png",
						text: "功能待开发"
					},
				],
				tabInfo:[
					{
						icon: 'cuIcon-home',
						text: '主页',
						nav:''
					},
					{
						icon: 'cuIcon-notice',
						text: '通知公告',
						nav:''
					},
					{
						icon: 'cuIcon-notice',
						text: '待开发',
						nav:''
					},
					{
						icon: 'cuIcon-my',
						text: '我的',
						nav:''
					}
				]
			}
		}
	}
	methods: {

	}
</script>

<style lang="scss">
	.more {
		color: rgb(0, 167, 244);
	}
</style>

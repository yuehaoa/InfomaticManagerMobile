<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">实验室管理系统</block>
		</cu-custom>
		<swiper autoplay="true" indicator-dots="true" indicator-active-color="white" indicator-color="grey" class="margin">
			<swiper-item v-for='(item,index) in swiperList' :key='index'>
				<image class="swiper-image" :src="item"></image>
			</swiper-item>
		</swiper>
		<view class="notice bg-white padding" style="height:25rpx">
			<view class="text-lg">
				<text class="text-gray cuIcon-notification padding-right"></text>
				<text class="text-bold">通知公告</text>
			</view>
			<view class="more text-lg">查看更多<text class="cuIcon-playfill"></text></view>
		</view>
		<view class="padding bg-white">
			<view class="notice">
				<view class="text-lg">
					<text class="text-bold">我的</text>
				</view>
				<view class="more text-lg">收起<text class="cuIcon-playfill"></text></view>
			</view>
			<view class="cu-list grid col-4 no-border">
				<view class="cu-item" v-for='(item,index) in myList' :key='index'>
					<view>
						<image :src="item.image" class="cu-avatar lg" mode="aspectFit"></image>
					</view>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="padding bg-white">
				<view class="notice">
					<view class="text-lg">
						<text class="text-bold">功能</text>
					</view>
					<view class="more text-lg">收起<text class="cuIcon-playfill"></text></view>
				</view>
					<view class="cu-list grid col-4 no-border">
							<view class="cu-item" v-for='(item,index) in functionList' :key='index'>
								<view><image :src="item.image" class="cu-avatar lg" mode="aspectFit"></image></view>
								<text class="txt">{{item.text}}</text>
							</view>
					</view>
			</view>
			<view>
				<view class="nav text-center bg-white" style="position: fixed; bottom: 0; width: 100%;height: 100rpx;">
					<view class="cu-bar tabbar bg-white flex">
						<view class="action" @click="navToTest">
							<view class="flex-sub">
								<text class="cuIcon-home"></text>
								<text class="text-lg">主页</text>
							</view>
						</view>
						<view class="action">
							<view class="flex-sub">
								<text class="cuIcon-notice"></text>
								<text class="text-lg">通知公告</text>
							</view>
						</view>
						<view class="action">
							<view class="flex-sub">
								<text class="cuIcon-notice"></text>
								<text class="text-lg">待开发</text>
							</view>
						</view>
						<view class="action" @click="navToProfile">
							<view class="flex-sub">
								<text class="cuIcon-my"></text>
								<text class="text-lg">我的</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.navigateTo({
				url:'./testEntry'
			})
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 400rpx;
		.swiper-image {
			height: 400rpx;
			width: 750rpx;
			border-radius: 15rpx;
		}
	}
	.more{
		color: rgb(0, 167, 244);
	}
</style>

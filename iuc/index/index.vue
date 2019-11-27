<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">实验室管理系统</block>
		</cu-custom>
		<swiper autoplay="true" indicator-dots="true" indicator-active-color="white"indicator-color="grey" class="margin">
			<swiper-item v-for='(item,index) in swiperList' :key='index'>
				<image class="swiper-image" :src="item"></image>
			</swiper-item>
		</swiper>
		<view class="notice bg-white padding" style="height:25rpx">
			<view class="text-lg">
				<text class="text-gray cuIcon-notification padding-right"></text>
				<text class="text-bold">通知公告</text>
			</view>
			<view class="more text-lg" @tap="">查看更多<text class="cuIcon-playfill"></text></view>
		</view>
		<view class="padding bg-white" style="margin:20rpx 0">
			<view class="notice">
				<view class="text-lg">
					<text class="text-bold">我的</text>
				</view>
				<view class="more text-lg" @tap="">收起<text class="cuIcon-playfill"></text></view>
			</view>
			<view class="s_menu">
					<view class="item" v-for='(item,index) in myList' :key='index'>
						<image :src="item.image" class="image round"></image>
						<text class="txt">{{item.text}}</text>
					</view>
			</view>
		</view>
		<view class="padding bg-white">
				<view class="notice">
					<view class="text-lg">
						<text class="text-bold">功能</text>
					</view>
					<view class="more text-lg" @tap="">收起<text class="cuIcon-playfill"></text></view>
				</view>
					<view class="s_menu">
							<view class="item" v-for='(item,index) in functionList' :key='index'>
								<image :src="item.image" class="image"></image>
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
		},
		data() {
			return {
				swiperList:{
					img1:"https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg",
					img2:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
					img3:"https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg"
					},
					myList:{
						my1:{image:"../../static/needToDo.png",text:"我的代办"},
						my2:{image:"../../static/myJoint.png",text:"我的参与"},
						my3:{image:"../../static/myApplication.png",text:"我的申请"},
						my4:{image:"../../static/labList.png",text:"待开发"},
					},
					functionList:{
						func1:{image:"../../static/labList.png",text:"查看实验室"},
						func2:{image:"../../static/labAppointment.png",text:"申请实验室"},
						func3:{image:"../../static/labList.png",text:"功能待开发"},
						func4:{image:"../../static/labList.png",text:"功能待开发"},
					}
				}
			},
		methods: {
			navToTest(){
				uni.navigateTo({
					url:"./testEntry"
				})
			},
			navToProfile(){
				uni.navigateTo({
					url:"../profile/profile"
				})
			}
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
.notice {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-between;
	}
	.s_menu {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		margin-top: 15px;
		padding-left: 8rpx;
		padding-right: 8rpx;
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width:80px;
			.image {
				width: 50px;
				height: 50px;
			}
			.txt {
				margin-top: 5px;
				font-size: 15px;
				color: rgba(51, 51, 51, 1);
			}
		}
	}
</style>

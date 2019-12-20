<template>
	<view class="padding">
		<view class="shadow shadow-lg bg-white bg-color">
			<view class="flex padding-lr justify-between align-center padding-tb-xs">
				<view class="logo" :style="{ backgroundImage: `url('${icon}')`}"></view>
				<view class="text-xxl text-white">{{lab.RoomCode}}</view>
			</view>
			<view class="text-black bg-gray padding-tb text-center">
				<text class="text-bold text-xxl">{{lab.Name}}</text>
			</view>
			<view class="flex justify-between text-white padding-lr padding-tb-xs text-center">
				<view>{{`责任人: ${lab.Administrator} ${lab.AdminTelephone}`}}</view>
				<view class="text-xl" v-if="displayArrow">
					<text class="cuIcon-roundright"></text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				icon: '../../static/Informatic.png',
			}
		},
		props:{
			lab:{
				required: true
			},
			displayArrow:{
				type: Boolean
			},
			color:""
		},
		methods:{
			labDetail(id) {
				uni.navigateTo({ 
					url: './roomDetail?id=' + id
				})
			}
		}
	}	
</script>

<style>
	.bg-color{
		background-color:#6d3b5e;
		border-top-left-radius: 48rpx;
		border-bottom-right-radius: 48rpx;
	}
	.logo{
		width: 300rpx;
		height: 60rpx;
		background-size: cover;
	}
</style>
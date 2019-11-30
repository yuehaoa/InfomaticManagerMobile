<template>
	<view class="padding">
		<view class="shadow shadow-lg bg-white bg-color">
			<view class="flex padding-lr justify-between align-center padding-tb-sm">
				<view class="logo" :style="{ backgroundImage: `url('${icon}')`}"></view>
				<view class="text-xl text-white">{{`${lab.Building.SubCampus} ${lab.Building.Name}`}}</view>
			</view>
			<view class="text-black bg-gray padding-tb text-center">
				<view><text class="text-bold text-xxl">{{lab.Name}}</text></view>
				<view><text class="text-sm">Software Engineering Lab</text></view>
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
				icon: '../../../static/Informatic.png',
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
		border-top-left-radius: 12%;
		border-bottom-right-radius: 12%;
	}
	/*.title{
		background-color:#E7EBED;
		height:65px;
	}*/
	.logo{
		width: 300rpx;
		height: 60rpx;
		background-size: cover;
	}
</style>
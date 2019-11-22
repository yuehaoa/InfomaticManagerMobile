<template>
		<view class="padding-sm">
			<view class="shadow shadow-lg  radius  bg-white">
				<view :class="color">
				<view class="flex padding-lr solid-bottom justify-between align-center padding-tb-xs">
					<view class="cu-avatar round lg" :style="{ backgroundImage: `url('${icon}')` }"></view>
					<view class="text-xl text-white">{{`${lab.Building.SubCampus} ${lab.Building.Name}`}}</view>
				</view>
				<view class="text-sl text-white flex justify-center padding-sm">
					{{lab.Name}}
				</view>
				<view class="flex flex-wrap text-white text-df margin-sm">
					<view class="basis-xl">管理员:{{lab.Administrator}}</view>
					<view class="basis-xl padding-bottom-xs">管理员联系电话:{{lab.AdminTelephone}}</view>
					<view class="basis-xs text-xl padding-bottom-xs":style="{display:arrowDisplay}">
						<text class="cuIcon-roundright text-xxl" style="float: right;display: block;"></text>
					</view>
				</view>
				</view>
			</view>
		</view>
</template>
<script>
	export default{
		data(){
			return{
				icon: '../../../static/XMU.png',
			}
		},
		props:{
			lab:{
				required: true
			},
			arrowDisplay:"",
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
</style>
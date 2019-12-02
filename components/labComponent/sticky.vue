<template>
	<view class="cu-card">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg">{{item.Owner.substr(0,1)}}</view>
					<view class="content flex-sub">
						<view class="text-black text-lg">
							<view class="text-cut text-xl">{{item.Owner}}提交的实验室申请</view>
							<!--view class="cu-tag round sm" :class="'bg-' + wColor[item.State]">{{ workflow[item.State] }}</view-->
						</view>
						<view class="text-gray">
							<view class="text-cut padding-tb-xs" style="line-height: 36rpx;">
								<text>申请时段：{{item.StartDate.slice(5)}}-{{item.EndDate.slice(5)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: "stiky",
			item: {
				required: true
			}
		}
	}
</script>

<style>
</style>

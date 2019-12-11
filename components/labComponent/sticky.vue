<template>
	<view class="cu-list menu-avatar">
		<view class="cu-item">
			<view class="cu-avatar round lg">{{item.Owner.substr(0,1)}}</view>
			<view class="content flex-sub">
				<view class="text-black text-lg">
					<view class="text-cut text-xl">{{item.Owner}}提交的{{item.WorkflowName}}</view>
					<!--view class="cu-tag round sm" :class="'bg-' + wColor[item.State]">{{ workflow[item.State] }}</view-->
				</view>
				<view class="text-gray">
					<view class="text-cut padding-tb-xs" style="line-height: 36rpx;">
						<text>到达时间：{{item.ArriveOn}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: "sticky",
			item: {
				required: true
			}
		}
	}
</script>

<style>
</style>

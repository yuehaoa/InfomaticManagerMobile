<template>
	<view>
		<view class="cu-timeline" v-for="(item, index) in timeline" :key="index">
			<view class="cu-time">{{item.Key}}</view>
			<view class="cu-item" :class="'text-'+stepColor[v.State]" v-for="(v,k) in item.steps" :key="k">
				<view class="content">
					<view class="cu-capsule radius">
						<view class="cu-tag" :class="'bg-' + stepColor[v.State]">{{ v.ExecutorName }}{{ stepInfo[v.State] }}</view>
						<view class="cu-tag" :class="'line-'+stepColor[v.State]">{{ v.Time }}</view>
					</view>
					<view class="margin-top">{{v.StepName}}</view>
				</view>
				<view class="text-grey text-sm margin-top">
					<template v-if="inStep([0, 1], v.State)">
						{{ v.ExecutorName ? `${v.ExecutorName} 正在进行中` : "正在等待接手" }}
					</template>
					<template v-else-if="inStep([2, 3], v.State)">
						由{{ v.Operator }}于{{ v.CreatedOn }}完成
					</template>
					<template v-else>
						由{{ v.Operator }}于{{ v.CreatedOn }}取消
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let enums = require("../../iuc/roomApplication/enumsv1.js");
	export default {
		name: "labTimeLine",
		props: {
			timeline: {
				required: true
			}
		},
		data() {
			return {
				stepColor: ['blue', 'blue', 'green', 'green', 'red'],
				stepInfo: enums.stepInfo,
			}
		},
		methods: {
			inStep(steps, state) {
				let s = state;
				return steps.indexOf(s) > -1;
			}
		}
	}
</script>

<style>

</style>

<template>
	<scroll-view scroll-x class="cu-steps margin-tb response">
		<view class="cu-item padding-lr" :class="item.color" v-for="(item, index) in steps" :key="item.id">
			<text class="num" :class="item.icon" :data-index="index + 1"></text>
			<text class="step-name">{{item.stepName}}</text>
		</view>
	</scroll-view>
</template>

<script>
	let stp = require("../../iuc/roomApplication/stepsv1.js")
	export default {
		name: "LabStepInfo",
		props: {
			value: {
				required: true,
				type: Array,
				default: () => {}
			}
		},
		data() {
			return {
				colorDic: {
					0: '',
					10: 'text-cyan',
					20: 'text-blue',
					30: 'text-red'
				},
				iconDic:{
					0:'',
					10: 'loading',
					20: '',
					30: 'err'
				},
				steps: []
			};
		},
		watch: {
			value: {
				deep: true,
				immediate: true,
				handler(value) {
					this.steps = this.value.map(value => {
						value.icon=this.iconDic[value.status];
						value.color=this.colorDic[value.status];
						return value;
					})
				}
			}
		},
	}
</script>

<style>
	.cu-steps .cu-item[class*="text-"] .num.loading::after {
		content: "\e74f";
	}
	.cu-steps .cu-item .step-name {
		width: 6em;
		display: inline-block;
		overflow: hidden;
	}
</style>

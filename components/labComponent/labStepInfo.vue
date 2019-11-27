<template>
	<view class="cu-steps margin-top">
		<view class="cu-item" :class="item.color" v-for="(item, index) in steps" :key="item.id">
			<text class="num" :class="item.icon" :data-index="index + 1"></text>
			{{item.name}}
		</view>
	</view>
</template>

<script>
	let stp = require("../../iuc/roomApplication/stepsv1.js")
	export default {
		name: "LabStepInfo",
		props: {
			value: {
				required: true,
				type: Object, 
				default: () => {}
			}
		},
		data() {
			let steps = JSON.parse(JSON.stringify(stp));
			return {
				steps,
				bindSteps: []
			};
		},
		watch: {
			value: {
				deep: true,
				immediate: true,
				handler(value) {
					let steps = this.steps;

					let isComplete = (v) => {
						if (v === 20) return "text-blue";
						if (v === 30) return "text-red";
						if (v === 10) return "text-cyan";
						return "";
					};
					steps[0].color = isComplete(value.ApplicateState);//填写申请表
					if(value.ApplicateState === 30)steps[0].icon="err";
					else if(value.ApplicateState === 10)steps[0].icon="loading";

					steps[1].color = isComplete(value.GuideTeacherState);//指导老师审核
					if(value.GuideTeacherState === 30)steps[1].icon="err";
					else if(value.GuideTeacherState === 10)steps[1].icon="loading";

					steps[2].color = isComplete(value.ReviewState);//主管审核
					if(value.ReviewState === 30)steps[2].icon="err";
					else if(value.ReviewState === 10)steps[2].icon="loading";

					steps[3].color = isComplete(value.HandleState);//管理员确认
					if(value.HandleState === 30)steps[3].icon="err";
					else if(value.HandleState === 10)steps[3].icon="loading";
				}
			}
		}
	}
</script>

<style>
.cu-steps .cu-item[class*="text-"] .num.loading::after
{
	content: "\e74f";
}
</style>

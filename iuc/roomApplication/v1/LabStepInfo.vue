<template>
	<view class="cu-steps margin-top">
		<view class="cu-item" :class="item.finalState" v-for="(item, index) in steps" :key="item.id">
			<text class="num" :class="item.err" :data-index="index + 1"></text>
			{{item.name}}
		</view>
	</view>
</template>

<script>
	let stp = require("../stepsv1.js")
	export default {
		name: "LabStepInfo",
		props: {
			value: {
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

					let tb = "text-blue",
						err = "err";

					let steps = this.steps;
					//steps[0].FinalState = value.State > 0 ? tb : "";
					//steps[0].err = "";

					let isComplete = (v) => {
						if (v === 20) return tb;
						if (v === 30) return "text-red";
						return "";
					};
					steps[0].finalState = isComplete(value.ApplicateState);
					steps[0].err = value.ApplicateState === 30 ? err : ""; //填写申请表

					steps[1].finalState = isComplete(value.GuideTeacherState);
					steps[1].err = value.GuideTeacherState === 30 ? err : ""; //指导老师审核

					steps[2].finalState = isComplete(value.ReviewState);
					steps[2].err = value.ReviewState === 30 ? err : ""; //分管领导分配

					steps[3].finalState = isComplete(value.HandleState);
					steps[3].err = value.HandleState === 30 ? err : ""; //管理员确认

				}
			}
		}
	}
</script>

<style>
</style>

<template>
	<view class="cu-steps margin-top">
		<view class="cu-item" :class="item.FinalState" v-for="(item, index) in steps" :key="item.id">
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
		data () {
			let steps = JSON.parse(JSON.stringify(stp));
			console.log(steps);
			return {
				steps,
				bindSteps: []
			};
		},
		watch: {
			value: {
				deep: true,
				immediate: true,
				handler (value) {
					console.log(value);
					let tb = "text-blue", err = "err";
					let steps = this.steps;
					steps[0].FinalState = value.State > 0 ? tb : "";
					steps[0].err = "";
					
					let isComplete = (v) => {
						if (v === 20) return tb;
						if (v === 30) return "text-red";
						return "";
					};
					steps[1].FinalState = isComplete(value.ReviewState);
					steps[1].err = value.ReviewState === 30 ? err : "";
					
					steps[2].FinalState = isComplete(value.HandleState);
					steps[2].err = value.HandleState === 30 ? err : "";
					
					steps[3].FinalState = isComplete(value.CheckState);
					steps[3].err = value.CheckState === 30 ? err : "";
				}
			}
		}
	}
</script>

<style>
</style>

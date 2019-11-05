<template>
	<view id="application-detail">
		<cu-custom bgColor="bg-gradual-blue" :isBack="'/iuc/softwareInstall/v1/list'">
			<block slot="backText">返回</block>
			<block slot="content">软件安装申请表</block>
		</cu-custom>
		<stepInfo v-model="model" />
		<view class="action-list cu-list grid col-2 margin-top">
			<view class="cu-item" @click="changeState()">
				<view class="text-blue" :class="state === 'detail' ? 'cuIcon-timefill' : 'cuIcon-form'"></view>
				<text>{{ state === 'detail' ? '流程跟踪' : "查看申请表" }}</text>
			</view>
			<view class="cu-item" v-if="!currentStep.completed && (isAdmin || isMyStep)" @click="exeStep()">
				<view class="cuIcon-qrcode text-blue"></view>
				<text>执行步骤</text>
			</view>
		</view>
		<view v-show="state === 'detail'" class="margin-tb">
			<view class="cu-form-group">
				<view class="title">申请人</view>
				<input :value="model.owner" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input :value="model.telephone" disabled />
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">所属部门</view>
				<input :value="model.belongDepart" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">申请时间</view>
				<input disabled="true" :value="model.createdTime"></input>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">选择实验室</view>
				<input :value="model.roomName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">待装软件</view>
				<input :value="model.applicationName" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">软件版本</view>
				<input :value="model.version || '未设置'" disabled />
			</view>
			<view class="cu-form-group">
				<view class="title">下载地址</view>
				<input :value="model.download || '未设置'" disabled />
			</view>
			<view class="margin-top" v-if="model.reviewOpinion">
				<view class="cu-form-group">
					<view class="title">安装人</view>
					<input :value="model.handlerName || '未设置'" disabled />
				</view>
				<view class="cu-form-group">
					<view class="title">维修部意见</view>
					<input :value="model.reviewOpinion || '未设置'" disabled />
				</view>
			</view>
			<view class="margin-top" v-if="model.handleOpinion">
				<view class="cu-form-group">
					<view class="title">安装意见</view>
					<input :value="model.handleOpinion || '未设置'" disabled />
				</view>
				<view class="cu-form-group">
					<view class="title">安装时间</view>
					<input :value="model.handleTime || '未设置'" disabled />
				</view>
			</view>
			<view class="margin-top" v-if="model.checkOpinion">
				<view class="cu-form-group">
					<view class="title">确认人</view>
					<input :value="model.checker || '未设置'" disabled />
				</view>
				<view class="cu-form-group">
					<view class="title">确认意见</view>
					<input :value="model.checkOpinion || '未设置'" disabled />
				</view>
				<view class="cu-form-group">
					<view class="title">确认时间</view>
					<input :value="model.checkTime || '未设置'" disabled />
				</view>
			</view>
		</view>
		<view v-show="state === 'timeline'" class="margin-top">
			<view class="cu-timeline" v-for="(item, index) in timeline" :key="index">
				<view class="cu-time">{{item.key}}</view>
				<view class="cu-item" :class="'text-' + stepColor[v.state]" v-for="(v, k) in item.steps" :key="k">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag" :class="'bg-' + stepColor[v.state]">{{ v.executorName }}{{ stepInfo[v.state] }}</view>
							<view class="cu-tag" :class="'line-' + stepColor[v.state]">{{v.time}}</view>
						</view>
						<view class="margin-top">
							{{v.stepName}}
						</view>
						<view class="text-grey text-sm margin-top">
							<template v-if="InStep([0, 1], v.state)">
								{{ v.executorName ? `${v.executorName} 正在进行中` : "正在等待接手" }}
							</template>
							<template v-else-if="[2, 3]">
								由{{ v.operator }}于{{ v.createdOn }}完成
							</template>
							<template v-else>
								由{{ v.operator }}于{{ v.createdOn }}取消
							</template>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import stepInfo from './StepInfo.vue'
	let guidEmpty = '00000000-0000-0000-0000-000000000000';
	let enums = require("../enumsv1.js");
	let app = require("@/config");
	export default {
		components: { stepInfo },
		onLoad (opt) {
			this.id = opt.id;
			this.getData();
		},
		methods: {
			getData () {
				let id = this.id;
				if (!id || id === guidEmpty) {
					uni.navigateTo({
						url: '/iuc/softwareInstall/v1/list'
					})
					return;
				}
				uni.post("/api/installApp/v1/GetApplication", {id}, msg => {
					this.model = msg.data;
					this.timeline = msg.timeline;
					this.currentStep = msg.currentStep;
					this.isMyStep = msg.currentStep.IsMyStep;
				})
			},
			changeState () {
				this.state = this.state === "detail" ? "timeline" : "detail";
			},
			exeStep () {
				uni.navigateTo({
					url: this.currentStep.toAction
				})
			},
			inStep(steps, state) {
				let s = state || this.model.state;
				return steps.indexOf(s) > -1;
			}
		},
		data () {
			return {
				id: guidEmpty,
				isLoading: false,
				isAdmin: app.checkPermission("ItemManager.ManageAllSoftwareInstallWorkflow"),
				isMyStep: false,
				model: {},
				timeline: [],
				currentStep: {},
				stepInfo: enums.stepInfo,
				stepColor: ['blue', 'blue', 'green', 'green', 'red'],
				state: "detail"
			};
		}
	}
</script>

<style lang='less'>
	#application-detail {
		view .title {
			width: 6em;
		}
	}
</style>

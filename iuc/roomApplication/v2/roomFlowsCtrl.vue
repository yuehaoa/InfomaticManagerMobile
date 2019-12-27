<template>
	<view>
		<cu-custom bgColor="bg-informatic-brown" isBack>
			<block slot="backText">返回</block>
			<block slot="content">申请表</block>
		</cu-custom>
		<lab-Steps :value="io.allSteps"></lab-Steps>

		<form>
			<view class="cu-bar bg-white solids-bottom">
				<view class="action text-xl">
					<text class="cuIcon-title text-blue text-xl"></text>
					<text class="text-bold text-xl">团队申请实验室</text>
				</view>
			</view>
			<view class="form1">
				<view class="cu-form-group" v-show="io.fieldAccess.Owner">
					<view class="title">申请人名称</view>
					<input placeholder="请输入申请人名称" v-model="io.data.Owner" :disabled="io.fieldAccess.Owner==='r'||!io.isMyStep"></input>
				</view>
				<view class="cu-form-group" @click="selectDateTime(io.fieldAccess.StartDate)" v-show="io.fieldAccess.StartDate">
					<view class="title">申请时段</view>
					<text style="flex: 1;">{{!io.data.StartDate?"请选择申请时段"
					:io.data.StartDate+'&nbsp;至&nbsp;'+io.data.EndDate}}</text>
				</view>
				<view class="cu-form-group" v-show="io.fieldAccess.Telephone">
					<view class="title">申请人电话</view>
					<input placeholder="请输入申请人电话" v-model="io.data.Telephone" :disabled="io.fieldAccess.Telephone==='r'||!io.isMyStep"></input>
				</view>
				<view class="cu-form-group" v-show="io.fieldAccess.ApplicationReason">
					<view class="title">申请事由</view>
					<input placeholder="请输入申请事由" v-model="io.data.ApplicationReason" :disabled="io.fieldAccess.ApplicationReason==='r'||!io.isMyStep"></input>
				</view>
				<view class="cu-form-group" v-show="io.fieldAccess.RoomId">
					<view class="title">房间号</view>
					<picker mode="multiSelector" :range='[assistInfo.buildings,assistInfo.roomTemp]' range-key="Name" @columnchange="selectBuilding"
					 @change="selectRoom" :value="assistInfo.roomIndex" :disabled="io.fieldAccess.RoomId!=='w'||!io.isMyStep">
						<view>
							{{roomDic[io.data.RoomId]}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group" v-show="io.fieldAccess.GuideTeacherId&&isStudent">
					<view class="title">指导老师</view>
					<picker :range="assistInfo.teachers" range-key="RealName" @change="selectTeacher" :disabled="io.fieldAccess.GuideTeacherId!=='w'||!io.isMyStep">
						<view class="content">
							{{assistInfo.guideTeacherName}}
						</view>
					</picker>
				</view>
			</view>
			<view class="cu-bar bg-white solids-bottom margin-top" v-show="io.fieldAccess.GuideTeacherOpinion">
				<view class="action text-xl">
					<text class="cuIcon-title text-blue text-xl"></text>
					<text class="text-bold text-xl">指导老师审核</text>
				</view>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.GuideTeacherOpinion">
				<view class="title">指导老师审核意见</view>
				<input v-model="io.data.GuideTeacherOpinion" :disabled="io.fieldAccess.GuideTeacherOpinion!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.GuideTeacher">
				<view class="title">指导老师姓名</view>
				<input v-model="io.data.GuideTeacher" :disabled="io.fieldAccess.GuideTeacher!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.GuideTeacherTime">
				<view class="title">审核时间</view>
				<input v-model="io.data.GuideTeacherTime" :disabled="io.fieldAccess.GuideTeacherTime!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-bar bg-white solids-bottom margin-top" v-show="io.fieldAccess.ReviewOpinion">
				<view class="action text-xl">
					<text class="cuIcon-title text-blue text-xl"></text>
					<text class="text-bold text-xl">管理组老师审核</text>
				</view>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.ReviewOpinion">
				<view class="title">管理组审核人意见</view>
				<input v-model="io.data.ReviewOpinion" :disabled="io.fieldAccess.ReviewOpinion!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.Reviewer">
				<view class="title">管理组审核人名称</view>
				<input v-model="io.data.Reviewer" :disabled="io.fieldAccess.Reviewer!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.ReviewTime">
				<view class="title">审核时间</view>
				<input v-model="io.data.ReviewTime" :disabled="io.fieldAccess.ReviewTime!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-bar bg-white solids-bottom margin-top" v-show="io.fieldAccess.Director">
				<view class="action text-xl">
					<text class="cuIcon-title text-blue text-xl"></text>
					<text class="text-bold text-xl">中心办公室审核</text>
				</view>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.Director">
				<view class="title">中心办公室主任名称</view>
				<input v-model="io.data.Director" :disabled="io.fieldAccess.Director!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.DirectorOpinion">
				<view class="title">中心办公室主任意见</view>
				<input v-model="io.data.DirectorOpinion" :disabled="io.fieldAccess.DirectorOpinion!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.ExpertOpinion">
				<view class="title">办公会意见</view>
				<input v-model="io.data.ExpertOpinion" placeholder="请填写" :disabled="io.fieldAccess.ExpertOpinion!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.DirectorTime">
				<view class="title">审核时间</view>
				<input v-model="io.data.DirectorTime" :disabled="io.fieldAccess.DirectorTime!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-bar bg-white solids-bottom margin-top" v-show="io.fieldAccess.HandlerName">
				<view class="action text-xl">
					<text class="cuIcon-title text-blue text-xl"></text>
					<text class="text-bold text-xl">实验室管理员审核</text>
				</view>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.HandlerName">
				<view class="title">实验室管理人员名称</view>
				<input v-model="io.data.HandlerName" :disabled="io.fieldAccess.HandlerName!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.HandleOpinion">
				<view class="title">实验室管理人员意见</view>
				<input v-model="io.data.HandleOpinion" :disabled="io.fieldAccess.HandleOpinion!=='w'||!io.isMyStep"></input>
			</view>
			<view class="cu-form-group" v-show="io.fieldAccess.HandleTime">
				<view class="title">审核时间</view>
				<input v-model="io.data.HandleTime" :disabled="io.fieldAccess.HandleTime!=='w'||!io.isMyStep"></input>
			</view>
		</form>
		<timePicker :show="showPicker" type="rangetime" color="#6d3b5e" @cancel="selectDateTime()" @confirm="confirmDateTime" />
		<view class="cu-bar bg-white solids-bottom margin-top">
			<view class="action text-xl">
				<text class="cuIcon-title text-blue text-xl"></text>
				<text class="text-bold text-xl">操作流程</text>
			</view>
			<view class="action" @click="foldUp">
				<text class="text-df">{{displayTimeline?'收起':'展开'}}</text>
				<text class="padding-lr-xs text-bold" :class="displayTimeline?'cuIcon-fold':'cuIcon-unfold'"></text>
			</view>
		</view>
		<labTimeLine :timeline="io.timelines" v-show="displayTimeline"></labTimeLine>
		<view v-if="io.isMyStep">
			<button class="flex-sub bg-cyan margin-top" @click="onSubmit()" v-if="io.submitBtns.length===1">{{io.submitBtns[0].Text}}</button>
			<view style="height: 180rpx; width: 100%;" v-else>
				<view class="flex-sub cu-list grid cu-bar foot" :class="['col-'+io.submitBtns.length]">
					<view v-for="(item,index) in io.submitBtns" class="cu-item" @click="onSubmit(item)" :key="index">
						<view :class="item.Icon"></view>
						<text>{{item.Text}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(opt) {
			uni.post("/api/roomApp/v1/GetRoomAndTeacher", {}, msg => {
				this.assistInfo = { ...this.assistInfo,
					...msg
				};
				let roomDic = {};
				this.assistInfo.buildings.forEach(building => {
					let buildingName = building.Name;
					building.Rooms.forEach(room => {
						roomDic[room.ID] = buildingName + '-' + room.RoomCode + '-' + room.Name;
					})
				});
				roomDic['00000000-0000-0000-0000-000000000000'] = '请选择房间号';
				this.roomDic = roomDic;
			});
			if (opt.create) {
				this.displayTimeline = false;
				uni.getStorage({
					key: 'labid',
					success: (res) => {
						let id = res.data;
						uni.post("/api/roomApp/v1/Applicate", {
							id
						}, msg => {
							this.io = msg;
							for (let role in this.io.data.OwnerRoles) {
								if (this.io.data.OwnerRoles[role] === "老师") {
									this.isStudent = false;
									break;
								}
							}
						});
					}
				})
			} else {
				uni.getStorage({
					key: 'jmpInfo',
					success: (res) => {
						uni.post("/api/workflow/LoadInstance", { ...res.data,
							detail: true
						}, msg => {
							this.io = msg;
							for (let role in this.io.data.OwnerRoles) {
								if (this.io.data.OwnerRoles[role] === "老师") {
									this.isStudent = false;
									break;
								}
							}
							if (this.io.intstanceState === 5) {
								for (let index in this.io.allSteps) {
									if (this.io.allSteps[index].status === 0) {
										this.io.allSteps[index - 1].status = 30;
										this.io.timelines[0].steps[0].State = 4;
										break;
									}
								}
							}
							for (let role in this.io.data.OwnerRoles) {
								if (this.io.data.OwnerRoles[role] === "老师") {
									this.isStudent = false;
									break;
								}
							}
						});
					}
				});
			}
		},
		methods: {
			formValidate() {
				let errors = [];
				if (this.isStudent && this.io.data.GuideTeacherId === "00000000-0000-0000-0000-000000000000" && this.io.currentStep ===
					"填写申请表") {
					errors.push("必须选择指导老师");
				}
				if (this.upLoad.Telephone !== undefined && this.io.currentStep ===
					"填写申请表") {
					var pat = new RegExp('^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$');
					if (pat.test(this.upLoad.Telephone) === false)
						errors.push("请输入正确的电话号码");
				}
				return errors;
			},
			onSubmit(item) {
				if (item) {
					this.io.data[item.Field] = item.Value;
				}
				this.io.shouldUpload.forEach(value => {
					this.upLoad[value] = this.io[value] || this.io.data[value]
				});
				let errors = this.formValidate();
				if (errors.length > 0) {
					uni.showMessage(errors[0]);
				} else {
					uni.post("/api/workflow/SubmitInstance", { ...this.upLoad
					}, msg => {
						if (msg.success === true) {
							uni.showMessage('提交成功', 1, '', 'success');
						} else {
							uni.showMessage(msg.msg);
						}
					})
				}
			},
			selectBuilding(e) {
				let column = e.detail.column
				let value = e.detail.value;
				this.assistInfo.roomTemp = this.assistInfo.buildings[value].Rooms;
			},
			selectRoom(e) {
				let index = e.detail.value[1];
				let v = this.assistInfo.roomTemp[index];
				this.io.data.RoomId = v.ID;
			},
			selectTeacher(e) {
				let u = this.assistInfo.teachers[e.detail.value];
				this.io.data.GuideTeacherId = u.ID;
				this.assistInfo.guideTeacherName = u.RealName;
			},
			selectDateTime(access) {
				if (access && access !== 'w' || !this.io.isMyStep) return;
				this.showPicker = !this.showPicker;
			},
			confirmDateTime(e) {
				this.io.data.StartDate = e.value[0];
				this.io.data.EndDate = e.value[1];
				this.selectDateTime();
			},
			foldUp() {
				this.displayTimeline = !this.displayTimeline;
			}
		},
		data() {
			var now = new Date();
			return {
				now,
				io: {
					fieldAccess: {},
					data: {},
					submitBtns: [],
					shouldUpload: [],
					allSteps: [],
					isMyStep: false,
					timelines: [],
					intstanceState: ''
				},
				assistInfo: {
					buildings: [],
					rooms: [],
					teachers: [],
					roomTemp: [],
					roomIndex: [0, 0],
					guideTeacherName: '请选择指导老师'
				},
				displayTimeline: true,
				upLoad: [],
				roomDic: {},
				teacherDic: {},
				showPicker: false,
				isStudent: true
			}
		}
	}
</script>

<style>
	.form1>view>view {
		flex-basis: 30%;
	}

	form>span>view.cu-form-group>view {
		flex-basis: 44%;
	}
</style>

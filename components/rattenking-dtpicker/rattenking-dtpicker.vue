<template>
	<picker class="uni-input" mode="multiSelector" :range="times3" :value="timesIndex" :disabled="curDisabled" @change='changeDate' @cancel="cancelDate" @columnchange="columnchangeDate">
		<view class="padding"v-if="showTime">{{curValue}}
		</view>
		<view v-else class="placeholder">{{placeholder}}</view>
	</picker>
</template>

<script>
	import GetDate from './GetDate.js';
	export default {
		name: 'rattenking-dtpicker',
		props: {
			/**
			 * picker允许选中的最小值
			 */
			start: {
			  type: String,
			  default: '1900-00-00 00:00'
			},
			/**
			 * picker允许选中的最大值
			 */
			end: {
			  type: String,
			  default: '2500-12-30 23:59'
			},
			/**
			 * picker默认展示的值
			 */
			value: {
			  type: String,
			  default: ''
			},
			placeholder: {
				type: String,
				default () {
					return ''
				}
			},
			/**
			 * picker的时间粒度
			 */
			fields: {
			  type: String,
			  default: 'minute'
			},
			/**
			 * picker是否禁止
			 */
			disabled: {
			  type: Boolean,
			  default: false
			}
		},
		data() {
			return {
				times:[['2019','2020'],['01','02']],
				timesIndex: [1,1],
				timesString: null,
				curValue: this.value2,
				curDisabled: this.disabled,
				cancel: null,
				showTime: false,
				curValue2:[],
				curValue3:[],
				value2:'',
				times3:[]//这个是用来只取times的前三个元素
			}
		},
		watch: {
			value(val) {
				this.curValue = val;
				
			},
			disabled(val){
				this.curDisabled = val;
			},
			curDisabled(val){
				this.curDisabled = val;
			},
			curValue(val) {
				this.curValue = val;
				this.$emit('change', val);
			},
			times(val){
				var i=0;
				var l=0;
				var k=0;
				var j=0;
				var x=0;
				this.times = val;
				for(i=0;i<this.times[0].length;i++)this.times[0][i]=this.times[0][i]+' 年'
				for(j=0;j<this.times[1].length;j++)this.times[1][j]=this.times[1][j]+' 月'
				for(k=0;k<this.times[2].length;k++)this.times[2][k]=this.times[2][k]+' 日'
				for(l=0;l<this.times[3].length;l++)this.times[3][l]=this.times[3][l]+' 时'
				for(x=0;x<this.times[4].length;x++)this.times[4][x]=this.times[4][x]+' 分'
				this.times3[0]=this.times[0];
				this.times3[1]=this.times[1];
				this.times3[2]=this.times[2];
				this.times3[3]=this.times[3];
				this.times3[4]=this.times[4];
			},
			timesIndex(val){
				this.timesIndex = val;
			},
			cancel(val) {
				this.$emit('cancel', val);
			}
		},
		created() {
			if(this.value2 === ''){
				let time = GetDate.getCurrentTimes();
				let arr = [];
				for (let key in time.detail) {
					arr.push(time.detail[key]);
					if(key === this.fields){
						break;
					}
				}
				this.value2 = GetDate.format(arr);
				this.curValue = GetDate.format(arr);
			}
			switch (this.fields){
				case 'year':
				  if (this.value2.length !== 4) {GetDate.error('时间粒度和时间格式不一致');this.curDisabled = true;return false;}
				  if (this.start.length !== 4) { GetDate.error('时间粒度和开始时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.end.length !== 4) { GetDate.error('时间粒度和结束时间格式不一致'); this.curDisabled = true; return false;}
				  break;
				case 'month':
				  if (this.value2.length !== 7) { GetDate.error('时间粒度和时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.start.length !== 7) { GetDate.error('时间粒度和开始时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.end.length !== 7) { GetDate.error('时间粒度和结束时间格式不一致'); this.curDisabled = true; return false;}
				  break;
				case 'day':
				  if (this.value2.length !== 10) { GetDate.error('时间粒度和时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.start.length !== 10) { GetDate.error('时间粒度和开始时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.end.length !== 10) { GetDate.error('时间粒度和结束时间格式不一致'); this.curDisabled = true; return false;}
				  break;
				case 'hour':
				  if (this.value2.length !== 13) { GetDate.error('时间粒度和时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.start.length !== 13) { GetDate.error('时间粒度和开始时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.end.length !== 13) { GetDate.error('时间粒度和结束时间格式不一致'); this.curDisabled = true; return false;}
				  break;
				case 'minute':
				  if (this.value2.length !== 16) { GetDate.error('时间粒度和时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.start.length !== 16) { GetDate.error('时间粒度和开始时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.end.length !== 16) { GetDate.error('时间粒度和结束时间格式不一致'); this.curDisabled = true; return false;}
				  break;
				case 'second':
				  if (this.value2.length !== 19) { GetDate.error('时间粒度和时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.start.length !== 19) { GetDate.error('时间粒度和开始时间格式不一致'); this.curDisabled = true; return false;}
				  if (this.end.length !== 19) { GetDate.error('时间粒度和结束时间格式不一致'); this.curDisabled = true; return false;}
				  break;
				default: 
				  GetDate.error('时间粒度不存在')
				  break;
			  }
			  let values = this.value2.split(' ');
			  let targets = GetDate.getCurrentStringValue(this.value2);

			  if (GetDate.getTimes(this.value2) < GetDate.getTimes(this.start)){
				GetDate.error('默认时间不能小于开始时间')
				this.curDisabled = true
				return false;
			  }
			  if (GetDate.getTimes(this.value2) > GetDate.getTimes(this.end)) {
				GetDate.error('默认时间不能大于开始时间')
				this.curDisabled = true
				return false;
			  }
			  let times = GetDate.getDateTimes({
					start: this.start.substring(0, 4),
					end: this.end.substring(0, 4),
					curyear: this.value2.substring(0, 4),
					curmonth: this.value2.substring(5, 7),
					fields: this.fields
			  })
			  let timesIndex = GetDate.getTimeIndex(times, targets);
			  let timesString = [];
			  timesIndex.forEach(o => timesString.push(o));

			  this.times = times;
			  this.timesIndex = timesIndex;
			  this.timesString = timesString;
		},
		methods: {
			changeDate(e){
				this.showTime =true;
			  let values = e.detail.value;
			  let times = this.times;
			  let curarr = [];
			  for (let i = 0, len = values.length; i < len; i++) {
				curarr.push(times[i][values[i]])
			  }
			  let str = GetDate.format(curarr);
			  this.curValue = str;
			  this.changevalue(str);
			},
			columnchangeDate(e){
				// 如果是年和月粒度，那么只需要改变时间格式的index，否则需要判断当月天数
			  if ((this.fields === 'year' || this.fields === 'month')){
					let timesIndex = GetDate.getNewArray(this.timesIndex);
					timesIndex[e.detail.column] = e.detail.value;
// 					let arr = GetDate.getCompare(GetDate.format(GetDate.getChooseArr(this.times,timesIndex)),this.start,this.end,this.times);

					this.timesIndex = timesIndex;
					return false;
			  }else{
					// 如果改变的是年和月，重新获取天数，同时判断天数的index是否大于当前天数，大于就设置为当月最后一天，否则不变。
					if(e.detail.column === 0 || e.detail.column === 1){
						let times = GetDate.getNewArray(this.times);
						let timesIndex = GetDate.getNewArray(this.timesIndex);
						timesIndex[e.detail.column] = e.detail.value;
						let days = GetDate.getMonthDay(times[0][timesIndex[0]], times[1][timesIndex[1]]);
						times[2] = days;
						if(timesIndex[2] > days.length - 1){
							timesIndex[2] = days.length - 1;
						}
						this.times = times;
						// let arr = GetDate.getCompare(GetDate.format(GetDate.getChooseArr(this.times,timesIndex)),this.start,this.end,this.times);
						this.timesIndex = timesIndex;
					}else{
						let timesIndex = GetDate.getNewArray(this.timesIndex);
						timesIndex[e.detail.column] = e.detail.value;
// 						let arr = GetDate.getCompare(GetDate.format(GetDate.getChooseArr(this.times,timesIndex)),this.start,this.end,this.times);
						this.timesIndex = timesIndex;
					}
				}
			},
			cancelDate(e){
				this.showTime = false;
				this.cancel = e
			},
			changevalue(val){
				this.curValue = val;
				this.curValue=val.split(' ');
				this.curValue2=this.curValue[1].split(':');
				this.curValue2[0]=' '+this.curValue2[0]+"时";
				this.curValue2[1]=this.curValue2[1]+"分";
				this.curValue3=this.curValue[0].split('-');
				this.curValue3[0]=this.curValue3[0]+"年";
				this.curValue3[1]=this.curValue3[1]+"月";
				this.curValue3[2]=this.curValue3[2]+"日";
				this.curValue=(this.curValue3+this.curValue2).replace(",","").replace(",","").replace(",","");
			}
		}
	}
</script>

<style>
	.placeholder {
		color: #b5b8c2;
		font-size: 30rpx;
		padding:32rpx;
	}
	.cu-form-group picker::after {  
	    display: none;  
	}  
</style>

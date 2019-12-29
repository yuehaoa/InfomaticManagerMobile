<template>
	<view>
		<view>
			<cu-custom class="bg-informatic-brown" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">通讯录</block>
			</cu-custom>
		</view>
		<view class="cu-bar bg-white text-center padding-left">
			点击号码可以直接播打或者保存到通讯录。
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 290upx)">
				<view class="cu-item text-sm align-center text-center" :class="index==tabCur?'text-informatic-brown cur':''" v-for="(depart,dptName,index) in list"
				 style="display: inline-grid" :key="index" @tap="TabSelect" :data-id="index">
					{{dptName.slice(0,dptName.indexOf("("))}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 325upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(depart,dptName,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-informatic-brown"></text> {{dptName}}</view>
					</view>
					<view class="cu-list menu">
						<view class="cu-item padding-left" style="padding-top: 10rpx;padding-bottom: 10rpx" v-for="(person,index) in depart" :key="index">
							<view class="cu-avatar mid round margin-tb-sm margin-lr" :style="'background-image:url('+person.Avatar+');'"></view>
							<view class="content">
								<view class="flex justify-between">
									<view class="text-informatic-brown text-bold text-xl"><view class="justify-between">{{person.RealName}}</view></view>
									<view class="text-grey text-xs padding-right-sm">{{person.Address}}</view>
								</view>
								<view class="text-black" style="margin-bottom: -12rpx;">
									<text class="cuIcon-phone text-black" @click="toTel(person.Mobile)">{{person.Mobile}}</text>
								</view>
								<view class="text-black" v-if="person.Telephone">
									<text class="cuIcon-dianhua text-black" @click="toTel(person.Telephone)">{{person.Telephone}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<navTab :selection='2' />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				length: 0,
				keys: {}
			};
		},
		onLoad() {
			this.getData();
		},
		onReady() {

		},
		methods: {
			toTel(number) {
				window.location.href = "tel:" + number;
			},
			getData() {
				uni.post("/api/security/GetAddressBook", {}, msg => {
					let length = 0;
					for (let i in msg.data) {
						this.keys[length] = i;
						msg.data[i].id = length++;
					}
					this.list = msg.data;
					this.length = length;
				})
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.length; i++) {
						let key = this.keys[i];
						let view = uni.createSelectorQuery().select("#main-" + i);
						view.fields({
							size: true
						}, data => {
							that.list[key].top = tabHeight;
							tabHeight = tabHeight + data.height;
							that.list[key].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.length; i++) {
					let key = this.keys[i];
					if (scrollTop > this.list[key].top && scrollTop < this.list[key].bottom) {
						this.verticalNavTop = (i - 1) * 50;
						this.tabCur = i;
						return false;
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 150upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		line-height: 18px;
		position: relative;
	}
	.cu-avatar.mid {
		width: 87upx;
		height: 87upx;
		font-size: 2em;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 36upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>

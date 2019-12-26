<template>
	<view>
		<view>
			<cu-custom class="bg-informatic-brown" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">通讯录</block>
			</cu-custom>
		</view>
		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 290upx)">
				<view class="cu-item text-sm" :class="index==tabCur?'text-informatic-brown cur':''" v-for="(depart,dptName,index) in list" :key="index"
				 @tap="TabSelect" :data-id="index">
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
						<view class="cu-item" v-for="(person,index) in depart" :key="index" >
							<view class="cu-avatar round lg margin-right-sm margin-tb-sm"
							:style="'background-image:url('+person.Avatar+');'"></view>
							<view class="content">
								<view class="flex justify-between">
									<view class="text-informatic-brown text-bold text-xl">{{person.RealName}}</view>
									<view class="text-grey">{{person.Address}}</view>
								</view>
								<view class="text-grey" style="margin-bottom: -12rpx;">
									<text class="cuIcon-phone text-sm">{{person.Mobile}}</text>
								</view>
								<view class="text-grey" v-if="person.Telephone">
									<text class="cuIcon-dianhua text-sm">{{person.Telephone}}</text>
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
				load: true
			};
		},
		onLoad() {
			this.getData();
		},
		onReady() {
			
		},
		methods: {
			getData(){
				uni.post("/api/security/GetAddressBook",{},msg=>{
					this.list=msg.data;
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
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
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
		width: 200upx;
		white-space: initial;
	}
	
	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
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

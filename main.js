import Vue from 'vue'
import App from './App'

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import date from './components/dy-Date/dy-Date.vue'
Vue.component('Date',date)

let app = require("@/config");
require("./init");

import mixin from './config/mixin.js'
Vue.mixin(mixin);

import labSteps from './iuc/roomApplication/v1/LabStepInfo.vue'
Vue.component('lab-Steps',labSteps)

Vue.config.productionTip = false

App.mpType = 'app'

uni.post("/api/config/GetBasicConfig", {}, msg => {
	if (msg.success) {
		app.webInfo = msg.info;
		app.titlePerfix = " - " + app.webInfo.title;
		app.userInfo = msg.userInfo;
		let ps = app.userInfo.permissons;
		app.checkPermission = (p) => {
			return ps && ps.indexOf(p) >= 0;
		}
	}

	const vm = new Vue({
	    ...App
	})
	vm.$mount()
})

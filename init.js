let app = require("@/config");

uni.get = (url, params, callback) => {
	uni.request({
		url: app.domain + url,
		data: {
			...params,
			currentUserGuid: app.currentUserGuid
		},
		success (res) {
			if (typeof callback === 'function') {
				callback(res.data);
			}
		}
	})
}

uni.post = (url, params, callback) => {
	uni.request({
		url: app.domain + url,
		method: "POST",
		data: {
			...params,
			currentUserGuid: app.currentUserGuid
		},
		header: {
			'content-type': "application/x-www-form-urlencoded"
		},
		success (res) {
			if (typeof callback === 'function') {
				callback(res.data);
			}
		}
	})
}

uni.postStream = (url, params, callback) => {
	uni.request({
		url: app.domain + url,
		method: "POST",
		data: {
			...params,
			currentUserGuid: app.currentUserGuid
		},
		success (res) {
			if (typeof callback === 'function') {
				callback(res.data);
			}
		}
	})
}
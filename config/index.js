let appSetting = {
    debug: true,
    api: "",
    currentUserGuid: "",
    titlePerfix: " - ",
    title: "登录",
    nav: "",
    reloadOrg: "",
    reloadCategory: "",
    userInfo: {
		permissions: []
	},
    checkPermission () { return false; },
    webInfo: {
        avatar: "",
        nmsOpen: false,
        subtitle: "",
        title: ""
    },
	domain: "http://item.ricebird.cn",//"http://localhost:2034", //
    dashboard: "/iuc/index/index",
    ueditor: {
        serverUrl: "/ueditor/process",
        topOffset: 64,
        zIndex: 9,
        UEDITOR_HOME_URL: process.env.NODE_ENV === "production" ? "/web/third/" : "/static/"
    }
};
appSetting.ueditor.serverUrl = appSetting.domain + appSetting.ueditor.serverUrl;
try {
	function getQueryVariable(variable) {
		if (!window && !window.location && !window.location.search) {
			return false;
		}
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] == variable){return pair[1];}
		}
		return false;
	}
	
	appSetting.currentUserGuid = getQueryVariable("currentUserGuid") || "";
	if (!appSetting.currentUserGuid) {
		appSetting.currentUserGuid = uni.getStorageSync("currentUserGuid");
	}
} catch {}
module.exports = appSetting;

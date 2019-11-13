(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["iuc/softwareInstall/v1/StepInfo"],{"0fc5":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},"546e":function(t,e,n){"use strict";n.r(e);var a=n("703b"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=r.a},"604c":function(t,e,n){"use strict";n.r(e);var a=n("0fc5"),r=n("546e");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);var i=n("2877"),l=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=l.exports},"703b":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("0496"),r={name:"StepInfo",props:{value:{type:Object,default:function(){}}},data:function(){var t=JSON.parse(JSON.stringify(a));return{steps:t,bindSteps:[]}},watch:{value:{deep:!0,immediate:!0,handler:function(t){var e="text-blue",n="err",a=this.steps;a[0].FinalState=t.State>0?e:"",a[0].err="";var r=function(t){return 20===t?e:30===t?"text-red":""};a[1].FinalState=r(t.ReviewState),a[1].err=30===t.ReviewState?n:"",a[2].FinalState=r(t.HandleState),a[2].err=30===t.HandleState?n:"",a[3].FinalState=r(t.CheckState),a[3].err=30===t.CheckState?n:""}}}};e.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'iuc/softwareInstall/v1/StepInfo-create-component',
    {
        'iuc/softwareInstall/v1/StepInfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("604c"))
        })
    },
    [['iuc/softwareInstall/v1/StepInfo-create-component']]
]);                

webpackJsonp([4],{MIt8:function(t,e){},wHW6:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=s("bOdI"),a=s.n(l),i={data:function(){var t;return{idDetail:"",content:"111",editorOption:{},dialogImageUrl:"",dialogVisible:!1,form:(t={title:"",content:"",column:"新闻资讯",resource:"",date1:"",date2:"",delivery:!1,type:[]},a()(t,"resource",""),a()(t,"desc",""),a()(t,"author",""),a()(t,"img",""),t),plug:{},rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],date1:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],date2:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}],type:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]}}},created:function(){this.getParams(),this.getInfo()},methods:{getInfo:function(){var t=this,e={tokenId:this.$store.state.user.tokenId,id:this.idDetail};this.$post("pluginUpgrade/get",e).then(function(e){console.log(e),t.plug=e.data[0].appUpgrade,console.log(t.plug)})},getParams:function(){var t=this.$route.params.id;this.idDetail=t,console.log(this.$route.params)},routeChange:function(){console.log(this.idDetail),this.$router.push({name:"version-list"})}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"version-details"},[s("el-breadcrumb",{staticStyle:{"margin-top":"8px","margin-bottom":"8px","margin-left":"22px"},attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("系统管理")]),t._v(" "),s("el-breadcrumb-item",[t._v("版本管理")]),t._v(" "),s("el-breadcrumb-item",[t._v("应用详情")]),t._v(" "),s("el-breadcrumb-item",[t._v("插件详情")])],1),t._v(" "),s("div",{staticStyle:{"margin-left":"22px","margin-right":"22px","margin-bottom":"20px",overflow:"hidden",background:"rgba(255,255,255,1)","border-radius":"4px","box-shadow":"0px 0px 0px rgba(54,88,167,0.07)"}},[s("div",{staticStyle:{"margin-top":"20px","margin-right":"88px","text-align":"right"}},[s("router-link",{attrs:{to:{name:"version-list",params:{id:t.plug.appId}}}},[s("el-button",{staticClass:"light_btn router_btn",attrs:{size:"small"}},[t._v("返回")])],1)],1),t._v(" "),s("p",{staticClass:"title-p"},[t._v("应用信息")]),t._v(" "),s("div",{staticClass:"el-table__body-wrapper is-scrolling-none info_table"},[s("table",{staticClass:"el-table el-table__body el-table--border",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[t._m(0),t._v(" "),s("tbody",[s("tr",{staticClass:"el-table__row"},[t._m(1),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.pluginName))])]),t._v(" "),t._m(2),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.versionName))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(3),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.downloadUrl))])]),t._v(" "),t._m(4),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.versionCode))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(5),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.fileMdFive))])]),t._v(" "),t._m(6),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.fileSize))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(7),t._v(" "),s("td",[0==t.plug.upgradeMode?s("div",{staticClass:"cell"},[t._v("可选升级")]):s("div",{staticClass:"cell"},[t._v("强制升级")])]),t._v(" "),t._m(8),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.appId))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(9),t._v(" "),s("td",["1"==t.plug.status?s("div",{staticClass:"cell"},[t._v("新建")]):t._e(),t._v(" "),"2"==t.plug.status?s("div",{staticClass:"cell"},[t._v("已上线")]):t._e(),t._v(" "),"3"==t.plug.status?s("div",{staticClass:"cell"},[t._v("已下线")]):t._e()]),t._v(" "),t._m(10),t._v(" "),s("td",{attrs:{rowspan:"2"}},[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.upgradeContent))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(11),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.delayTime))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(12),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.createTime))])]),t._v(" "),t._m(13),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.updateTime))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(14),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.onlineTime))])]),t._v(" "),t._m(15),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.plug.updateUserId))])])])])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("colgroup",[e("col",{attrs:{name:"el-table_1_column_1",width:"15%"}}),this._v(" "),e("col",{attrs:{name:"el-table_1_column_2",width:"35%"}}),this._v(" "),e("col",{attrs:{name:"el-table_1_column_3",width:"15%"}}),this._v(" "),e("col",{attrs:{name:"el-table_1_column_4",width:"35%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("插件名称")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("版本号")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("下载地址")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("code版本")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("MD5")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("插件大小")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("升级模式")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("所属应用包")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("状态")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",{attrs:{rowspan:"2"}},[e("div",{staticClass:"cell"},[this._v("版本提示")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("延时生效")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("创建时间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("修改时间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("更新时间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("操作人")])])}]};var c=s("VU/8")(i,r,!1,function(t){s("MIt8")},null,null);e.default=c.exports}});
//# sourceMappingURL=4.d3e7b35cbbbc6d49fa55.js.map
webpackJsonp([6],{bCML:function(t,e){},cdnN:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("bOdI"),s=a.n(l),i={data:function(){var t,e;return e={multipleSelection:[],newArticle:[{num:1,title:"test7mkaiemlaoapuemske93osksks",author:"web"}],activeTab:"first",recommendRadio:1,dialogVisible:!1,dialogVisible1:!1,per_page:10,total_pages:100,currentPage_bidding:7,versionData:[{num:1,version:1.01,palt:"ios",size:"10m",pageName:"包名一堆数字",editTime:"2018-01-01",status:"已上线",static:"已下线"},{num:1,version:1.01,palt:"ios",size:"10m",pageName:"包名一堆数字",editTime:"2018-01-01",status:"已上线",static:"已下线"},{num:1,version:1.01,palt:"ios",size:"10m",pageName:"包名一堆数字",editTime:"2018-01-01",status:"已上线",static:"已下线"},{num:1,version:1.01,palt:"ios",size:"10m",pageName:"包名一堆数字",editTime:"2018-01-01",status:"已上线",static:"已下线"},{num:1,version:1.01,palt:"ios",size:"10m",pageName:"包名一堆数字",editTime:"2018-01-01",status:"已上线",static:"已下线"}],content:"111",editorOption:{},dialogImageUrl:""},s()(e,"dialogVisible",!1),s()(e,"form",(t={title:"",content:"",column:"新闻资讯",resource:"",date1:"",date2:"",delivery:!1,type:[]},s()(t,"resource",""),s()(t,"desc",""),s()(t,"author",""),s()(t,"img",""),t)),s()(e,"rules",{name:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],date1:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],date2:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}],type:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]}),e},methods:{miniTable:function(t){return"miniTable"},btnTable:function(t){return"btnTable"},test:function(){console.log(this.form.resource)},onEditorBlur:function(t){console.log("editor blur!",t),console.log(this.content)},onEditorFocus:function(t){console.log("editor focus!",t)},onEditorReady:function(t){console.log("editor ready!",t)},onEditorChange:function(t){var e=t.quill,a=t.html,l=t.text;console.log("editor change!",e,a,l),this.content=a},handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleCurrentChange:function(t){console.log("当前页: "+t)}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"version-list"},[a("el-breadcrumb",{staticStyle:{"margin-top":"8px","margin-bottom":"8px","margin-left":"22px"},attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("系统管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("版本管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("应用详情")])],1),t._v(" "),a("div",{staticStyle:{"margin-left":"22px","margin-right":"22px","margin-bottom":"20px",overflow:"hidden",background:"rgba(255,255,255,1)","border-radius":"4px","box-shadow":"0px 0px 0px rgba(54,88,167,0.07)"}},[a("div",{staticStyle:{"margin-top":"20px","margin-right":"88px","text-align":"right"}},[a("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.$router.back()}}},[t._v("返回")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"small"}},[t._v("上传插件")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"small"}},[t._v("编辑应用")])],1),t._v(" "),a("p",{staticClass:"title-p"},[t._v("应用信息")]),t._v(" "),t._m(0),t._v(" "),a("p",{staticClass:"title-p"},[t._v("插件信息")]),t._v(" "),a("el-table",{attrs:{data:t.versionData,"row-class-name":t.btnTable,"header-row-class-name":t.btnTable,border:""}},[a("el-table-column",{attrs:{prop:"version",label:"版本号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"palt",label:"插件名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"size",label:"下载地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pageName",label:"应用大小"}}),t._v(" "),a("el-table-column",{attrs:{prop:"editTime",label:"修改时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"static",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{name:"version-details"}}},[a("el-button",{attrs:{type:"text"}},[t._v("查看")])],1),t._v(" "),a("el-button",{attrs:{type:"text"}},[t._v("发布")]),t._v(" "),a("router-link",{attrs:{to:{name:"version-list"}}},[a("el-button",{attrs:{type:"text"}},[t._v("下线")])],1),t._v(" "),a("el-button",{attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-edit"})]),t._v(" "),a("el-button",{attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-delete"})])]}}])})],1),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-pagination",{staticClass:"text-center",attrs:{background:"","current-page":t.currentPage_bidding,"page-sizes":[10,20,30,40],"page-size":this.per_page,layout:"prev, pager, next",total:this.total_pages*this.per_page},on:{"current-change":t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"el-table__body-wrapper is-scrolling-none info_table"},[a("table",{staticClass:"el-table el-table__body el-table--border",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[a("colgroup",[a("col",{attrs:{name:"el-table_1_column_1",width:"15%"}}),t._v(" "),a("col",{attrs:{name:"el-table_1_column_2",width:"35%"}}),t._v(" "),a("col",{attrs:{name:"el-table_1_column_3",width:"15%"}}),t._v(" "),a("col",{attrs:{name:"el-table_1_column_4",width:"35%"}})]),t._v(" "),a("tbody",[a("tr",{staticClass:"el-table__row"},[a("td",[a("div",{staticClass:"cell"},[t._v("应用包名")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("王小虎")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("版本号")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("上海市普陀区金沙江路 1518 弄")])])]),t._v(" "),a("tr",{staticClass:"el-table__row"},[a("td",[a("div",{staticClass:"cell"},[t._v("下载地址")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("王小虎")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("code版本")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("上海市普陀区金沙江路 1518 弄")])])]),t._v(" "),a("tr",{staticClass:"el-table__row"},[a("td",[a("div",{staticClass:"cell"},[t._v("MD5")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("王小虎")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("应用大小")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("上海市普陀区金沙江路 1518 弄")])])]),t._v(" "),a("tr",{staticClass:"el-table__row"},[a("td",[a("div",{staticClass:"cell"},[t._v("升级模式")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("王小虎")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("应用平台")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("上海市普陀区金沙江路 1518 弄")])])]),t._v(" "),a("tr",{staticClass:"el-table__row"},[a("td",[a("div",{staticClass:"cell"},[t._v("状态")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("王小虎")])]),t._v(" "),a("td",{attrs:{rowspan:"2"}},[a("div",{staticClass:"cell"},[t._v("版本提示")])]),t._v(" "),a("td",{attrs:{rowspan:"2"}},[a("div",{staticClass:"cell"},[t._v("上海市普陀区金沙江路 1518 弄")])])]),t._v(" "),a("tr",{staticClass:"el-table__row"},[a("td",[a("div",{staticClass:"cell"},[t._v("延时生效")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("王小虎")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("11111")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("1111112")])])]),t._v(" "),a("tr",{staticClass:"el-table__row"},[a("td",[a("div",{staticClass:"cell"},[t._v("创建时间")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("王小虎")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("修改时间")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("22222")])])]),t._v(" "),a("tr",{staticClass:"el-table__row"},[a("td",[a("div",{staticClass:"cell"},[t._v("更新时间")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("王小虎")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("操作人")])]),t._v(" "),a("td",[a("div",{staticClass:"cell"},[t._v("33333")])])])])])])}]};var c=a("VU/8")(i,r,!1,function(t){a("bCML")},null,null);e.default=c.exports}});
//# sourceMappingURL=6.848e8997534053237d97.js.map
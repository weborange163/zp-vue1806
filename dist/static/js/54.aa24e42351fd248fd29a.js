webpackJsonp([54],{eO3w:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("rx7x"),s={data:function(){return{tableData:[{date:"2011-01-01"}],timeFilter:"",miniTable:l.miniTable,inputs:"",incomeOption:[{value:"0",label:"全部"},{value:"1",label:"收入"},{value:"2",label:"支出"}],income:"",tradeType:"",tradeAccount:"",tradeOption:[{value:"0",label:"全部"},{value:"1",label:"汇率设置"},{value:"2",label:"阅读文章奖励"},{value:"3",label:"发表评论奖励"},{value:"4",label:"发布文章奖励"},{value:"5",label:"邀请好友奖励"},{value:"6",label:"分享文章奖励"},{value:"7",label:"晒收入奖励"},{value:"8",label:"周签到奖励"},{value:"9",label:"绑定第三方账号奖励"},{value:"10",label:"徒弟发布奖励"},{value:"11",label:"兑换为现金"},{value:"12",label:"提现设置"},{value:"13",label:"绑定邀请码"}],accountOption:[{value:"0",label:"全部"},{value:"JTB",label:"交通币"},{value:"RMB",label:"现金"}],idDetail:"",form1:{},form2:{},form3:{},per_page:10,currentPage:1,total_pages:1,accountMsg:{}}},created:function(){this.getParams(),this.getList(),this.getPersonData()},methods:{getPersonData:function(){var t=this,e={tokenId:this.$store.state.user.tokenId,startTime:this.timeFilter?this.timeFilter[0]:"",endTime:this.timeFilter?this.timeFilter[1]:"",userId:this.idDetail};this.$post("/jtbUserAccount/getUserAccountDataStatistics",e).then(function(e){console.log(e),t.form1=e.data[0].jtbStatistics,t.form2=e.data[0].jtbExchangeStatistics,t.form3=e.data[0].jtbWithdrawStatisticsPlat,t.accountMsg=e.data[0].members})},getParams:function(){var t=this.$route.params;this.idDetail=t.id,this.userCode=t.userCode,this.phone=t.phone,this.nickName=t.nickName},getList:function(){var t=this,e={tokenId:this.$store.state.user.tokenId,userId:this.idDetail,limit:this.per_page,offset:this.currentPage,startTime:this.timeFilter?this.timeFilter[0]:"",endTime:this.timeFilter?this.timeFilter[1]:"",direction:0==this.income?"":this.income,amountType:0==this.tradeAccount?"":this.tradeAccount,orderType:0==this.tradeType?"":this.tradeType};this.$post("/jtbUserAccount/findPaymentInfo",e).then(function(e){t.tableData=e.data[0].rows,t.total_pages=e.data[0].total})},handleSizeChange:function(t){this.per_page=t,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()}},watch:{$route:"getParams"}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-body coin-detail1"},[a("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("交通币")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/coin-account"}}},[t._v("会员账户")]),t._v(" "),a("el-breadcrumb-item",[t._v("会员收支明细")])],1)],1),t._v(" "),a("div",{staticClass:"page-header"},[a("el-row",[a("el-col",{attrs:{span:7}},[a("el-date-picker",{staticStyle:{width:"95%"},attrs:{size:"mini",type:"datetimerange","start-placeholder":"开始时间","end-placeholder":"结束时间","value-format":"yyyy-MM-dd HH-mm-ss","default-time":["00:00:00","00:00:00"]},model:{value:t.timeFilter,callback:function(e){t.timeFilter=e},expression:"timeFilter"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("el-select",{staticStyle:{width:"95%"},attrs:{placeholder:"收支",size:"mini"},model:{value:t.income,callback:function(e){t.income=e},expression:"income"}},t._l(t.incomeOption,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("el-select",{staticStyle:{width:"95%"},attrs:{placeholder:"交易类型",size:"mini"},model:{value:t.tradeType,callback:function(e){t.tradeType=e},expression:"tradeType"}},t._l(t.tradeOption,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("el-select",{staticStyle:{width:"95%"},attrs:{placeholder:"交易账户",size:"mini"},model:{value:t.tradeAccount,callback:function(e){t.tradeAccount=e},expression:"tradeAccount"}},t._l(t.accountOption,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-col",{attrs:{span:8,offset:3}},[a("el-input",{staticStyle:{width:"60%"},attrs:{size:"mini",placeholder:"会员ID、会员昵称、手机号"},model:{value:t.inputs,callback:function(e){t.inputs=e},expression:"inputs"}}),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},nativeOn:{click:function(e){e.preventDefault(),t.getList()}}},[t._v("搜索")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},nativeOn:{click:function(e){e.preventDefault(),t.getList()}}},[t._v("刷新")])],1)],1)],1),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"statistics_header clearfix"},[a("p",{staticClass:"pull-left"},[t._v("会员提现数据统计")]),t._v(" "),a("div",{staticClass:"pull-right",staticStyle:{"font-size":"14px"}},[a("span",{staticClass:"mr40"},[t._v("会员ID："+t._s(t.accountMsg.userCode))]),t._v(" "),a("span",{staticClass:"mr40"},[t._v("昵称："+t._s(t.accountMsg.nickName))]),t._v(" "),a("span",{staticClass:"mr20"},[t._v("手机号："+t._s(t.accountMsg.phone))])])]),t._v(" "),a("el-row",[a("el-col",{staticStyle:{"padding-right":"4%"},attrs:{span:8}},[a("div",{staticClass:"showBlock",staticStyle:{"background-image":"url(/static/img/jtb.png)"}},[a("p",{staticClass:"text-center marBo10",staticStyle:{color:"#FFBC00"}},[t._v("交通币（JTB）")]),t._v(" "),a("el-form",{ref:"form1",attrs:{model:t.form1,"label-width":"50%"}},[a("el-form-item",{attrs:{label:"总获取量:"}},[a("p",{staticClass:"show_info",domProps:{textContent:t._s(t.form1.totalJtb)}})]),t._v(" "),a("el-form-item",{attrs:{label:"已使用(JTB):"}},[a("p",{staticClass:"show_info",domProps:{textContent:t._s(t.form1.usedJtb)}})]),t._v(" "),a("el-form-item",{attrs:{label:"余额(JTB):"}},[a("p",{staticClass:"show_info",domProps:{textContent:t._s(t.form1.currentJtb)}})])],1)],1)]),t._v(" "),a("el-col",{staticStyle:{padding:"0 2%"},attrs:{span:8}},[a("div",{staticClass:"showBlock",staticStyle:{"background-image":"url(/static/img/rmb.png)","background-size":"45px"}},[a("p",{staticClass:"text-center marBo10",staticStyle:{color:"#57E2D9"}},[t._v("JTB兑换RMB")]),t._v(" "),a("el-form",{ref:"form2",attrs:{model:t.form2,"label-width":"50%"}},[a("el-form-item",{attrs:{label:"兑换总量:"}},[a("p",{staticClass:"show_info",domProps:{textContent:t._s(t.form2.totalExchangeJtb)}})]),t._v(" "),a("el-form-item",{attrs:{label:"折合RMB（元）:"}},[a("p",{staticClass:"show_info",domProps:{textContent:t._s(t.form2.totalExchangeMoney)}})])],1)],1)]),t._v(" "),a("el-col",{staticStyle:{"padding-left":"4%"},attrs:{span:8}},[a("div",{staticClass:"showBlock",staticStyle:{"background-image":"url(/static/img/money.png)","background-size":"55px 42px"}},[a("p",{staticClass:"text-center marBo10",staticStyle:{color:"#FF5D58"}},[t._v("现金（¥）")]),t._v(" "),a("el-form",{ref:"form3",attrs:{model:t.form3,"label-width":"50%"}},[a("el-form-item",{attrs:{label:"提现次数（次）:"}},[a("p",{staticClass:"show_info",domProps:{textContent:t._s(t.form3.withdrawNum)}})]),t._v(" "),a("el-form-item",{attrs:{label:"已提现（¥）:"}},[a("p",{staticClass:"show_info",domProps:{textContent:t._s(t.form3.withdrawMoney)}})]),t._v(" "),a("el-form-item",{attrs:{label:"余额（¥）:"}},[a("p",{staticClass:"show_info",domProps:{textContent:t._s(t.form3.currentMoney)}})])],1)],1)])],1),t._v(" "),a("div",{staticClass:"text-right marT20"},[a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:function(e){t.$router.back()}}},[t._v("返回")])],1),t._v(" "),a("el-table",{staticClass:"marT20",staticStyle:{width:"100%"},attrs:{"row-class-name":t.miniTable(),"header-row-class-name":t.miniTable(),data:t.tableData,stripe:"",border:""}},[a("el-table-column",{attrs:{label:"序号",type:"index",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"order_time",label:"时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"order_name",label:"交易类型",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"withdraw_account",label:"交易账户",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"收支",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.direction?a("p",[t._v("收入")]):t._e(),t._v(" "),"2"==e.row.direction?a("p",[t._v("支出")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"金额",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount_after",label:"余额",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount_type",label:"交易方式",width:"180"}})],1),t._v(" "),a("div",{staticClass:"marT20"},[a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,20,30,40],"page-size":this.per_page,layout:"total, sizes, prev, pager, next, jumper",total:this.total_pages},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)])},staticRenderFns:[]};var r=a("VU/8")(s,i,!1,function(t){a("mZNX")},null,null);e.default=r.exports},mZNX:function(t,e){}});
//# sourceMappingURL=54.aa24e42351fd248fd29a.js.map
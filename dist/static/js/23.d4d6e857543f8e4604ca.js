webpackJsonp([23],{"Cv/i":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("rx7x"),i={data:function(){return{btnTable:a.btnTable,tableData:[],idDetail:"",comDetail:{commentObj:"",id:"",articleId:"",content:"",nickName:"",userUniqueCode:"",createTime:"",status:"",statusText:"",checkPerson:"",auditTime:"",type:""}}},created:function(){this.getParams(),this.showDetail()},methods:{showDetail:function(){var t=this,e={tokenId:this.$store.state.user.tokenId,id:this.idDetail};this.$post("comment/show",e).then(function(e){0==e.code&&(console.log(e.data[0]),t.comDetail=e.data[0],0==t.comDetail.status?t.comDetail.statusText="正常":t.comDetail.statusText="已屏蔽",console.log(t.comDetail))})},isBlock:function(t,e,s){var a,i=this;a=1==s?"屏蔽":"取消屏蔽",this.$confirm("此操作将"+a+"当前评论, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then(function(){var a={tokenId:i.$store.state.user.tokenId,id:t,status:s,type:e};i.$post("comment/isBlock",a).then(function(t){console.log(t),1==s?(i.comDetail.status="1",i.comDetail.statusText="已屏蔽"):(i.comDetail.status="0",i.comDetail.statusText="正常"),console.log(i.comDetail),i.$message({type:"success",message:"操作成功!"}),i.showDetail()})}).catch(function(){i.$message({type:"info",message:"已取消操作"})})},getParams:function(){var t=this.$route.params.id;this.idDetail=t}},watch:{$route:"getParams"}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-body comments_lookes"},[s("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("内容中心")]),t._v(" "),s("el-breadcrumb-item",[t._v("评论管理")]),t._v(" "),s("el-breadcrumb-item",[t._v("评论详情")])],1)],1),t._v(" "),s("div",{staticClass:"box"},[s("div",{staticClass:"text-right"},[s("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:function(e){t.$router.back()}}},[t._v("返回")]),t._v(" "),"0"==t.comDetail.status?s("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:function(e){t.isBlock(t.idDetail,t.comDetail.type,1)}}},[t._v("屏蔽")]):s("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:function(e){t.isBlock(t.idDetail,t.comDetail.type,0)}}},[t._v("取消屏蔽")])],1),t._v(" "),s("div",{staticClass:"el-table__body-wrapper is-scrolling-none info_table marT20"},[s("table",{staticClass:"el-table el-table__body el-table--border",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[t._m(0),t._v(" "),s("tbody",[s("tr",{staticClass:"el-table__row"},[t._m(1),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.commentObj))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(2),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.articleId))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(3),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.content))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(4),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.nickName))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(5),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.userUniqueCode))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(6),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.createTime))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(7),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.statusText))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(8),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.checkPerson))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[t._m(9),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.comDetail.auditTime))])])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("colgroup",[e("col",{attrs:{name:"el-table_1_column_1",width:"25%"}}),this._v(" "),e("col",{attrs:{name:"el-table_1_column_2",width:"75%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("评论对象")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("评论对象ID")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("评论内容")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("评论人")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("会员ID")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("评论时间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("状态")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("审核人")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("div",{staticClass:"cell"},[this._v("审核时间")])])}]};var c=s("VU/8")(i,l,!1,function(t){s("znOG")},null,null);e.default=c.exports},znOG:function(t,e){}});
//# sourceMappingURL=23.d4d6e857543f8e4604ca.js.map
webpackJsonp([10],{EdQv:function(t,e){},Ep9H:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,l=s("bOdI"),i=s.n(l),r=s("TIfe"),o=(a={data:function(){return{accounts:[],quill:{width:420,border:!0,height:150,content:"wellcome ~",syncOutput:!0,theme:"snow",disabled:!1,full:!1,toolbar:[[{header:1},{header:2}],["bold","italic","underline","strike","link"]]},classifyTypes:"行情",status:"",form2:{title:"",content:"",userId:"1",imgType:"1",tagLabel:"",resource:"",source:"",type:[],desc:"",author:"",img:"",topFlag:"0",orderNum:"0"},bannerDialog:!1,bannerForm:[],baceUrl:"",editorOption:{},dialogImageUrl:"",dialogVisible:!1,classifyType:"",uploadData:{},value:"",imgFullSrc:"",imgSrc:""}},created:function(){this.baceUrl=Object(r.a)()},mounted:function(){var t=this;this.$post("members/findByLevel",{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(function(e){console.log(e),t.accounts=e.data}),this.$get("/industry/get",{tokenId:this.$store.state.user.tokenId,id:this.$route.params.id}).then(function(e){t.form2=e.data[0].industry,t.status=t.form2.status,t.classifyType=t.form2.classifyType,t.imgFullSrc=t.form2.showUrl;var s=t.classifyType;t.$get("/industryCategory/findIndustryCategoryList",{tokenId:t.$store.state.user.tokenId}).then(function(e){console.log(e.data),t.classifyType=e.data;for(var a=0;a<t.classifyType.length;a++)s==t.classifyType[a].id&&(t.value=t.classifyType[a].name)})}),document.getElementById("content").innerHTML=this.form2.content}},i()(a,"created",function(){this.baceUrl=Object(r.a)()}),i()(a,"methods",{onOff:function(t,e){var s=this;this.$confirm("确定要"+e+"该新闻吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then(function(){var e={tokenId:s.$store.state.user.tokenId,status:t,id:s.form2.id};s.$post("industry/onAndOffLine",e).then(function(t){console.log(t),setTimeout(function(){s.$router.push({name:"market"})},1e3),s.$message({type:"success",message:t.msg})})}).catch(function(){s.$message({type:"info",message:res.msg})})},fileOver:function(){this.$message("只允许添加一张图片,如果替换请删除后再上传")},toAudit:function(){var t=this;this.$confirm("确定要提交审核吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then(function(){var e={tokenId:t.$store.state.user.tokenId,id:t.$route.params.id,status:"2"};t.$post("/industry/save",e).then(function(e){"0"==e.code&&(t.$message({type:"success",message:"提交成功!"}),t.status="2")})}).catch(function(){t.$message({type:"info",message:"提交失败"})})},watch:{$route:"getParams"}}),a),c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-body",staticStyle:{"min-width":"980px"}},[s("el-dialog",{attrs:{center:"",width:"375px",visible:t.bannerDialog,"append-to-body":""},on:{"update:visible":function(e){t.bannerDialog=e}}},[s("el-form",{ref:"form2",staticClass:"form2",attrs:{id:"div1",data:t.form2,"label-width":"110px"}},[s("p",{attrs:{id:"p1"}},[t._v(t._s(t.form2.title))]),t._v(" "),s("p",{attrs:{id:"p2"},domProps:{innerHTML:t._s(t.form2.content)}})])],1),t._v(" "),s("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("内容中心")]),t._v(" "),s("el-breadcrumb-item",[t._v("行业信息")]),t._v(" "),s("el-breadcrumb-item",[t._v("查看行情")])],1)],1),t._v(" "),s("div",{staticClass:"box"},[s("div",{staticClass:"text-right"},[s("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.$router.back()}}},[t._v("返回")]),t._v(" "),s("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.bannerDialog=!0}}},[t._v("预览")]),t._v(" "),"6"==t.status?s("el-button",{staticClass:"light_btn",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{size:"small",type:"text"},nativeOn:{click:function(e){e.preventDefault(),t.onOff("5","上线")}}},[t._v("上线")]):t._e(),t._v(" "),"5"==t.status?s("el-button",{staticClass:"light_btn",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{size:"small",type:"text"},nativeOn:{click:function(e){e.preventDefault(),t.onOff("6","下线")}}},[t._v("下线")]):t._e(),t._v(" "),"1"==t.status?s("el-button",{staticClass:"light_btn",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{size:"small",type:"text"},nativeOn:{click:function(e){e.preventDefault(),t.toAudit()}}},[t._v("提交审核")]):t._e()],1),t._v(" "),s("el-form",{ref:"form2",staticClass:"up_form",attrs:{model:t.form2,"label-width":"84px"}},[s("div",{staticStyle:{width:"48%",float:"left",padding:"15px","margin-left":"2%","margin-right":"5%"}},[s("el-form-item",{attrs:{label:"文章标题",prop:"title",required:""}},[s("el-input",{attrs:{type:"textarea",autosize:"",disabled:!0,placeholder:"请输入标题"},model:{value:t.form2.title,callback:function(e){t.$set(t.form2,"title",e)},expression:"form2.title"}})],1),t._v(" "),s("el-form-item",{staticClass:"editor",attrs:{label:"文章内容",prop:"content",required:""}},[s("div",{staticClass:"ql-editor",attrs:{id:"content"},domProps:{innerHTML:t._s(t.form2.content)}})])],1),t._v(" "),s("div",{staticStyle:{width:"35%",float:"left",padding:"15px","min-width":"420px"}},[s("el-form-item",{attrs:{label:"发布到:",required:""}},[s("el-input",{attrs:{disabled:!0},model:{value:t.classifyTypes,callback:function(e){t.classifyTypes=e},expression:"classifyTypes"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"所属分类:",prop:"userId",required:""}},[s("el-select",{staticStyle:{"padding-left":"6px"},attrs:{name:"classifyType",placeholder:"请选择",disabled:!0},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.classifyType,function(t){return s("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),"3"!=t.form2.publishSource?s("el-form-item",{attrs:{label:"发布账号:",prop:"userId",required:""}},[s("el-select",{attrs:{placeholder:"请选择发布账号",disabled:!0},model:{value:t.form2.userId,callback:function(e){t.$set(t.form2,"userId",e)},expression:"form2.userId"}},t._l(t.accounts,function(t){return s("el-option",{key:t.userId,attrs:{label:t.nickName,value:t.userId}})}))],1):s("el-form-item",{attrs:{label:"发布账号:",required:""}},[s("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.form2.createUser,callback:function(e){t.$set(t.form2,"createUser",e)},expression:"form2.createUser"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"附加选项:",prop:"imgType",required:""}},[s("el-radio-group",{attrs:{disabled:!0},model:{value:t.form2.imgType,callback:function(e){t.$set(t.form2,"imgType",e)},expression:"form2.imgType"}},[s("el-radio",{attrs:{label:"1"}},[t._v("上传缩略图")]),t._v(" "),s("el-radio",{attrs:{label:"2"}},[t._v("提取第一个图为缩略图")])],1)],1),t._v(" "),"1"==t.form2.imgType?s("el-form-item",{attrs:{label:"封面图"}},[s("img",{staticClass:"wh80",attrs:{src:t.form2.showUrl,alt:"封面图展示"}})]):t._e(),t._v(" "),s("el-form-item",{attrs:{label:"Tag标签:"}},[s("el-input",{attrs:{placeholder:"用逗号隔开，单个标签少于12字节",disabled:!0},model:{value:t.form2.tagLabel,callback:function(e){t.$set(t.form2,"tagLabel",e)},expression:"form2.tagLabel"}})],1),t._v(" "),s("div",{staticClass:"tableOverstyle"},[s("table",{staticClass:"el-table el-table__body el-table--border",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[s("colgroup",[s("col",{attrs:{name:"el-table_1_column_1",width:"25%"}}),t._v(" "),s("col",{attrs:{name:"el-table_1_column_2",width:"75%"}})]),t._v(" "),s("tbody",[s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("发布来源")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},["1"==t.form2.publishSource?s("span",[t._v("PC后台")]):t._e(),"2"==t.form2.publishSource?s("span",[t._v("数据爬取")]):t._e(),"3"==t.form2.publishSource?s("span",[t._v("APP端")]):t._e()])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("文章ID")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.articleId))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("状态")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},["1"==t.form2.status?s("span",[t._v("新建")]):t._e(),"2"==t.form2.status?s("span",[t._v("待审核")]):t._e(),"4"==t.form2.status?s("span",[t._v("审核不通过")]):t._e(),t._v(" "),"5"==t.form2.status?s("span",[t._v("已上线")]):t._e(),"6"==t.form2.status?s("span",[t._v("已下线")]):t._e()])])])])]),t._v(" "),s("table",{staticClass:"el-table el-table__body el-table--border marT20",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[s("colgroup",[s("col",{attrs:{name:"el-table_1_column_1"}}),t._v(" "),s("col",{attrs:{name:"el-table_1_column_1"}}),t._v(" "),s("col",{attrs:{name:"el-table_1_column_1"}}),t._v(" "),s("col",{attrs:{name:"el-table_1_column_2"}})]),t._v(" "),s("tbody",[s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"})]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v("时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v("操作账号")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v("备注")])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("创建时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.createTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.createUser))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"})])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("上线时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.onlineTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.onlineUser))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"})])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("下线时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.offlineTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.offlineUser))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"})])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("修改时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.updateTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.updateUser))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"})])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("审核时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.checkTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form2.checkPerson))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},["4"==t.form2.status?s("p",[t._v(t._s("其他"==t.form2.checkCause?t.form2.checkMessage:t.form2.checkCause))]):t._e()])])])])])])],1)])],1)],1)},staticRenderFns:[]};var n=s("VU/8")(o,c,!1,function(t){s("EdQv")},null,null);e.default=n.exports}});
//# sourceMappingURL=10.77f65ae776b6503670aa.js.map
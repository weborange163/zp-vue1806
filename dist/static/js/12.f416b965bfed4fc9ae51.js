webpackJsonp([12],{gUsY:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=s("TIfe"),a=(s("mtWM"),{components:{},data:function(){return{classifyType:"",value:"",type:"",accounts:[],imgFullSrc:"",imgSrc:"",uploadData:{},baceUrl:"",status:"",editorOption:{},dialogImageUrl:"",dialogVisible:!1,detailDialog:!1,form1:{title:"",content:"",column:"新闻资讯",sourceType:"1",source:"",status:"",author:"",userId:"1",imgType:"1",newsFile:"",tagLabels:"",keyWords:"",coverImgId:""},idDetail:"",cities:[],rules1:{}}},created:function(){this.baceUrl=Object(l.a)(),this.getParams(),this.showNews()},mounted:function(){var t=this;this.$get("reprintSth/findAll",{tokenId:this.$store.state.user.tokenId}).then(function(e){t.cities=e.data}),this.$post("members/findByLevel",{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(function(e){console.log(e),t.accounts=e.data}),document.getElementById("content").innerHTML=this.form1.content},methods:{onOff:function(t,e){var s=this;this.$confirm("确定要"+e+"该新闻吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={tokenId:s.$store.state.user.tokenId,status:t,id:s.form1.id};s.$post("news/isOnline",e).then(function(t){setTimeout(function(){s.$router.push({name:"news"})},1e3),s.$message({type:"success",message:t.msg})})}).catch(function(){s.$message({type:"info",message:res.msg})})},toAudit:function(){var t=this;this.$confirm("确认要提交审核吗","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then(function(){var e={tokenId:t.$store.state.user.tokenId,ids:t.form1.id};console.log(e),t.$post("news/batchWaitCheck",e).then(function(e){setTimeout(function(){t.$router.push({name:"news"})},1e3),t.$message({type:"success",message:e.msg})})}).catch(function(){t.$message({type:"info",message:res.msg})})},showNews:function(){var t=this,e={tokenId:this.$store.state.user.tokenId,id:this.idDetail};this.$get("news/show",e).then(function(e){t.form1=e.data[0],t.classifyType=t.form1.classifyType,"1"==t.form1.articleType?t.type="新闻":t.type="行情",t.imgSrc=t.form1.coverImgId,t.status=t.form1.status,t.imgFullSrc=t.form1.coverImgUrl;var s=t.classifyType;t.$get("/industryCategory/findIndustryCategoryList",{tokenId:t.$store.state.user.tokenId}).then(function(e){console.log(e.data),t.classifyType=e.data;for(var l=0;l<t.classifyType.length;l++)s==t.classifyType[l].id&&(t.value=t.classifyType[l].name)})})},getParams:function(){var t=this.$route.params.id;this.idDetail=t},uploadImg:function(t,e){var s=this;console.log(t);var l=new FormData;l.append("file",t,t.name),console.log(t.name),this.$post("images/upload",l).then(function(t){var l=s.baceUrl+t.data[0].showUrl;e(l,"center"),console.log(t)})},getFullUrl:function(){return this.baceUrl+"/news/add"},test:function(){console.log(this.form1.source)},handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0}},beforeRouteLeave:function(t,e,s){t.meta.keepAlive=!0,s()},watch:{$route:"getParams"}}),o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-body news_lookes",staticStyle:{"min-width":"1200px"}},[s("el-dialog",{attrs:{center:"",width:"375px",visible:t.detailDialog,id:"div1"},on:{"update:visible":function(e){t.detailDialog=e}}},[s("el-form",{ref:"form1",staticClass:"form1 ql-editor",attrs:{data:t.form1,"label-width":"110px"}},[s("p",{attrs:{id:"p1"}},[t._v(t._s(t.form1.title))]),t._v(" "),s("p",{attrs:{id:"p2"},domProps:{innerHTML:t._s(t.form1.content)}})])],1),t._v(" "),s("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("内容中心")]),t._v(" "),s("el-breadcrumb-item",[t._v("新闻管理")]),t._v(" "),s("el-breadcrumb-item",[t._v("查看"+t._s(t.type)+"资讯")])],1)],1),t._v(" "),s("div",{staticClass:"box"},[s("div",{staticClass:"text-right marR100"},[s("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.$router.back()}}},[t._v("返回")]),t._v(" "),s("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.detailDialog=!0}}},[t._v("预览")]),t._v(" "),"0"==t.form1.status?s("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.toAudit()}}},[t._v("提交审核")]):t._e(),t._v(" "),"5"==t.form1.status?s("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.onOff("4","上线")}}},[t._v("上线")]):t._e(),t._v(" "),"4"==t.status?s("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.onOff("5","下线")}}},[t._v("下线")]):t._e()],1),t._v(" "),s("el-form",{ref:"form1",staticClass:"up_form clearfix",attrs:{model:t.form1,"label-width":"84px",rules:t.rules1}},[s("div",{staticStyle:{width:"48%",float:"left",padding:"15px","margin-left":"2%","margin-right":"5%"}},[s("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[s("el-input",{attrs:{type:"textarea",autosize:"",disabled:!0},model:{value:t.form1.title,callback:function(e){t.$set(t.form1,"title",e)},expression:"form1.title"}})],1),t._v(" "),s("el-form-item",{staticClass:"editor ql-show",attrs:{label:"文章内容",prop:"content"}},[s("div",{staticClass:"ql-editor",attrs:{id:"content"},domProps:{innerHTML:t._s(t.form1.content)}})])],1),t._v(" "),s("div",{staticStyle:{width:"35%",float:"left",padding:"15px"}},[s("el-form-item",{attrs:{label:"发布到:"}},[s("el-input",{attrs:{disabled:!0},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"来源:",prop:"sourceType"}},[s("el-radio-group",{model:{value:t.form1.sourceType,callback:function(e){t.$set(t.form1,"sourceType",e)},expression:"form1.sourceType"}},[s("el-radio",{attrs:{label:"1",disabled:""}},[t._v("原创")]),t._v(" "),s("el-radio",{attrs:{label:"2",disabled:""}},[t._v("转载")])],1),t._v(" "),2==t.form1.sourceType?s("el-select",{staticStyle:{"margin-left":"20px",width:"140px"},attrs:{disabled:"",placeholder:"请选择来源"},model:{value:t.form1.source,callback:function(e){t.$set(t.form1,"source",e)},expression:"form1.source"}},t._l(t.cities,function(t){return s("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):t._e()],1),t._v(" "),s("el-form-item",{attrs:{label:"作者:"}},[s("el-input",{attrs:{disabled:!0},model:{value:t.form1.author,callback:function(e){t.$set(t.form1,"author",e)},expression:"form1.author"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"所属分类:",prop:"userId"}},[s("el-select",{staticStyle:{"padding-left":"6px"},attrs:{name:"classifyType",placeholder:"暂无分类",disabled:!0},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.classifyType,function(t){return s("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),"3"!=t.form1.publishSource?s("el-form-item",{attrs:{label:"发布账号:",prop:"userId","label-width":"82"}},[s("el-select",{attrs:{disabled:""},model:{value:t.form1.userId,callback:function(e){t.$set(t.form1,"userId",e)},expression:"form1.userId"}},t._l(t.accounts,function(t){return s("el-option",{key:t.userId,attrs:{label:t.nickName,value:t.userId}})}))],1):s("el-form-item",{attrs:{label:"发布账号:",required:""}},[s("el-input",{attrs:{size:"mini",disabled:""},model:{value:t.form1.createUser,callback:function(e){t.$set(t.form1,"createUser",e)},expression:"form1.createUser"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"附加选项:",prop:"sourceType","label-width":"82"}},[s("el-radio-group",{model:{value:t.form1.sourceType,callback:function(e){t.$set(t.form1,"sourceType",e)},expression:"form1.sourceType"}},[s("el-radio",{attrs:{label:"1",disabled:""}},[t._v("上传缩略图")]),t._v(" "),s("el-radio",{attrs:{label:"2",disabled:""}},[t._v("提取第一个图为缩略图")])],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"封面图:"}},[s("img",{staticClass:"wh80",attrs:{src:t.imgFullSrc,alt:"封面图展示"}})]),t._v(" "),t.form1.videoId?s("el-form-item",{attrs:{label:"视频地址:"}},[s("a",{attrs:{href:t.form1.videoUrl}},[t._v(t._s(t.form1.videoUrl))])]):t._e(),t._v(" "),t.form1.videoId?s("el-form-item",{attrs:{label:"视频名称:"}},[s("p",{domProps:{textContent:t._s(t.form1.videoName)}})]):t._e(),t._v(" "),s("el-form-item",{attrs:{label:"Tag标签:",prop:"tagLabels"}},[s("el-input",{attrs:{placeholder:"用'，'隔开，单个标签小于12字节"},model:{value:t.form1.tagLabels,callback:function(e){t.$set(t.form1,"tagLabels",e)},expression:"form1.tagLabels"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"Tag标签:"}},[s("el-input",{attrs:{disabled:!0},model:{value:t.form1.tagLabels,callback:function(e){t.$set(t.form1,"tagLabels",e)},expression:"form1.tagLabels"}})],1),t._v(" "),s("div",{staticClass:"tableOverstyle"},[s("table",{staticClass:"el-table el-table__body el-table--border",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[s("colgroup",[s("col",{attrs:{name:"el-table_1_column_1",width:"25%"}}),t._v(" "),s("col",{attrs:{name:"el-table_1_column_2",width:"75%"}})]),t._v(" "),s("tbody",[s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("发布来源")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},["1"==t.form1.publishSource?s("span",[t._v("PC后台")]):t._e(),"2"==t.form1.publishSource?s("span",[t._v("数据爬取")]):t._e(),"3"==t.form1.publishSource?s("span",[t._v("APP端")]):t._e()])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("文章ID")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.articleId))])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("状态")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},["0"==t.form1.status?s("span",[t._v("新建")]):t._e(),"1"==t.form1.status?s("span",[t._v("待审核")]):t._e(),"2"==t.form1.status?s("span",[t._v("审核中")]):t._e(),t._v(" "),"3"==t.form1.status?s("span",[t._v("审核不通过")]):t._e(),"4"==t.form1.status?s("span",[t._v("已上线")]):t._e(),"5"==t.form1.status?s("span",[t._v("已下线")]):t._e()])])])])]),t._v(" "),s("table",{staticClass:"el-table el-table__body el-table--border marT20",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[s("colgroup",[s("col",{attrs:{name:"el-table_1_column_1"}}),t._v(" "),s("col",{attrs:{name:"el-table_1_column_1"}}),t._v(" "),s("col",{attrs:{name:"el-table_1_column_1"}}),t._v(" "),s("col",{attrs:{name:"el-table_1_column_2"}})]),t._v(" "),s("tbody",[s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"})]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v("时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v("操作账号")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v("备注")])])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("创建时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.createTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.createUser))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"})])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("上线时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.onlineTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.onlineUser))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"})])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("下线时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.offlineTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.offlineUser))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"})])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("修改时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.updateTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.updateUser))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"})])]),t._v(" "),s("tr",{staticClass:"el-table__row"},[s("td",[s("div",{staticClass:"cell"},[t._v("审核时间")])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s(t.form1.checkTime))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},[t._v(t._s("涉及敏感词"==t.form1.checkReason?"机审":t.form1.checkPerson))])]),t._v(" "),s("td",[s("div",{staticClass:"cell"},["3"==t.form1.status?s("p",[t._v(t._s("其它"==t.form1.checkReason?t.form1.checkMessage:t.form1.checkReason))]):t._e()])])])])])])],1)])],1)],1)},staticRenderFns:[]};var i=s("VU/8")(a,o,!1,function(t){s("nOdP")},null,null);e.default=i.exports},nOdP:function(t,e){}});
//# sourceMappingURL=12.f416b965bfed4fc9ae51.js.map
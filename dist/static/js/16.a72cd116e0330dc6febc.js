webpackJsonp([16],{Lu2J:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("TIfe"),l=o("RRt9"),i=(o("mtWM"),{components:{},data:function(){var e=this;return{accounts:[],fileList:[],fileListVideo:[],showNews:!1,pkg:"",quill:{width:420,border:!0,height:150,zIndex:101,content:"wellcome ~",syncOutput:!0,theme:"snow",disabled:!1,full:!1,toolbar:[["bold","italic","underline","strike","link",{header:[1,2,3,4,5,6,!1]}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{color:[]},{background:[]}],[{align:[!1,"right","center","justify"]}],["image","video"]]},uploadData:{},baceUrl:"",editorOption:{},dialogImageUrl:"",dialogVisible:!1,form1:{title:"",content:"",column:"新闻资讯",sourceType:"1",source:"",author:"",userId:"",imgType:"1",newsFile:"",tagLabels:"",keyWords:""},cities:[],hasFmt:!1,classifyTypeAll:[],showUrl:"",argu:{},videoUrl:"",videoId:"",rules1:{icon:[{required:!0,validator:function(t,o,r){e.hasFmt?r():r(new Error("请上传封面图"))},trigger:"change"}],title:[{required:!0,validator:l.a.checkTitle,trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"},{pattern:/[0-9\u4e00-\u9fa5]+/g,message:"内容必须有中文或者数字",trigger:"blur"}],sourceType:[{required:!0,message:"请选择来源",trigger:"change"}],source:[{required:!0,message:"请选择转载来源",trigger:"change"}],userId:[{required:!0,message:"请选择发布账号",trigger:"change"}],imgType:[{required:!0,message:"请选择封面图类型",trigger:"change"}],coverImg:[{required:!0,message:"请上传图片",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}],classifyType:[{required:!0,message:"请选择所属分类",trigger:"blur"}],tagLabels:[{validator:function(e,t,o){""===t?o():(console.log(t),t.replace(/，/gi,",").split(",").map(function(e){e.replace(/[^\x00-\xff]/g,"aa").length>12?o(new Error("单个tag标签不能超过12字节!")):o()}))},trigger:"blur"}]}}},created:function(){this.baceUrl=Object(r.a)(),this.videoUrl=this.baceUrl+"/news/addVideo",console.log(this.videoUrl),this.argu=this.$route.params.argu},mounted:function(){var e=this;this.$get("reprintSth/findAll",{tokenId:this.$store.state.user.tokenId}).then(function(t){e.cities=t.data}),this.$get("/industryCategory/findIndustryCategoryList",{tokenId:this.$store.state.user.tokenId}).then(function(t){console.log(t.data),e.classifyTypeAll=t.data}),this.$post("members/findByLevel",{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(function(t){e.accounts=t.data})},methods:{radioChange:function(e){console.log(e),"2"==e?this.hasFmt=!0:this.fileList||(this.hasFmt=!1)},uploadImg:function(e,t){console.log(e);var o=new FormData;o.append("file",e,e.name),this.$post("images/upload",o).then(function(e){var o=e.data[0].showUrl;console.log(t),t(o,"center")})},videoChange:function(e,t){console.log(e,t);var o=new FormData;o.append("file",e,e.name),this.$post("images/upload",o).then(function(e){console.log(e)})},submitUpload:function(){this.$refs.uploadVideo.submit()},handleRemove2:function(e,t){this.showUrl="",this.videoId=""},handleSuccess:function(e,t){this.showUrl=e.data[1],this.videoId=e.data[0]},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},getFullUrl:function(){return this.baceUrl+"/news/add"},creatNews:function(e,t){var o=this;this.$refs[e].validate(function(e){if(console.log(e),!e)return console.log("error submit!!"),!1;if(2==o.form1.imgType){if(!o.form1.content.match(/http:\/\/.*?(gif|png|jpg|jpeg)/gi))return void o.$message.error("内容里没有图片!")}var r=new FormData;r.append("tokenId",o.$store.state.user.tokenId),r.append("title",o.form1.title),r.append("content",o.form1.content),r.append("sourceType",o.form1.sourceType),r.append("author",o.form1.author),r.append("userId",o.form1.userId),r.append("imgType",o.form1.imgType),r.append("articleType","2"),r.append("tagLabels",o.form1.tagLabels.replace(/，/gi,",")),r.append("publishSource","1"),r.append("status",t),r.append("classifyType",o.form1.classifyType),"1"==o.form1.imgType&&r.append("newsFile",o.form1.newsFile,o.form1.filename),"2"==o.form1.sourceType&&r.append("source",o.form1.source),o.videoId&&(r.append("videoId",o.videoId),r.append("videoUrl",o.showUrl)),console.log(o.form1.newsFile),o.$post("news/add",r).then(function(e){0==e.code&&(o.$message({message:e.msg,type:"success"}),setTimeout(function(){o.$router.push({name:"market",params:{argu:o.argu}})},1e3))})})},test:function(){console.log(this.form1.source)},fileChange:function(e,t){this.$refs.icon.clearValidate(),this.form1.filename=e.name,this.form1.newsFile=e.raw,t.length>0&&(this.hasFmt=!0)},onEditorBlur:function(e){e.quill,e.html,e.text;console.log(this.form1.content)},onEditorFocus:function(e){console.log("editor focus!",e)},onEditorReady:function(e){console.log("editor ready!",e)},onEditorChange:function(e){console.log("editor change!",e)},handleRemove:function(e,t){console.log(e,t),0==t.length&&(this.hasFmt=!1)},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件")},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},fanhui:function(){var e=this;this.$confirm("返回已编辑内容将重置是否继续？").then(function(t){e.$router.push({name:"market",params:{argu:e.argu}}),done()}).catch(function(e){})}},beforeRouteLeave:function(e,t,o){e.meta.keepAlive=!0,o()}}),a={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"page-body",staticStyle:{"min-width":"980px"}},[o("el-dialog",{attrs:{center:"",width:"375px",visible:e.showNews,"append-to-body":"",id:"div1"},on:{"update:visible":function(t){e.showNews=t}}},[o("el-form",{ref:"form1",staticClass:"form1",attrs:{data:e.form1,"label-width":"110px"}},[o("p",{attrs:{id:"p1"}},[e._v(e._s(e.form1.title))]),e._v(" "),o("p",{attrs:{id:"p2"},domProps:{innerHTML:e._s(e.form1.content)}})])],1),e._v(" "),o("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[o("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[o("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("内容中心")]),e._v(" "),o("el-breadcrumb-item",[e._v("发布内容")]),e._v(" "),o("el-breadcrumb-item",[e._v("发布行情")])],1)],1),e._v(" "),o("div",{staticClass:"box"},[o("div",{staticClass:"text-right marR100"},[o("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:e.fanhui}},[e._v("返回")]),e._v(" "),o("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(t){e.showNews=!0}}},[e._v("预览")]),e._v(" "),o("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(t){e.creatNews("form1",0)}}},[e._v("仅保存")]),e._v(" "),o("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(t){e.creatNews("form1","1")}}},[e._v("保存并提交审核")])],1),e._v(" "),o("el-form",{ref:"form1",staticClass:"up_form clearfix",attrs:{model:e.form1,"label-width":"84px",rules:e.rules1}},[o("div",{staticStyle:{width:"48%",float:"left",padding:"15px","margin-left":"2%","margin-right":"5%"}},[o("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[o("el-input",{staticStyle:{width:"420px"},attrs:{type:"textarea",autosize:"",placeholder:"请输入标题"},model:{value:e.form1.title,callback:function(t){e.$set(e.form1,"title",t)},expression:"form1.title"}})],1),e._v(" "),o("el-form-item",{staticClass:"editor",attrs:{label:"文章内容",prop:"content"}},[o("m-quill-editor",{ref:"myQuillEditor",attrs:{width:e.quill.width,getContent:e.onEditorChange,toolbar:e.quill.toolbar,"has-border":e.quill.border,zIndex:e.quill.zIndex,"sync-output":e.quill.syncOutput,theme:e.quill.theme,disabled:e.quill.disabled,fullscreen:e.quill.full},on:{upload:e.uploadImg,blur:function(t){e.onEditorBlur(t)}},model:{value:e.form1.content,callback:function(t){e.$set(e.form1,"content",t)},expression:"form1.content"}})],1)],1),e._v(" "),o("div",{staticStyle:{width:"35%",float:"left",padding:"15px","min-width":"420px"}},[o("el-form-item",{attrs:{label:"发布到:"}},[o("el-input",{attrs:{disabled:!0},model:{value:e.form1.column,callback:function(t){e.$set(e.form1,"column",t)},expression:"form1.column"}})],1),e._v(" "),o("el-row",[o("el-col",{attrs:{span:14}},[o("el-form-item",{attrs:{label:"来源:",prop:"sourceType"}},[o("el-radio-group",{on:{change:function(t){e.test()}},model:{value:e.form1.sourceType,callback:function(t){e.$set(e.form1,"sourceType",t)},expression:"form1.sourceType"}},[o("el-radio",{attrs:{label:"1"}},[e._v("原创")]),e._v(" "),o("el-radio",{attrs:{label:"2"}},[e._v("转载")])],1)],1)],1),e._v(" "),o("el-col",{attrs:{span:10}},[2==e.form1.sourceType?o("el-form-item",{staticClass:"source_style",attrs:{prop:"source"}},[o("el-select",{staticStyle:{"margin-left":"-68px",width:"150px"},attrs:{filterable:"",placeholder:"请选择转载来源"},model:{value:e.form1.source,callback:function(t){e.$set(e.form1,"source",t)},expression:"form1.source"}},e._l(e.cities,function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1):e._e()],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"作者:"}},[o("el-input",{model:{value:e.form1.author,callback:function(t){e.$set(e.form1,"author",t)},expression:"form1.author"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"所属分类:",prop:"classifyType"}},[o("el-select",{attrs:{filterable:"",name:"classifyType",placeholder:"请选择"},model:{value:e.form1.classifyType,callback:function(t){e.$set(e.form1,"classifyType",t)},expression:"form1.classifyType"}},e._l(e.classifyTypeAll,function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),o("el-form-item",{staticClass:"fabuStyle",attrs:{label:"发布账号:",prop:"userId"}},[o("el-select",{attrs:{filterable:"",placeholder:"请选择发布账号"},model:{value:e.form1.userId,callback:function(t){e.$set(e.form1,"userId",t)},expression:"form1.userId"}},e._l(e.accounts,function(e){return o("el-option",{key:e.userId,attrs:{label:e.nickName,value:e.userId}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"附加选项:",prop:"imgType"}},[o("el-radio-group",{on:{change:e.radioChange},model:{value:e.form1.imgType,callback:function(t){e.$set(e.form1,"imgType",t)},expression:"form1.imgType"}},[o("el-radio",{attrs:{label:"1"}},[e._v("上传缩略图")]),e._v(" "),o("el-radio",{attrs:{label:"2"}},[e._v("提取第一个图为缩略图")])],1)],1),e._v(" "),o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"1"==e.form1.imgType,expression:"form1.imgType == '1'"}],ref:"icon",attrs:{label:"封面图:",prop:"icon"}},[o("el-upload",{ref:"upload",attrs:{action:"",multiple:!1,limit:1,name:"newsFile","file-list":e.fileList,"list-type":"picture-card","auto-upload":!1,"on-change":e.fileChange,"on-exceed":e.handleExceed,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove}},[o("i",{staticClass:"el-icon-plus"})]),e._v(" "),o("el-dialog",{attrs:{visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[o("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),o("el-form-item",{attrs:{label:"上传视频:"}},[o("el-upload",{ref:"uploadVideo",staticClass:"upload-demo",attrs:{limit:1,name:"newsVideo",action:e.videoUrl,accept:"video/mp4","on-remove":e.handleRemove2,"file-list":e.fileListVideo,"on-success":e.handleSuccess,"before-remove":e.beforeRemove,"auto-upload":!1}},[o("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),o("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:e.submitUpload}},[e._v("上传到服务器")]),e._v(" "),o("div",{staticClass:"el-upload__tip",domProps:{innerHTML:e._s(e.showUrl)}})],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"Tag标签:",prop:"tagLabels"}},[o("el-input",{attrs:{placeholder:"用'，'隔开，单个标签小于12字节"},model:{value:e.form1.tagLabels,callback:function(t){e.$set(e.form1,"tagLabels",t)},expression:"form1.tagLabels"}})],1)],1)])],1)],1)},staticRenderFns:[]};var s=o("VU/8")(i,a,!1,function(e){o("qcBX")},null,null);t.default=s.exports},qcBX:function(e,t){}});
//# sourceMappingURL=16.a72cd116e0330dc6febc.js.map
webpackJsonp([7],{Lu2J:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=l("TIfe"),r={data:function(){return{accounts:[],quill:{width:420,border:!0,height:150,zIndex:101,content:"wellcome ~",syncOutput:!0,theme:"snow",disabled:!1,full:!1,toolbar:[[{header:1},{header:2}],["bold","italic","underline","strike","link"]]},baceUrl:"",editorOption:{},dialogImageUrl:"",dialogVisible:!1,classifyType:"",classifyType1:"",form2:{title:"",content:"",classifyTypes:"行情",userId:"",imgType:"1",tagLabel:"",resource:"",source:"",type:[],desc:"",author:"",img:"",topFlag:"0",orderNum:"0"},uploadData:{},value:"",rules2:{title:[{required:!0,message:"请输入标题",trigger:"blur"},{min:3,max:15,message:"长度在 3 到 15 个字符",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"change"}],userId:[{required:!0,message:"请选择发布账号",trigger:"change"}],imgType:[{required:!0,message:"请选择图片",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}],source:[{required:!0,message:"请选择活动资源",trigger:"change"}]}}},created:function(){this.baceUrl=Object(o.a)()},mounted:function(){var e=this;this.$get("/industryCategory/findIndustryCategoryList",{tokenId:this.$store.state.user.tokenId}).then(function(t){console.log(t.data),e.classifyType=t.data}),this.$post("members/findByLevel",{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(function(t){console.log(t),e.accounts=t.data})},methods:{uploadImg:function(e,t){var l=this;console.log(e);var o=new FormData;o.append("file",e,e.name),console.log(e.name),this.$post("images/upload",o).then(function(e){var o=l.baceUrl+e.data[0].showUrl;t(o,"center"),console.log(e)})},getFullUrl:function(){return console.log(this.baceUrl+"/industry/save"),this.baceUrl+"/industry/save"},fileOver:function(){this.$message("只允许添加一张图片,如果替换请删除后再上传")},toAudit1:function(e,t){var l=this;return this.$refs[e].validate(function(e){if(console.log(e),e){var o={tokenId:l.$store.state.user.tokenId,status:t,title:l.form2.title,content:l.form2.content,userId:l.form2.userId,imgType:l.form2.imgType,tagLabel:l.form2.tagLabel,publishSource:"1",classifyType:l.value,topFlag:l.form2.topFlag,orderNum:l.form2.orderNum};return l.uploadData=o,setTimeout(function(){l.$refs.upload.submit(),l.$message({type:"success",message:"添加成功!"}),setTimeout(function(){l.$router.push({name:"market"})},1e3)},0),!0}return console.log("error submit!!"),!1}),!0},toAudit:function(e,t){var l=this;return this.$refs[e].validate(function(e){if(console.log(e),e){var t={tokenId:l.$store.state.user.tokenId,status:"2",title:l.form2.title,content:l.form2.content,userId:l.form2.userId,imgType:l.form2.imgType,tagLabel:l.form2.tagLabel,publishSource:"1",classifyType:l.value,topFlag:l.form2.topFlag,orderNum:l.form2.orderNum};return l.uploadData=t,setTimeout(function(){l.$refs.upload.submit(),l.$message({type:"success",message:"添加成功!"}),setTimeout(function(){l.$router.push({name:"market"})},1e3)},0),!0}return console.log("error submit!!"),!1}),!0},onEditorBlur:function(e){console.log("editor blur!",e),console.log(this.form2.content)},onEditorFocus:function(e){console.log("editor focus!",e)},onEditorReady:function(e){console.log("editor ready!",e)},onEditorChange:function(e){var t=e.quill,l=e.html,o=e.text;console.log("editor change!",t,l,o),this.content=l},handleRemove:function(e,t){alert("删除"),console.log(e,t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0,console.log(this.dialogImageUrl),alert("放大")},fanhui:function(){var e=this;this.$confirm("返回已编辑内容将重置是否继续？").then(function(t){e.$router.back(),done()}).catch(function(e){})}}},a={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"page-body market_add"},[l("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[l("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[l("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("内容中心")]),e._v(" "),l("el-breadcrumb-item",[e._v("行业信息")]),e._v(" "),l("el-breadcrumb-item",[e._v("添加行情")])],1)],1),e._v(" "),l("div",{staticClass:"box"},[l("div",{staticClass:"text-right"},[l("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:e.fanhui}},[e._v("返回")]),e._v(" "),l("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(t){e.toAudit1("form2",1)}}},[e._v("仅保存")]),e._v(" "),l("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(t){e.toAudit("form2",2)}}},[e._v("保存并提交审核")])],1),e._v(" "),l("el-form",{ref:"form2",staticClass:"up_form",attrs:{model:e.form2,"label-width":"80px",rules:e.rules2}},[l("div",{staticStyle:{width:"40%",float:"left",padding:"15px","margin-left":"5%","margin-right":"10%"}},[l("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[l("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.form2.title,callback:function(t){e.$set(e.form2,"title",t)},expression:"form2.title"}})],1),e._v(" "),l("el-form-item",{staticClass:"editor",attrs:{label:"文章内容",prop:"content"}},[l("m-quill-editor",{ref:"myQuillEditor",attrs:{width:e.quill.width,getContent:e.onEditorChange,"has-border":e.quill.border,zIndex:e.quill.zIndex,"sync-output":e.quill.syncOutput,theme:e.quill.theme,disabled:e.quill.disabled,fullscreen:e.quill.full},on:{upload:e.uploadImg,blur:function(t){e.onEditorBlur(t)}},model:{value:e.form2.content,callback:function(t){e.$set(e.form2,"content",t)},expression:"form2.content"}})],1)],1),e._v(" "),l("div",{staticStyle:{width:"35%",float:"left",padding:"15px"},attrs:{prop:"classifyType"}},[l("el-form-item",{attrs:{label:"发布到:"}},[l("el-input",{staticStyle:{width:"173px"},attrs:{disabled:!0},model:{value:e.form2.classifyTypes,callback:function(t){e.$set(e.form2,"classifyTypes",t)},expression:"form2.classifyTypes"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"所属分类"}},[l("el-select",{attrs:{name:"classifyType",placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.classifyType,function(e){return l("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),l("el-form-item",{staticClass:"fabuStyle",attrs:{label:"发布账号:",prop:"userId","label-width":"82"}},[l("el-select",{attrs:{placeholder:"请选择发布账号"},model:{value:e.form2.userId,callback:function(t){e.$set(e.form2,"userId",t)},expression:"form2.userId"}},e._l(e.accounts,function(e){return l("el-option",{key:e.userId,attrs:{label:e.nickName,value:e.userId}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"附加选项:",prop:"imgType","label-width":"82"}},[l("el-radio-group",{model:{value:e.form2.imgType,callback:function(t){e.$set(e.form2,"imgType",t)},expression:"form2.imgType"}},[l("el-radio",{attrs:{label:"1"}},[e._v("上传缩略图")]),e._v(" "),l("el-radio",{attrs:{label:"2"}},[e._v("提取第一个图为缩略图")])],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"封面图",required:""}},[l("el-upload",{ref:"upload",attrs:{action:e.getFullUrl(),name:"newsFile",data:e.uploadData,multiple:!1,limit:1,"list-type":"picture-card","auto-upload":!1,"on-preview":e.handlePictureCardPreview,"on-exceed":e.fileOver,"on-remove":e.handleRemove}},[l("i",{staticClass:"el-icon-plus"})]),e._v(" "),l("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),l("el-form-item",{attrs:{label:"Tag标签:"}},[l("el-input",{attrs:{placeholder:"用逗号隔开，单个标签少于12字节"},model:{value:e.form2.tagLabel,callback:function(t){e.$set(e.form2,"tagLabel",t)},expression:"form2.tagLabel"}})],1)],1)])],1)])},staticRenderFns:[]};var i=l("VU/8")(r,a,!1,function(e){l("nqCg")},null,null);t.default=i.exports},nqCg:function(e,t){}});
//# sourceMappingURL=7.d8dee3516a35c884c9f0.js.map
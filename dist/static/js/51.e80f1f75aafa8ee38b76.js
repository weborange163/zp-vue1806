webpackJsonp([51],{OtDs:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("bOdI"),l=r.n(a),o=r("TIfe"),i=r("RRt9"),s={data:function(){var e,t=this;return{argu:{},hasFmt:!1,fileList:[],accounts:[],cities:[],quill:{width:420,border:!0,height:150,zIndex:101,content:"wellcome ~",syncOutput:!0,theme:"snow",disabled:!1,full:!1,toolbar:[["bold","italic","underline","strike","link",{header:[1,2,3,4,5,6,!1]}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{color:[]},{background:[]}],[{align:[!1,"right","center","justify"]}],["image","video"]]},baceUrl:"",dialogImageUrl:"",dialogVisible:!1,classifyTypeAll:"",form2:(e={title:"",content:"",classifyTypes:"行情",author:"",sourceType:"1",userId:"",imgType:"1",tagLabel:"",source:"",type:[],desc:""},l()(e,"author",""),l()(e,"img",""),e),uploadData:{},value:"",rules2:{title:[{required:!0,validator:i.a.checkTitle,trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"change"},{pattern:/[0-9\u4e00-\u9fa5]+/g,message:"内容必须有中文或者数字",trigger:"blur"}],userId:[{required:!0,message:"请选择发布账号",trigger:"change"}],imgType:[{required:!0,message:"请选择图片",trigger:"change"}],icon:[{required:!0,validator:function(e,r,a){t.hasFmt?a():a(new Error("请上传封面图"))},trigger:"change"}],sourceType:[{required:!0,message:"请选择来源",trigger:"change"}],source:[{required:!0,message:"请选择转载来源",trigger:"change"}],classifyType:[{required:!0,message:"请选择所属分类",trigger:"blur"}],tagLabel:[{validator:function(e,t,r){""===t?r():t.replace(/，/gi,",").split(",").map(function(e){e.replace(/[^\x00-\xff]/g,"aa").length>12?r(new Error("单个tag标签不能超过12字节!")):r()})},trigger:"blur"}]}}},created:function(){this.baceUrl=Object(o.a)(),this.argu=this.$route.params.argu},mounted:function(){var e=this;this.$get("reprintSth/findAll",{tokenId:this.$store.state.user.tokenId}).then(function(t){e.cities=t.data}),this.$get("/industryCategory/findIndustryCategoryList",{tokenId:this.$store.state.user.tokenId}).then(function(t){console.log(t.data),e.classifyTypeAll=t.data}),this.$post("members/findByLevel",{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(function(t){console.log(t),e.accounts=t.data})},methods:{radioChange:function(e){console.log(e),"2"==e?this.hasFmt=!0:this.fileList||(this.hasFmt=!1)},uploadImg:function(e,t){console.log(e);var r=new FormData;r.append("file",e,e.name),console.log(e.name),this.$post("images/upload",r).then(function(e){var r=e.data[0].showUrl;t(r,"center"),console.log(e)})},fileOver:function(){this.$message("只允许添加一张图片,如果替换请删除后再上传")},saveAudit:function(e,t){var r=this;return this.$refs[e].validate(function(e){if(console.log(e),!e)return console.log("error submit!!"),!1;if(2==r.form2.imgType){if(!r.form2.content.match(/src=/gi))return void r.$message.error("内容里没有图片!")}var a=new FormData;a.append("tokenId",r.$store.state.user.tokenId),a.append("title",r.form2.title),a.append("content",r.form2.content),a.append("userId",r.form2.userId),a.append("imgType",r.form2.imgType),a.append("author",r.form2.author),a.append("sourceType",r.form2.sourceType),a.append("tagLabel",r.form2.tagLabel.replace(/，/gi,",")),a.append("publishSource","1"),a.append("status",t),a.append("classifyType",r.form2.classifyType),"1"==r.form2.imgType&&a.append("newsFile",r.form2.file,r.form2.filename),"2"==r.form2.sourceType&&a.append("source",r.form2.source),r.$post("industry/save",a).then(function(e){0==e.code&&(r.$message({message:e.msg,type:"success"}),setTimeout(function(){r.$router.push({name:"market",params:{argu:r.argu}})},1e3))})}),!0},fileChange:function(e,t){this.$refs.icon.clearValidate(),this.form2.filename=e.name,this.form2.file=e.raw,t.length>0&&(this.hasFmt=!0)},onEditorBlur:function(e){console.log("editor blur!",e),console.log(this.form2.content)},onEditorFocus:function(e){console.log("editor focus!",e)},onEditorReady:function(e){console.log("editor ready!",e)},onEditorChange:function(e){var t=e.quill,r=e.html,a=e.text;console.log("editor change!",t,r,a),this.content=r},handleRemove:function(e,t){alert("删除"),console.log(e,t)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0,console.log(this.dialogImageUrl),alert("放大")},fanhui:function(){var e=this;this.$confirm("返回已编辑内容将重置是否继续？").then(function(t){e.$router.push({name:"market",params:{argu:e.argu}}),done()}).catch(function(e){})}},beforeRouteLeave:function(e,t,r){e.meta.keepAlive=!1,r()}},n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page-body market_add",staticStyle:{"min-width":"980px"}},[r("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("内容中心")]),e._v(" "),r("el-breadcrumb-item",[e._v("发布内容")]),e._v(" "),r("el-breadcrumb-item",[e._v("发布行情")])],1)],1),e._v(" "),r("div",{staticClass:"box"},[r("div",{staticClass:"text-right"},[r("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:e.fanhui}},[e._v("返回")]),e._v(" "),r("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(t){e.saveAudit("form2",1)}}},[e._v("仅保存")]),e._v(" "),r("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(t){e.saveAudit("form2",2)}}},[e._v("保存并提交审核")])],1),e._v(" "),r("el-form",{ref:"form2",staticClass:"up_form clearfix",attrs:{model:e.form2,"label-width":"84px",rules:e.rules2}},[r("div",{staticStyle:{width:"48%",float:"left",padding:"15px","margin-left":"2%","margin-right":"5%"}},[r("el-form-item",{attrs:{label:"文章标题:",prop:"title"}},[r("el-input",{staticStyle:{width:"420px"},attrs:{type:"textarea",autosize:"",placeholder:"请输入标题"},model:{value:e.form2.title,callback:function(t){e.$set(e.form2,"title",t)},expression:"form2.title"}})],1),e._v(" "),r("el-form-item",{staticClass:"editor",attrs:{label:"文章内容:",prop:"content"}},[r("m-quill-editor",{ref:"myQuillEditor",attrs:{width:e.quill.width,getContent:e.onEditorChange,toolbar:e.quill.toolbar,"has-border":e.quill.border,zIndex:e.quill.zIndex,"sync-output":e.quill.syncOutput,theme:e.quill.theme,disabled:e.quill.disabled,fullscreen:e.quill.full},on:{upload:e.uploadImg,blur:function(t){e.onEditorBlur(t)}},model:{value:e.form2.content,callback:function(t){e.$set(e.form2,"content",t)},expression:"form2.content"}})],1)],1),e._v(" "),r("div",{staticStyle:{width:"35%",float:"left",padding:"15px","min-width":"420px"}},[r("el-form-item",{attrs:{label:"发布到:",required:""}},[r("el-input",{staticStyle:{width:"173px"},attrs:{disabled:!0},model:{value:e.form2.classifyTypes,callback:function(t){e.$set(e.form2,"classifyTypes",t)},expression:"form2.classifyTypes"}})],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:14}},[r("el-form-item",{attrs:{label:"来源:",prop:"sourceType"}},[r("el-radio-group",{model:{value:e.form2.sourceType,callback:function(t){e.$set(e.form2,"sourceType",t)},expression:"form2.sourceType"}},[r("el-radio",{attrs:{label:"1"}},[e._v("原创")]),e._v(" "),r("el-radio",{attrs:{label:"2"}},[e._v("转载")])],1)],1)],1),e._v(" "),r("el-col",{attrs:{span:10}},[2==e.form2.sourceType?r("el-form-item",{staticClass:"source_style",attrs:{prop:"source"}},[r("el-select",{staticStyle:{"margin-left":"-68px",width:"150px"},attrs:{filterable:"",placeholder:"请选择转载来源"},model:{value:e.form2.source,callback:function(t){e.$set(e.form2,"source",t)},expression:"form2.source"}},e._l(e.cities,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1):e._e()],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"作者:"}},[r("el-input",{model:{value:e.form2.author,callback:function(t){e.$set(e.form2,"author",t)},expression:"form2.author"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"所属分类:",prop:"classifyType"}},[r("el-select",{attrs:{filterable:"",name:"classifyType",placeholder:"请选择"},model:{value:e.form2.classifyType,callback:function(t){e.$set(e.form2,"classifyType",t)},expression:"form2.classifyType"}},e._l(e.classifyTypeAll,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),r("el-form-item",{staticClass:"fabuStyle",attrs:{label:"发布账号:",prop:"userId"}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择发布账号"},model:{value:e.form2.userId,callback:function(t){e.$set(e.form2,"userId",t)},expression:"form2.userId"}},e._l(e.accounts,function(e){return r("el-option",{key:e.userId,attrs:{label:e.nickName,value:e.userId}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"附加选项:",prop:"imgType"}},[r("el-radio-group",{on:{change:e.radioChange},model:{value:e.form2.imgType,callback:function(t){e.$set(e.form2,"imgType",t)},expression:"form2.imgType"}},[r("el-radio",{attrs:{label:"1"}},[e._v("上传缩略图")]),e._v(" "),r("el-radio",{attrs:{label:"2"}},[e._v("提取第一个图为缩略图")])],1)],1),e._v(" "),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"1"==e.form2.imgType,expression:"form2.imgType == '1'"}],ref:"icon",attrs:{label:"封面图:",prop:"icon"}},[r("el-upload",{ref:"upload",attrs:{action:"",multiple:!1,limit:1,name:"newsFile","file-list":e.fileList,"list-type":"picture-card","auto-upload":!1,"on-change":e.fileChange,"on-exceed":e.fileOver,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove}},[r("i",{staticClass:"el-icon-plus"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),r("el-form-item",{attrs:{label:"Tag标签:",prop:"tagLabel"}},[r("el-input",{attrs:{placeholder:"用逗号隔开，单个标签少于12字节"},model:{value:e.form2.tagLabel,callback:function(t){e.$set(e.form2,"tagLabel",t)},expression:"form2.tagLabel"}})],1)],1)])],1)])},staticRenderFns:[]};var c=r("VU/8")(s,n,!1,function(e){r("V+3Y")},null,null);t.default=c.exports},"V+3Y":function(e,t){}});
//# sourceMappingURL=51.e80f1f75aafa8ee38b76.js.map
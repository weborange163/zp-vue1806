webpackJsonp([41],{hpxg:function(t,e){},mzUV:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("TIfe"),i={data:function(){var t=this;return{argu:{},hasFmt:!0,hasChangeFile:!1,editStatus:"2",fileList:[],imgFullSrc:"",imgSrc:"",searchInput:"",uploadData:{},baceUrl:"",artData:[],searchLinkArt:[],dialogImageUrl:"",dialogVisible:!1,imageUrl:"",editorOption:{},searchAdd:!1,bannerDialog:!1,subjectForm:{title:"",description:"",tagLabels:"",newsArticleIds:"",ariId:""},subjectRules:{title:[{required:!0,message:"请输入专题名称",trigger:"blur"},{min:1,max:30,message:"长度在 1 到 30 个字",trigger:"blur"}],description:[{required:!0,message:"请输入专题描述",trigger:"blur"},{min:1,max:500,message:"长度在 1 到 500 个字",trigger:"blur"}],icon:[{required:!0,validator:function(e,a,s){t.hasFmt?s():s(new Error("请上传图片"))},trigger:"change"}]}}},created:function(){var t=this;this.baceUrl=Object(s.a)(),this.argu=this.$route.params.argu,this.$get("/specialInfo/show",{tokenId:this.$store.state.user.tokenId,id:this.$route.params.id}).then(function(e){console.log(e),t.subjectForm=e.data[0],t.imgSrc=t.subjectForm.coverImgId,t.status=t.subjectForm.status,t.imgFullSrc=t.subjectForm.coverImgUrl,t.artData=t.subjectForm.specialNews,console.log(t.subjectForm),console.log(t.searchLinkArt),t.fileList.push({url:t.imgFullSrc})})},mounted:function(){},methods:{onSuccess:function(){},searchMore:function(){var t=this;if(this.searchLinkArt=[],this.searchInput){var e={tokenId:this.$store.state.user.tokenId,idOrTitle:this.searchInput};console.log(e),this.$post("news/getlist",e).then(function(e){if(console.log(e),e.data[0]){var a=e.data,s=[];t.artData.map(function(t){s.push(t.articleId)}),a.map(function(t){-1==s.indexOf(t.articleId)&&(t.flag=!0)}),t.searchLinkArt=a,console.log(t.artData)}else t.$message.error("很抱歉,没有匹配的文章!")})}else this.$message({message:"请输入搜索内容!",type:"warning"})},addById:function(){var t=this,e=!1;if(this.subjectForm.ariId){if(this.artData.map(function(a){if(t.subjectForm.ariId==a.articleId)return t.$message.error("此文章已经被关联!"),void(e=!0)}),e)return;var a={tokenId:this.$store.state.user.tokenId,articleIds:this.subjectForm.ariId};this.$post("news/batchGet",a).then(function(e){console.log(e),e.data[0]?(t.artData.push(e.data[0]),console.log(t.artData)):t.$message.error("请输入正确的文章ID!")})}else this.$message({message:"请输入文章ID添加!",type:"warning"})},addSubject:function(t,e){var a=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;var s=new FormData,i=[];a.artData.map(function(t){i.push(t.articleId)}),s.append("tokenId",a.$store.state.user.tokenId),s.append("status",e),s.append("description",a.subjectForm.description),s.append("title",a.subjectForm.title),s.append("tagLabels",a.subjectForm.tagLabels),s.append("newsArticleIds",i.join(",")),a.hasChangeFile&&s.append("file",a.subjectForm.file,a.subjectForm.filename),s.append("id",a.$route.params.id),s.append("editStatus",a.editStatus),a.$post("specialInfo/edit",s).then(function(t){0==t.code&&setTimeout(function(){a.$message({type:"success",message:t.msg}),a.$router.push({name:"subject",params:{argu:a.argu}})},500)})})},fanhui:function(){var t=this;this.$confirm("返回已编辑内容将重置是否继续？").then(function(e){t.$router.push({name:"subject",params:{argu:t.argu}}),done()}).catch(function(t){})},getFullUrl:function(){return this.baceUrl+"/specialInfo/edit"},miniTable:function(t){return"miniTable"},handleClick1:function(t,e,a){1==a?(e.push(t),t.flag=!1,this.$message({message:"关联成功.",type:"success"})):0==a&&(e.splice(t,1),t.flag=!0,this.$message({message:"操作成功.",type:"info"}))},handleClick:function(t,e,a){var s=this;this.$confirm("此操作将取消关联, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.splice(t,1),s.$message({type:"success",message:"操作成功!"})}).catch(function(){s.$message({type:"info",message:"已取消操作"})})},handleRemove:function(t,e){this.hasChangeFile=!0,0==e.length&&(this.hasFmt=!1)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},fileChange:function(t,e){this.$refs.icon.clearValidate(),this.subjectForm.filename=t.name,this.subjectForm.file=t.raw,this.editStatus="1",console.log(t.raw),e.length>0&&(this.hasFmt=!0)},handleExceed:function(t,e){this.$message.warning("当前限制选择 1 个文件")}},beforeRouteLeave:function(t,e,a){t.meta.keepAlive=!1,a()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-body subject-add"},[a("el-dialog",{attrs:{center:"",width:"375px",visible:t.bannerDialog,"append-to-body":"",id:"div1"},on:{"update:visible":function(e){t.bannerDialog=e}}},[a("el-form",{ref:"subjectForm",staticClass:"subjectForm",attrs:{data:t.subjectForm,"label-width":"110px"}},[a("p",{attrs:{id:"p1"}},[t._v(t._s(t.subjectForm.title))]),t._v(" "),a("p",{attrs:{id:"p2"},domProps:{innerHTML:t._s(t.subjectForm.description)}})])],1),t._v(" "),a("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("内容中心")]),t._v(" "),a("el-breadcrumb-item",[t._v("专题管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("新建专题")])],1)],1),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"text-right marBo4",staticStyle:{"margin-right":"50px"}},[a("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:t.fanhui}},[t._v("返回")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.addSubject("subjectForm",t.subjectForm.status)}}},[t._v("保存")])],1),t._v(" "),a("el-form",{ref:"subjectForm",staticStyle:{"max-width":"800px"},attrs:{model:t.subjectForm,rules:t.subjectRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"专题标题",prop:"title"}},[a("el-input",{model:{value:t.subjectForm.title,callback:function(e){t.$set(t.subjectForm,"title",e)},expression:"subjectForm.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"专题描述",prop:"description"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.subjectForm.description,callback:function(e){t.$set(t.subjectForm,"description",e)},expression:"subjectForm.description"}})],1),t._v(" "),a("el-form-item",{ref:"icon",attrs:{label:"封面缩略图",prop:"icon"}},[a("el-upload",{ref:"upload",attrs:{name:"file",multiple:!1,limit:1,action:"","list-type":"picture-card","file-list":t.fileList,"on-change":t.fileChange,"auto-upload":!1,"on-exceed":t.handleExceed,"on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})]),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("img",{attrs:{width:"100%",src:t.imgFullSrc,alt:""}})])],1),t._v(" "),a("el-form-item",{attrs:{label:"tag标签",prop:"tag"}},[a("el-input",{model:{value:t.subjectForm.tagLabels,callback:function(e){t.$set(t.subjectForm,"tagLabels",e)},expression:"subjectForm.tagLabels"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"关联文章",prop:"linkArt"}},[a("el-row",[a("el-col",{attrs:{span:18}},[a("el-input",{model:{value:t.subjectForm.ariId,callback:function(e){t.$set(t.subjectForm,"ariId",e)},expression:"subjectForm.ariId"}})],1),t._v(" "),a("el-col",{staticClass:"text-center",attrs:{span:6}},[a("el-button",{staticClass:"light_btn",on:{click:function(e){t.addById()}}},[t._v("添加")]),t._v(" "),a("el-button",{staticClass:"light_btn",on:{click:function(e){t.searchAdd=!0,t.searchLinkArt=[],t.searchInput=""}}},[t._v("搜索添加")])],1)],1)],1),t._v(" "),a("el-form-item",[a("el-table",{attrs:{data:t.artData,border:"","row-class-name":t.miniTable,"header-row-class-name":t.miniTable}},[a("el-table-column",{attrs:{prop:"title",label:"标题"}}),t._v(" "),a("el-table-column",{attrs:{prop:"articleId",label:"文章ID",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.$index,t.artData,0)}}},[t._v("取消关联")])]}}])})],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{visible:t.searchAdd},on:{"update:visible":function(e){t.searchAdd=e}}},[a("div",{staticStyle:{"margin-bottom":"20px"}},[a("el-input",{staticStyle:{width:"80%"},attrs:{size:"mini",placeholder:"请输入搜索内容"},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}}),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:t.searchMore}},[t._v("搜索")])],1),t._v(" "),a("el-table",{attrs:{data:t.searchLinkArt,border:"","row-class-name":t.miniTable,"header-row-class-name":t.miniTable}},[a("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"articleId",label:"文章ID",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.flag?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick1(e.row,t.artData,1)}}},[t._v("关联")]):a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick1(e.row,t.artData,0)}}},[t._v("取消关联")])]}}])})],1)],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(t){a("hpxg")},null,null);e.default=l.exports}});
//# sourceMappingURL=41.b6af96ee40f184a3ea2f.js.map
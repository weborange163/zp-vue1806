webpackJsonp([11],{QNcZ:function(t,e){},Ul63:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("TIfe"),l={data:function(){return{searchInput:"",uploadData:{},baceUrl:"",artData:[],searchLinkArt:[],dialogImageUrl:"",dialogVisible:!1,imageUrl:"",editorOption:{},searchAdd:!1,subjectForm:{title:"",description:"",tagLabels:"",newsArticleIds:"",ariId:""},subjectRules:{title:[{required:!0,message:"请输入专题名称",trigger:"blur"},{min:3,max:15,message:"长度在 3 到 5 个字符",trigger:"blur"}],description:[{required:!0,message:"请输入专题描述",trigger:"blur"}]}}},created:function(){this.baceUrl=Object(s.a)()},methods:{onSuccess:function(){},searchMore:function(){var t=this;if(this.searchLinkArt=[],this.searchInput){var e={tokenId:this.$store.state.user.tokenId,idOrTitle:this.searchInput};console.log(e),this.$post("news/getlist",e).then(function(e){if(console.log(e),e.data[0]){var a=e.data,s=[];t.artData.map(function(t){s.push(t.articleId)}),a.map(function(t){-1==s.indexOf(t.articleId)&&(t.flag=!0)}),t.searchLinkArt=a,console.log(t.artData)}else t.$message.error("很抱歉,没有匹配的文章!")})}else this.$message({message:"请输入搜索内容!",type:"warning"})},addById:function(){var t=this,e=!1;if(this.subjectForm.ariId){if(this.artData.map(function(a){if(t.subjectForm.ariId==a.articleId)return t.$message.error("此文章已经被关联!"),void(e=!0)}),e)return;var a={tokenId:this.$store.state.user.tokenId,articleIds:this.subjectForm.ariId};this.$post("news/batchGet",a).then(function(e){console.log(e),e.data[0]?(t.artData.push(e.data[0]),console.log(t.artData)):t.$message.error("请输入正确的文章ID!")})}else this.$message({message:"请输入文章ID添加!",type:"warning"})},addSubject:function(t,e){var a=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;console.log(t);var s=[];a.artData.map(function(t){s.push(t.articleId)}),a.uploadData={tokenId:a.$store.state.user.tokenId,status:e,title:a.subjectForm.title,description:a.subjectForm.description,tagLabels:a.subjectForm.tagLabels,newsArticleIds:s.join(",")},console.log(a.uploadData),setTimeout(function(){a.$refs.upload.submit(),a.$message({type:"success",message:"添加成功!"}),setTimeout(function(){a.$router.push({name:"subject"})},1e3)},0)})},getFullUrl:function(){return this.baceUrl+"/specialInfo/add"},miniTable:function(t){return"miniTable"},handleClick1:function(t,e,a){1==a?(e.push(t),t.flag=!1,this.$message({message:"已添加至关联列表.",type:"success"})):0==a&&(e.splice(t,1),t.flag=!0,this.$message({message:"操作成功.",type:"info"}))},handleClick:function(t,e,a){var s=this;this.$confirm("此操作将取消关联, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.splice(t,1),s.$message({type:"success",message:"操作成功!"})}).catch(function(){s.$message({type:"info",message:"已取消操作"})})},handleRemove:function(t,e){console.log(t,e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-body subject-add"},[a("div",{staticClass:"breadcrumb",staticStyle:{padding:"8px"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("内容中心")]),t._v(" "),a("el-breadcrumb-item",[t._v("专题管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("新建专题")])],1)],1),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"text-right"},[a("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.$router.back()}}},[t._v("返回")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"small"}},[t._v("预览")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.addSubject("subjectForm","3")}}},[t._v("仅保存")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"small"},on:{click:function(e){t.addSubject("subjectForm","4")}}},[t._v("保存并上线")])],1),t._v(" "),a("el-form",{ref:"subjectForm",staticStyle:{"max-width":"800px"},attrs:{model:t.subjectForm,rules:t.subjectRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"专题标题",prop:"title"}},[a("el-input",{model:{value:t.subjectForm.title,callback:function(e){t.$set(t.subjectForm,"title",e)},expression:"subjectForm.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"专题描述",prop:"description"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.subjectForm.description,callback:function(e){t.$set(t.subjectForm,"description",e)},expression:"subjectForm.description"}})],1),t._v(" "),a("el-form-item",{ref:"imgItem",attrs:{label:"封面缩略图"}},[a("el-upload",{ref:"upload",attrs:{name:"file",data:t.uploadData,multiple:!1,limit:1,action:t.getFullUrl(),"on-success":t.onSuccess,"list-type":"picture-card","auto-upload":!1,"on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})]),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1),t._v(" "),a("el-form-item",{attrs:{label:"tag标签",prop:"tag"}},[a("el-input",{model:{value:t.subjectForm.tagLabels,callback:function(e){t.$set(t.subjectForm,"tagLabels",e)},expression:"subjectForm.tagLabels"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"关联文章",prop:"linkArt"}},[a("el-row",[a("el-col",{attrs:{span:18}},[a("el-input",{model:{value:t.subjectForm.ariId,callback:function(e){t.$set(t.subjectForm,"ariId",e)},expression:"subjectForm.ariId"}})],1),t._v(" "),a("el-col",{staticClass:"text-center",attrs:{span:6}},[a("el-button",{staticClass:"light_btn",on:{click:function(e){t.addById()}}},[t._v("添加")]),t._v(" "),a("el-button",{staticClass:"light_btn",on:{click:function(e){t.searchAdd=!0,t.searchLinkArt=[],t.searchInput=""}}},[t._v("搜索添加")])],1)],1)],1),t._v(" "),a("el-form-item",[a("el-table",{attrs:{data:t.artData,border:"","row-class-name":t.miniTable,"header-row-class-name":t.miniTable}},[a("el-table-column",{attrs:{prop:"title",label:"标题"}}),t._v(" "),a("el-table-column",{attrs:{prop:"articleId",label:"文章ID",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.$index,t.artData,0)}}},[t._v("取消关联")])]}}])})],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{visible:t.searchAdd},on:{"update:visible":function(e){t.searchAdd=e}}},[a("div",{staticStyle:{"margin-bottom":"20px"}},[a("el-input",{staticStyle:{width:"80%"},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}}),t._v(" "),a("el-button",{staticClass:"light_btn",on:{click:t.searchMore}},[t._v("搜索")])],1),t._v(" "),a("el-table",{attrs:{data:t.searchLinkArt,border:"","row-class-name":t.miniTable,"header-row-class-name":t.miniTable}},[a("el-table-column",{attrs:{prop:"title",label:"标题",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"articleId",label:"文章ID",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.flag?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick1(e.row,t.artData,1)}}},[t._v("关联")]):a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick1(e.row,t.artData,0)}}},[t._v("取消关联")])]}}])})],1)],1)],1)])},staticRenderFns:[]};var r=a("VU/8")(l,i,!1,function(t){a("QNcZ")},null,null);e.default=r.exports}});
//# sourceMappingURL=11.6a9abfada580d3140d5b.js.map
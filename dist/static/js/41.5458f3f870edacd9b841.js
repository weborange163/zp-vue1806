webpackJsonp([41],{"/pwt":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("bOdI"),n=i.n(a),s=i("rx7x"),o=i("TIfe"),l=i("qorP"),r={data:function(){var t,e=this;return t={argu:{},hasFmt:!1,bannerForm:{type:"专题"},dialogImageUrl:"",dialogVisible2:!1,uploadData:{},baceUrl:"",recoIndex:0,bannerRules:{title_short:[{required:!0,message:"请输入短标题",trigger:"blur"},{min:1,max:10,message:"短标题在10字以内",trigger:"blur"}],icon:[{required:!0,validator:function(t,i,a){e.hasFmt?a():a(new Error("请上传图片"))},trigger:"change"}]},bannerDialog:!1,recommendRadio:"",subjectList:[],per_page:10,currentPage:1,total_pages:0},n()(t,"currentPage",1),n()(t,"btnTable",s.btnTable),n()(t,"timeVal",""),n()(t,"subjectSearch",""),n()(t,"subjectSelect",""),n()(t,"options",[{value:"",label:"全部"},{value:"3",label:"待上线"},{value:"4",label:"已上线"},{value:"5",label:"已下线"}]),n()(t,"value",""),n()(t,"value6",""),n()(t,"inputs",""),n()(t,"topFlag",""),n()(t,"dialogVisible",!1),n()(t,"dialogVisible1",!1),n()(t,"loading",!1),n()(t,"loading2",!1),n()(t,"upData",[]),t},computed:{upDataLength:function(){return this.upData.length-1}},created:function(){this.$route.params.argu&&(this.argu=this.$route.params.argu,this.value=this.argu.a,this.value6=this.argu.b,this.inputs=this.argu.c,this.per_page=this.argu.d,this.currentPage=this.argu.e),this.getSubjectList(),this.baceUrl=Object(o.a)()},methods:{handleCopy:function(t,e){Object(l.a)(t,e)},toBanner:function(){var t=this;this.$refs.bannerForm.validate(function(e){if(e){var i=new FormData;i.append("tokenId",t.$store.state.user.tokenId),i.append("titleShort",t.bannerForm.title_short),i.append("linkId",t.bannerForm.link),i.append("bannerType","2"),i.append("articleId",t.bannerForm.articleId),i.append("file",t.bannerForm.file,t.bannerForm.filename),t.$post("bannerInfo/save",i).then(function(e){console.log(e),0==e.code?(t.$message({type:"success",message:e.msg}),setTimeout(function(){t.getSubjectList()},1e3),t.bannerDialog=!1):t.$message({type:"warning",message:e.msg?e.msg:"出错了"})})}})},sureReco:function(){var t=this;if("1"==this.recommendRadio){console.log(this.recoIndex);var e={tokenId:this.$store.state.user.tokenId,id:this.subjectList[this.recoIndex].id,topFlag:"1"};this.$post("/specialInfo/top",e).then(function(e){console.log(e,e.code),"2"==e.code?t.$message({message:e.msg,type:"warning"}):"0"==e.code&&(t.$message({type:"success",message:"操作成功!"}),setTimeout(function(){t.getSubjectList()},1e3))}),this.dialogVisible1=!1}else if("2"==this.recommendRadio){if("0"!=this.subjectList[this.recoIndex].recommend)return this.$message({message:"本条消息已经推荐到了banner,请去banner列表查看",type:"warning"}),void(this.dialogVisible1=!1);this.bannerForm.title=this.subjectList[this.recoIndex].title,this.bannerForm.link=this.subjectList[this.recoIndex].id,this.bannerForm.articleId=this.subjectList[this.recoIndex].article_id,this.dialogVisible1=!1,this.bannerDialog=!0}else this.$message("请选择置顶或者banner")},changeIndex:function(t,e,i){if("isUp"==i){var a=e[t],n=e[t-1];e.splice(t-1,1,a),e.splice(t,1,n)}else if("isDown"==i){a=e[t],n=e[t+1];e.splice(t+1,1,a),e.splice(t,1,n)}else if("toTop"==i){a=e[t];e.splice(t,1),e.unshift(a)}else{a=e[t];e.splice(t,1),e.push(a)}},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})},publishWaitTop:function(){var t=this;this.dialogVisible=!0,this.loading=!0,this.$get("/specialInfo/publishWaitTop",{tokenId:this.$store.state.user.tokenId}).then(function(e){t.loading=!1,"0"==e.code?t.upData=e.data:t.$message({type:"errpr",message:e.msg?e.msg:"获取列表失败"})})},toPublish:function(){var t=this,e=[];this.upData.map(function(t,i){e.push(t.id)});var i={tokenId:this.$store.state.user.tokenId,ids:e.join(",")};console.log(i),this.$post("/specialInfo/publishTop",i).then(function(e){"0"==e.code?(t.$message({type:"success",message:e.msg?e.msg:"发布成功"}),t.getSubjectList(),t.dialogVisible=!1):t.$message({type:"errpr",message:e.msg?e.msg:"发布失败"})})},recommend:function(t,e){console.log(t,e),"1"==e.top_flag?this.$message({message:"本条消息已经置顶,需取消置顶才能操作",type:"warning"}):"1"==e.recommend?this.$message({message:"本条消息已经被推荐到了banner并上线,请去banner列表查看",type:"warning"}):(this.dialogVisible1=!0,this.recoIndex=t,console.log(e,this.recoIndex))},getSubjectList:function(t){var e=this;this.loading2=!0,this.currentPage=t||1;var i={tokenId:this.$store.state.user.tokenId,limit:this.per_page,offset:this.currentPage,status:this.value,simpleParameter:this.inputs};this.value6&&(i.startTime=this.value6[0],i.endTime=this.value6[1]),this.$post("specialInfo/list",i).then(function(t){0==t.code&&(console.log(t.data[0].rows),e.subjectList=t.data[0].rows,e.total_pages=t.data[0].total,e.loading2=!1)})},handleCurrentChange:function(t){this.getSubjectList(t)},deleteRow:function(t,e){var i=this;console.log(t,e),this.$confirm("此操作将永久删除该专题, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={tokenId:i.$store.state.user.tokenId,id:e.id};i.$post("/specialInfo/delete",t).then(function(t){console.log(t),i.$message({type:"success",message:"删除成功!"}),i.getSubjectList()})}).catch(function(){i.$message({type:"info",message:"已取消删除"})})},cancelUp:function(t,e){var i=this;this.$confirm("确定要取消置顶吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={tokenId:i.$store.state.user.tokenId,id:e.id,topFlag:"0"};i.$post("/specialInfo/top",t).then(function(t){0==t.code?(i.$message({type:"success",message:t.msg}),i.getSubjectList()):3==t.code?i.$message({type:"warning",message:t.msg}):i.$message({type:"error",message:t.msg?t.msg:"操作失败"})})}).catch(function(){i.$message({type:"info",message:"取消失败"})})},cancelUp1:function(t,e){var i=this;this.$confirm("确定要置顶吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={tokenId:i.$store.state.user.tokenId,id:e.id,topFlag:"1"};i.$post("/specialInfo/top",t).then(function(t){i.$message({type:"success",message:"置顶成功!"}),i.getSubjectList()})}).catch(function(){i.$message({type:"info",message:"置顶失败"})})},top_flag1:function(t,e){var i=this;this.$confirm("确定要下线吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={tokenId:i.$store.state.user.tokenId,id:e.id,status:"5"};i.$post("/specialInfo/isOnline",t).then(function(t){i.$message({type:"success",message:"下线成功!"}),i.getSubjectList()})}).catch(function(){i.$message({type:"info",message:"下线失败"})})},handleRemove:function(t,e){console.log(t,e)},handleSizeChange:function(t){this.per_page=t,this.getSubjectList()},handlePictureCardPreview:function(t){console.log(t),this.dialogImageUrl=t.url,this.dialogVisible2=!0},fileChange:function(t,e){this.$refs.icon.clearValidate(),this.bannerForm.filename=t.name,this.bannerForm.file=t.raw,console.log(t.raw),e.length>0&&(this.hasFmt=!0)},handleExceed:function(t,e){this.$message.warning("当前限制选择 1 个文件")},top_flag2:function(t,e){var i=this;this.$confirm("确定上线吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={tokenId:i.$store.state.user.tokenId,id:e.id,status:"4"};i.$post("/specialInfo/isOnline",t).then(function(t){i.$message({type:"success",message:"上线成功!"}),i.getSubjectList()})}).catch(function(){i.$message({type:"info",message:"上线失败"})})}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-body subject"},[i("el-dialog",{attrs:{center:"",title:"设置置顶内容排序",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.upData,border:"","row-class-name":t.btnTable,"header-row-class-name":t.btnTable}},[i("el-table-column",{attrs:{prop:"title",label:"标题"}}),t._v(" "),i("el-table-column",{staticClass:"text-center",attrs:{prop:"name",label:"选择",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[0!=e.$index?i("el-button",{attrs:{type:"text"},on:{click:function(i){t.changeIndex(e.$index,t.upData,"toTop")}}},[i("i",{staticClass:"iconfont icon-Gototop"})]):i("el-button",{attrs:{type:"text",disabled:""}},[i("i",{staticClass:"iconfont icon-Gototop unclick"})]),t._v(" "),0!=e.$index?i("el-button",{attrs:{type:"text"},on:{click:function(i){t.changeIndex(e.$index,t.upData,"isUp")}}},[i("i",{staticClass:"iconfont icon-up"})]):i("el-button",{attrs:{type:"text",disabled:""}},[i("i",{staticClass:"iconfont icon-up unclick"})]),t._v(" "),e.$index!=t.upDataLength?i("el-button",{attrs:{type:"text"},on:{click:function(i){t.changeIndex(e.$index,t.upData,"isDown")}}},[i("i",{staticClass:"iconfont icon-down"})]):i("el-button",{attrs:{type:"text",disabled:""}},[i("i",{staticClass:"iconfont icon-down",staticStyle:{cursor:"not-allowed"}})]),t._v(" "),e.$index!=t.upDataLength?i("el-button",{attrs:{type:"text"},on:{click:function(i){t.changeIndex(e.$index,t.upData,"toBottom")}}},[i("i",{staticClass:"iconfont icon-Gotobottom"})]):i("el-button",{attrs:{type:"text",disabled:""}},[i("i",{staticClass:"iconfont icon-Gotobottom",staticStyle:{cursor:"not-allowed"}})])]}}])})],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.toPublish()}}},[t._v("发 布")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"推荐到新闻主页",visible:t.dialogVisible1,center:"",width:"30%"},on:{"update:visible":function(e){t.dialogVisible1=e}}},[i("el-radio",{staticClass:"marBo4",attrs:{label:"1"},model:{value:t.recommendRadio,callback:function(e){t.recommendRadio=e},expression:"recommendRadio"}},[t._v("首页专题(最多可以推荐6条)")]),i("br"),t._v(" "),i("el-radio",{attrs:{label:"2"},model:{value:t.recommendRadio,callback:function(e){t.recommendRadio=e},expression:"recommendRadio"}},[t._v("banner")]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticClass:"light_btn",on:{click:function(e){t.dialogVisible1=!1,t.recommendRadio=""}}},[t._v("取 消")]),t._v(" "),i("el-button",{staticClass:"light_btn",attrs:{type:"primary"},on:{click:t.sureReco}},[t._v("推 荐")])],1)],1),t._v(" "),i("el-dialog",{attrs:{center:"",width:"30%",visible:t.bannerDialog,"append-to-body":""},on:{"update:visible":function(e){t.bannerDialog=e}}},[i("el-form",{ref:"bannerForm",staticClass:"bannerForm",attrs:{model:t.bannerForm,rules:t.bannerRules,"label-width":"110px"}},[i("el-form-item",{attrs:{label:"原文标题"}},[i("el-input",{attrs:{disabled:!0,size:"mini"},model:{value:t.bannerForm.title,callback:function(e){t.$set(t.bannerForm,"title",e)},expression:"bannerForm.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"短标题",prop:"title_short"}},[i("el-input",{attrs:{size:"mini"},model:{value:t.bannerForm.title_short,callback:function(e){t.$set(t.bannerForm,"title_short",e)},expression:"bannerForm.title_short"}})],1),t._v(" "),i("el-form-item",{ref:"icon",attrs:{label:"banner图片","label-width":"110px",prop:"icon"}},[i("el-upload",{ref:"upload",attrs:{action:"",multiple:!1,limit:1,name:"file","list-type":"picture-card","auto-upload":!1,"on-exceed":t.handleExceed,"on-preview":t.handlePictureCardPreview,"on-change":t.fileChange,"on-remove":t.handleRemove}},[i("i",{staticClass:"el-icon-plus"})]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible2},on:{"update:visible":function(e){t.dialogVisible2=e}}},[i("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1),t._v(" "),i("el-form-item",{attrs:{label:"类型"}},[i("el-input",{attrs:{size:"mini",disabled:!0},model:{value:t.bannerForm.type,callback:function(e){t.$set(t.bannerForm,"type",e)},expression:"bannerForm.type"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"链接"}},[i("el-input",{attrs:{size:"mini",disabled:!0},model:{value:t.bannerForm.articleId,callback:function(e){t.$set(t.bannerForm,"articleId",e)},expression:"bannerForm.articleId"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticClass:"light_btn",on:{click:function(e){t.bannerDialog=!1,t.recommendRadio=""}}},[t._v("取 消")]),t._v(" "),i("el-button",{staticClass:"light_btn",attrs:{type:"primary"},on:{click:t.toBanner}},[t._v("保 存")])],1)],1),t._v(" "),i("div",{staticClass:"page-header"},[i("el-row",[i("el-col",{attrs:{span:3}},[i("el-select",{attrs:{placeholder:"发布来源",size:"mini"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),i("el-col",{staticClass:"text-right",staticStyle:{"padding-right":"4px"},attrs:{span:2}},[i("span",{staticStyle:{"line-height":"28px"}},[t._v("上线时间")])]),t._v(" "),i("el-col",{attrs:{span:9}},[i("el-date-picker",{staticStyle:{width:"95%"},attrs:{size:"mini",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.value6,callback:function(e){t.value6=e},expression:"value6"}})],1),t._v(" "),i("el-col",{attrs:{span:6,offset:4}},[i("el-input",{staticStyle:{width:"70%"},attrs:{placeholder:"标题、专题ID",size:"mini"},model:{value:t.inputs,callback:function(e){t.inputs=e},expression:"inputs"}}),t._v(" "),i("el-button",{staticClass:"light_btn",attrs:{size:"mini"},nativeOn:{click:function(e){e.preventDefault(),t.getSubjectList()}}},[t._v("搜索")])],1)],1)],1),t._v(" "),i("div",{staticClass:"box"},[i("div",{staticClass:"text-right marBo4"},[i("router-link",{attrs:{to:{name:"subject-add"}}},[i("el-button",{staticClass:"light_btn",attrs:{size:"mini"}},[t._v("新建专题")])],1),t._v(" "),i("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:function(e){t.publishWaitTop()}}},[t._v("首页排序")]),t._v(" "),i("el-button",{staticClass:"light_btn",attrs:{size:"mini"},nativeOn:{click:function(e){e.preventDefault(),t.getSubjectList()}}},[t._v("刷新")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading2,expression:"loading2"}],attrs:{data:t.subjectList,border:"",stripe:"","row-class-name":t.btnTable(),"header-row-class-name":t.btnTable()}},[i("el-table-column",{attrs:{label:"序号",type:"index",width:"50"}}),t._v(" "),i("el-table-column",{attrs:{label:"专题标题",prop:"title"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.top_flag?i("i",{staticClass:"iconfont icon-zhiding",staticStyle:{color:"#A30001"}}):t._e(),t._v(" "),"1"==e.row.recommend?i("i",{staticClass:"iconfont icon-banner",staticStyle:{color:"#00C621","vertical-align":"middle","font-size":"22px"}}):t._e(),t._v(" "),"2"==e.row.recommend?i("i",{staticClass:"iconfont icon-banner",staticStyle:{color:"#333","vertical-align":"middle","font-size":"22px"}}):t._e(),t._v(" "),i("span",[t._v(t._s(e.row.title))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"专题封面",prop:"cover_img_id",width:"80"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{attrs:{src:t.row.cover_img_url,alt:""}})]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"发布状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.status?i("p",[t._v("新建")]):t._e(),t._v(" "),"3"==e.row.status?i("p",{staticClass:"dshx"},[t._v("待上线")]):t._e(),t._v(" "),"4"==e.row.status?i("p",{staticClass:"yshx"},[t._v("已上线")]):t._e(),t._v(" "),"5"==e.row.status?i("p",{staticClass:"yxx"},[t._v("已下线")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"上线时间",prop:"online_time",width:"160"}}),t._v(" "),i("el-table-column",{attrs:{label:"创建时间",prop:"create_time",width:"180"}}),t._v(" "),i("el-table-column",{attrs:{label:"专题ID",prop:"article_id",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.article_id))]),t._v(" "),i("el-button",{staticClass:"light_btn f-right",on:{click:function(i){t.handleCopy(e.row.article_id,i)}}},[t._v("复制")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"220",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.top_flag?i("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},nativeOn:{click:function(i){i.preventDefault(),t.cancelUp(e.$index,e.row)}}},[t._v(" 取消置顶 ")]):t._e(),t._v(" "),"4"==e.row.status&&"1"!=e.row.top_flag&&"1"!=e.row.recommend?i("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},nativeOn:{click:function(i){i.preventDefault(),t.top_flag1(e.$index,e.row)}}},[t._v("下线")]):i("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text",disabled:""}},[t._v("下线")]),t._v(" "),"4"!=e.row.status?i("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},nativeOn:{click:function(i){i.preventDefault(),t.top_flag2(e.$index,e.row)}}},[t._v("上线")]):t._e(),t._v(" "),"4"==e.row.status?i("el-button",{attrs:{type:"text"},nativeOn:{click:function(i){i.preventDefault(),t.recommend(e.$index,e.row)}}},[i("i",{staticClass:"iconfont icon-share"})]):t._e(),t._v(" "),i("router-link",{attrs:{to:{name:"subject-edit",params:{id:e.row.id,argu:{a:t.value,b:t.value6,c:t.inputs,d:t.per_page,e:t.currentPage}}}}},[i("el-button",{attrs:{type:"text"}},[i("i",{staticClass:"iconfont icon-edit"})])],1),t._v(" "),"4"!=e.row.status&&"0"==e.row.recommend?i("el-button",{attrs:{type:"text"},nativeOn:{click:function(i){i.preventDefault(),t.deleteRow(e.$index,e.row)}}},[i("i",{staticClass:"iconfont icon-delete"})]):i("el-button",{attrs:{type:"text",disabled:""}},[i("i",{staticClass:"iconfont icon-delete"})])]}}])})],1),t._v(" "),i("div",{staticStyle:{"margin-top":"20px"}},[i("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,20,30,40],"page-size":this.per_page,layout:"total, sizes, prev, pager, next, jumper",total:this.total_pages},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)],1)},staticRenderFns:[]};var u=i("VU/8")(r,c,!1,function(t){i("3Yaw")},null,null);e.default=u.exports},"3Yaw":function(t,e){}});
//# sourceMappingURL=41.5458f3f870edacd9b841.js.map
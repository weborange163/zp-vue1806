webpackJsonp([49],{hLMA:function(t,e){},ogbC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("TIfe"),s={name:"home",data:function(){var t=this;return{bannerForm:{loading:!1,title:"",file:"",filename:"",title_short:"",articleId:"",type:"新闻",link:""},bannerRules:{title_short:[{required:!0,message:"请输入短标题",trigger:"blur"},{min:1,max:10,message:"短标题在10字以内",trigger:"blur"}],icon:[{required:!0,validator:function(e,a,i){t.hasFmt?i():i(new Error("请上传图片"))},trigger:"change"}]},bannerDialog:!1,loading:!1,multipleSelection:[],activeTab:"first",recommendRadio:"",recoIndex:0,dialogVisible:!1,dialogVisible1:!1,dialogVisible2:!1,status:"",per_page1:10,total_pages1:0,currentPage1:1,params:{},upData:[],tableData:[],optionss:[{value1:"",label:"全部"},{value1:"3",label:"APP"},{value1:"1",label:"后台发布"},{value1:"2",label:"数据爬取"}],optionsss:[{value2:"online",label:"上线时间"},{value2:"create",label:"创建时间"},{value2:"offline",label:"下线时间"},{value2:"audit",label:"审核时间"}],value6:"",inputs:"",value:"",value1:"",value2:"",dataList:[],ids:[],baceUrl:"",dialogImageUrl:"",uploadData:{},hasFmt:!1,fromparams:{},argu:{}}},created:function(){this.baceUrl=Object(i.a)(),this.$route.params.argu&&(this.argu=this.$route.params.argu,this.value1=this.argu.a,this.value2=this.argu.b,this.value6=this.argu.c,this.inputs=this.argu.d,this.activeTab=this.argu.e,this.per_page1=this.argu.f,this.currentPage1=this.argu.g,"fourth"==this.activeTab&&(this.status="0"),"second"==this.activeTab&&(this.status="4"),"third"==this.activeTab&&(this.status="5"),"first"==this.activeTab&&(this.status="")),this.newsList()},mounted:function(){},computed:{upDataLength:function(){return this.upData.length-1}},methods:{onOff:function(t,e,a){var i=this;this.$confirm("确定要"+a+"该新闻吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={tokenId:i.$store.state.user.tokenId,status:e,id:t.id};i.$post("news/isOnline",a).then(function(t){console.log(t),i.newsList(),i.$message({type:"success",message:t.msg})})}).catch(function(){i.$message({type:"info",message:"操作已取消"})}),console.log(t)},handleRemove:function(t,e){console.log(t,e),0==e.length&&(this.hasFmt=!1)},handlePictureCardPreview:function(t){console.log(t),this.dialogImageUrl=t.url,this.dialogVisible2=!0},getFullUrl:function(){return this.baceUrl+"/bannerInfo/save"},publishWaitTop:function(){var t=this;this.dialogVisible=!0,this.loading=!0,this.$get("news/publishWaitTop",{tokenId:this.$store.state.user.tokenId,articleType:"1"}).then(function(e){t.loading=!1,console.log(e),t.upData=e.data})},toPublish:function(){var t=this,e=[];this.upData.map(function(t,a){e.push(t.id)});var a={tokenId:this.$store.state.user.tokenId,ids:e.join(",")};console.log(a),this.$post("news/publishTop",a).then(function(e){t.$message({message:e.msg,type:"success"})}),this.dialogVisible=!1},toAudit:function(t){var e=this;this.$confirm("是否提交到审核列表?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then(function(){var a={tokenId:e.$store.state.user.tokenId,ids:t.id};e.$post("news/batchWaitCheck",a).then(function(t){e.newsList(),e.$message({type:"success",message:"操作成功!"})})}).catch(function(){e.$message({type:"info",message:"操作已取消"})})},newsShow:function(t){console.log(t.id);var e={tokenId:this.$store.state.user.tokenId,id:t.id};this.$get("news/show",e).then(function(t){console.log(t)})},newsList:function(){var t=this;this.loading=!0;var e={articleType:"1",tokenId:this.$store.state.user.tokenId,limit:this.per_page1,offset:this.currentPage1,status:this.status,publishSource:this.value1,timeType:this.value2,simpleParameter:this.inputs,startTime:this.value6[0],endTime:this.value6[1]};""==this.status?(e.queryType="LineAndCreate",delete e.status):(e.status=this.status,delete e.queryType),this.$post("/news/list",e).then(function(e){0==e.code&&(t.loading=!1,t.$message({message:"成功获取新闻列表",type:"success"}),t.argu.g&&(t.currentPage1=t.argu.g,t.argu.g=0),t.tableData=e.data[0].rows,t.total_pages1=e.data[0].total)})},handleCurrentChange1:function(t){this.currentPage1=t,this.newsList()},toBanner:function(){var t=this;this.$refs.bannerForm.validate(function(e){if(e){var a=new FormData;a.append("file",t.bannerForm.file,t.bannerForm.filename),a.append("tokenId",t.$store.state.user.tokenId),a.append("titleShort",t.bannerForm.title_short),a.append("bannerType","1"),a.append("linkId",t.bannerForm.link),a.append("articleId",t.bannerForm.articleId),console.log(a),t.$post("bannerInfo/save",a).then(function(e){console.log(e),0==e.code?(t.$message({type:"success",message:e.msg}),setTimeout(function(){t.newsList()},1e3),t.bannerDialog=!1):t.$message({type:"warning",message:e.msg?e.msg:"出错了"})})}})},fileChange:function(t,e){this.bannerForm.filename=t.name,this.bannerForm.file=t.raw,console.log(t.raw),e.length>0&&(this.hasFmt=!0)},toAudits:function(){var t=this;0!=this.ids?this.$confirm("确定要提交审核吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then(function(){var e={tokenId:t.$store.state.user.tokenId,ids:t.ids.join(",")};console.log(e),t.$post("news/batchWaitCheck",e).then(function(e){console.log(e),t.newsList(),t.$message({type:"success",message:"提交成功!"})})}).catch(function(){t.$message({type:"info",message:"操作已取消"})}):this.$message({message:"您没有勾选任何文章!",type:"warning"})},handleSelectionChange:function(t){var e=this;this.multipleSelection=t,this.ids=[],this.multipleSelection.map(function(t){e.ids.push(t.id)})},handleClick:function(t,e){this.currentPage1=1,this.value1="",this.value2="",this.inputs="",this.value6="","fourth"==t.name&&(this.status="0"),"second"==t.name&&(this.status="4"),"third"==t.name&&(this.status="5"),"first"==t.name&&(this.status=""),this.newsList()},sureReco:function(){var t=this;if(this.bannerForm={title:"",file:"",filename:"",title_short:"",articleId:"",type:"新闻",link:""},"1"==this.recommendRadio){console.log(this.recoIndex);var e={tokenId:this.$store.state.user.tokenId,id:this.tableData[this.recoIndex].id,topFlag:"1"};this.$post("news/top",e).then(function(e){console.log(e,e.code),"2"==e.code?t.$message({message:e.msg,type:"warning"}):"0"==e.code&&(t.$message({type:"success",message:"操作成功!"}),setTimeout(function(){t.newsList()},1e3))}),this.dialogVisible1=!1}else if("2"==this.recommendRadio){if("0"!=this.tableData[this.recoIndex].recommend)return this.$message({message:"本条消息已经推荐到了banner,请去banner列表查看",type:"warning"}),void(this.dialogVisible1=!1);this.bannerForm.title=this.tableData[this.recoIndex].title,this.bannerForm.link=this.tableData[this.recoIndex].id,this.bannerForm.articleId=this.tableData[this.recoIndex].article_id,this.dialogVisible1=!1,this.bannerDialog=!0}else this.$message("请选择置顶或者banner")},recommend:function(t,e){"1"==e.top_flag?this.$message({message:"本条消息已经置顶,需取消置顶才能操作",type:"warning"}):"1"==e.recommend?this.$message({message:"本条消息已经被推荐到了banner并上线,请去banner列表查看",type:"warning"}):(this.dialogVisible1=!0,this.recoIndex=t,console.log(e,this.recoIndex))},cancelUp:function(t){var e=this;this.$confirm("确定要取消置顶吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={tokenId:e.$store.state.user.tokenId,id:t.id,topFlag:"0"};console.log(a.id),e.$post("news/top",a).then(function(t){console.log(t),e.$message({type:"success",message:"操作成功!"}),e.newsList()})}).catch(function(){e.$message({type:"info",message:"已取消操作"})})},changeIndex:function(t,e,a){if("isUp"==a){var i=e[t],s=e[t-1];e.splice(t-1,1,i),e.splice(t,1,s)}else{i=e[t],s=e[t+1];e.splice(t+1,1,i),e.splice(t,1,s)}},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})},guanlian:function(t){[{id:1}].filter(function(e,a){return e.id===t})},deleteRow:function(t,e){var a=this;this.$confirm("此操作将永久删除该新闻, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={tokenId:a.$store.state.user.tokenId,id:e.id};a.$post("news/delete",t).then(function(t){a.$message({type:"success",message:"删除成功!"}),a.newsList()})}).catch(function(){a.$message({type:"info",message:"已取消删除"})}),console.log(t,e)},miniTable:function(t){return"miniTable"},btnTable:function(t){return"btnTable"},handleExceed:function(t,e){this.$message.warning("当前限制选择 1 个文件")},handleSizeChange1:function(t){this.per_page1=t,this.newsList()}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-body news"},[a("div",{staticClass:"page-header"},[a("el-row",[a("el-col",{attrs:{span:4}},[t._v("\n\t\t\t\t\t发布来源:\n\t\t\t\t\t"),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"发布来源",size:"mini"},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}},t._l(t.optionss,function(t){return a("el-option",{key:t.value1,attrs:{label:t.label,value:t.value1}})}))],1),t._v(" "),a("el-col",{attrs:{span:3}},[a("el-select",{attrs:{placeholder:"时间类型",size:"mini"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}},t._l(t.optionsss,function(t){return a("el-option",{key:t.value2,attrs:{label:t.label,value:t.value2}})}))],1),t._v(" "),a("el-col",{staticClass:"padLe4",attrs:{span:6}},[a("el-date-picker",{staticStyle:{width:"90%"},attrs:{size:"mini",type:"datetimerange","value-format":"yyyy-MM-dd hh:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["00:00:00","00:00:00"]},model:{value:t.value6,callback:function(e){t.value6=e},expression:"value6"}})],1),t._v(" "),a("el-col",{attrs:{span:6,offset:4}},[a("el-input",{staticStyle:{width:"70%","margin-right":"5%"},attrs:{size:"mini",placeholder:"标题、创建人、文章ID"},model:{value:t.inputs,callback:function(e){t.inputs=e},expression:"inputs"}}),t._v(" "),a("el-button",{staticClass:"light_btn",staticStyle:{width:"20%"},attrs:{size:"mini"},nativeOn:{click:function(e){e.preventDefault(),t.newsList()}}},[t._v("搜索")])],1)],1)],1),t._v(" "),a("div",{staticClass:"box"},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[a("el-tab-pane",{attrs:{label:"全部",name:"first"}},[a("div",{staticClass:"tab1"},[a("div",{staticClass:"text-right marBo4"},[a("router-link",{attrs:{to:{name:"news-add",params:{argu:{a:t.value1,b:t.value2,c:t.value6,d:t.inputs,e:t.activeTab,f:t.per_page1,g:t.currentPage1}}}}},[a("el-button",{staticClass:"light_btn",attrs:{size:"mini"}},[t._v("添加新闻")])],1),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:t.publishWaitTop}},[t._v("置顶排序")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:function(e){t.newsList()}}},[t._v("刷新")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData,border:"",stripe:"","row-class-name":t.btnTable,"header-row-class-name":t.btnTable}},[a("el-table-column",{attrs:{label:"序号",type:"index",align:"center",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{label:"标题",prop:"title"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.top_flag?a("i",{staticClass:"iconfont icon-zhiding",staticStyle:{color:"#A30001"}}):t._e(),t._v(" "),"1"==e.row.recommend?a("i",{staticClass:"iconfont icon-banner",staticStyle:{color:"#00C621","vertical-align":"middle","font-size":"22px"}}):t._e(),t._v(" "),"2"==e.row.recommend?a("i",{staticClass:"iconfont icon-banner",staticStyle:{color:"#333","vertical-align":"middle","font-size":"22px"}}):t._e(),t._v(" "),"1"==e.row.specialNewsStatus?a("i",{staticClass:"iconfont icon-zhuanti",staticStyle:{color:"#FEB210","vertical-align":"middle","font-size":"18px"}}):t._e(),t._v(" "),"2"==e.row.specialNewsStatus?a("i",{staticClass:"iconfont icon-zhuanti",staticStyle:{color:"#333","vertical-align":"middle","font-size":"18px"}}):t._e(),t._v(" "),a("span",[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建人",prop:"createUser",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"发布状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.status?a("p",[t._v("新建")]):t._e(),t._v(" "),"4"==e.row.status?a("p",{staticClass:"yshx"},[t._v("已上线")]):t._e(),t._v(" "),"5"==e.row.status?a("p",{staticClass:"yxx"},[t._v("已下线")]):t._e(),t._v(" "),"1"==e.row.status?a("p",{staticClass:"dshx"},[t._v("待审核")]):t._e(),t._v(" "),"3"==e.row.status?a("p",{staticClass:"yxx"},[t._v("审核不通过")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"发布来源",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.publish_source?a("p",[t._v("pc后台")]):t._e(),t._v(" "),"2"==e.row.publish_source?a("p",[t._v("数据爬取")]):t._e(),t._v(" "),"3"==e.row.publish_source?a("p",[t._v("APP端")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"上线时间",prop:"online_time",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{label:"文章ID",prop:"article_id",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"240",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.top_flag?a("el-button",{staticClass:"marR10",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.cancelUp(e.row)}}},[t._v("取消置顶")]):t._e(),t._v(" "),"0"==e.row.status?a("el-button",{staticClass:"marR10",attrs:{type:"text"},on:{click:function(a){t.toAudit(e.row)}}},[t._v("提交审核")]):t._e(),t._v(" "),"4"==e.row.status&&"1"!=e.row.top_flag&&"1"!=e.row.recommend&&1!=e.row.specialNewsStatus?a("el-button",{staticClass:"marR10",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},on:{click:function(a){t.onOff(e.row,"5","下线")}}},[t._v("下线")]):a("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text",disabled:""}},[t._v("下线")]),t._v(" "),"5"==e.row.status?a("el-button",{staticClass:"marR10",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},on:{click:function(a){t.onOff(e.row,"4","上线")}}},[t._v("上线")]):t._e(),t._v(" "),a("router-link",{attrs:{to:{name:"news-lookes",params:{id:e.row.id}}}},[a("el-button",{staticClass:"marR10",attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-see"})])],1),t._v(" "),"4"==e.row.status&&"3"!=e.row.content_type?a("el-button",{staticClass:"marR10",attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.recommend(e.$index,e.row)}}},[a("i",{staticClass:"iconfont icon-share"})]):a("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text",disabled:""}},[a("i",{staticClass:"iconfont icon-share"})]),t._v(" "),a("router-link",{attrs:{to:{name:"news-edit",params:{id:e.row.id,argu:{a:t.value1,b:t.value2,c:t.value6,d:t.inputs,e:t.activeTab,f:t.per_page1,g:t.currentPage1}}}}},["0"!=e.row.status&&"5"!=e.row.status||"3"==e.row.publish_source?t._e():a("el-button",{staticClass:"marR10",attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-edit"})])],1),t._v(" "),"1"!=e.row.top_flag&&"4"!=e.row.status&&"0"==e.row.recommend&&0==e.row.specialNewsStatus?a("el-button",{attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.deleteRow(e.$index,e.row)}}},[a("i",{staticClass:"iconfont icon-delete"})]):a("el-button",{staticClass:"marR10",attrs:{type:"text",disabled:""}},[a("i",{staticClass:"iconfont icon-delete unclick"})])]}}])})],1)],1),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":this.currentPage1,"page-sizes":[10,20,30,40],"page-size":this.per_page1,layout:"total, sizes, prev, pager, next, jumper",total:this.total_pages1},on:{"current-change":t.handleCurrentChange1,"size-change":t.handleSizeChange1}})],1)]),t._v(" "),a("el-tab-pane",{attrs:{label:"已上线",name:"second"}},[a("div",{staticClass:"tab2"},[a("div",{staticClass:"text-right marBo4"},[a("router-link",{attrs:{to:{name:"news-add",params:{argu:{a:t.value1,b:t.value2,c:t.value6,d:t.inputs,e:t.activeTab,f:t.per_page1,g:t.currentPage1}}}}},[a("el-button",{staticClass:"light_btn",attrs:{size:"mini"}},[t._v("添加新闻")])],1),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:t.publishWaitTop}},[t._v("置顶排序")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:function(e){t.newsList()}}},[t._v("刷新")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData,border:"",stripe:"","row-class-name":t.btnTable,"header-row-class-name":t.btnTable}},[a("el-table-column",{attrs:{label:"序号",type:"index",align:"center",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{label:"标题",prop:"title"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.top_flag?a("i",{staticClass:"iconfont icon-zhiding",staticStyle:{color:"#A30001"}}):t._e(),t._v(" "),"1"==e.row.recommend?a("i",{staticClass:"iconfont icon-banner",staticStyle:{color:"#00C621","vertical-align":"middle","font-size":"22px"}}):t._e(),t._v(" "),"2"==e.row.recommend?a("i",{staticClass:"iconfont icon-banner",staticStyle:{color:"#333","vertical-align":"middle","font-size":"22px"}}):t._e(),t._v(" "),"1"==e.row.specialNewsStatus?a("i",{staticClass:"iconfont icon-zhuanti",staticStyle:{color:"#FEB210","vertical-align":"middle","font-size":"18px"}}):t._e(),t._v(" "),"2"==e.row.specialNewsStatus?a("i",{staticClass:"iconfont icon-zhuanti",staticStyle:{color:"#333","vertical-align":"middle","font-size":"18px"}}):t._e(),t._v(" "),a("span",[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建人",prop:"createUser",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"发布状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",{staticClass:"yshx"},[t._v("已上线")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"发布来源",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.publish_source?a("p",[t._v("pc后台")]):t._e(),t._v(" "),"2"==e.row.publish_source?a("p",[t._v("数据爬取")]):t._e(),t._v(" "),"3"==e.row.publish_source?a("p",[t._v("APP端")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"文章ID",prop:"article_id",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"240",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.top_flag?a("el-button",{staticClass:"marR10",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.cancelUp(e.row)}}},[t._v("取消置顶")]):t._e(),t._v(" "),"4"==e.row.status&&"1"!=e.row.top_flag&&"1"!=e.row.recommend&&1!=e.row.specialNewsStatus?a("el-button",{staticClass:"marR10",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},on:{click:function(a){t.onOff(e.row,"5","下线")}}},[t._v("下线")]):a("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text",disabled:""}},[t._v("下线")]),t._v(" "),a("router-link",{attrs:{to:{name:"news-lookes",params:{id:e.row.id}}}},[a("el-button",{staticClass:"marR10",attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-see"})])],1),t._v(" "),"4"==e.row.status&&"3"!=e.row.content_type?a("el-button",{staticClass:"marR10",attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.recommend(e.$index,e.row)}}},[a("i",{staticClass:"iconfont icon-share"})]):a("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text",disabled:""}},[a("i",{staticClass:"iconfont icon-share"})]),t._v(" "),a("el-button",{staticClass:"marR10",attrs:{type:"text",disabled:""}},[a("i",{staticClass:"iconfont icon-delete unclick"})])]}}])})],1)],1),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":t.currentPage1,"page-sizes":[10,20,30,40],"page-size":this.per_page1,layout:"total, sizes, prev, pager, next, jumper",total:this.total_pages1},on:{"current-change":t.handleCurrentChange1,"size-change":t.handleSizeChange1}})],1)]),t._v(" "),a("el-tab-pane",{attrs:{label:"已下线",name:"third"}},[a("div",{staticClass:"tab3"},[a("el-table",{attrs:{data:t.tableData,border:"",stripe:"","row-class-name":t.btnTable,"header-row-class-name":t.btnTable}},[a("el-table-column",{attrs:{label:"序号",type:"index",align:"center",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{label:"标题",prop:"title"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.top_flag?a("i",{staticClass:"iconfont icon-zhiding",staticStyle:{color:"#A30001"}}):t._e(),t._v(" "),"1"==e.row.recommend?a("i",{staticClass:"iconfont icon-banner",staticStyle:{color:"#00C621","vertical-align":"middle","font-size":"22px"}}):t._e(),t._v(" "),"2"==e.row.recommend?a("i",{staticClass:"iconfont icon-banner",staticStyle:{color:"#333","vertical-align":"middle","font-size":"22px"}}):t._e(),t._v(" "),"1"==e.row.specialNewsStatus?a("i",{staticClass:"iconfont icon-zhuanti",staticStyle:{color:"#FEB210","vertical-align":"middle","font-size":"18px"}}):t._e(),t._v(" "),"2"==e.row.specialNewsStatus?a("i",{staticClass:"iconfont icon-zhuanti",staticStyle:{color:"#333","vertical-align":"middle","font-size":"18px"}}):t._e(),t._v(" "),a("span",[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建人",prop:"createUser",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"发布状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",{staticClass:"yxx"},[t._v("已下线")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"发布来源",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.publish_source?a("p",[t._v("pc后台")]):t._e(),t._v(" "),"2"==e.row.publish_source?a("p",[t._v("数据爬取")]):t._e(),t._v(" "),"3"==e.row.publish_source?a("p",[t._v("APP端")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"文章ID",prop:"article_id",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"160",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"marR10",staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},on:{click:function(a){t.onOff(e.row,"4","上线")}}},[t._v("上线")]),t._v(" "),a("router-link",{attrs:{to:{name:"news-lookes",params:{id:e.row.id}}}},[a("el-button",{staticClass:"marR10",attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-see"})])],1),t._v(" "),a("router-link",{attrs:{to:{name:"news-edit",params:{id:e.row.id,argu:{a:t.value1,b:t.value2,c:t.value6,d:t.inputs,e:t.activeTab,f:t.per_page1,g:t.currentPage1}}}}},["0"!=e.row.status&&"5"!=e.row.status||"3"==e.row.publish_source?t._e():a("el-button",{staticClass:"marR10",attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-edit"})])],1),t._v(" "),"1"!=e.row.top_flag&&"4"!=e.row.status&&"0"==e.row.recommend&&"0"==e.row.specialNewsStatus?a("el-button",{attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.deleteRow(e.$index,e.row)}}},[a("i",{staticClass:"iconfont icon-delete"})]):a("el-button",{staticClass:"marR10",attrs:{type:"text",disabled:""}},[a("i",{staticClass:"iconfont icon-delete unclick"})])]}}])})],1)],1),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":t.currentPage1,"page-sizes":[10,20,30,40],"page-size":this.per_page1,layout:"total, sizes, prev, pager, next, jumper",total:this.total_pages1},on:{"current-change":t.handleCurrentChange1,"size-change":t.handleSizeChange1}})],1)]),t._v(" "),a("el-tab-pane",{attrs:{label:"新建",name:"fourth"}},[a("div",{staticClass:"tab4"},[a("div",{staticClass:"text-right marBo4"},[a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:t.toAudits}},[t._v("批量提交审核")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},on:{click:t.newsList}},[t._v("刷新")])],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{"row-class-name":t.miniTable,"header-row-class-name":t.miniTable,data:t.tableData,"tooltip-effect":"dark",border:""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createUser",label:"创建人",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",width:"50"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.status?a("p",[t._v("新建")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"发布来源",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.publish_source?a("p",[t._v("pc后台")]):t._e(),t._v(" "),"2"==e.row.publish_source?a("p",[t._v("数据爬取")]):t._e(),t._v(" "),"3"==e.row.publish_source?a("p",[t._v("移动端")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"文章ID",prop:"article_id",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{name:"news-lookes",params:{id:e.row.id}}}},[a("el-button",{staticClass:"marR10",attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-see"})])],1),t._v(" "),a("router-link",{attrs:{to:{name:"news-edit",params:{id:e.row.id,argu:{a:t.value1,b:t.value2,c:t.value6,d:t.inputs,e:t.activeTab,f:t.per_page1,g:t.currentPage1}}}}},[a("el-button",{staticClass:"marR10",attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-edit"})])],1),t._v(" "),"1"!=e.row.top_flag&&"4"!=e.row.status&&"0"==e.row.recommend&&"0"==e.row.specialNewsStatus?a("el-button",{staticClass:"marR10",attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.deleteRow(e.$index,e.row)}}},[a("i",{staticClass:"iconfont icon-delete"})]):t._e(),t._v(" "),a("el-button",{staticClass:"marR10",attrs:{type:"text"},on:{click:function(a){t.toAudit(e.row)}}},[t._v("提交审核")])]}}])})],1)],1),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":t.currentPage1,"page-sizes":[10,20,30,40],"page-size":this.per_page1,layout:"total, sizes, prev, pager, next, jumper",total:this.total_pages1},on:{"current-change":t.handleCurrentChange1,"size-change":t.handleSizeChange1}})],1)])],1),t._v(" "),a("el-dialog",{attrs:{center:"",title:"设置置顶内容排序",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.upData,border:"","row-class-name":t.btnTable,"header-row-class-name":t.btnTable}},[a("el-table-column",{attrs:{prop:"title",label:"标题"}}),t._v(" "),a("el-table-column",{staticClass:"text-center",attrs:{prop:"name",label:"操作",width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[0!=e.$index?a("el-button",{attrs:{type:"text"},on:{click:function(a){t.changeIndex(e.$index,t.upData,"isUp")}}},[a("i",{staticClass:"iconfont icon-up"})]):a("el-button",{attrs:{type:"text",disabled:""}},[a("i",{staticClass:"iconfont icon-up unclick"})]),t._v(" "),e.$index!=t.upDataLength?a("el-button",{attrs:{type:"text"},on:{click:function(a){t.changeIndex(e.$index,t.upData,"isDown")}}},[a("i",{staticClass:"iconfont icon-down"})]):a("el-button",{attrs:{type:"text",disabled:""}},[a("i",{staticClass:"iconfont icon-down",staticStyle:{cursor:"not-allowed"}})])]}}])})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.toPublish()}}},[t._v("发 布")])],1)],1),t._v(" "),a("el-dialog",{staticStyle:{"padding-left":"20px"},attrs:{title:"推荐到新闻主页",visible:t.dialogVisible1,center:"",width:"30%"},on:{"update:visible":function(e){t.dialogVisible1=e}}},[a("el-radio",{staticClass:"marBo4",attrs:{label:"1"},model:{value:t.recommendRadio,callback:function(e){t.recommendRadio=e},expression:"recommendRadio"}},[t._v("置顶-新闻推荐列表区")]),a("br"),t._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:t.recommendRadio,callback:function(e){t.recommendRadio=e},expression:"recommendRadio"}},[t._v("推荐到banner")]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"light_btn",on:{click:function(e){t.dialogVisible1=!1,t.recommendRadio=""}}},[t._v("取 消")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{type:"primary"},on:{click:t.sureReco}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{center:"",width:"30%",visible:t.bannerDialog,"append-to-body":""},on:{"update:visible":function(e){t.bannerDialog=e}}},[a("el-form",{ref:"bannerForm",staticClass:"bannerForm",attrs:{model:t.bannerForm,rules:t.bannerRules,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"原文标题"}},[a("el-input",{attrs:{size:"mini",disabled:!0},model:{value:t.bannerForm.title,callback:function(e){t.$set(t.bannerForm,"title",e)},expression:"bannerForm.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"短标题",prop:"title_short"}},[a("el-input",{attrs:{size:"mini"},model:{value:t.bannerForm.title_short,callback:function(e){t.$set(t.bannerForm,"title_short",e)},expression:"bannerForm.title_short"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"banner图片","label-width":"110px",required:""}},[a("el-upload",{ref:"upload",attrs:{action:"",data:t.uploadData,multiple:!1,limit:1,name:"file","list-type":"picture-card","auto-upload":!1,"on-exceed":t.handleExceed,"on-preview":t.handlePictureCardPreview,"on-change":t.fileChange,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})]),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible2},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1),t._v(" "),a("el-form-item",{attrs:{label:"类型"}},[a("el-input",{attrs:{size:"mini",disabled:!0},model:{value:t.bannerForm.type,callback:function(e){t.$set(t.bannerForm,"type",e)},expression:"bannerForm.type"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"链接"}},[a("el-input",{attrs:{size:"mini",disabled:!0},model:{value:t.bannerForm.articleId,callback:function(e){t.$set(t.bannerForm,"articleId",e)},expression:"bannerForm.articleId"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"light_btn",on:{click:function(e){t.bannerDialog=!1,t.recommendRadio=""}}},[t._v("取 消")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{type:"primary"},on:{click:t.toBanner}},[t._v("保 存")])],1)],1)],1)])},staticRenderFns:[]};var l=a("VU/8")(s,n,!1,function(t){a("hLMA")},null,null);e.default=l.exports}});
//# sourceMappingURL=49.55c422b96979baa9874f.js.map
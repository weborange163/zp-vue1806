webpackJsonp([16],{"8DBS":function(t,e){},LdPu:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("Y81h"),a("UVIz");var l=a("rx7x"),s=a("TIfe"),n={data:function(){return{loading:!1,miniTable:l.miniTable,baceUrl:"",per_page:10,total_pages:0,currentPage:1,type:"",value:"",value2:"",value3:"",inputs:"",options:[{value:"2",label:"全部"},{value:"1",label:"已屏蔽"},{value:"0",label:"未屏蔽"}],options3:[{value:"0",label:"全部"},{value:"1",label:"新闻"},{value:"2",label:"行情"},{value:"3",label:"专题"},{value:"4",label:"评论"}],tableData:[]}},created:function(){this.baceUrl=Object(s.a)(),this.getComList()},methods:{isBlock:function(t,e,a){var l,s=this;l=1==a?"屏蔽":"取消屏蔽",this.$confirm("此操作将"+l+"当前评论, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then(function(){var l={tokenId:s.$store.state.user.tokenId,id:t,status:a,type:e};s.$post("comment/isBlock",l).then(function(t){console.log(t),s.getComList(),s.$message({type:"success",message:"操作成功!"})})}).catch(function(){s.$message({type:"info",message:"已取消操作"})})},getComList:function(){var t=this;this.loading=!0;var e={tokenId:this.$store.state.user.tokenId,limit:this.per_page,offset:this.currentPage,status:this.value,type:this.value3,simpleParameter:this.inputs};this.value2&&(e.startTime=this.value2[0],e.endTime=this.value2[1],console.log(this.value2[0])),"2"==this.value&&(e.status=""),"0"==this.value3&&(e.type=""),this.$post("comment/list",e).then(function(e){0==e.code&&(console.log(e),console.log(e.data[0].rows),t.tableData=e.data[0].rows,t.total_pages=e.data[0].total,t.loading=!1)})},handleCurrentChange:function(t){this.currentPage=t,this.getComList()},handleClick:function(t){console.log(t)},handleSizeChange:function(t){this.per_page=t,this.getComList()}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-body comments"},[a("div",{staticClass:"page-header"},[a("el-row",[a("el-col",{attrs:{span:2}},[a("el-select",{staticStyle:{width:"90%"},attrs:{placeholder:"状态",size:"mini"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-col",{attrs:{span:9}},[a("el-date-picker",{staticStyle:{width:"90%"},attrs:{size:"mini",type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH-mm-ss","default-time":["00:00:00","00:00:00"]},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("el-select",{staticStyle:{width:"90%"},attrs:{placeholder:"分类",size:"mini"},model:{value:t.value3,callback:function(e){t.value3=e},expression:"value3"}},t._l(t.options3,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),a("el-col",{attrs:{span:8,offset:3}},[a("el-input",{staticStyle:{width:"80%"},attrs:{size:"mini",placeholder:"评论会员、会员ID、评论对象ID、评论内容"},model:{value:t.inputs,callback:function(e){t.inputs=e},expression:"inputs"}}),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{size:"mini"},nativeOn:{click:function(e){e.preventDefault(),t.getComList()}}},[t._v("搜索")])],1)],1)],1),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"text-right marBo4"},[a("el-button",{staticClass:"light_btn",nativeOn:{click:function(e){e.preventDefault(),t.getComList()}}},[t._v("刷新")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{"row-class-name":t.miniTable(),"header-row-class-name":t.miniTable(),data:t.tableData,stripe:"",border:""}},[a("el-table-column",{attrs:{label:"序号",type:"index",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"content",label:"评论内容"}}),t._v(" "),a("el-table-column",{attrs:{prop:"commentObj",label:"评论对象",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickName",label:"评论人",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userUniqueCode",label:"会员ID",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"评论时间",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.status?a("p",{staticClass:"yshx"},[t._v("正常")]):t._e(),t._v(" "),"1"==e.row.status?a("p",[t._v("已屏蔽")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"checkPerson",label:"审核人",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[""==e.row.checkPerson?a("p",[t._v("机器审核")]):a("p",[t._v(t._s(e.row.checkPerson))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"140",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{name:"comments-lookes",params:{id:e.row.id}}}},[a("el-button",{staticClass:"marR10",attrs:{type:"text",size:"small"}},[t._v("查看")])],1),t._v(" "),"0"==e.row.status?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.isBlock(e.row.id,e.row.type,1)}}},[t._v("屏蔽")]):a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.isBlock(e.row.id,e.row.type,0)}}},[t._v("取消屏蔽")])]}}])})],1),t._v(" "),a("div",{staticClass:"marT20"},[a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,20,30,40],"page-size":this.per_page,layout:"total, sizes, prev, pager, next, jumper",total:this.total_pages},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)])},staticRenderFns:[]};var o=a("VU/8")(n,i,!1,function(t){a("8DBS")},null,null);e.default=o.exports}});
//# sourceMappingURL=16.390c33dad5ebce315c76.js.map
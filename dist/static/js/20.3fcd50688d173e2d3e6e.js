webpackJsonp([20],{"+2cy":function(t,e){},ogbC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={name:"home",data:function(){return{per_page:10,total_pages:100,currentPage_bidding:7,tableData:[{num:"1",title:"王小虎在北京开演唱会哈哈哈哈或或或",author:"管理员1",status:"已上线",source:"pc后台",id:"13823",link:"www.baidu.com"},{num:"2",title:"北京今日高温41度",author:"用户1号",status:"已下线",source:"app端",id:"1234"},{num:"3",title:"北京交通运输座谈会今日召开",author:"运营1号",status:"待上线",source:"app端",id:"120937866534"}],options:[{value:"选项1",label:"全部"},{value:"选项5",label:"已上线"},{value:"选项6",label:"已下线"}],optionss:[{value1:"选项1",label:"全部"},{value1:"选项2",label:"APP"},{value1:"选项3",label:"后台发布"},{value1:"选项4",label:"数据爬取"}],optionsss:[{value2:"选项1",label:"上线时间"},{value2:"选项2",label:"创建时间"},{value2:"选项3",label:"下线时间"},{value2:"选项4",label:"审核时间"}],value6:"",inputs:"",value:"",value1:"",value2:"",dataList:[]}},methods:{handleCurrentChange:function(t){console.log("当前页: "+t)},deleteRow:function(t,e){var a=this;this.$confirm("此操作将永久删除该新闻, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$message({type:"success",message:"删除成功!"})}).catch(function(){a.$message({type:"info",message:"已取消删除"})}),console.log(t,e)}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-body news"},[a("div",{staticClass:"page-header"},[a("el-row",[a("el-col",{attrs:{span:10}},[a("el-select",{staticStyle:{width:"25%"},attrs:{placeholder:"发布状态"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticStyle:{width:"32%"},attrs:{placeholder:"发布来源"},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}},t._l(t.optionss,function(t){return a("el-option",{key:t.value1,attrs:{label:t.label,value:t.value1}})})),t._v(" "),a("el-select",{staticStyle:{width:"32%"},attrs:{placeholder:"时间类型"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}},t._l(t.optionsss,function(t){return a("el-option",{key:t.value2,attrs:{label:t.label,value:t.value2}})}))],1),t._v(" "),a("el-col",{attrs:{span:7}},[a("el-date-picker",{staticStyle:{width:"90%"},attrs:{type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["12:00:00"]},model:{value:t.value6,callback:function(e){t.value6=e},expression:"value6"}})],1),t._v(" "),a("el-col",{attrs:{span:7}},[a("el-input",{staticStyle:{width:"70%","margin-right":"5%"},attrs:{placeholder:"标题、发布账号、文章ID"},model:{value:t.inputs,callback:function(e){t.inputs=e},expression:"inputs"}}),a("el-button",{staticClass:"light_btn",staticStyle:{width:"20%"}},[t._v("搜素")])],1)],1)],1),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticStyle:{"text-align":"right","margin-bottom":"4px"}},[a("router-link",{attrs:{to:{name:"news-add"}}},[a("el-button",{staticClass:"light_btn"},[t._v("添加新闻")])],1),t._v(" "),a("el-button",{staticClass:"light_btn"},[t._v("置顶排序")]),t._v(" "),a("el-button",{staticClass:"light_btn"},[t._v("刷新")])],1),t._v(" "),a("el-table",{attrs:{data:t.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{label:"序号",prop:"num",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{label:"标题",prop:"title"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"iconfont icon-zhiding",staticStyle:{color:"#A30001"}}),t._v(" "),e.row.link?a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[t._v(t._s(e.row.link))]),t._v(" "),a("div",{staticClass:"name_wrapper",attrs:{slot:"reference"},slot:"reference"},[e.row.link?a("i",{staticClass:"iconfont icon-link",staticStyle:{color:"#3658A7","vertical-align":"middle"}}):t._e()])]):t._e(),t._v(" "),a("p",{staticStyle:{display:"inline-block"}},[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建人",prop:"author",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{label:"发布状态",prop:"status",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["已上线"==e.row.status?a("p",{staticClass:"yshx"},[t._v(t._s(e.row.status))]):t._e(),t._v(" "),"待上线"==e.row.status?a("p",{staticClass:"dshx"},[t._v(t._s(e.row.status))]):t._e(),t._v(" "),"已下线"==e.row.status?a("p",{staticClass:"yxx"},[t._v(t._s(e.row.status))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"发布来源",prop:"source",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{label:"文章ID",prop:"id"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"},on:{click:function(a){t.deleteRow(e.$index,e.row)}}},[t._v("取消置顶")]),t._v(" "),"已上线"==e.row.status?a("el-button",{staticStyle:{"margin-right":"8px","vertical-align":"middle"},attrs:{type:"text"}},[t._v("下线")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-see"})]),t._v(" "),a("el-button",{attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-share"})]),t._v(" "),a("el-button",{attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-edit"})]),t._v(" "),a("el-button",{attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.deleteRow(e.$index,e.row)}}},[a("i",{staticClass:"iconfont icon-delete"})])]}}])})],1),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-pagination",{staticClass:"text-center",attrs:{background:"","current-page":t.currentPage_bidding,"page-sizes":[10,20,30,40],"page-size":this.per_page,layout:"prev, pager, next",total:this.total_pages*this.per_page},on:{"current-change":t.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var n=a("VU/8")(l,s,!1,function(t){a("+2cy")},null,null);e.default=n.exports}});
//# sourceMappingURL=20.3fcd50688d173e2d3e6e.js.map
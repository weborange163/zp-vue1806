webpackJsonp([13],{Av1O:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("rx7x"),s={data:function(){return{loading:!1,btnTable:i.btnTable,input:"",tableData:[],per_page:10,total:0,currentPage:1,isEdit:!1,editId:"",newDialog:!1,sourceForm:{name:""},sourceRules:{name:[{required:!0,message:"请输入转载来源",trigger:"blur"}]}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.loading=!0;var e={tokenId:this.$store.state.user.tokenId,limit:this.per_page,offset:this.currentPage};this.$get("reprintSth/list",e).then(function(e){0==e.code&&(t.tableData=e.data[0].rows,t.total=e.data[0].total,t.loading=!1)})},createSource:function(){var t=this;this.$refs.sourceForm.validate(function(e){if(e){var a={};a.tokenId=t.$store.state.user.tokenId,a.name=t.sourceForm.name,t.isEdit&&(a.id=t.editId),t.$post("reprintSth/save",a).then(function(e){0==e.code&&(t.newDialog=!1,t.isEdit=!1,setTimeout(function(){t.getList()},500),t.$message({type:"success",message:e.msg}))})}})},editSource:function(t){this.newDialog=!0,this.sourceForm.name=t.name,this.isEdit=!0,this.editId=t.id},deleteSource:function(t){var e=this;this.$confirm("此操作将删除该转载来源, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={tokenId:e.$store.state.user.tokenId,id:t};e.$post("reprintSth/delete",a).then(function(t){0==t.code?(e.$message({type:"success",message:"删除成功!"}),setTimeout(function(){e.getList()},500)):e.$message({type:"info",message:"删除失败!"})})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},handleCurrentChange:function(t){this.currentPage=t,this.getList()},handleSizeChange:function(t){this.per_page=t,this.getList()}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-body rules"},[a("div",{staticClass:"page-header"}),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"text-right marBo4"},[a("el-button",{staticClass:"light_btn",on:{click:function(e){t.newDialog=!0,t.sourceForm.name=""}}},[t._v("新建")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%","max-width":"600px",margin:"0 auto"},attrs:{"row-class-name":t.btnTable(),"header-row-class-name":t.btnTable(),data:t.tableData,stripe:"",border:""}},[a("el-table-column",{attrs:{label:"序号",type:"index",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"转载来源"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"160",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){t.editSource(e.row)}}},[a("i",{staticClass:"iconfont icon-edit"})]),t._v(" "),a("el-button",{attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-delete",on:{click:function(a){t.deleteSource(e.row.id)}}})])]}}])})],1),t._v(" "),a("div",{staticClass:"marT20"},[a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,20,30,40],"page-size":this.per_page,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1),t._v(" "),a("el-dialog",{attrs:{center:"",width:"30%",visible:t.newDialog,"append-to-body":""},on:{"update:visible":function(e){t.newDialog=e}}},[a("el-form",{ref:"sourceForm",staticClass:"sourceForm",attrs:{model:t.sourceForm,rules:t.sourceRules,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"转载来源",prop:"name"}},[a("el-input",{staticStyle:{width:"70%"},attrs:{size:"mini"},model:{value:t.sourceForm.name,callback:function(e){t.$set(t.sourceForm,"name",e)},expression:"sourceForm.name"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"light_btn",on:{click:function(e){t.newDialog=!1,t.fileList=[]}}},[t._v("取 消")]),t._v(" "),a("el-button",{staticClass:"light_btn",attrs:{type:"primary"},on:{click:t.createSource}},[t._v("添 加")])],1)],1)],1)])},staticRenderFns:[]};var o=a("VU/8")(s,n,!1,function(t){a("FWbG")},null,null);e.default=o.exports},FWbG:function(t,e){}});
//# sourceMappingURL=13.27191bd0c09c98376c67.js.map
webpackJsonp([14],{cHBU:function(e,t){},fiy9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),l=a("rx7x"),r={data:function(){return{currentId:"",ruleName:"",form11:{isEnable:!1,changeNum:"",cycle:"1"},dialog11:!1,rules11:{bindingNum:[{required:!0,message:'"兑换次数"输入值未填写',trigger:"blur"},{pattern:/^\d+$/,message:"只能输入数字",trigger:"blur"}]},loading:!1,miniTable:l.miniTable,input:"",tableData:[{dict_type_name:"内容管理",dict_name:"首页栏目管理",ruleParam:"",id:"1"},{dict_type_name:"内容管理",dict_name:"转载来源设置",ruleParam:"",id:"2"},{dict_type_name:"系统设置",dict_name:"区域管理",ruleParam:"",id:"3"},{dict_type_name:"内容管理",dict_name:"视频栏目管理",ruleParam:"",id:"4"}],per_page:10,total:1,currentPage:1}},created:function(){this.getList()},methods:{setRules:function(e,t){var a=this;console.log(e),this.currentId=e,this.currentRule=t,this.dialog11=!0;var i={tokenId:this.$store.state.user.tokenId,id:e};this.$post("/jtbRule/get",i).then(function(e){console.log(e),0==e.code?a.form11=e.data[0].maps:a.$message({message:e.msg?e.msg:"查询失败失败",type:"error"})})},getList:function(){var e=this,t={tokenId:this.$store.state.user.tokenId,offset:"1",limit:"10"};this.$post("/jtbRule/otherList",t).then(function(t){console.log(t),e.tableData.splice(4,1,t.data[0].rows[0]),0==t.code?e.$message({message:t.msg,type:"success"}):e.$message({message:t.msg?t.msg:"操作失败",type:"error"})})},jumpDetail:function(e){switch(e){case"1":this.$router.push({name:"rules1"});break;case"2":this.$router.push({name:"rules2"});break;case"3":this.$router.push({name:"rules3"});break;case"4":this.$router.push({name:"rules4"})}},sureChangeRule:function(){var e=this;this.$refs.form11.validate(function(t){if(t){var a={cycle:e.form11.cycle,bindingNum:e.form11.bindingNum},i={tokenId:e.$store.state.user.tokenId,isEnable:0==e.form11.isEnable?"0":"1",rule:e.currentRule,id:e.currentId,ext:s()(a)};e.$post("/jtbRule/update",i).then(function(t){0==t.code&&(e.$message({message:t.msg,type:"success"}),e.dialog11=!1,e.getList())})}})},handleCurrentChange:function(e){this.currentPage=e,this.getList()},handleSizeChange:function(e){this.per_page=e,this.getList()}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-body rules-list"},[a("div",{staticClass:"page-header"},[a("el-input",{staticStyle:{width:"200px"},attrs:{size:"mini",placeholder:"规则名称"},model:{value:e.ruleName,callback:function(t){e.ruleName=t},expression:"ruleName"}}),e._v(" "),a("el-button",{staticClass:"light_btn",on:{click:e.getList}},[e._v("搜索")])],1),e._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"text-right marBo4"},[a("el-button",{staticClass:"light_btn",on:{click:e.getList}},[e._v("刷新")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%",margin:"0 auto"},attrs:{"row-class-name":e.miniTable(),"header-row-class-name":e.miniTable(),data:e.tableData,stripe:"",border:""}},[a("el-table-column",{attrs:{label:"序号",type:"index",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dict_type_name",label:"规则分类"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dict_name",label:"规则"}}),e._v(" "),a("el-table-column",{attrs:{prop:"description",label:"参数详情"}}),e._v(" "),a("el-table-column",{attrs:{prop:"update_time",label:"修改时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"update_user_name",label:"操作账号"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return["100"==t.row.rule?a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.setRules(t.row.id,t.row.rule)}}},[e._v("设置")]):a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.jumpDetail(t.row.id)}}},[e._v("设置")])]}}])})],1),e._v(" "),a("div",{staticClass:"marT20"},[a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":this.per_page,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"更换第三方账户周期",visible:e.dialog11,width:"400px"},on:{"update:visible":function(t){e.dialog11=t}}},[a("el-form",{ref:"form11",attrs:{model:e.form11,"label-width":"98px",rules:e.rules11}},[a("el-form-item",{attrs:{label:"选择更换周期"}},[a("el-radio-group",{model:{value:e.form11.cycle,callback:function(t){e.$set(e.form11,"cycle",t)},expression:"form11.cycle"}},[a("el-radio",{attrs:{label:"1"}},[e._v("日")]),e._v(" "),a("el-radio",{attrs:{label:"7"}},[e._v("自然周")]),e._v(" "),a("el-radio",{attrs:{label:"30"}},[e._v("月(30天)")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"可更换次数",prop:"bindingNum"}},[a("el-input",{attrs:{size:"mini",type:"text"},model:{value:e.form11.bindingNum,callback:function(t){e.$set(e.form11,"bindingNum",t)},expression:"form11.bindingNum"}},[a("template",{slot:"append"},[e._v("次")])],2)],1),e._v(" "),a("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"启用"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#999"},model:{value:e.form11.isEnable,callback:function(t){e.$set(e.form11,"isEnable",t)},expression:"form11.isEnable"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialog11=!1,e.form11={}}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){e.sureChangeRule()}}},[e._v("确 认")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(r,n,!1,function(e){a("cHBU")},null,null);t.default=o.exports}});
//# sourceMappingURL=14.80cf74d84f7d02c25b92.js.map
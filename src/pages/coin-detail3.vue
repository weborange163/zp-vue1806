<template>
  <div class="page-body comments_lookes">
    <div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">交通币</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/coin-withdraw' }">提现管理</el-breadcrumb-item>
				<el-breadcrumb-item>提现详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
    <div class="box">
      <div class="el-table__body-wrapper is-scrolling-none info_table marT20">
        <div class="statistics_header">
          <span class="mr40">会员ID：use100000q</span class="mr40"><span>手机号：13123456543</span>
        </div>
        <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border marT20">
          <colgroup>
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_2" width="20%">
          </colgroup>
          <tbody>
            <tr class="el-table__row myTh">
              <td><div class="cell">订单ID</div></td>
              <td><div class="cell">提现金额（元）</div></td>
              <td><div class="cell">提现方式</div></td>
              <td><div class="cell">提现账户</div></td>
              <td><div class="cell">提现时间</div></td>
            </tr>
            <tr class="el-table__row myTr">
              <td><div class="cell">id12333</div></td>
              <td><div class="cell">100</div></td>
              <td><div class="cell">支付宝</div></td>
              <td><div class="cell">小可爱</div></td>
              <td><div class="cell">2019-10-01</div></td>
            </tr>
          </tbody>
        </table>
        <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border mt40">
          <colgroup>
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_2" width="20%">
          </colgroup>
          <tbody>
            <tr class="el-table__row myTh">
              <td><div class="cell">订单ID</div></td>
              <td><div class="cell">提现金额（元）</div></td>
              <td><div class="cell">提现方式</div></td>
              <td><div class="cell">提现账户</div></td>
              <td><div class="cell">提现时间</div></td>
            </tr>
            <tr class="el-table__row myTr">
              <td><div class="cell">id12333</div></td>
              <td><div class="cell">100</div></td>
              <td><div class="cell">支付宝</div></td>
              <td><div class="cell">小可爱</div></td>
              <td><div class="cell">2019-10-01</div></td>
            </tr>
          </tbody>
        </table>
        <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border mt40">
          <colgroup>
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_2" width="20%">
          </colgroup>
          <tbody>
            <tr class="el-table__row myTh">
              <td><div class="cell">订单ID</div></td>
              <td><div class="cell">提现金额（元）</div></td>
              <td><div class="cell">提现方式</div></td>
              <td><div class="cell">提现账户</div></td>
              <td><div class="cell">提现时间</div></td>
            </tr>
            <tr class="el-table__row myTr">
              <td><div class="cell">id12333</div></td>
              <td><div class="cell">100</div></td>
              <td><div class="cell">支付宝</div></td>
              <td><div class="cell">小可爱</div></td>
              <td><div class="cell">2019-10-01</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>
<script>
import {btnTable} from '@/utils/table-style.js'
export default {
   data(){
     return{
        btnTable:btnTable,
        tableData:[],
        idDetail:'',
        comDetail:{
          commentObj:'',  //评论对象
          id:'',        // 评论id
          articleId:'',  // 评论对象id
          content:'',   // 评论内容
          nickName:'',  // 评论人
          userUniqueCode:'',  // 会员id
          createTime:'',      // 评论时间
          status: '',     // 评论状态
          statusText:'',
          checkPerson:'',   // 审核人
          auditTime:'',     // 审核时间
          type:''           // 评论类型
        }
     }
   },
   created(){
     this.getParams();
     this.showDetail();
   },
   methods:{
     // 获取评论详情
    showDetail(){
      var params = {
        tokenId:this.$store.state.user.tokenId,
        id:this.idDetail
      }
      this.$post('comment/show',params).then(res => {
        if(res.code == 0){
          console.log(res.data[0]);
          this.comDetail = res.data[0];
          if(this.comDetail.status == 0){
            this.comDetail.statusText = '正常'
          }else{
            this.comDetail.statusText = '已屏蔽'
          }
          console.log(this.comDetail)
        }
      });
    },
    // 屏蔽
    isBlock(id,type,num){
      var text;
      if(num == 1){
        text = '屏蔽';
      }else{
        text = '取消屏蔽';
      }
      this.$confirm(`此操作将${text}当前评论, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          var params = {
            tokenId: this.$store.state.user.tokenId,
            id:id,
            status:num,
            type:type
          }
          this.$post('comment/isBlock', params).then(res => {
            console.log(res);
            // this.getComList();
            if(num==1){
              this.comDetail.status ='1';
              this.comDetail.statusText='已屏蔽';
            }else{
              this.comDetail.status ='0';
              this.comDetail.statusText='正常';
            }
            console.log(this.comDetail)
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.showDetail();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    getParams () {
      // 取到路由带过来的参数 
      let routerParams = this.$route.params.id
      // 将数据放在当前组件的数据内
      // this.form1 = routerParams
      this.idDetail = routerParams
      // console.log(this.idDetail)
    },
   },
   	watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    } 
}
</script>
<style>
.statistics_header{
  height: 44px;
  width:100%;
  background: #ECF0F4;
  font-size: 14px;
  text-align: left;
  line-height: 44px;
  margin-bottom: 10px;
  color: #333;
  padding-left: 20px;
}
.comments_lookes .info_table .cell{
  white-space:normal;
}
.myTh td,
.myTr td{
  padding: 0;
  height: 36px;
  line-height: 36px;
}
.el-table .myTh{
  background-color: #3658A7;
  color: #fff;
  font-size: 14px;
  text-align: center;
}
.el-table .myTr{
  background-color: #f5f5f5;
}
</style>


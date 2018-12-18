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
      <div class="text-right marT20">
				<el-button size="mini"  @click="$router.back()" class="light_btn">返回</el-button>
			</div>
      <div class="el-table__body-wrapper is-scrolling-none info_table marT20">
        <div class="statistics_header">
          <span class="mr40">会员ID：{{form.userCode}}</span class="mr40"><span>手机号：{{form.phone}}</span>
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
              <td><div class="cell">{{form.orderNo}}</div></td>
              <td><div class="cell">{{form.money}}</div></td>
              <td><div class="cell" v-if="form.withdrawType==1">微信</div><div class="cell" v-if="form.withdrawType==2">支付宝</div></td>
              <td><div class="cell">{{form.withdrawAccount}}</div></td>
              <td><div class="cell">{{form.orderTime}}</div></td>
            </tr>
          </tbody>
        </table>
        <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border mt40">
          <colgroup>
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="40%">
          </colgroup>
          <tbody>
            <tr class="el-table__row myTh">
              <td><div class="cell">审核状态</div></td>
              <td><div class="cell">审核人</div></td>
              <td><div class="cell">审核时间</div></td>
              <td><div class="cell">备注</div></td>
            </tr>
            <tr class="el-table__row myTr">
              <td><div class="cell" v-if='form.auditStatus ==0'>待审核</div><div class="cell" v-if='form.auditStatus ==1'>通过</div><div class="cell" v-if='form.auditStatus ==2'>不通过</div></td>
              <td><div class="cell">{{form.auditPerson}}</div></td>
              <td><div class="cell">{{form.auditTime}}</div></td>
              <td><div class="cell">{{form.auditReason}}</div></td>
            </tr>
          </tbody>
        </table>
        <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border mt40">
          <colgroup>
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_1" width="20%">
            <col name="el-table_1_column_2" width="40%">
          </colgroup>
          <tbody>
            <tr class="el-table__row myTh">
              <td><div class="cell">第三方订单ID</div></td>
              <td><div class="cell">提现结果</div></td>
              <td><div class="cell">时间</div></td>
              <td><div class="cell">备注</div></td>
            </tr>
            <tr class="el-table__row myTr">
              <td><div class="cell">{{form.thirdNo}}</div></td>
              <td><div class="cell" v-if="form.status ==0">默认</div><div class="cell" v-if="form.status ==1">成功</div><div class="cell" v-if="form.status ==2">失败</div></td>
              <td><div class="cell">{{form.thirdTime}}</div></td>
              <td><div class="cell">{{form.thirdResult}}</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
   data(){
     return{
        idDetail:'',
        form:''
     }
   },
   created(){
     this.getParams();
     this.getDetail()
   },
   methods:{
    getDetail(){
      //   /jtbWithdraw/show
      let param = {
        tokenId: this.$store.state.user.tokenId,
        id:this.idDetail
      }
      this.$get('/jtbWithdraw/show',param).then(res => {
        if(res.code ==0){
          console.log(res);
          this.form = res.data[0];

        }
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


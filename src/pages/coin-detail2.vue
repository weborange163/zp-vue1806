<template>
  <div class="page-body coin-detail2">
    <div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">交通币</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/coin-account' }">会员账户</el-breadcrumb-item>
				<el-breadcrumb-item>会员提现记录</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
    <div class="page-header">
      <el-row>
        <el-col :span="7">
          <el-date-picker size="mini" style="width:95%;"
              v-model="timeFilter"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-select style="width:95%" v-model="income" placeholder="提现结果" size="mini">
            <el-option
              v-for="item in incomeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" :offset="7">
          <el-input v-model="inputs" size="mini" style="width:60%" placeholder="会员ID、会员昵称、手机号" ></el-input>
          <el-button class="light_btn" size="mini" @click.native.prevent="getDetail()">搜索</el-button>
          <el-button class="light_btn" size="mini" @click.native.prevent="getDetail()">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="statistics_header clearfix">
        <p class="pull-left">会员提现数据统计</p>
        <div class="pull-right" style="font-size:14px;">
          <span class="mr40">会员ID：{{form1.memberId}}</span>
          <span class="mr40">昵称：{{form1.nickName}}</span>
          <span class="mr20">手机号：{{form1.telephone}}</span>
        </div>
      </div>
      <el-row>
        <el-col :span="8" style="padding-right:4%;">
          <div class="showBlock" style="background-image:url(/static/img/detail2-1.png)">
            <p class="text-center marBo10" style="color:#FFBC00;">总提现</p>
            <el-form ref="form1" :model="form1" label-width="50%">
              <el-form-item label="次数:">
                <p v-text="form1.allTotal" class="show_info"></p>
              </el-form-item>
              <el-form-item label="金额(元):">
                <p v-text="form1.allMoney" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" style="padding:0 2%;">
          <div class="showBlock" style="background-image:url(/static/img/detail2-2.png);">
            <p class="text-center marBo10" style="color:#44BB00;">提现成功</p>
            <el-form label-width="50%">
              <el-form-item label="次数:">
                <p v-text="form1.successTotal" class="show_info"></p>
              </el-form-item>
              <el-form-item label="金额（元）:">
                <p v-text="form1.successMoney" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left:4%;">
          <div class="showBlock" style="background-image:url(/static/img/detail2-3.png);">
            <p class="text-center marBo10" style="color:#F5212D;">提现失败</p>
            <el-form label-width="50%">
              <el-form-item label="次数:">
                <p v-text="form1.failTotal" class="show_info"></p>
              </el-form-item>
              <el-form-item label="金额（元）:">
                <p v-text="form1.failMoney" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div class="text-right marT20">
				<el-button size="mini"  @click="$router.back()" class="light_btn">返回</el-button>
			</div>
      <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()"
        :data="tableData" class="marT20"
        stripe border
        style="width: 100%">
        <el-table-column label="序号" type="index"width="50"></el-table-column>
        <el-table-column prop="order_time" label="提现时间" width="180"></el-table-column>
        <el-table-column prop="order_no" label="订单ID" width="180"></el-table-column>
        <el-table-column prop="money" label="提现金额（元）" width="120"></el-table-column>
        <el-table-column label="提现方式" width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.withdraw_type=='1'">微信</p>
            <p v-if="scope.row.withdraw_type=='2'">支付宝</p>
          </template>
        </el-table-column>
        <el-table-column prop="withdraw_account" label="提现账户"></el-table-column>
        <el-table-column prop="status" label="提现结果" width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.status=='1'" class="yshx">打款成功</p>
            <p v-else-if="scope.row.status=='2'||scope.row.audit_status=='2'" >打款失败</p>
            <p v-else class="dshx">待打款</p>
          </template>
        </el-table-column>
        <el-table-column prop="third_result" label="提现摘要" width="180"></el-table-column>
      </el-table>
      <div class="marT20">
        <el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" 
        :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange" :total="this.total_pages">
        </el-pagination>
      </div>
    </div>
    
  </div>
</template>
<script>
import {miniTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      tableData:[{date:'2011-09-09'}],
      timeFilter:"",
      miniTable:miniTable,
      inputs:'',
      incomeOption: [
        {value: '3',label: '全部'}, 
        {value: '1',label: '提现成功'}, 
        {value: '2',label: '提现失败'}, 
        {value: '0',label: '打款中'}],
      income:'',
      idDetail:'',
      form1:{},
      per_page:10,
      total_pages:1,
      currentPage:1,
    }
  },
  created(){
    this.getParams();
    this.getDetail();
  },
  methods:{
    // 获取评论详情
    getParams () {
      // 取到路由带过来的参数 
      let routerParams = this.$route.params.id
      // 将数据放在当前组件的数据内
      // this.form1 = routerParams
      this.idDetail = routerParams
      // console.log(this.idDetail)
    },
    getDetail(val){
      this.currentPage=val?val:1;
      let params = {
        tokenId: this.$store.state.user.tokenId,
        userId:this.idDetail,
        limit:this.per_page,
        offset:this.currentPage,
        beginTime:this.timeFilter?this.timeFilter[0]:'',
        endTime:this.timeFilter?this.timeFilter[1]:'',
        queryStatus:this.income==3?'':this.income,
        queryOrderNo:this.inputs
      }
      this.$post('/jtbWithdraw/list',params).then(res => {
        console.log(res);
        this.tableData = res.data[1].rows;
        this.total_pages = res.data[1].total;
        this.form1= res.data[0]
      });
    },
    handleSizeChange(val){
      this.per_page = val;
      this.getDetail();
    },
    handleCurrentChange(val) {
      // this.currentPage = val;
      this.getDetail(val);
    },
  },
  watch: {
  // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  } 
}
</script>
<style>
.coin-detail2 .statistics_header{
  height: 44px;
  width:100%;
  background: #ECF0F4;
  font-size: 16px;
  line-height: 44px;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 10px;
  color: #333;
}
.coin-detail2 .showBlock{
  background-color:#fff;
  background-repeat:no-repeat;
  background-position:center 20px;
  height: 180px;
  border:1px solid rgba(243,245,248,1);
  background-size: 44px;
  padding-top: 70px;
}
.coin-detail2 .el-form-item__label{
  font-size: 12px;
  line-height: 30px;
  color: #666;
}
.coin-detail2 .el-form-item__content{
  line-height: 30px;
}
.coin-detail2 .show_info{
  padding-left:10px;
}
.coin-detail2 .el-form-item{
  margin-bottom: 0;
}
</style>


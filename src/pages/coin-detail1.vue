<template>
  <div class="page-body coin-detail1">
    <div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">交通币</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/coin-account' }">会员账户</el-breadcrumb-item>
				<el-breadcrumb-item>会员收支明细</el-breadcrumb-item>
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
          <el-select style="width:95%" v-model="income" placeholder="收支" size="mini">
            <el-option
              v-for="item in incomeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select style="width:95%" v-model="tradeType" placeholder="交易类型" size="mini">
            <el-option
              v-for="item in tradeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select style="width:95%" v-model="tradeAccount" placeholder="交易账户" size="mini">
            <el-option
              v-for="item in accountOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-input v-model="inputs" size="mini" style="width:60%" placeholder="会员ID、会员昵称、手机号" ></el-input>
          <el-button class="light_btn" size="mini" @click.native.prevent="refresh()">搜索</el-button>
          <el-button class="light_btn" size="mini" @click.native.prevent="refresh()">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="statistics_header clearfix">
        <p class="pull-left">会员账户（总数据）</p>
        <div class="pull-right" style="font-size:14px;">
          <span class="mr40">会员ID：{{accountMsg.userCode}}</span>
          <span class="mr40">昵称：{{accountMsg.nickName}}</span>
          <span class="mr20">手机号：{{accountMsg.phone}}</span>
        </div>
      </div>
      <el-row>
        <el-col :span="8" style="padding-right:4%;">
          <div class="showBlock" style="background-image:url(/static/img/jtb.png)">
            <p class="text-center marBo10" style="color:#FFBC00;">交通币（JTB）</p>
            <el-form ref="form1" :model="form1" label-width="50%">
              <el-form-item label="总获取量:">
                <p v-text="form1.totalJtb" class="show_info"></p>
              </el-form-item>
              <el-form-item label="已使用(JTB):">
                <p v-text="form1.usedJtb" class="show_info"></p>
              </el-form-item>
              <el-form-item label="余额(JTB):">
                <p v-text="form1.currentJtb" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" style="padding:0 2%;">
          <div class="showBlock" style="background-image:url(/static/img/rmb.png);background-size:45px;">
            <p class="text-center marBo10" style="color:#57E2D9;">JTB兑换RMB</p>
            <el-form ref="form2" :model="form2" label-width="50%">
              <el-form-item label="兑换总量:">
                <p v-text="form2.totalExchangeJtb" class="show_info"></p>
              </el-form-item>
              <el-form-item label="折合RMB（元）:">
                <p v-text="form2.totalExchangeMoney" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left:4%;">
          <div class="showBlock" style="background-image:url(/static/img/money.png);background-size:55px 42px;">
            <p class="text-center marBo10" style="color:#FF5D58;">现金（¥）</p>
            <el-form ref="form3" :model="form3" label-width="50%">
              <el-form-item label="提现次数（次）:">
                <p v-text="form3.withdrawNum" class="show_info"></p>
              </el-form-item>
              <el-form-item label="已提现（¥）:">
                <p v-text="form3.withdrawMoney" class="show_info"></p>
              </el-form-item>
              <el-form-item label="余额（¥）:">
                <p v-text="form3.currentMoney" class="show_info"></p>
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
        <el-table-column prop="order_time" label="时间"></el-table-column>
        <el-table-column prop="order_name" label="交易类型" width="180"></el-table-column>
        <el-table-column prop="amount_type" label="交易账户" width="180"></el-table-column>
        <el-table-column label="收支" width="180">
          <template slot-scope="scope">
            <p v-if="scope.row.direction=='1'">收入</p>
            <p v-if="scope.row.direction=='2'">支出</p>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="180">
	  <template slot-scope="scope">
            <p v-if="scope.row.amount_type=='JTB'">{{scope.row.amount}} JTB</p>
            <p v-if="scope.row.amount_type=='RMB'">{{scope.row.amount}} 元</p>
          </template>
	</el-table-column>
        <el-table-column  label="余额" width="180">
	 <template slot-scope="scope">
            <p v-if="scope.row.amount_type=='JTB'">{{scope.row.amount_after}} JTB</p>
            <p v-if="scope.row.amount_type=='RMB'">{{scope.row.amount_after}} 元</p>
          </template>
	</el-table-column>
        <el-table-column label="交易方式" width="180">
	 <template slot-scope="scope">
            <p v-if="scope.row.withdraw_type=='1'">微信({{scope.row.withdraw_account}})</p>
            <p v-if="scope.row.withdraw_type=='2'">支付宝({{scope.row.withdraw_account}})</p>
	   
          </template>
	</el-table-column>


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
      tableData:[{date:'2011-01-01'}],
      timeFilter:"",
      miniTable:miniTable,
      inputs:'',
      incomeOption: [
        {value: '0',label: '全部'}, 
        {value: '1',label: '收入'}, 
        {value: '2',label: '支出'}],
      income:'',
      tradeType:'',
      tradeAccount:'',
      tradeOption: [
        {value: '0',label: '全部'}, 
        {value: '1',label: '汇率设置'}, 
        {value: '2',label: '阅读文章奖励'},
        {value: '3',label: '发表评论奖励'},
        {value: '4',label: '发布文章奖励'},
        {value: '5',label: '邀请好友奖励'},
        {value: '6',label: '分享文章奖励'},
        {value: '7',label: '晒收入奖励'},
        {value: '8',label: '周签到奖励'},
        {value: '9',label: '绑定第三方账号奖励'},
        {value: '10',label: '徒弟发布奖励'},
        {value: '11',label: '兑换为现金'},
        {value: '12',label: '提现设置'},
        {value: '13',label: '绑定邀请码'},],
      accountOption: [
        {value: '0',label: '全部'}, 
        {value: 'JTB',label: '交通币'}, 
        {value: 'RMB',label: '现金'}],
      idDetail:'',
      form1:{},
      form2:{},
      form3:{},
      per_page:10,
      currentPage:1,
      total_pages:1,
      accountMsg:{}
    }
  },
  created(){
    this.getParams();
    this.getList();
    this.getPersonData();
  },
  methods:{
    refresh(){
      this.currentPage=1;
      this.getList();
      this.getPersonData();
    },
    // 会员账户统计 
    getPersonData(){
      let params = {
        tokenId: this.$store.state.user.tokenId,
        startTime:this.timeFilter?this.timeFilter[0]:'',
        endTime:this.timeFilter?this.timeFilter[1]:'',
         userId:this.idDetail,
      }
      this.$post('/jtbUserAccount/getUserAccountDataStatistics',params).then(res=> {
          console.log(res)
         this.form1 = res.data[0].jtbStatistics;
         this.form2 = res.data[0].jtbExchangeStatistics;
         this.form3 = res.data[0].jtbWithdrawStatisticsPlat;
         this.accountMsg = res.data[0].members;
        });
    },
    // 获取详情
    getParams () {
      // 取到路由带过来的参数 
      let routerParams = this.$route.params
      // 将数据放在当前组件的数据内
      // this.form1 = routerParams
      this.idDetail = routerParams.id;
      this.userCode = routerParams.userCode;
      this.phone = routerParams.phone;
      this.nickName = routerParams.nickName;
      // console.log(this.idDetail)
    },
    getList(val){
      this.currentPage=val?val:1;
      let params = {
        tokenId: this.$store.state.user.tokenId,
        userId:this.idDetail,
        limit:this.per_page,
        offset:this.currentPage,
        startTime:this.timeFilter?this.timeFilter[0]:'',
        endTime:this.timeFilter?this.timeFilter[1]:'',
        direction:this.income==0?'':this.income,
        amountType:this.tradeAccount==0?'':this.tradeAccount,
        orderType:this.tradeType==0?'':this.tradeType,
      }
      this.$post('/jtbUserAccount/findPaymentInfo',params).then(res => {
        this.tableData =  res.data[0].rows;
        this.total_pages = res.data[0].total;
      });
    },
    handleSizeChange(val){
      this.per_page = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // this.currentPage = val;
      this.getList(val);
    },
  },
  watch: {
  // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  } 
}
</script>
<style>
.coin-detail1 .statistics_header{
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
.coin-detail1 .showBlock{
  background-color:#fff;
  background-repeat:no-repeat;
  background-position:center 20px;
  height: 220px;
  border:1px solid rgba(243,245,248,1);
  background-size: 37px 45px;
  padding-top: 70px;
}
.coin-detail1 .el-form-item__label{
  font-size: 12px;
  line-height: 30px;
  color: #666;
}
.coin-detail1 .el-form-item__content{
  line-height: 30px;
}
.coin-detail1 .show_info{
  padding-left:10px;
}
.coin-detail1 .el-form-item{
  margin-bottom: 0;
}
</style>


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
          <el-date-picker style="width:95%" size="mini" v-model="timeFilter" type="datetimerange" 
          start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH-mm-ss"
          :default-time="['00:00:00', '00:00:00']">
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
          <el-button class="light_btn" size="mini" @click.native.prevent="getComList()">搜索</el-button>
          <el-button class="light_btn" size="mini" @click.native.prevent="getComList()">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="statistics_header clearfix">
        <p class="pull-left">会员提现数据统计</p>
        <div class="pull-right" style="font-size:14px;">
          <span class="mr40">会员ID：use100000q</span>
          <span class="mr40">昵称：黄冬冬</span>
          <span class="mr20">手机号：13123456543</span>
        </div>
      </div>
      <el-row>
        <el-col :span="8" style="padding-right:4%;">
          <div class="showBlock" style="background-image:url(/static/img/jtb.png)">
            <p class="text-center marBo10" style="color:#FFBC00;">交通币（JTB）</p>
            <el-form ref="form1" :model="form1" label-width="50%">
              <el-form-item label="发行总量:">
                <p v-text="form1.a" class="show_info"></p>
              </el-form-item>
              <el-form-item label="已使用(JTB):">
                <p v-text="form1.b" class="show_info"></p>
              </el-form-item>
              <el-form-item label="余额(JTB):">
                <p v-text="form1.c" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" style="padding:0 2%;">
          <div class="showBlock" style="background-image:url(/static/img/rmb.png);background-size:45px;">
            <p class="text-center marBo10" style="color:#57E2D9;">JTB兑换RMB</p>
            <el-form ref="form2" :model="form2" label-width="50%">
              <el-form-item label="兑换总量:">
                <p v-text="form2.a" class="show_info"></p>
              </el-form-item>
              <el-form-item label="折合RMB（元）:">
                <p v-text="form2.b" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left:4%;">
          <div class="showBlock" style="background-image:url(/static/img/money.png);background-size:55px 42px;">
            <p class="text-center marBo10" style="color:#FF5D58;">现金（¥）</p>
            <el-form ref="form3" :model="form3" label-width="50%">
              <el-form-item label="提现次数（次）:">
                <p v-text="form3.a" class="show_info"></p>
              </el-form-item>
              <el-form-item label="已提现（¥）:">
                <p v-text="form3.b" class="show_info"></p>
              </el-form-item>
              <el-form-item label="余额（¥）:">
                <p v-text="form3.b" class="show_info"></p>
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
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="date" label="交易类型" width="180"></el-table-column>
        <el-table-column prop="date" label="交易账户" width="180"></el-table-column>
        <el-table-column prop="date" label="收支" width="180"></el-table-column>
        <el-table-column prop="date" label="金额" width="180"></el-table-column>
        <el-table-column prop="date" label="交易方式" width="180"></el-table-column>
      </el-table>
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
        {value: '1',label: '每日签到'}, 
        {value: '2',label: '阅读文章'},
        {value: '3',label: '提现'},
        {value: '4',label: '交通币兑换（当前汇率0）'},
        {value: '5',label: '邀请好友'},
        {value: '6',label: '发表评论'}],
      accountOption: [
        {value: '0',label: '全部'}, 
        {value: '1',label: '交通币'}, 
        {value: '2',label: '现金'}],
      idDetail:'',
      form1:{a:'100',b:'200'},
      form2:{a:'100',b:'200'},
      form3:{a:'100',b:'200'},
      
    }
  },
  created(){
    this.getParams();
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


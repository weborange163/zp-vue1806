<template>
  <div class="page-body coin-withdraw">
   
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
          <el-select style="width:95%" v-model="auditStatus" placeholder="审核状态" size="mini">
            <el-option
              v-for="item in aduitOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        <el-col :span="8" :offset="5">
          <el-input v-model="inputs" size="mini" style="width:60%" placeholder="会员ID、会员昵称、手机号" ></el-input>
          <el-button class="light_btn" size="mini" @click.native.prevent="getList()">搜索</el-button>
          <el-button class="light_btn" size="mini" @click.native.prevent="getList()">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="statistics_header clearfix">
        <p >平台提现数据统计</p>
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
              <el-form-item label="已提现（¥）:">
                <p v-text="form1.failMoney" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()"
        :data="tableData" class="marT20"
        stripe border
        style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="order_time" label="提现时间" width="140"></el-table-column>
        <el-table-column prop="member_id" label="会员ID" width="100"></el-table-column>
        <el-table-column prop="telephone" label="手机号" width="100"></el-table-column>
        <el-table-column prop="money" label="提现金额（元）" width="120"></el-table-column>
        <el-table-column label="提现方式" width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.withdraw_type ==1">微信</p>
             <p v-if="scope.row.withdraw_type ==2">支付宝</p>
          </template>
        </el-table-column>
        <el-table-column label="提现账户" prop="withdraw_account"></el-table-column>
        <el-table-column prop="audit_status" label="审核状态" width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.audit_status ==0" class="dshx">待审核</p>
            <p v-if="scope.row.audit_status ==1" class="yshx">审核通过</p>
            <p v-if="scope.row.audit_status ==2" class="yxx">审核失败</p>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="提现结果" width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.audit_status ==0 || (scope.row.audit_status ==1 && scope.row.status ==0)" class="dshx">待打款</p>
            <p v-if="scope.row.audit_status ==1 && scope.row.status ==1" class="yshx">打款成功</p>
            <p v-if="(scope.row.audit_status ==1 && scope.row.status ==2) || scope.row.audit_status ==2 " class="yxx">失败</p>
          </template>
        </el-table-column>
        <el-table-column prop="audit_user_name" label="审核人" width="100"></el-table-column>
        <el-table-column prop="audit_time" label="审核时间" width="140"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <router-link :to="{name:'coin-detail3',params:{id:scope.row.id}}">
              <el-button type="text"  size="small" class="marR10">详情</el-button>
            </router-link>
            <el-button v-if="scope.row.audit_status==0" type="text" size="small" class="marR10" @click="dialog =true;auditId=scope.row.id">审核</el-button>
            <el-button v-else type="text" size="small" class="marR10" :disabled="true">审核</el-button>
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
    <el-dialog title="提现审核" :visible.sync="dialog" width="400px">
        <el-form :model="dialogForm" ref="dialogForm" label-width="40px" :rules="dialogRules">
          <el-form-item label="">
            <el-radio-group v-model="dialogForm.auditStatus">
              <el-radio label="1">审核通过</el-radio>
              <el-radio label="2">审核不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="auditReason" v-if="dialogForm.auditStatus==2">
           <el-select size="mini" v-model="dialogForm.auditReason" placeholder="请选择原因">
              <el-option label="您的钱包账户存在异常，如有问题请联系客服" value="您的钱包账户存在异常，如有问题请联系客服"></el-option>
              <el-option label="您的账号涉及违规操作，如有问题请联系客服" value="您的账号涉及违规操作，如有问题请联系客服"></el-option>
              <el-option label="您的账号存在非法操作，如有问题请联系客服" value="您的账号存在非法操作，如有问题请联系客服"></el-option>
              <el-option label="您的提现账号信息有误，如有问题请联系客服" value="您的提现账号信息有误，如有问题请联系客服"></el-option>
            </el-select>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog = false;dialogForm={};">取 消</el-button>
          <el-button size="mini" type="primary" :loading="auditing" :disabled="auditing" @click="sureAudit()">确 认</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {miniTable} from '@/utils/table-style.js'
import travelCoinVue from './travel-coin.vue';
export default {
  data(){
    return{
      auditing:false,
      auditId:'',
      dialog:false,
      dialogForm:{auditStatus:'1'},
      dialogRules:{auditReason:[{ required: true, message: '审核原因不能为空', trigger: 'blur' },
            ]},
      currentPage:1,
      per_page:10,
      total_pages:1,
      tableData:[],
      timeFilter:"",
      miniTable:miniTable,
      inputs:'',
      incomeOption: [
        {value: '3',label: '全部'}, 
        {value: '1',label: '已到账'}, 
        {value: '2',label: '打款失败'}, 
        {value: '0',label: '打款中'}],
      income:'',
      auditStatus:'',
      aduitOption: [
        {value: '3',label: '全部'}, 
        {value: '0',label: '待审核'}, 
        {value: '1',label: '审核通过'},
        {value: '2',label: '审核失败'}],
      idDetail:'',
      form1:{},
      
    }
  },
  created(){
    this.getParams();
    this.getList();
  },
  methods:{
    getList(val){
      this.currentPage=val?val:1;
      let params = {
          tokenId: this.$store.state.user.tokenId,
          beginTime:this.timeFilter?this.timeFilter[0]:'',
          endTime:this.timeFilter?this.timeFilter[1]:'',
          queryStatus:this.income=='3'?'':this.income,
          queryAuditStatus:this.auditStatus=='3'?'':this.auditStatus,
          queryVague:this.inputs,
          limit:this.per_page,
          offset:this.currentPage,
        }
        this.$post('/jtbWithdraw/allList',params).then(res=> {
          console.log(res.data[1].rows);
          if(res.code == 0){
            this.total_pages = res.data[1].total;
            this.tableData=res.data[1].rows;
            this.form1 = res.data[0];
            this.$message({
							type: 'success',
							message: res.msg?res.msg:'查询成功'
						});
          }else{
             this.$message({
							type: 'error',
							message: res.msg?res.msg:'查询失败'
						});
          }
        });
    },
    
    sureAudit(){
      this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            this.auditing = true;
            let param = {
              tokenId: this.$store.state.user.tokenId,
              id:this.auditId,
              auditStatus:this.dialogForm.auditStatus,
              auditReason:this.dialogForm.auditReason
            }
            this.$post('/jtbWithdraw/check',param).then(res => {
              if(res.code == 0){
                // console.log(res);
                this.$message({
                  type: 'success',
                  message: res.msg?res.msg:'操作成功'
                });
                this.dialog =false;
                this.getList();
              }
              this.auditing=false;
            });
          }
      })
    },
    handleCurrentChange(val){
      // this.currentPage = val;
      this.getList(val);
    },
    handleSizeChange(val){
      this.per_page = val;
      this.getList();
    },
    handleClick(){

    },
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
.coin-withdraw .statistics_header{
  height: 44px;
  width:100%;
  background: #ECF0F4;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  padding-left: 10px;
  margin-bottom: 10px;
  color: #333;
}
.coin-withdraw .showBlock{
  background-color:#fff;
  background-repeat:no-repeat;
  background-position:center 20px;
  height: 180px;
  border:1px solid rgba(243,245,248,1);
  background-size: 44px;
  padding-top: 70px;
}
.coin-withdraw .el-form-item__label{
  font-size: 12px;
  line-height: 30px;
  color: #666;
}
.coin-withdraw .el-form-item__content{
  line-height: 30px;
}
.coin-withdraw .show_info{
  padding-left:10px;
}
.coin-withdraw .el-form-item{
  margin-bottom: 10px;
}
</style>


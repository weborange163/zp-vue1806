<template>
  <div class="page-body coin-withdraw">
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
          <el-button class="light_btn" size="mini" @click.native.prevent="getComList()">搜索</el-button>
          <el-button class="light_btn" size="mini" @click.native.prevent="getComList()">刷新</el-button>
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
                <p v-text="form1.a" class="show_info"></p>
              </el-form-item>
              <el-form-item label="金额(元):">
                <p v-text="form1.b" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" style="padding:0 2%;">
          <div class="showBlock" style="background-image:url(/static/img/detail2-2.png);">
            <p class="text-center marBo10" style="color:#44BB00;">提现成功</p>
            <el-form ref="form2" :model="form2" label-width="50%">
              <el-form-item label="次数:">
                <p v-text="form2.a" class="show_info"></p>
              </el-form-item>
              <el-form-item label="金额（元）:">
                <p v-text="form2.b" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left:4%;">
          <div class="showBlock" style="background-image:url(/static/img/detail2-3.png);">
            <p class="text-center marBo10" style="color:#F5212D;">提现失败</p>
            <el-form ref="form3" :model="form3" label-width="50%">
              <el-form-item label="次数:">
                <p v-text="form3.a" class="show_info"></p>
              </el-form-item>
              <el-form-item label="已提现（¥）:">
                <p v-text="form3.b" class="show_info"></p>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()"
        :data="tableData" class="marT20"
        stripe border
        style="width: 100%">
        <el-table-column label="序号" type="index"width="50"></el-table-column>
        <el-table-column prop="date" label="提现时间"></el-table-column>
        <el-table-column prop="date" label="会员ID" width="100"></el-table-column>
        <el-table-column prop="date" label="手机号" width="100"></el-table-column>
        <el-table-column prop="date" label="提现金额（元）" width="140"></el-table-column>
        <el-table-column prop="date" label="提现方式" width="80"></el-table-column>
        <el-table-column prop="date" label="提现账户" width="80"></el-table-column>
        <el-table-column prop="date" label="审核状态" width="80"></el-table-column>
        <el-table-column prop="date" label="提现结果" width="80"></el-table-column>
        <el-table-column prop="date" label="审核人" width="180"></el-table-column>
        <el-table-column prop="date" label="审核时间" width="180"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <router-link :to="{name:'coin-detail3',params:{id:scope.row.id}}">
                <el-button type="text"  size="small" class="marR10">详情</el-button>
              </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
  </div>
</template>
<script>
import {miniTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      tableData:[{date:'2011-09-09',id:'1'}],
      timeFilter:"",
      miniTable:miniTable,
      inputs:'',
      incomeOption: [
        {value: '0',label: '全部'}, 
        {value: '1',label: '提现成功'}, 
        {value: '2',label: '提现失败'}, 
        {value: '3',label: '打款中'}],
      income:'',
      auditStatus:'',
      aduitOption: [
        {value: '0',label: '全部'}, 
        {value: '1',label: '待审核'}, 
        {value: '2',label: '审核通过'},
        {value: '3',label: '审核失败'}],
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
  margin-bottom: 0;
}
</style>


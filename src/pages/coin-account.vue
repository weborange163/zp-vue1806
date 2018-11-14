<template>
  <div class="page-body coin-account">
    <div class="page-header">
      <el-row>
        <el-col :span="9">
          <el-date-picker style="width:90%;" size="mini" v-model="timeFilter" type="datetimerange" 
          start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH-mm-ss"
          :default-time="['00:00:00', '00:00:00']">
          </el-date-picker>
        </el-col>
        <el-col :span="8" :offset="7">
          <el-input v-model="inputs" size="mini" style="width:60%" placeholder="会员ID、会员昵称、手机号" ></el-input>
          <el-button class="light_btn" size="mini" @click.native.prevent="getComList()">搜索</el-button>
          <el-button class="light_btn" size="mini" @click.native.prevent="getComList()">刷新</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="statistics_header">平台会员总账户数据统计</div>
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
      <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()"
        :data="tableData" class="marT20"
        style="width: 100%">
        <el-table-column label="会员信息">
          <el-table-column label="序号" type="index"width="50"></el-table-column>
          <el-table-column prop="name" label="会员id" width="120"></el-table-column>
          <el-table-column prop="name" label="昵称" width="120"></el-table-column>
          <el-table-column prop="name" label="手机号" width="160"></el-table-column>
        </el-table-column>
        <el-table-column label="交通币(JTB)">
          <el-table-column prop="name" label="已使用" width="120"></el-table-column>
          <el-table-column prop="name" label="余额" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="现金(元)">
          <el-table-column prop="name" label="提现次数" width="120"></el-table-column>
          <el-table-column prop="name" label="已提现" width="120"></el-table-column>
          <el-table-column prop="name" label="余额" width="120"></el-table-column>
        </el-table-column>
        <el-table-column >
          <el-table-column label="操作"  fixed="right">
            <template slot-scope="scope">
              <router-link :to="{name:'coin-detail1',params:{id:scope.row.id}}">
                <el-button type="text"  size="small"
                 class="marR10">收支明细</el-button>
              </router-link>
              <router-link :to="{name:'coin-detail2',params:{id:scope.row.id}}">
                <el-button type="text"  size="small" class="marR10">提现记录</el-button>
              </router-link>
            </template>
          </el-table-column>
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
        form1:{a:'5000JTB',b:'1000JTB',c:'4000JTB'},
        form2:{a:'5000JTB',b:'1000元'},
        form3:{a:'5000',b:'1000元',c:'4000元'},
        timeFilter:'',
        inputs:'',
        tableData:[{name:'18833445566',id:1}],
        miniTable:miniTable,
        currentPage:1,
        per_page:10,
        total_pages:1
      }
    },
    methods:{
      handleCurrentChange(){

      },
      handleSizeChange(){

      }
    }
}
</script>
<style>
.statistics_header{
  height: 44px;
  width:100%;
  background: #ECF0F4;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  margin-bottom: 10px;
  color: #333;
}
.showBlock{
  background-color:#fff;
  background-repeat:no-repeat;
  background-position:center 20px;
  height: 220px;
  border:1px solid rgba(243,245,248,1);
  background-size: 37px 45px;
  padding-top: 70px;
}
.coin-account .el-form-item__label{
  font-size: 12px;
  line-height: 30px;
  color: #666;
}
.coin-account .el-form-item__content{
  line-height: 30px;
}
.coin-account .show_info{
  padding-left:10px;
}
.coin-account .el-form-item{
  margin-bottom: 0;
}
</style>


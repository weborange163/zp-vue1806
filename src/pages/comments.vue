<template>
  <div class="page-body comments">
    <div class="page-header">
      <el-row>
        <el-col :span="3">
          <el-select v-model="value" placeholder="状态">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="text-right" style="padding-right:4px;"><span style="line-height:28px;" >评论时间</span></el-col>
        <el-col :span="6">
          <el-date-picker style="width:90%;" v-model="value2" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
          </el-date-picker>
        </el-col>
        <el-col :span="7" :offset="5">
          <el-input v-model="inputs" style="width:80%" placeholder="评论会员、会员ID、评论对象ID、评论内容" ></el-input>
          <el-button class="light_btn" @click.native.prevent="searchCom()">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="text-right marBo4">
        <el-button class="light_btn" @click.native.prevent="getComList()">刷新</el-button>
      </div>
      <el-table :row-class-name="btnTable()" :header-row-class-name="btnTable()"
        :data="tableData"
        stripe border
        style="width: 100%">
        <el-table-column label="序号" type="index" width='50'></el-table-column>
        <el-table-column prop="content"  label="评论内容"></el-table-column>
        <el-table-column prop="toPer"  label="评论对象" width="120"></el-table-column>
        <el-table-column prop="commenter"  label="评论人" width="120"></el-table-column>
        <el-table-column prop="id"  label="会员ID" width="180"></el-table-column>
        <el-table-column prop="time"  label="评论时间" width="100"></el-table-column>
        <el-table-column prop="status"  label="状态" width="80"></el-table-column>
        <el-table-column prop="auditBy"  label="审核人" width="180"></el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{name:'comments-lookes',params:{id:scope.row.id}}">
              <el-button type="text"  size="small">查看</el-button>
            </router-link>
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small">屏蔽</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {btnTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      btnTable:btnTable,
      value:'',
      value2:'',
      inputs:'',
      options: [{
        value: '',
        label: '全部'
        },{
        value: '1',
        label: '已屏蔽'
        }],
      tableData: [{
        content: '我是评论的内容,哈哈哈哈,我是评论的内容',
        toPer: '王小虎',
        commenter: '王大虎',
        id:'1233',
        time:'2018-09-08',
        status:'已屏蔽',
        auditBy:'机审',
      }, {
        content: '我是评论的内容',
        toPer: '王小虎',
        commenter: '王大虎',
        id:'1233',
        time:'2018-09-08',
        status:'已屏蔽',
         auditBy:'机审',
      }, {
        content: '我是评论的内容',
        toPer: '王小虎',
        commenter: '王大虎',
        id:'1233',
        time:'2018-09-08',
        status:'已屏蔽',
         auditBy:'管理员',
      }, {
        content: '我是评论的内容',
        toPer: '王小虎',
        commenter: '王大虎',
        id:'1233',
        time:'2018-09-08',
        status:'正常',
         auditBy:'机审',
      }]
    }
  },
  methods:{
    // 搜索评论
    searchCom(){

    },
    getComList(){
      
    },
    handleClick(row) {
      console.log(row);
    }
  }
}
</script>
<style>

</style>


<template>
    <div class="page-body feedback">
      <div class="page-header">
        <el-input size='mini' v-model="role_nik" placeholder="账号/手机号/角色" style="width:200px;"></el-input>
        <el-button class="light_btn">搜索</el-button>
      </div>
      <div class="box miniBox">
        <div class="text-right marBo4">
          <el-button class="light_btn" size="mini"><i class="el-icon-plus" style="font-weight:600;"></i> 账号</el-button>
          <el-button class="light_btn" size="mini">刷新</el-button>
        </div>
        <el-table :data="tableData" stripe border style="width: 100%" :row-class-name="miniTable()" :header-row-class-name="miniTable()">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="date" label="账号" width="180"></el-table-column>
          <el-table-column prop="date" label="职位" width="100"></el-table-column>
          <el-table-column prop="date" label="手机" width="140"></el-table-column>
          <el-table-column prop="date" label="拥有角色"></el-table-column>
          <el-table-column prop="date" label="账号状态" width="180"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="marT20">
          <el-pagination class="text-right" background @current-change="handleCurrentChange" 
          :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" 
          layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages" @size-change="handleSizeChange">
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
      per_page:10,
      total_pages:1,
      currentPage:1,
      role_nik:'',
      value:'',
      miniTable:miniTable,
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '已启用'
      }, {
        value: '选项3',
        label: '已禁用'
      }],
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods: {
    handleCurrentChange(val) {
      // this.currentPage = val;
      
    },
    handleSizeChange(val){
      this.per_page = val;
    }
  },
}
</script>
<style>

</style>


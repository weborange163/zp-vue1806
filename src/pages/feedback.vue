<template>
    <div class="page-body feedback">
      <div class="page-header">
          <el-date-picker style="width:360px;"
              v-model="user_msg" size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
            <el-button class="light_btn" size="mini">搜索</el-button>
            <el-button class="light_btn" size="mini">导出</el-button>
      </div>
      <div class="box">
          <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()" v-loading="loading"
          :data="tableData"
          stripe border
          style="width: 100%">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="client_name"  label="用户" width="120"></el-table-column>
          <el-table-column prop="content"  label="意见反馈"></el-table-column>
          <el-table-column prop="contact_way"  label="联系方式" width="180"></el-table-column>
          <el-table-column prop="create_time"  label="时间" width="180"></el-table-column>
        </el-table>
        <div class="marT20">
          <el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="prev, pager, next" :total="this.total_pages">
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
      loading:false,
      miniTable:miniTable,
      per_page: 10,
      total_pages: 0,
      currentPage: 1,
      tableData:[],
      user_msg:''
    }
  },
  created() {
    this.getFeedList();
  },
  methods:{
    getFeedList(){
      var params = {
        tokenId: this.$store.state.user.tokenId,
        limit: this.per_page,
        offset: this.currentPage,
      };
      this.$post('feedBackInfo/list',params).then(res => {
        // console.log(res)
        this.tableData = res.data[0].rows;
        this.total_pages = res.data[0].total;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFeedList();
    },
  }
}
</script>
<style>

</style>


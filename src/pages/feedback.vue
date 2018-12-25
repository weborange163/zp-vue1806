<template>
    <div class="page-body feedback">
      <div class="page-header">
        <el-date-picker size="mini" style="width:400px;" v-model="timeRange" type="daterange" 
           value-format="yyyy-MM-dd HH:mm:ss"
           start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '00:00:00']">
					</el-date-picker>
        <el-button class="light_btn" size="mini" @click="getFeedList">搜索</el-button>
        <el-button class="light_btn" size="mini" @click="getExcel">导出</el-button>
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
import { getBaceUrl } from '@/utils/auth'
export default {
  data(){
    return{
      loading:false,
      miniTable:miniTable,
      per_page: 10,
      total_pages: 0,
      currentPage: 1,
      tableData:[],
      timeRange:'',
      baceUrl:''
    }
  },
  created() {
    this.getFeedList();
		this.baceUrl = getBaceUrl();
  },
  methods:{
    getFeedList(val){
      this.currentPage=val?val:1;
      var params = {
        tokenId: this.$store.state.user.tokenId,
        limit: this.per_page,
        offset: this.currentPage,
      };
       if(this.timeRange){
        params.timeStart=this.timeRange[0];
        params.timeEnd=this.timeRange[1];
      }
      console.log(this.timeRange[0],this.timeRange[1])
      this.$post('feedBackInfo/list',params).then(res => {
        // console.log(res)
        this.tableData = res.data[0].rows;
        this.total_pages = res.data[0].total;
      });
    },
    handleCurrentChange(val) {
      // this.currentPage = val;
      this.getFeedList(val);
    },
    handleSizeChange(val){
      this.per_page = val;
      this.getFeedList();
    },
    getExcel(){
      this.$confirm('确定要导出用户反馈吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params={
            tokenId: this.$store.state.user.tokenId,
          }
          if(this.timeRange){
            params.timeStart=this.timeRange[0];
            params.timeEnd=this.timeRange[1];
          }
          var url = '' ;
          if(this.timeRange){
            url = this.baceUrl+'/feedBackInfo/exportFeedBackInfo?timeStart='+this.timeRange[0]+'&timeEnd='+this.timeRange[1]+'&tokenId='+this.$store.state.user.tokenId;
          }else{
            url = this.baceUrl+'/feedBackInfo/exportFeedBackInfo?tokenId='+this.$store.state.user.tokenId;
          }
          window.location.href=url;

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导出'
          });          
        });
    }
  }
}
</script>
<style>
.feedback .el-table .cell{
  white-space: normal;
  text-overflow: initial;
}

</style>


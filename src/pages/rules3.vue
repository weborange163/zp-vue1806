<template>
    <div class="page-body rules">
      <div class="page-header">
      </div>
      <div class="box">
        <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()" v-loading="loading"
          :data="tableData"
          stripe border
          style="width: 100%;max-width:600px;margin:0 auto;">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="province"  label="省"></el-table-column>
          <el-table-column prop="city"  label="市"></el-table-column>
          <el-table-column prop="area"  label="区"></el-table-column>
        </el-table>
        <div class="marT20">
          <el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="prev, pager, next" :total="this.total">
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
      input:'',
      tableData:[],
      per_page: 10,
      total: 0,
      currentPage: 1,
    }
  },
  created() {
    this.getList();
  },
  methods:{
    getList(){
      this.loading=true;
      var params = {
        tokenId: this.$store.state.user.tokenId,
        limit: this.per_page,
        offset: this.currentPage,
      }
      this.$post('area/findArea',params).then(res => {
        console.log(res)
        if(res.code == 0){
          this.tableData = res.data[0].rows;
          this.total = res.data[0].total;
          this.loading=false;
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
  }
}
</script>
<style>

</style>


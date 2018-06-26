<template>
    <div class="page-body banner">
        <div class="page-header clearfix">
          <el-input v-model="search_info" placeholder="请输入内容" style="width:220px;margin:0 20px;"></el-input>
          <el-button class="light_btn">搜索</el-button>
        </div>
        <div class="box">
          <div style="text-align:right;margin-bottom:4px;">
            <el-button class="light_btn">发布</el-button>
            <el-button class="light_btn">刷新</el-button>
          </div>
          <div class="banner_show">
            <el-table :data="banner_data" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable">
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="原文标题" prop="title_original"></el-table-column>
              <el-table-column label="短标语" prop="title_short"></el-table-column>
              <el-table-column label="发布状态" prop="status" width="80">
                <template  slot-scope="scope">
                  <p v-if="scope.row.status=='1'" class="yshx">已上线</p>
                  <p v-if="scope.row.status=='0'" class="dshx">待上线</p>
                  <p v-if="scope.row.status=='2'" class="yxx">已下线</p>
                </template>
              </el-table-column>
              <el-table-column label="内容类型" width='100'>
                <template  slot-scope="scope">
                  <p v-if="scope.row.banner_type=='1'" >新闻</p>
                  <p v-if="scope.row.banner_type=='2'" >专题</p>
                </template>
              </el-table-column>
              <el-table-column label="图片" prop="cover_img_id" width='100'></el-table-column>
              <el-table-column label="上线时间" prop="online_time" width='100'></el-table-column>
              <el-table-column label="创建时间" prop="create_time" width='100'></el-table-column>
              <el-table-column label="操作" width="260" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.status =='1'" style="margin-right:8px;vertical-align:middle;">下线</el-button>
                  <el-button type="text"><i class="iconfont icon-see" ></i></el-button>
                  <el-button type="text"><i class="iconfont icon-edit" ></i></el-button>
                  <el-button type="text" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete" ></i></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
              <el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="prev, pager, next" :total="this.total_pages">
              </el-pagination>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { btnTable } from '@/utils/table-style.js'
export default {
  data() {
    return {
      search_info:'',
      btnTable:btnTable,
      per_page: 2,
      params:{},
      total_pages: 0,
      currentPage: 1, // 页面默认展示的当前页码
      banner_data:[]
    }
  },
  created(){
    this.initParams();
    this.getBannerlist();
  },
  methods:{
    getBannerlist(params){
      if(!params){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          limit:this.per_page,
          offset:this.currentPage
        }
      }
      this.$post('bannerInfo/list',params).then(res => {
        console.log(res.data[0].rows);
        this.banner_data = res.data[0].rows;
        this.total_pages = res.data[0].total;
      })
    },
    // 
    initParams(){
      this.params = {
        tokenId:this.$store.state.user.tokenId,
        limit:this.per_page,
        offset:this.currentPage
      }
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.initParams()
      console.log(this.params)
      this.getBannerlist(this.params);
    },
    deleteRow(index, rows) {
       // rows.splice(index, 1);
       this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        console.log(index, rows);
      },
      sort() {
        let arr = [
          {id:1},
          {id:2},
          {id:3},
          {id:4},
          {id:5},
          {id:6}
        ]

        let obj1 = arr[2];
        arr[2] = arr[3];
        arr[3] = obj1;
        console.log(arr)
      }
  }
}
</script>
<style>

</style>


<template>
  <div class="page-body comments">
    <div class="page-header">
      <el-row>
        <el-col :span="2">
          <el-select v-model="value" placeholder="状态" style="width:90%" size="mini">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <el-date-picker style="width:90%;" size="mini" v-model="value2" type="datetimerange" 
          start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH-mm-ss"
           :default-time="['00:00:00', '00:00:00']">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-select v-model="value3" placeholder="分类" style="width:90%" size="mini">
            <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-input v-model="inputs" size="mini" style="width:80%" placeholder="评论会员、会员ID、评论对象ID、评论内容" ></el-input>
          <el-button class="light_btn" size="mini" @click.native.prevent="getComList()">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="text-right marBo4">
        <el-button class="light_btn" @click.native.prevent="getComList()">刷新</el-button>
      </div>
      <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()" v-loading="loading"
        :data="tableData"
        stripe border
        style="width: 100%">
        <el-table-column label="序号" type="index" width='50'></el-table-column>
        <el-table-column prop="content"  label="评论内容"></el-table-column>
        <el-table-column prop="commentObj"  label="评论对象" width="120"></el-table-column>
        <el-table-column prop="nickName"  label="评论人" width="120"></el-table-column>
        <el-table-column prop="userUniqueCode"  label="会员ID" width="100"></el-table-column>
        <el-table-column prop="createTime"  label="评论时间" width="180"></el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.status=='0'" class="yshx">正常</p>
						<p v-if="scope.row.status=='1'" >已屏蔽</p>
          </template>
        </el-table-column>
        <el-table-column prop="checkPerson"  label="审核人" width="120">
          <template slot-scope="scope">
            <p v-if="scope.row.checkPerson==''" >机器审核</p>
						<p v-else>{{scope.row.checkPerson}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <router-link :to="{name:'comments-lookes',params:{id:scope.row.id}}">
              <el-button type="text"  size="small" class="marR10">查看</el-button>
            </router-link>
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small" v-if="scope.row.status=='0'" @click="isBlock(scope.row.id,scope.row.type,1)">屏蔽</el-button>
            <el-button type="text" size="small" v-else @click="isBlock(scope.row.id,scope.row.type,0)">取消屏蔽</el-button>
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
  </div>
</template>
<script>
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import {miniTable} from '@/utils/table-style.js'
import { getBaceUrl } from '@/utils/auth'
export default {
  data(){
    return{
      loading:false,
      miniTable:miniTable,
      baceUrl:'',
      per_page: 10,
      total_pages: 0,
      currentPage: 1,
      type:'',
      value:'',
      value2:'',
      value3:'',
      inputs:'',
      options: [
        {value: '2',
        label: '全部'
        },{
        value: '1',
        label: '已屏蔽'
        },{
        value: '0',
        label: '未屏蔽'
        }],
        
      options3: [
        {value: '0',
        label: '全部'
        },{
        value: '1',
        label: '新闻'
        },{
        value: '2',
        label: '行情'
        },{
        value: '3',
        label: '专题'
        },{
        value: '4',
        label: '评论'
        },],
      tableData: []
    }
  },
  created(){
    this.baceUrl = getBaceUrl();
    this.getComList();
  },
  methods:{
    isBlock(id,type,num){
      var text;
      if(num == 1){
        text = '屏蔽';
      }else{
        text = '取消屏蔽';
      }
      this.$confirm(`此操作将${text}当前评论, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          var params = {
            tokenId: this.$store.state.user.tokenId,
            id:id,
            status:num,
            type:type
          }
          this.$post('comment/isBlock', params).then(res => {
            console.log(res);
            this.getComList();
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    
    // 获取评论list
    getComList(){
      this.loading = true;
      // console.log(this.value2);
      // NProgress.start();
      var params = {
        tokenId: this.$store.state.user.tokenId,
        limit: this.per_page,
        offset: this.currentPage,
        status:this.value,
        type:this.value3,
        simpleParameter:this.inputs
      }
      if(this.value2){
        params.startTime = this.value2[0];
        params.endTime = this.value2[1];
        console.log(this.value2[0])
      }
      if(this.value == '2'){
        params.status = ''
      }
      if(this.value3 == '0'){
        params.type  = ''
      }
      this.$post('comment/list', params).then(res => {
        if(res.code == 0){
          console.log(res)
          console.log(res.data[0].rows);
          this.tableData = res.data[0].rows;
          this.total_pages = res.data[0].total;
          this.loading=false;
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getComList();
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val){
      this.per_page = val;
      this.getComList();
    }
  }
}
</script>
<style>

</style>


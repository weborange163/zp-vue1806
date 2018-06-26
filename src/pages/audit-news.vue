<template>
  <div class="page-body audit_news">
    <div class="page-header">
      <el-row>
        <el-col :span="4">
          <el-select v-model="value" placeholder="发布来源">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="text-right" style="padding-right:4px;"><span style="line-height:28px;" >创建时间</span></el-col>
        <el-col :span="6">
            <el-date-picker style="width:90%;"
              v-model="timeVal"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :span="6" :offset="6">
            <el-input v-model="search_pra" placeholder="请输入内容" style="width:70%"></el-input>
            <el-button class="light_btn">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
            <div>
            <el-table :data="audit_all" border stripe v-loading="loading" :row-class-name="btnTable" :header-row-class-name="btnTable" >
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到"  width="80">
                <template slot-scope="scope">
                  新闻
                </template>
              </el-table-column>
              <el-table-column label="创建人" prop="author" width="80"></el-table-column>
              <el-table-column label="发布状态" width="120">
                <template slot-scope="scope">
                  <p v-if="scope.row.status=='1'" >待审核</p>
                  <p v-if="scope.row.status=='2'" >审核中</p>
                  <p v-if="scope.row.status=='3'" >审核不通过</p>
                  <p v-if="scope.row.status=='4'" >审核通过并上线</p>
                  <p v-if="scope.row.status=='5'" >下线</p>
                </template>
              </el-table-column>
              <el-table-column label="发布来源" width="100">
                <template slot-scope="scope">
                    <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                    <p v-if="scope.row.publish_source=='2'" >APP</p>
                    <p v-if="scope.row.publish_source=='3'" >数据爬取</p>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
              <el-table-column label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.status=='1'" @click="toAudit(scope.row)">审核</el-button>
                    <el-button v-else type="text">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
            <el-pagination class="text-right" background @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page1" layout="prev, pager, next" :total="this.total_pages1">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <div>
            <div class="text-right marBo4">
							<el-button class="light_btn" @click="toAudited">批量审核</el-button>
							<el-button class="light_btn">刷新</el-button>
						</div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到" prop="type" width="80">
                <template slot-scope="scope">
                  新闻
                </template>
              </el-table-column>
              <el-table-column label="创建人" prop="author" width="80"></el-table-column>
              <el-table-column label="发布状态" width="80">
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='1'" >待审核</p>
                    <p v-if="scope.row.status=='2'" >审核中</p>
                    <p v-if="scope.row.status=='3'" >审核不通过</p>
                </template>
              </el-table-column>
              <el-table-column label="发布来源" width="100">
                <template slot-scope="scope">
                  <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                  <p v-if="scope.row.publish_source=='2'" >APP</p>
                  <p v-if="scope.row.publish_source=='3'" >数据爬取</p>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
            <el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page2" layout="prev, pager, next" :total="this.total_pages2">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核中" name="third">审核中</el-tab-pane>
        <el-tab-pane label="审核通过" name="fourth">审核通过</el-tab-pane>
        <el-tab-pane label="审核失败" name="fifth">审核失败</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { btnTable } from '@/utils/table-style.js'
export default {
  data(){
    return{
      loading:false,
      per_page1:20,
      currentPage1:1,
      total_pages1:0,
      currentPage1:1,
      per_page2:10,
      currentPage2:1,
      total_pages2:0,
      currentPage2:1,
      btnTable:btnTable,
      options: [{
      value: '选项1',
      label: '全部'
    }, {
      value: '选项2',
      label: '后台录入'
    }, {
      value: '选项3',
      label: 'App'
    }, {
      value: '选项4',
      label: '数据爬取'
    }],
    audit_no:[],
    ids:[],
    multipleSelection: [],
    audit_all:[],
    value: '',
    timeVal:'',
    activeName: 'first',
    search_pra:''
    }
  },
  created(){
    this.getAuditlist();
  },
  methods: {
    // 批量提交审核
    toAudited(){
      if(this.ids == false){
        this.$message({
          message: '请勾选需要提交审核的文章!',
          type: 'warning'
        });
        return;
      }
      this.$confirm('确定要提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        var params = {
          tokenId:this.$store.state.user.tokenId,
          ids:this.ids.join(','),
          status:4,
          checkReason:'审核原因',
          checkMessage:'审核信息'
        }
        console.log(params)
        this.$post('news/check',params).then(res => {
          console.log(res)
          this.activeName = 'first';
          this.getAuditlist();
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });          
      });
    },
    //去审核,模拟实现
    toAudit(row){
      // console.log(row.id);
      var params = {
        tokenId:this.$store.state.user.tokenId,
        id:row.id,
        status:'2',
      }
      this.$post('checkStatus',params).then(res =>{
        console.log(res)
      })
    },
    // 批量审核 之 复选框操作 获取要批量操作的新闻
    handleSelectionChange(val){
       this.multipleSelection = val;
       this.ids = [];
				this.multipleSelection.map(item => {
					this.ids.push(item.id);
				})
    },
    //获取所有审核相关的新闻
    getAuditlist(){
      this.loading = true;
      if(!params){
        var params = {
        tokenId:this.$store.state.user.tokenId,
        queryType:'audit',
        limit:this.per_page1,
        offset:this.currentPage1
        }
      }
      this.$post('news/list',params).then(res =>{
        this.loading = false;
        // console.log(res.data[0].rows)
        this.audit_all = res.data[0].rows;
        this.total_pages1 = res.data[0].total;
      })
    },
    handleClick(tab, event) {
      console.log(tab.name, event);
      if(tab.name == 'second'){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          status:'1',
          limit:this.per_page2,
          offset:this.currentPage2
        }
        this.$post('news/list',params).then(res =>{
          this.audit_no = res.data[0].rows;
          this.total_pages2 = res.data[0].total;
        })

      }

    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.audit_all=[];
      this.getAuditlist();
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.currentPage2 = val;
      var params = {
          tokenId:this.$store.state.user.tokenId,
          status:'1',
          limit:this.per_page2,
          offset:this.currentPage2
        }
      this.$post('news/list',params).then(res =>{
        this.audit_no = res.data[0].rows;
        this.total_pages2 = res.data[0].total;
      })
    },
  }
}
</script>
<style>
.audit-news .el-date-editor .el-range__icon,
.audit-news .el-date-editor .el-range-separator{
    line-height: 22px;
}
.el-date-editor .el-range__icon, .el-date-editor .el-range-separator {
    line-height: 28px;
    height: 28px;
}
</style>


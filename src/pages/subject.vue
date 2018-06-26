<template>
  <div class="page-body subject">
    <div class="page-header">
      <el-row>
        <el-col :span="3">
          <el-select v-model="subjectSelect" placeholder="请选择">
            <el-option
            v-for="item in subjects"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        </el-col>
        <el-col :span="2" class="text-right" style="line-height:28px;">
          <span>上线时间</span>
        </el-col>
        <el-col :span="6" class="padLe4">
            <el-date-picker style="width:90%;"
            v-model="timeVal"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-col>
        <el-col :span="7" :offset="6">
          <el-input v-model="subjectSearch" style="width:70%"></el-input>
          <el-button class="light_btn">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="text-right marBo4">
        <router-link :to="{name:'subject-add'}" ><el-button class="light_btn">新建专题</el-button></router-link>
        <el-button class="light_btn" @click="dialogVisible = true">置顶排序</el-button>
        <el-button class="light_btn">刷新</el-button>
      </div>
      <el-table :data="subjectList" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
        <el-table-column label="序号" type="index" width='50'></el-table-column>
        <el-table-column label="专题标题" prop="title"></el-table-column>
        <el-table-column label="专题封面" prop="cover_img_id"></el-table-column>
        <el-table-column label="发布状态" width="80">
          <template slot-scope="scope">
              <p v-if="scope.row.status=='0'" >新建</p>
              <p v-if="scope.row.status=='3'" >待上线</p>
              <p v-if="scope.row.status=='4'" >已上线</p>
              <p v-if="scope.row.status=='5'" >已下线</p>
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="update_user_id" width="80"></el-table-column>
        <el-table-column label="发布来源" prop="publish_source" width="100">
          <template slot-scope="scope">
              <p v-if="scope.row.status=='1'" >PC后台</p>
              <p v-if="scope.row.status=='2'" >APP</p>
              <p v-if="scope.row.status=='3'" >数据爬取</p>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="newsShow(scope.row)"><i class="iconfont icon-see"></i></el-button>
            <el-button type="text"><i class="iconfont icon-edit"></i></el-button>
            <el-button type="text" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;">
      <el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" 
          :page-size="this.per_page" layout="prev, pager, next" :total="this.total_pages">
      </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {btnTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      subjectList:[],
      per_page:2,
      currentPage:1,
      total_pages:0,
      currentPage:1,
      btnTable:btnTable,
      timeVal:'',
      subjectSearch:'',
      subjectSelect:'',
      subjects:[{
        value:'all',
        title:'全部'
        },
        {
        value:'aa',
        title:'待上线'
        },
        {
        value:'bb',
        title:'已上线'
        }
      ]
    }
  },
  created(){
    this.getSubjectList();
  },
  methods:{
    //专题列表
    getSubjectList(){
      var params = {
        tokenId:this.$store.state.user.tokenId,
        limit:this.per_page,
        offset:this.currentPage
      }
      this.$post('specialInfo/list',params).then(res => {
        console.log(res.data[0].rows);
        this.subjectList = res.data[0].rows;
        this.total_pages = res.data[0].total;
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getSubjectList();
    },
    // 删除专题
    deleteRow(index, rows) {
      console.log(index,rows)
				// rows.splice(index, 1);
				this.$confirm('此操作将永久删除该专题, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						id:rows.id
					}
					this.$post('specialInfo/delete',params).then(res => {
						console.log(res)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getSubjectList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
  }
}
</script>
<style>
  .el-date-editor .el-range__icon,
  .el-date-editor .el-range-separator{
    line-height: 20px;
  }
</style>


<template>
  <div class="page-body subject">
    <div class="page-header">
      <el-row>
        <el-col :span="3">
          <el-select v-model="value" placeholder="发布来源">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
       <el-col :span="2" class="text-right" style="padding-right:4px;"><span style="line-height:28px;" >上线时间</span></el-col>
        <el-col :span="6">
           <el-date-picker style="width:90%;" v-model="value6" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
					</el-date-picker>
        </el-col>
        <el-col :span="7" :offset="6">
          <el-input v-model="inputs" style="width:70%" placeholder="标题、专题ID" ></el-input>
          <el-button class="light_btn" @click.native.prevent="getSubjectList()">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="text-right marBo4">
        <router-link :to="{name:'subject-add'}" ><el-button class="light_btn">新建专题</el-button></router-link>
        <el-button class="light_btn" @click="dialogVisible = true">置顶排序</el-button>
        <el-button class="light_btn" @click.native.prevent="getSubjectList1()">刷新</el-button>
      </div>
      <el-table :data="subjectList" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
        <el-table-column label="序号" type="index" width='50'></el-table-column>
        <el-table-column label="专题标题" prop="title" ></el-table-column>
        <el-table-column label="专题封面" prop="cover_img_id"></el-table-column>
        <el-table-column label="发布状态" width="80">
          <template slot-scope="scope">
              <p v-if="scope.row.status=='0'" >新建</p>
              <p v-if="scope.row.status=='3'" >待上线</p>
              <p v-if="scope.row.status=='4'" >已上线</p>
              <p v-if="scope.row.status=='5'" >已下线</p>
          </template>
        </el-table-column>
        <el-table-column label="上线时间" prop="online_time" width="160"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
        <el-table-column label="专题ID" prop="article_id" width="140"></el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" v-if="scope.row.top_flag=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp(scope.$index, scope.row)"> 取消置顶 </el-button>
						<el-button type="text" v-if="scope.row.top_flag=='0' && scope.row.status =='4'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp1(scope.$index, scope.row)"> 置顶 </el-button>
						<el-button type="text" v-if="scope.row.status=='4' && scope.row.top_flag!='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button>
						<el-button type="text" v-if="scope.row.status=='3'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag2(scope.$index, scope.row)">上线</el-button>
						<el-button type="text" @click="marketShow(scope.row)" :disabled="true"><i class="iconfont icon-see"></i></el-button>
						<router-link :to="{name:'subject-edit'}">
							<el-button type="text"><i class="iconfont icon-edit"></i></el-button>
						</router-link>
						<el-button type="text" v-if="scope.row.status !='4'" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
						<el-button type="text" v-else disabled><i class="iconfont icon-delete unclick"></i></el-button>
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
      per_page:5,
      currentPage:1,
      total_pages:0,
      currentPage:1,
      btnTable:btnTable,
      timeVal:'',
      subjectSearch:'',
      subjectSelect:'',
        options: [{
      value: '',
      label: '全部'
    },{
      value: '3',
      label: '待上线'
    }, {
      value: '4',
      label: '已上线'
    }, {
      value: '5',
      label: '已下线'
    }],
    		value:'',
				 value6:'',
				 inputs:'',
				 topFlag:'',
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
        offset:this.currentPage,
        status:this.value,
        simpleParameter:this.inputs,
////					开始也就是逗号前面的
					timeStart:this.value6[0],
////					结束也就是逗号后面的
					timeEnd:this.value6[1],
      }
      this.$post('specialInfo/list',params).then(res => {
        console.log(res.data[0].rows);
        this.subjectList = res.data[0].rows;
        this.total_pages = res.data[0].total;
      })
      this.inputs='';
      this.value6='';
      this.value='';
    },
    //刷新列表
    getSubjectList1(){
      var params = {
        tokenId:this.$store.state.user.tokenId,
        limit:this.per_page,
        offset:this.currentPage,
      }
      this.$post('specialInfo/list',params).then(res => {
        console.log(res.data[0].rows);
        this.subjectList = res.data[0].rows;
        this.total_pages = res.data[0].total;
      })
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
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
					this.$post('/specialInfo/delete',params).then(res => {
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
			},
			//置顶
//			specialInfo/list
	//取消置顶
			cancelUp(index, rows) {
				this.$confirm('确定要取消置顶吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						topFlag:'0'
					}
					this.$post('/specialInfo/top', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '取消成功!'
						});
						this.getSubjectList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消失败'
					});
				});
			},
			//置顶
			cancelUp1(index, rows) {
				this.$confirm('确定要置顶吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						topFlag:'1'
					}
					this.$post('/specialInfo/top', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '置顶成功!'
						});
						this.getSubjectList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '置顶失败'
					});
				});
			},
			
			//			下线
			top_flag1(index, rows) {
				this.$confirm('确定要下线吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						status:'6'
					}
					this.$post('/specialInfo/isOnline', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '下线成功!'
						});
						this.getSubjectList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '下线失败'
					});
				});
			},
//					上线
			top_flag2(index, rows) {
				this.$confirm('确定上线吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						status:'5'
					}
					this.$post('/specialInfo/isOnline', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '上线成功!'
						});
						this.getSubjectList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '上线失败'
					});
				});
			},
  }
}
</script>
<style>
  .el-date-editor .el-range__icon,
  .el-date-editor .el-range-separator{
    line-height: 20px;
  }
</style>


<template>
  <div class="page-body audit_news">
  	 	<el-dialog title="审核页面" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="审核原因" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="请选择区域">
						<el-option label="您发布的内容涉嫌敏感内容" value="您发布的内容涉嫌敏感内容"></el-option>
						<el-option label="您发布的内容排版、错字过于混乱" value="您发布的内容排版、错字过于混乱"></el-option>
						<el-option label="您发布的内容无具体信息，或信息无意义" value="您发布的内容无具体信息，或信息无意义"></el-option>
						<el-option label="您发布的内容不符合栏目属性" value="您发布的内容不符合栏目属性"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核信息" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="toAudits1()" >确 定</el-button>
			</div>
		</el-dialog>
  	<el-dialog title="是否通过审核" :visible.sync="dialogVisible1" center width="30%" :before-close="handleClose2">
				<el-radio v-model="recommendRadio" label="2" class="marBo4">不通过</el-radio><br/>
				<el-radio v-model="recommendRadio" label="1">通过</el-radio>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false;recommendRadio=''" class="light_btn">取 消</el-button>
          <el-button type="primary" @click="toAudits()" class="light_btn">确 定</el-button>
        </span>
			</el-dialog>
    <div class="page-header">
      <el-row>
        <el-col :span="4">
          发布来源:
          <el-select v-model="value" placeholder="发布来源" style="width:60%">
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
           <el-date-picker style="width:90%;" v-model="value6" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
					</el-date-picker>
        </el-col>
        <el-col :span="6" :offset="6">
            <el-input v-model="search_pra" placeholder="请输入内容" style="width:70%"></el-input>
            <el-button class="light_btn" @click.native.prevent="getAuditlist">搜索</el-button>
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
                  <router-link :to="{name:'news-second',params:{id:scope.row.id}}" > 
                    <el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;" >审核</el-button>
                  </router-link>
                  <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" >
                    <el-button v-if="scope.row.status=='3' || scope.row.status=='4' "  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button>
                  </router-link>
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
                    <router-link :to="{name:'news-second',params:{id:scope.row.id}}" > <el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;">审核</el-button></router-link>
                    <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" ><el-button v-if="scope.row.status=='3' || scope.row.status=='4' "  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button></router-link>
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
        <el-tab-pane label="审核中" name="third">
        	<div>
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
                    <!--<router-link :to="{name:'news-second',params:{id:scope.row.id}}" > <el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;">审核</el-button></router-link>-->
                    <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" ><el-button  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
            <el-pagination class="text-right" background @current-change="handleCurrentChange3" :current-page="currentPage3" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page3" layout="prev, pager, next" :total="this.total_pages3">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核通过" name="fourth">
        	<div>
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
                   <router-link :to="{name:'news-second',params:{id:scope.row.id}}" > <el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;">审核</el-button></router-link>
                    <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" ><el-button v-if="scope.row.status=='3' || scope.row.status=='4' "  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
            <el-pagination class="text-right" background @current-change="handleCurrentChange4" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page4" layout="prev, pager, next" :total="this.total_pages4">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核失败" name="fifth">
        	<div>
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
                    <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" >
                      <el-button v-if="scope.row.status=='3' || scope.row.status=='4' "  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button>
                    </router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
            <el-pagination class="text-right" background @current-change="handleCurrentChange5" :current-page="currentPage5" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page5" layout="prev, pager, next" :total="this.total_pages5">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
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
      per_page1:10,
      currentPage1:1,
      total_pages1:0,
     
      per_page2:10,
      currentPage2:1,
      total_pages2:0,
     
      
      per_page3:10,
      currentPage3:1,
      total_pages3:0,
    
      
      per_page4:10,
      currentPage4:1,
      total_pages4:0,
     
      
      per_page5:10,
      currentPage5:1,
      total_pages5:0,
      
       //弹框
      recommendRadio: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible1: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
			formLabelWidth: '120px',
      btnTable:btnTable,
     options: [{
        value: '',
        label: '全部'
      },{
        value: '1',
        label: '后台发布'
      }, {
        value: '2',
        label: 'App'
      }, {
        value: '3',
        label: '数据爬取'
      }],
    audit_no:[],
    ids:[],
    multipleSelection: [],
    audit_all:[],
    value: '',
    timeVal:'',
    activeName: 'first',
    search_pra:'',
    value6:'',
    }
  },
  created(){
    this.getAuditlist();
  },
  methods: {
  	//	通过
		toAudits(){
			if(this.recommendRadio == '1'){	// 通过
					console.log(this.recoIndex)
					var params = {
						ids:this.ids.join(','),
						tokenId: this.$store.state.user.tokenId,
						status: '4',
					}
					this.$post('news/check',params).then(res => {
						console.log(res,res.code);
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
					})
					// this.tableData[this.recoIndex].top_flag = "1";
					this.dialogVisible1 = false;
				}else if(this.recommendRadio == '2'){
					this.dialogVisible1 = false;
				this.dialogFormVisible = true	
				}
		},
		//不通过
			toAudits1(){
					console.log(this.recoIndex)
					var params = {
						ids:this.ids.join(','),
						tokenId: this.$store.state.user.tokenId,
						status: '3',
						checkReason:this.form.region,
         		checkMessage:this.form.name
					}
					this.$post('news/check',params).then(res => {
						console.log(res,res.code);
						this.getAuditlist();

					})
					this.dialogFormVisible = false;
		},
  	//关闭不通过弹窗
  	handleClose2(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.recommendRadio='';
						done();
					})
					.catch(_ => {});
			},
 // 批量提交审核
    toAudited(){
      if(this.ids == false){
        this.$message({
          message: '请勾选需要提交审核的文章!',
          type: 'warning'
        });
        return;
      }
      this.dialogVisible1 = true;
    },
     // 批量审核 之 复选框操作 获取要批量操作的行情
    handleSelectionChange(val){
       this.multipleSelection = val;
       this.ids = [];
				this.multipleSelection.map(item => {
					this.ids.push(item.id);
				})
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
//    if(!params){
        var params = {
        tokenId:this.$store.state.user.tokenId,
        queryType:'audit',
        limit:this.per_page1,
        offset:this.currentPage1,
        timeType:'create',
           publishSource:this.value,
					simpleParameter:this.inputs,
////					开始也就是逗号前面的
					startTime:this.value6[0],
////					结束也就是逗号后面的
					endTime:this.value6[1],

        }
//    }
      this.$post('news/list',params).then(res =>{
        this.loading = false;
        // console.log(res.data[0].rows)
        this.audit_all = res.data[0].rows;
        this.total_pages1 = res.data[0].total;
      })
    },
    // 切换tab 
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

      }else if(tab.name == 'third'){ 	
        var params = {
          tokenId:this.$store.state.user.tokenId,
          limit:this.per_page3,
          offset:this.currentPage3,
          status:'2'
        }
        this.$post('/news/list',params).then(res =>{
          console.log(res.data[0].rows)
          this.audit_no	 = res.data[0].rows;
          this.total_pages3 = res.data[0].total;
        })
      }else if(tab.name == 'fourth'){ 	
        var params = {
          tokenId:this.$store.state.user.tokenId,
          limit:this.per_page4,
          offset:this.currentPage4,
          status:'4'
        }
        this.$post('news/list',params).then(res =>{
          console.log(res.data[0].rows)
          this.audit_no	 = res.data[0].rows;
          this.total_pages4 = res.data[0].total;
        })
      }else if(tab.name == 'fifth'){ 	
        var params = {
          tokenId:this.$store.state.user.tokenId,
          limit:this.per_page5,
          offset:this.currentPage5,
          status:'3'
        }
        this.$post('news/list',params).then(res =>{
          console.log(res.data[0].rows)
          this.audit_no	 = res.data[0].rows;
          this.total_pages5 = res.data[0].total;
        })
			}
    },
//  全部
    handleCurrentChange1(val) {
    	this.currentPage1=val;
      console.log(`当前页: ${val}`);
      this.getAuditlist();
    },
    //待审核
    handleCurrentChange2(val){
    	this.currentPage2=val;
      console.log(`当前页: ${val}`);
      this.getAuditlist();
    },
    //审核中
     handleCurrentChange3(val){
    	this.currentPage3=val;
      console.log(`当前页: ${val}`);
      this.getAuditlist();
    },
    //审核通过
     handleCurrentChange4(val){
    	this.currentPage4=val;
      console.log(`当前页: ${val}`);
      this.getAuditlist();
    },
    //审核失败
     handleCurrentChange5(val){
    	this.currentPage5=val;
      console.log(`当前页: ${val}`);
      this.getAuditlist();
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


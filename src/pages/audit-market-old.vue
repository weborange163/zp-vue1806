<template>
  <div class="page-body audit_news">
  	<el-dialog title="审核页面" center :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="form" label-width="80px" :rules="rules">
				<el-form-item label="审核原因" prop="region">
					<el-select size="mini" v-model="form.region" placeholder="请选择不通过的原因" style="width:100%"  @change="selectChange">
						<el-option label="您发布的内容排版、错字过于混乱" value="您发布的内容排版、错字过于混乱"></el-option>
						<el-option label="您发布的内容涉嫌敏感内容" value="您发布的内容涉嫌敏感内容"></el-option>
						<el-option label="您发布的内容无具体信息，或信息无意义" value="您发布的内容无具体信息，或信息无意义"></el-option>
						<el-option label="您发布的内容不符合栏目属性" value="您发布的内容不符合栏目属性"></el-option>
            <el-option label="其它" value="其它"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核信息">
					<el-input size="mini" type="textarea" v-model="form.name" auto-complete="off" :disabled="qita"
          placeholder="其它,可以填写审核信息"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="toAudits1()" >确 定</el-button>
			</div>
		</el-dialog>
  	<el-dialog title="推荐到新闻主页" :visible.sync="dialogVisible1" center width="30%" :before-close="handleClose2">
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
          <el-select v-model="value" style="width:70%" placeholder="发布来源" size="mini">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="text-right" style="padding-right:4px;"><span style="line-height:28px;" >创建时间:</span></el-col>
        <el-col :span="8">
           <el-date-picker style="width:90%;" size="mini" v-model="value6" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
        </el-col>
        <el-col :span="6" :offset="4">
            <el-input v-model="inputs" size="mini" placeholder="请输入标题或创建人" style="width:70%"></el-input>
            <el-button class="light_btn" v-if="status" size="mini" @click.native.prevent="getTabList()" >搜索</el-button>
            <el-button class="light_btn" v-else size="mini" @click.native.prevent="getAuditAll()" >搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div class="text-right marBo4">
							<el-button class="light_btn" @click="getAuditAll">刷新</el-button>
						</div>
          <div>
            <el-table :data="audit_all" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到">
                <template slot-scope="scope">
                  行情
                </template>
              </el-table-column>
              <el-table-column label="创建人" prop="create_user_id" ></el-table-column>
              <el-table-column label="发布状态" >
                <template slot-scope="scope">
                    <!--<p v-if="scope.row.status=='1'" >待审核</p>-->
                    <p v-if="scope.row.status=='2'" >待审核</p>
                    <p v-if="scope.row.status=='3'" >审核中</p>
                    <p v-if="scope.row.status=='5'" >审核通过</p>
                    <p v-if="scope.row.status=='4'" >审核不通过</p>
                </template>
              </el-table-column>
              <el-table-column label="发布来源" prop="publish_source">
                <template slot-scope="scope">
                     <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                    <p v-if="scope.row.publish_source=='3'" >APP</p>
                    <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="200"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                    <router-link :to="{name:'market-second',params:{id:scope.row.id,argu:{a:value,b:value6,c:inputs,d:activeName,e:per_page1,f:handleCurrentChange1,g:per_page2,h:handleCurrentChange2}}}" >
                      <el-button type="text" v-if="scope.row.status=='2'">审核</el-button>
                    </router-link>
                    <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" ><el-button type="text" v-if="scope.row.status=='4'">查看</el-button></router-link>
                   <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" > <el-button type="text" v-if="scope.row.status=='5'">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
              <el-pagination class="text-right" background @current-change="handleCurrentChange1" :current-page.sync="currentPage1" 
                :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page1" layout="total, sizes, prev, pager, next, jumper" 
                :total="this.total_pages1" @size-change="handleSizeChange1">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <div>
          	<div class="text-right marBo4">
							<el-button class="light_btn" @click="toAudited">批量审核</el-button>
							<el-button class="light_btn" @click="getTabList">刷新</el-button>
						</div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到" prop="classify_type_name" ></el-table-column>
              <el-table-column label="创建人" prop="create_user_id" ></el-table-column>
              <el-table-column label="发布状态" >
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='2'" >待审核</p>
                </template>
              </el-table-column>
              <el-table-column label="发布来源" prop="publish_source" width="100">
              	<template slot-scope="scope">
                     <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                    <p v-if="scope.row.publish_source=='3'" >APP</p>
                    <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                </template>
              	
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="200"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                   <router-link :to="{name:'market-second',params:{id:scope.row.id,argu:{a:value,b:value6,c:inputs,d:activeName,e:per_page1,f:handleCurrentChange1,g:per_page2,h:handleCurrentChange2}}}" ><el-button type="text" v-if="scope.row.status=='2'">审核</el-button></router-link>
                    <el-button type="text" :disabled="true"  v-if="scope.row.status=='3'">审核</el-button>
                    <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" ><el-button type="text" v-if="scope.row.status=='4'">查看</el-button></router-link>
                   <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" > <el-button type="text" v-if="scope.row.status=='5'">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
              <el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[10, 20, 30, 40]" 
                  :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages2" @size-change="handleSizeChange2">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <!--审核中-->
        <el-tab-pane label="审核中" name="Audit">
          <div class="text-right marBo4">
            <el-button class="light_btn" @click="getTabList">刷新</el-button>
          </div>
          <div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到" prop="classify_type_name" ></el-table-column>
              <el-table-column label="创建人" prop="create_user_id" ></el-table-column>
              <el-table-column label="发布状态" >
                <template slot-scope="scope">
                   <p v-if="scope.row.status=='3'" >审核中</p>
                </template>
              </el-table-column>
              <el-table-column label="发布来源" prop="publish_source" width="100">
              	<template slot-scope="scope">
                     <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                    <p v-if="scope.row.publish_source=='3'" >APP</p>
                    <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="200"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                     <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" > <el-button type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
              <el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[10, 20, 30, 40]" 
                  :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages2" @size-change="handleSizeChange2">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        
        <!--审核通过-->
        <el-tab-pane label="审核通过" name="adopt">
          <div class="text-right marBo4">
            <el-button class="light_btn" @click="getTabList">刷新</el-button>
          </div>
          <div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到" prop="classify_type_name" ></el-table-column>
              <el-table-column label="创建人" prop="create_user_id" ></el-table-column>
              <el-table-column label="发布状态" >
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='5'" >审核通过</p>
                </template>
              </el-table-column>
              <el-table-column label="发布来源" prop="publish_source" width="100">
              	<template slot-scope="scope">
                    <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                    <p v-if="scope.row.publish_source=='3'" >APP</p>
                    <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                </template>
              	
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="200"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                	 <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" > <el-button type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
              <el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[10, 20, 30, 40]" 
                  :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages2" @size-change="handleSizeChange2">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <!--审核失败-->
        <el-tab-pane label="审核不通过" name="fail">
          <div class="text-right marBo4">
            <el-button class="light_btn" @click="getTabList">刷新</el-button>
          </div>
          <div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到" prop="classify_type_name" ></el-table-column>
              <el-table-column label="创建人" prop="create_user_id" ></el-table-column>
              <el-table-column label="发布状态" >
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='4'" >审核不通过</p>
                </template>
              </el-table-column>
              <el-table-column label="发布来源" prop="publish_source" width="100">
              	<template slot-scope="scope">
                     <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                    <p v-if="scope.row.publish_source=='3'" >APP</p>
                    <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                </template>
              	
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="200"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                    <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" > <el-button type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
            <el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages2" @size-change="handleSizeChange2">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
	
import {btnTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      qita:true,
      argu:{},
      rules:{
          region:[
            {required:true}
          ]
        },
      per_page1:10,
      per_page2:10,
      currentPage1:1,
      currentPage2:1,
      total_pages1:0,
      total_pages2:0,
      btnTable:btnTable,
      timeType:'',
      timeStart:'',
      timeEnd:'',
      value6:'',
      inputs:'',
      options: [
      {
					value: '0',
					label: '全部'
				},{
      value: '1',
      label: '后台发布'
    }, {
      value: '3',
      label: 'App'
    }, {
      value: '2',
      label: '数据爬取'
    }],
    audit_no:[
    ],
    status:'',
    audit_all:[
    ],
    timeVal:'',
    activeName: 'first',
    search_pra:'',
    value:'',
    ids:[],
    multipleSelection:[],
    //弹框
    recommendRadio: '',
    dialogFormVisible: false,
    dialogVisible1: false,
    form: {
      name: '',
      region: '您发布的内容排版、错字过于混乱',
    },
    }
  },
  created(){
    //argu:{a:value,b:value6,c:inputs,d:activeName,e:per_page1,
    //f:handleCurrentChange1,g:per_page2,h:handleCurrentChange2
    if(this.$route.params.argu){
        this.argu = this.$route.params.argu;
        console.log(this.argu)
        this.value = this.argu.a;
        this.value6 = this.argu.b;
        this.inputs = this.argu.c;
        this.activeName = this.argu.d;
        this.per_page1 = this.argu.e;
        this.handleCurrentChange1 = this.argu.f;
        this.per_page2 = this.argu.g;
        this.handleCurrentChange2 = this.argu.h;
       if(this.activeName == 'second'){ 
        this.status='2';
        this.getTabList();
      }else if(this.activeName == 'Audit'){
        this.status = '3'
				this.getTabList();
			}else if(this.activeName == 'adopt'){ 	
				this.status = '5'
				this.getTabList();
			}else if(this.activeName == 'fail'){ 	
				this.status = '4'
				this.getTabList();
			}else if(this.activeName == 'first'){
        this.getAuditAll();
      }
    }else{
      this.getAuditAll();
    }
  },
  methods: {
//	通过
		toAudits(){
			if(this.recommendRadio == '1'){	// 通过
					console.log(this.recoIndex)
					var params = {
						ids:this.ids.join(','),
						tokenId: this.$store.state.user.tokenId,
						status: '5',
					}
					this.$post('industry/checkByIds',params).then(res => {
						// console.log(res,res.code);
						if(res.code == '0'){
              var params = {
                tokenId:this.$store.state.user.tokenId,
                limit:this.per_page2,
                offset:this.currentPage2,
                status:'5'
              }
              this.$message({
                message: res.msg?res.msg:'成功',
                type: 'success'
              });
              this.getTabList();
            }else{
              this.$message({
                message: res.msg?res.msg:'失败',
                type: 'error'
              });
            }
						
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
        status: '4',
        checkCause:this.form.region,
        checkMessage:this.form.name
      }
      this.$post('industry/checkByIds',params).then(res => {
        console.log(res,res.code);
        if(res.code == 0){
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getTabList();
        }else{
          this.$message({
            message: res.msg?res.msg:'失败',
            type: 'error'
          });
        }
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
    selectChange(val){
        // console.log(val);
        if(val == '其它'){
          this.qita = false;
        }else{
          this.qita = true;
          this.form.name='';
        }
      },
     // 批量审核 之 复选框操作 获取要批量操作的行情
    handleSelectionChange(val){
       this.multipleSelection = val;
       this.ids = [];
				this.multipleSelection.map(item => {
					this.ids.push(item.id);
				})
    },
    
    //待审核
    toAudit2(row){
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
    //获取所有审核相关的行情
    getAuditAll(){
      var params = {
        tokenId:this.$store.state.user.tokenId,
        limit:this.per_page1,
        offset:this.currentPage1,
        timeType:'1',
        publishSource:this.value=='0'?'':this.value,
				title:this.inputs,
      }
      if(this.value6){
        params.timeStart=this.value6[0];
				params.timeEnd=this.value6[1];
      }
      this.$post('/industry/listChick',params).then(res =>{
        // console.log(res.data[0].rows)
        if(this.argu.f){
            this.currentPage1=this.argu.f;
            this.argu.f=0;
          }
        this.audit_all = res.data[0].rows;
        this.total_pages1 = res.data[0].total;
      })
    },
    getTabList(params){
      var params = {
        tokenId:this.$store.state.user.tokenId,
        limit:this.per_page2,
        offset:this.currentPage2,
        status:this.status,
        timeType:'1',
        publishSource:this.value=='0'?'':this.value,
        title:this.inputs,
      }
      if(this.value6){
        params.timeStart=this.value6[0];
				params.timeEnd=this.value6[1];
      }
      this.$post('/industry/listChick',params).then(res =>{
        if(this.argu.h){
            this.currentPage2=this.argu.h;
            this.argu.h=0;
          }
        this.audit_no	 = res.data[0].rows;
        this.total_pages2 = res.data[0].total;
      })
    },
    handleClick(tab, event) {
      this.currentPage1 = 1;
      this.currentPage2 = 1;
      this.value6='';
      this.value='';
      this.inputs='';
      if(tab.name == 'second'){ 
        this.status='2';
        this.getTabList();
      }else if(tab.name == 'Audit'){
        this.status = '3'
				this.getTabList();
			}else if(tab.name == 'adopt'){ 	
				this.status = '5'
				this.getTabList();
			}else if(tab.name == 'fail'){ 	
				this.status = '4'
				this.getTabList();
			}
    },
//  全部
    handleCurrentChange1(val) {
    	this.currentPage1=val;
      console.log(`当前页: ${val}`);
      this.getAuditAll();
    },
    //待审核
    handleCurrentChange2(val){
    	this.currentPage2=val;
      console.log(`当前页: ${val}`);
      this.getTabList();
    },
    handleSizeChange1(val){
      this.per_page1 = val;
      this.getAuditAll();
    },
    handleSizeChange2(val){
      // this.status='1'
      this.per_page2 = val;
      this.getTabList();
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


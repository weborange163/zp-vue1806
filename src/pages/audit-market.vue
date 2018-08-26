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
          <el-select v-model="value" placeholder="发布来源" size="mini">
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
           <el-date-picker style="width:90%;" size="mini" v-model="value6" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
					</el-date-picker>
        </el-col>
        <el-col :span="6" :offset="6">
            <el-input v-model="inputs" size="mini" placeholder="请输入内容" style="width:70%"></el-input>
            <el-button class="light_btn" size="mini" @click.native.prevent="getAuditAll()" >搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
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
                    <p v-if="scope.row.status=='4'" >审核失败</p>
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
                    <router-link :to="{name:'second-market',params:{id:scope.row.id}}" ><el-button type="text" v-if="scope.row.status=='2'">审核</el-button></router-link>
                    <el-button type="text" :disabled="true"  v-if="scope.row.status=='3'">审核</el-button>
                    <router-link :to="{name:'market-lookes2',params:{rowInfo:scope.row}}" ><el-button type="text" v-if="scope.row.status=='4'">查看</el-button></router-link>
                   <router-link :to="{name:'market-lookes2',params:{rowInfo:scope.row}}" > <el-button type="text" v-if="scope.row.status=='5'">查看</el-button></router-link>
                    
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
                   <router-link :to="{name:'second-market',params:{id:scope.row.id}}" ><el-button type="text" v-if="scope.row.status=='2'">审核</el-button></router-link>
                    <el-button type="text" :disabled="true"  v-if="scope.row.status=='3'">审核</el-button>
                    <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" ><el-button type="text" v-if="scope.row.status=='4'">查看</el-button></router-link>
                   <router-link :to="{name:'market-lookes',params:{id:scope.row.id}}" > <el-button type="text" v-if="scope.row.status=='5'">查看</el-button></router-link>
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
        
        
        <!--审核中-->
        <el-tab-pane label="审核中" name="Audit">
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
            <el-pagination class="text-right" background @current-change="handleCurrentChange3" :current-page="currentPage3" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page3" layout="prev, pager, next" :total="this.total_pages3">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        
        <!--审核通过-->
        <el-tab-pane label="审核通过" name="adopt">
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
            <el-pagination class="text-right" background @current-change="handleCurrentChange4" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page4" layout="prev, pager, next" :total="this.total_pages4">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <!--审核失败-->
        <el-tab-pane label="审核失败" name="fail">
          <div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到" prop="classify_type_name" ></el-table-column>
              <el-table-column label="创建人" prop="create_user_id" ></el-table-column>
              <el-table-column label="发布状态" >
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='4'" >审核失败</p>
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
            <el-pagination class="text-right" background @current-change="handleCurrentChange5" :current-page="currentPage3" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page5" layout="prev, pager, next" :total="this.total_pages5">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        
        
        
        <!--<el-tab-pane label="审核中" name="third">审核中</el-tab-pane>
        <el-tab-pane label="审核通过" name="fourth">审核通过</el-tab-pane>
        <el-tab-pane label="审核失败" name="fifth">审核失败</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>
<script>

	
import {btnTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      per_page1:10,
      per_page2:10,
      per_page3:10,
      per_page4:10,
      per_page5:10,
      currentPage1:1,
      currentPage2:1,
      currentPage3:1,
      currentPage4:1,
      currentPage5:1,
      total_pages1:0,
      total_pages2:0,
      total_pages3:0,
      total_pages4:0,
      total_pages5:0,
      btnTable:btnTable,
      timeType:'',
      timeStart:'',
      timeEnd:'',
      value6:'',
      inputs:'',
      aa:'',
      options: [
      {
					value1: '',
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
      {
        num:'222',
        title:'我是一条新闻标题',
        type:'新闻',
        author:'运营1',
        status:'待审核',
        source:'后台',
        createTime:'2018-02-21'
      }
    ],
    audit_all:[
       {
        num:'222',
        title:'我是一条新闻标题',
        type:'新闻',
        author:'运营1',
        status:'待审核',
        source:'后台',
        createTime:'2018-02-21'
      } 
    ],
    timeVal:'',
    activeName: 'first',
    search_pra:'',
    value:'',
    ids:[],
    multipleSelection:[],
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
    }
  },
  created(){
    this.getAuditAll();
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
						console.log(res,res.code);
						var params = {
						tokenId:this.$store.state.user.tokenId,
						limit:this.per_page2,
						offset:this.currentPage2,
						status:'2'
					}
			this.$post('/industry/listChick',params).then(res =>{
				
        console.log(res.data[0].rows)
        this.audit_no	 = res.data[0].rows;
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
						status: '4',
						checkCause:this.form.region,
         		checkMessage:this.form.name
					}
					this.$post('industry/checkByIds',params).then(res => {
						console.log(res,res.code);
						var params = {
						tokenId:this.$store.state.user.tokenId,
						limit:this.per_page2,
						offset:this.currentPage2,
						status:'2'
					}
			this.$post('/industry/listChick',params).then(res =>{
				
        console.log(res.data[0].rows)
        this.audit_no	 = res.data[0].rows;
        this.total_pages2 = res.data[0].total;
      })

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
    //搜索
     selectTab(){
      		if(tab.name == 'second') {
	
    	
    	}
    },
    
    
    //获取所有审核相关的行情
    getAuditAll(){
      var params = {
        tokenId:this.$store.state.user.tokenId,
//      queryType:'audit',
        limit:this.per_page1,
        offset:this.currentPage1,
        timeType:'1',
        publishSource:this.value,
					title:this.inputs,
////					开始也就是逗号前面的
					timeStart:this.value6[0],
////					结束也就是逗号后面的
					timeEnd:this.value6[1],
      }
      this.$post('/industry/listChick',params).then(res =>{
        console.log(res.data[0].rows)
        for(var i=0;i<res.data[0].rows.length;i++){
					console.log(res.data[0].rows[i]['id'])
			}
        this.audit_all = res.data[0].rows;
        this.total_pages1 = res.data[0].total;
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
       if(tab.name == 'second'){ 	
					var params = {
						tokenId:this.$store.state.user.tokenId,
						limit:this.per_page2,
						offset:this.currentPage2,
						status:'2'
					}
			this.$post('/industry/listChick',params).then(res =>{
				
        console.log(res.data[0].rows)
        this.audit_no	 = res.data[0].rows;
        this.total_pages2 = res.data[0].total;
      })
				}else if(tab.name == 'Audit'){ 	
					var params = {
						tokenId:this.$store.state.user.tokenId,
						limit:this.per_page3,
						offset:this.currentPage3,
						status:'3'
					}
			this.$post('/industry/listChick',params).then(res =>{
				
        console.log(res.data[0].rows)
        this.audit_no	 = res.data[0].rows;
        this.total_pages3 = res.data[0].total;
      })
				}else if(tab.name == 'adopt'){ 	
					var params = {
						tokenId:this.$store.state.user.tokenId,
						limit:this.per_page4,
						offset:this.currentPage4,
						status:'5'
					}
			this.$post('/industry/listChick',params).then(res =>{
				
        console.log(res.data[0].rows)
        this.audit_no	 = res.data[0].rows;
        this.total_pages4 = res.data[0].total;
      })
				}else if(tab.name == 'fail'){ 	
					var params = {
						tokenId:this.$store.state.user.tokenId,
						limit:this.per_page5,
						offset:this.currentPage5,
						status:'4'
					}
			this.$post('/industry/listChick',params).then(res =>{
				
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
      this.getAuditAll();
    },
    //待审核
    handleCurrentChange2(val){
    	this.currentPage2=val;
      console.log(`当前页: ${val}`);
      this.getAuditAll();
    },
    //审核中
     handleCurrentChange3(val){
    	this.currentPage3=val;
      console.log(`当前页: ${val}`);
      this.getAuditAll();
    },
    //审核通过
     handleCurrentChange4(val){
    	this.currentPage4=val;
      console.log(`当前页: ${val}`);
      this.getAuditAll();
    },
    //审核失败
     handleCurrentChange5(val){
    	this.currentPage5=val;
      console.log(`当前页: ${val}`);
      this.getAuditAll();
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


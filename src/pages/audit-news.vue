<template>
  <div class="page-body audit_news">
  	<el-dialog title="审核页面" :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="form" :rules="rules" label-width="80px">
				<el-form-item label="审核原因" prop="region" >
					<el-select size="mini" v-model="form.region" placeholder="请选择不通过的原因" style="width:100%" @change="selectChange">
						<el-option label="您发布的内容排版、错字过于混乱" value="您发布的内容排版、错字过于混乱"></el-option>
						<el-option label="您发布的内容涉嫌敏感内容" value="您发布的内容涉嫌敏感内容"></el-option>
						<el-option label="您发布的内容无具体信息，或信息无意义" value="您发布的内容无具体信息，或信息无意义"></el-option>
						<el-option label="您发布的内容不符合栏目属性" value="您发布的内容不符合栏目属性"></el-option>
            <el-option label="其它" value="其它"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核信息">
					<el-input size="mini" type="textarea" v-model="form.name" auto-complete="off" :disabled="qita"
          placeholder="审核原因选择其它,可以填写审核信息"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="toAudits1()" >确 定</el-button>
			</div>
		</el-dialog>
  	<el-dialog title="是否通过审核" :visible.sync="dialogVisible1" center width="30%" :before-close="handleClose2">
				<el-radio v-model="recommendRadio" label="2" class="marBo4">不通过</el-radio><br/>
				<el-radio v-model="recommendRadio" label="1">通过</el-radio>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false;recommendRadio=''" class="light_btn" size="mini">取 消</el-button>
          <el-button type="primary" @click="toAudits()" class="light_btn" size="mini">确 定</el-button>
        </span>
			</el-dialog>
    <div class="page-header">
      <el-row>
        <el-col :span="4">
          发布来源:
          <el-select v-model="value" placeholder="发布来源" style="width:60%" size="mini">
            <el-option 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
       <el-col :span="2" class="text-right" style="padding-right:4px;"><span style="line-height:28px;" >创建时间:</span></el-col>
        <el-col :span="7">
           <el-date-picker size="mini" style="width:95%;"
              v-model="value6"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :span="6" :offset="5">
            <el-input v-model="search_pra" placeholder="请输入内容" style="width:70%" size="mini"></el-input>
            <el-button class="light_btn" v-if="status" @click.native.prevent="getTabList()" size="mini">搜索</el-button>
            <el-button class="light_btn" v-else @click.native.prevent="getAuditlist()" size="mini">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div class="text-right marBo4">
							<el-button class="light_btn" @click="getAuditlist()">刷新</el-button>
						</div>
          <div>
            <el-table :data="audit_all" border stripe v-loading="loading" :row-class-name="btnTable" :header-row-class-name="btnTable" >
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"  min-width='264'></el-table-column>
              <el-table-column label="栏目" prop="column_name" width="80"></el-table-column>
              <el-table-column label="创建人" prop="createUser" width="120"></el-table-column>
              <el-table-column label="发布状态" width="120">
                <template slot-scope="scope">
                  <p v-if="scope.row.status=='1'" >待审核</p>
                  <p v-if="scope.row.status=='2'" >审核中</p>
                  <p v-if="scope.row.status=='3'" >审核不通过</p>
                  <p v-if="scope.row.status=='4'" >审核通过并上线</p>
                  <p v-if="scope.row.status=='5'" >下线</p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" prop="checkPerson" width="120"></el-table-column>
              <el-table-column label="发布来源" width="100">
                <template slot-scope="scope">
                    <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                    <p v-if="scope.row.publish_source=='3'" >APP</p>
                    <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
              <el-table-column label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <router-link :to="{name:'news-second',params:{id:scope.row.id,argu:{a:value,b:value6,c:search_pra,d:activeName,e:per_page1,f:currentPage1,g:per_page2,h:currentPage2}}}" > 
                    <el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;" >审核</el-button>
                  </router-link>
                  <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" >
                    <el-button v-if="scope.row.status=='3' || scope.row.status=='4' "  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button>
                  </router-link>
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
							<el-button class="light_btn" @click="getTabList()">刷新</el-button>
						</div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"  min-width='264'></el-table-column>
              <el-table-column label="栏目" prop="column_name" width="80"></el-table-column>
              <el-table-column label="创建人" prop="createUser" width="120"></el-table-column>
              <el-table-column label="发布状态" width="80">
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='1'" >待审核</p>
                    <p v-if="scope.row.status=='2'" >审核中</p>
                    <p v-if="scope.row.status=='3'" >审核不通过</p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" prop="checkPerson" width="120"></el-table-column>
              <el-table-column label="发布来源" width="100">
                <template slot-scope="scope">
                  <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                  <p v-if="scope.row.publish_source=='3'" >APP</p>
                  <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                    <router-link :to="{name:'news-second',params:{id:scope.row.id,argu:{a:value,b:value6,c:search_pra,d:activeName,e:per_page1,f:currentPage1,g:per_page2,h:currentPage2}}}" > <el-button type="text" v-if="scope.row.status=='1'||scope.row.status=='3'" style="margin-right:8px;vertical-align:middle;">审核</el-button></router-link>
                    <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" ><el-button v-if="scope.row.status=='3' || scope.row.status=='4' "  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
              <el-pagination class="text-right" background @current-change="handleCurrentChange2(currentPage2)" :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" 
                  :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages2" @size-change="handleSizeChange2">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核中" name="third">
          <div class="text-right marBo4">
            <el-button class="light_btn" @click="getTabList()">刷新</el-button>
          </div>
        	<div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"  min-width='264'></el-table-column>
              <el-table-column label="栏目" prop="column_name" width="80"></el-table-column>
              <el-table-column label="创建人" prop="createUser" width="120"></el-table-column>
              <el-table-column label="发布状态" width="80">
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='1'" >待审核</p>
                    <p v-if="scope.row.status=='2'" >审核中</p>
                    <p v-if="scope.row.status=='3'" >审核不通过</p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" prop="checkPerson" width="120"></el-table-column>
              <el-table-column label="发布来源" width="100">
                <template slot-scope="scope">
                  <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                  <p v-if="scope.row.publish_source=='3'" >APP</p>
                  <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
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
            <el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages2" @size-change="handleSizeChange2">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核通过" name="fourth">
          <div class="text-right marBo4">
            <el-button class="light_btn" @click="getTabList()">刷新</el-button>
          </div>
        	<div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title" min-width='264'></el-table-column>
              <el-table-column label="栏目" prop="column_name" width="80"></el-table-column>
              <el-table-column label="创建人" prop="createUser" width="120"></el-table-column>
              <el-table-column label="发布状态" width="80">
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='1'" >待审核</p>
                    <p v-if="scope.row.status=='2'" >审核中</p>
                    <p v-if="scope.row.status=='3'" >审核不通过</p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" prop="checkPerson" width="120"></el-table-column>
              <el-table-column label="发布来源" width="100">
                <template slot-scope="scope">
                  <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                  <p v-if="scope.row.publish_source=='3'" >APP</p>
                  <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                  <router-link :to="{name:'news-second',params:{id:scope.row.id,argu:{a:value,b:value6,c:search_pra,d:activeName,e:per_page1,f:currentPage1,g:per_page2,h:currentPage2}}}" > <el-button type="text" v-if="scope.row.status=='1'||scope.row.status=='3'" style="margin-right:8px;vertical-align:middle;">审核</el-button></router-link>
                  <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" ><el-button v-if="scope.row.status=='3' || scope.row.status=='4' "  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button></router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
            <el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" 
                :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages2" @size-change="handleSizeChange2">
            </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核未通过" name="fifth">
          <div class="text-right marBo4">
            <el-button class="light_btn" @click="getTabList()">刷新</el-button>
          </div>
        	<div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable" @selection-change="handleSelectionChange">
              <el-table-column label="序号" type="index" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"  min-width='264'></el-table-column>
              <el-table-column label="栏目" prop="column_name" width="80"></el-table-column>
              <el-table-column label="创建人" prop="createUser" width="120"></el-table-column>
              <el-table-column label="发布状态" width="80">
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='1'" >待审核</p>
                    <p v-if="scope.row.status=='2'" >审核中</p>
                    <p v-if="scope.row.status=='3'" >审核不通过</p>
                </template>
              </el-table-column>
              <el-table-column label="审核人" prop="checkPerson" width="120"></el-table-column>
              <el-table-column label="发布来源" width="100">
                <template slot-scope="scope">
                  <p v-if="scope.row.publish_source=='1'" >PC后台</p>
                  <p v-if="scope.row.publish_source=='2'" >数据爬取</p>
                  <p v-if="scope.row.publish_source=='3'" >APP</p>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
              <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                  <router-link :to="{name:'news-second',params:{id:scope.row.id,argu:{a:value,b:value6,c:search_pra,d:activeName,e:per_page1,f:currentPage1,g:per_page2,h:currentPage2}}}" > <el-button type="text" v-if="scope.row.status=='1'||scope.row.status=='3'" style="margin-right:8px;vertical-align:middle;">审核</el-button></router-link>
                  <router-link :to="{name:'news-lookes',params:{id:scope.row.id}}" >
                    <el-button v-if="scope.row.status=='3' || scope.row.status=='4' "  type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button>
                  </router-link>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:20px;">
              <el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" 
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
import { btnTable } from '@/utils/table-style.js'
export default {
  data(){
    return{
      qita:true,
      loading:false,
      per_page1:10,
      currentPage1:1,
      total_pages1:0,
      per_page2:10,
      currentPage2:1,
      total_pages2:0,
       //弹框
      recommendRadio: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible1: false,
      form: {
        name: '',
        region: '您发布的内容排版、错字过于混乱',
      },
      rules:{
          region:[
            {required:true}
          ]
        },
			formLabelWidth: '120px',
      btnTable:btnTable,
      value: '',
      options: [{
        value: '',
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
      audit_no:[],
      status:'',
      ids:[],
      multipleSelection: [],
      audit_all:[],
      timeVal:'',
      activeName: 'first',
      search_pra:'',
      value6:'',
      argu:{}
    }
  },
  mounted(){
    if(this.$route.params.argu){
      // a:value,b:value6,c:search_pra,d:activeName,e:per_page1,
      // f:currentPage1,g:per_page2,h:currentPage2
        this.argu = this.$route.params.argu;
        // console.log(this.argu);
        this.value=this.argu.a;
        this.value6=this.argu.b;
        this.search_pra=this.argu.c;
        this.activeName=this.argu.d;
        this.per_page1=this.argu.e;
        this.currentPage1=this.argu.f;
        this.per_page2=this.argu.g;
        this.currentPage2=this.argu.h;
        // console.log(this.currentPage2);
        if(this.activeName == 'second'){
          this.status='1';
          this.handleCurrentChange2(this.currentPage2);
        }else if(this.activeName == 'third'){ 	
          this.status='2';
           this.handleCurrentChange2(this.currentPage2);
        }else if(this.activeName == 'fourth'){ 	
          this.status='4'
          this.handleCurrentChange2(this.currentPage2);
        }else if(this.activeName == 'fifth'){ 	
          this.status='3';
          this.handleCurrentChange2(this.currentPage2);
        }else if(this.activeName == 'first'){
          this.status=''
          this.getAuditlist();
        }
      }else{
        this.getAuditlist();
      }
  },
  methods: {
    selectChange(val){
        console.log(val);
        if(val == '其它'){
          this.qita = false;
        }else{
          this.qita = true;
          this.form.name='';
        }
      },
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
            this.$message({
              message: res.msg?res.msg:'操作成功',
              type: 'success'
            });
						var params = {
              tokenId:this.$store.state.user.tokenId,
              status:'1',
              limit:this.per_page2,
              offset:this.currentPage2
            }
            this.$post('news/list',params).then(res =>{
              if(res.code == '0'){
                this.audit_no = res.data[0].rows;
                this.total_pages2 = res.data[0].total;
                
              }else{
                this.$message({
                  message: '提交失败',
                  type: 'error'
                });
              }
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
        if(res.code == 0){
          this.$message({
          message: res.msg,
          type: 'info'
        });
          console.log(res,res.code);
          this.getTabList();
           this.dialogFormVisible = false;
        }

      })
     
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
    getAuditlist(val){
      this.loading = true;
      this.currentPage1=val?val:1;
      // if(!params){
        var params = {
          articleType:'1',
          tokenId:this.$store.state.user.tokenId,
          queryType:'audit',
          limit:this.per_page1,
          offset:this.currentPage1,
          timeType:'create',
          publishSource:this.value,
          simpleParameter:this.search_pra,
          startTime:this.value6[0],
          endTime:this.value6[1],
        }
      // }
      this.$post('news/list',params).then(res =>{
        if(res.code == 0){
          this.loading = false;
          if(this.argu.f){
            this.currentPage1=this.argu.f;
            this.argu.f=0;
          }
        this.audit_all = res.data[0].rows;
        this.total_pages1 = res.data[0].total;
        }
      })
    },
    // tab切换获取相应的数据
    getTabList(val){
        // console.log('------',this.currentPage2);
        this.currentPage2=val?val:1;
        var params= {
          articleType:'1',
          tokenId:this.$store.state.user.tokenId,
          limit:this.per_page2,
          offset:this.currentPage2,
          status:this.status,
          timeType:'create',
          publishSource:this.value,
          simpleParameter:this.search_pra,
          startTime:this.value6[0],
          endTime:this.value6[1],
        }
      // console.log(params);
      this.$post('news/list',params).then(res =>{
        if(res.code==0){
          // console.log(res.data[0].rows);
          this.loading = false;
          if(this.argu.h){
            this.currentPage2=this.argu.h;
            this.argu.h=0;
          }
          // this.currentPage2=this.argu.h;
          this.$message({
            message: '成功获取列表',
            type: 'success'
          });
        // console.log(res.data[0].rows)
        this.audit_no = res.data[0].rows;
        this.total_pages2 = res.data[0].total;
        }
      })
    },
    // 切换tab 
    handleClick(tab, event) {
      // console.log(1111)
      this.currentPage1=1;
      this.currentPage2=1;
      this.per_page2=10;
      this.search_pra='';
      this.value6='';
      this.value='';
      // console.log(tab.name, event);
      if(tab.name == 'second'){
        this.status='1';
        this.getTabList();
      }else if(tab.name == 'third'){ 	
        this.status='2';
        this.getTabList();
      }else if(tab.name == 'fourth'){ 	
       this.status='4'
       this.getTabList();
      }else if(tab.name == 'fifth'){ 	
        this.status='3';
        this.getTabList();
			}else if(tab.name=='first'){
        this.status=''
        this.getAuditlist();
      }
    },
//  全部
    handleCurrentChange1(val) {
    	this.currentPage1=val;
      // console.log(`当前页: ${val}`);
      this.getAuditlist(val);
    },
    //待审核
    handleCurrentChange2(val){
      // this.currentPage2=val;
      // console.log('+++++',this.currentPage2);
      this.getTabList(val);
    },
    
    handleSizeChange1(val){
      this.per_page1 = val;
      this.getAuditlist();
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


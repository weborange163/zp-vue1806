<template>
	<div class="page-body news">
		<div class="page-header">
			<el-row>
				<el-col :span="4">
					发布来源:
					<el-select v-model="value1" placeholder="发布来源" style="width:60%">
						<el-option v-for="item in optionss" :key="item.value1" :label="item.label" :value="item.value1">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select v-model="value2" placeholder="时间类型">
						<el-option v-for="item in optionsss" :key="item.value2" :label="item.label" :value="item.value2">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="6" class="padLe4">
					<el-date-picker style="width:90%;" v-model="value6" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
					</el-date-picker>
				</el-col>
				<el-col :span="6" :offset="4">
					<el-input v-model="inputs" placeholder="标题、发布账号、文章ID" style="width:70%;margin-right:5%;"></el-input>
					<el-button class="light_btn" style="width:20%;" @click.native.prevent="newsList()">搜索</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="box">
			<el-tabs v-model="activeTab" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">
					<div class="tab1">
						<div class="text-right marBo4">
							<router-link :to="{name:'news-add'}">
								<el-button class="light_btn">添加新闻</el-button>
							</router-link>
							<el-button class="light_btn" @click="publishWaitTop">置顶排序</el-button>
							<el-button class="light_btn" @click="newsList()">刷新</el-button>
						</div>
						<el-table :data="tableData" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable">
							<!--<el-table-column label="#" type="index"></el-table-column>-->
							<el-table-column label="序号" type="index" align="center" width='50'></el-table-column>
							<el-table-column label="标题" prop="title">
								<template slot-scope="scope">
									<i class="iconfont icon-zhiding" style="color:#A30001;" v-if="scope.row.top_flag == '1'"></i>
									<i class="iconfont icon-link" style="color:#3658A7;vertical-align: middle;" v-if="scope.row.recommend != '0'"></i>
									<!-- <el-popover trigger="hover" placement="top" v-if="scope.row.link">
										<p>{{ scope.row.link }}</p>
										<div slot="reference" class="name_wrapper">
											<i class="iconfont icon-link" style="color:#3658A7;vertical-align: middle;" v-if="scope.row.link"></i>
										</div>
									</el-popover> -->
									<p style="display:inline-block;">{{ scope.row.title }}</p>
								</template>
							</el-table-column>
							<el-table-column label="创建人" prop="author" width="80"></el-table-column>
							<el-table-column label="发布状态" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='0'" >新建</p>
									<p v-if="scope.row.status=='4'" class="yshx">已上线</p>
									<p v-if="scope.row.status=='5'" class="yxx">已下线</p>
									<p v-if="scope.row.status=='1'" class="dshx">待审核</p>
									<p v-if="scope.row.status=='3'" class="yxx">已审核</p>
								</template>
							</el-table-column>
							<el-table-column label="发布来源"  width="120">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">APP</p>
									<p v-if="scope.row.publish_source=='3'">数据爬取</p>
								</template>
							</el-table-column>
							<el-table-column label="文章ID" prop="article_id"></el-table-column>
							<el-table-column label="操作" width="300" fixed="right">
								<template slot-scope="scope">
									<el-button type="text" style="margin-right:8px;vertical-align:middle;" v-if="scope.row.top_flag == '1'" @click.native.prevent="cancelUp(scope.row)">取消置顶</el-button>
									<el-button type="text" v-if="scope.row.status == '0'" @click="toAudit(scope.row)">提交审核</el-button>
									<el-button type="text" v-if="scope.row.status =='4' && scope.row.top_flag != '1'" style="margin-right:8px;vertical-align:middle;" @click="onOff(scope.row,'5','下线')">下线</el-button>
									<el-button type="text" v-if="scope.row.status =='5'" style="margin-right:8px;vertical-align:middle;" @click="onOff(scope.row,'4','上线')">上线</el-button>
									
									<router-link :to="{name:'news-lookes',params:{id:scope.row.id}}">
										<el-button type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
									<el-button type="text" v-if="scope.row.status =='4'" @click.native.prevent="recommend(scope.$index, scope.row)"><i class="iconfont icon-share"></i></el-button>
									<router-link :to="{name:'news-edit',params:{id:scope.row.id}}">
										<el-button type="text" v-if="scope.row.status != '4'&& scope.row.publish_source != '2'"><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									<el-button type="text" v-if="scope.row.status !='4'" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button type="text" v-else disabled><i class="iconfont icon-delete unclick"></i></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page1" layout="prev, pager, next" :total="this.total_pages1">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="新建" name="second">
					<div class="tab2">
						<div class="text-right marBo4">
							<el-button class="light_btn" @click="toAudits">批量提交审核</el-button>
							<el-button class="light_btn">刷新</el-button>
						</div>
						<el-table :row-class-name="miniTable" :header-row-class-name="miniTable" ref="multipleTable" :data="newArticle" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55" align="center">
							</el-table-column>
							<el-table-column type="index" label="序号" width="50">
							</el-table-column>
							<el-table-column prop="title" label="标题">
							</el-table-column>
							<el-table-column prop="author" label="创建人" width="100">
							</el-table-column>
							<el-table-column label="状态" width="50">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='0'">新建</p>
								</template>
							</el-table-column>
							<el-table-column label="发布来源"  width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">移动端</p>
									<p v-if="scope.row.publish_source=='3'">数据爬取</p>
								</template>
							</el-table-column>
							<el-table-column label="文章ID" prop="article_id"></el-table-column>
							<el-table-column label="操作" width="300" fixed="right">
								<template slot-scope="scope">
									<el-button type="text" @click="newsShow(scope.row)"><i class="iconfont icon-see"></i></el-button>
									<el-button type="text"><i class="iconfont icon-edit"></i></el-button>
									<el-button type="text" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button type="text" @click="toAudit(scope.row,2)">提交审核</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page2" layout="prev, pager, next" :total="this.total_pages2">
						</el-pagination>
					</div>
				</el-tab-pane>

			</el-tabs>

			<el-dialog center title="设置置顶内容排序" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<el-table :data="upData" border style="width: 100%" :row-class-name="btnTable" :header-row-class-name="btnTable" v-loading="loading">
					<el-table-column prop="title" label="标题"></el-table-column>
					<el-table-column prop="name" label="操作" width="70" class="text-center">
						<template slot-scope="scope">
							<el-button type="text" v-if="scope.$index != 0" @click="changeIndex(scope.$index,upData,'isUp')">
								<i class="iconfont icon-up"></i>
							</el-button>
							<el-button type="text" v-else disabled>
								<i class="iconfont icon-up unclick"></i>
							</el-button>
							<el-button type="text" v-if="scope.$index != upDataLength" @click="changeIndex(scope.$index,upData,'isDown')">
								<i class="iconfont icon-down"></i>
							</el-button>
							<el-button type="text" v-else disabled>
								<i class="iconfont icon-down" style="cursor:not-allowed"></i>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="toPublish()">发 布</el-button>
        </span>
			</el-dialog>
			<el-dialog title="推荐到新闻主页" :visible.sync="dialogVisible1" center width="30%" style="padding-left:20px;">
				<el-radio v-model="recommendRadio" label="1" class="marBo4">置顶-新闻推荐列表区</el-radio><br/>
				<el-radio v-model="recommendRadio" label="2">推荐到banner</el-radio>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false;recommendRadio=''" class="light_btn">取 消</el-button>
          <el-button type="primary" @click="sureReco" class="light_btn">确 定</el-button>
        </span>
			</el-dialog>
			<el-dialog center
					width="30%"
					:visible.sync="bannerDialog"
					append-to-body>
					<el-form :model="bannerForm" :rules="bannerRules" ref="bannerForm" label-width="110px" class="bannerForm">
						<el-form-item label="原文标题">
							<el-input v-model="bannerForm.title" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="短标题" prop="title_short">
							<el-input v-model="bannerForm.title_short"></el-input>
						</el-form-item>
						<el-form-item label="banner图片" label-width="110px" required>
							<el-upload 
								:action="getFullUrl()" :data="uploadData" :multiple="false" :limit='1'
								ref="upload" name="file"
								list-type="picture-card"
								:auto-upload="false" :on-exceed="handleExceed"
								:on-preview="handlePictureCardPreview"
								:on-change="fileChange"
								:on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible2">
								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</el-form-item>
						<el-form-item label="类型">
							<el-input v-model="bannerForm.type" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="链接">
							<el-input v-model="bannerForm.link" :disabled="true"></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="bannerDialog = false;recommendRadio=''" class="light_btn">取 消</el-button>
						<el-button type="primary" @click="toBanner1" class="light_btn">保 存</el-button>
					</span>
				</el-dialog>
			<!-- 分页 -->
			
		</div>
	</div>
</template>
<script type="text/javascript">
	import { HTMLDecode,getBaceUrl } from '@/utils/auth'

	export default {
		name: 'home',
		data() {
			return {
				bannerForm:{
					title:'',
					file:'',
					filename:'',
					title_short:'',
					articleId:'',
					type:'新闻',
					link:''
				},
				bannerRules: {
					title_short: [
            { required: true, message: '请输入短标题', trigger: 'blur' }
          ]
				},
				bannerDialog:false,
				loading:false,
				multipleSelection: [],
				newArticle: [{
					num: 1,
					title: 'test7mkaiemlaoapuemske93osksks',
					author: 'web'
				}],
				activeTab: 'first',
				recommendRadio: '', // 推荐到banner/置顶的radio值
				recoIndex:0,	// 点击推荐到时的表格的index
				dialogVisible: false,
				dialogVisible1: false,
				dialogVisible2: false,
				per_page1: 5,
				per_page2:5,
				total_pages1: 0,
				total_pages2:0,
				currentPage1: 1, // 页面默认展示的当前页码
				currentPage2: 1,
				params:{},
				upData: [],
				tableData: [],
			optionss: [
        {
					value1: '',
					label: '全部'
				},{
					value1: '2',
					label: 'APP'
				}, {
					value1: '1',
					label: '后台发布'
				}, {
					value1: '3',
					label: '数据爬取'
				}],
				optionsss: [{
					value2: 'online',
					label: '上线时间'
				}, {
					value2: 'create',
					label: '创建时间'
				}, {
					value2: 'offline',
					label: '下线时间'
				}, {
					value2: 'audit',
					label: '审核时间'
				}],
				value6: '',
				inputs: '',
				value: '',
				value1: '',
				value2: '',
				dataList: [],
				ids:[],
				baceUrl:'',
				dialogImageUrl:'',
        uploadData:{},
        hasFmt:false,
			}
		},
		created(){
			this.initParams();
			this.newsList(this.params);
			this.baceUrl = getBaceUrl();
		},
		mounted() {
			// this.db();
		},
		computed: {
			upDataLength: function() {
				return this.upData.length - 1;
			}
		},
		methods: {
			//上下线操作
			onOff(row,status,type){
				this.$confirm(`确定要${type}该新闻吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						status:status,
						id:row.id
					}
					this.$post('news/isOnline',params).then(res => {
						console.log(res)
						this.newsList();
						this.$message({
							type: 'success',
							message: res.msg
						});
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
				console.log(row)
			},
			handleRemove(file, fileList) {
        console.log(file, fileList);
				if(fileList.length == 0){
					this.hasFmt =false;
				}
      },
      handlePictureCardPreview(file) {
				console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible2 = true;
			},
			getFullUrl(){
				return (this.baceUrl+'/bannerInfo/save')
			},
			// 置顶排序
			publishWaitTop(){
				this.dialogVisible = true;
				this.loading = true;
				this.$get('news/publishWaitTop',{tokenId:this.$store.state.user.tokenId}).then(res =>{
					this.loading = false;
					console.log(res)
					this.upData = res.data;
				})
			},
			//提交置顶排序(弹框点击发布)
			toPublish(){
				// console.log(this.upData)
				var newsInfos =[];
				this.upData.map((item, index) => {
				//	newsInfos.push({id:item.id,orderNum:index+1})
					newsInfos.push(item.id);
				})
				var params = {
					tokenId:this.$store.state.user.tokenId,
					// newsInfos:JSON.stringify(newsInfos)
					ids:newsInfos.join(',')
				}
				console.log(params);
				this.$post('news/publishTop',params).then(res => {
					this.$message({
          message: res.msg,
          type: 'success'
        });
				})
				this.dialogVisible = false
			},
			//提交审核
			toAudit(row,tab){
				this.$confirm('是否提交到审核列表?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					var params={
						tokenId:this.$store.state.user.tokenId,
						ids:row.id
					}
					this.$post('news/batchWaitCheck',params).then(res => {
						if(tab){
							this.creatList();
						}else{
							this.newsList();
						}
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
				
			},
			//新闻预览
			newsShow(row){
				console.log(row.id);
				var params = {
					tokenId:this.$store.state.user.tokenId,
					id:row.id
				}
				this.$get('news/show',params).then(res =>{
					
					console.log(res)
				})
			},
			initParams(){
				this.params = {
					tokenId:this.$store.state.user.tokenId,
					queryType:'LineAndCreate',
					limit:this.per_page1,
					offset:this.currentPage1
				}
			},
			//新闻列表
			newsList(params){
				if(!params){
					//console.log(params)
						var params={
						tokenId:this.$store.state.user.tokenId,
						queryType:'LineAndCreate',
						limit:this.per_page1,
						offset:this.currentPage1,
//						status:this.value,
						publishSource:this.value1,
						timeType:this.value2,
        		simpleParameter:this.inputs,
	////					开始也就是逗号前面的
						startTime:this.value6[0],
	////					结束也就是逗号后面的
						endTime:this.value6[1],
					}
				}
				// console.log(params)
				this.$post('/news/list',params).then(res => {
					console.log(res.data[0].rows)
					this.tableData = res.data[0].rows;
					this.total_pages1 = res.data[0].total;
				});
			},
			//新建的新闻列表
			creatList(params){
				if(!params){
					//console.log(params)
					var params={
						tokenId:this.$store.state.user.tokenId,
						queryType:'create',
						limit:this.per_page2,
						offset:this.currentPage2
					}
				}
				this.$post('/news/list',params).then(res => {
					this.newArticle = res.data[0].rows;
					this.total_pages2 = res.data[0].total;
				})
			},
			//tab1 分页
			handleCurrentChange1(val) {
				this.currentPage1 = val;
				this.initParams()
				console.log(this.params)
				this.newsList(this.params);
			},
			//tab2 分页
			handleCurrentChange2(val) {
				this.currentPage2 = val;
				var params={
						tokenId:this.$store.state.user.tokenId,
						queryType:'create',
						limit:this.per_page2,
						offset:this.currentPage2
					}
				this.creatList(params);

			},
			// 点击 推荐到banner 保存按钮
			toBanner(){
					this.$refs.bannerForm.validate((valid) => {
						if(valid){
							this.uploadData={
								tokenId:this.$store.state.user.tokenId,
								titleShort:this.bannerForm.title_short,
								bannerType:'1',
								linkId:this.bannerForm.link,
								articleId:this.bannerForm.articleId,
							}
							console.log(this.uploadData)
							setTimeout(() => {
								this.$refs.upload.submit();
								this.$message({
									type: 'success',
									message: '添加成功!'
								});
								setTimeout(() => {
									this.newsList();
								}, 1000);
								this.bannerDialog = false;
							}, 0);
						}
					})
        
			},
			toBanner1(){
        this.$refs.bannerForm.validate((valid) => {
          if(valid){
              let param = new FormData();
              param.append('file',this.bannerForm.file,this.bannerForm.filename);
              param.append('tokenId',this.$store.state.user.tokenId);
              param.append('titleShort',this.bannerForm.title_short);
              param.append('bannerType','1');
              param.append('linkId',this.bannerForm.link);
              param.append('articleId',this.bannerForm.articleId);
            console.log(param)
            this.$post('bannerInfo/save',param).then(res =>{
              console.log(res)
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              setTimeout(() => {
              //	this.newsList();
              }, 1000);
              this.bannerDialog = false;
            })
          }
        })
        
			},
		//图片的验证
			fileChange(file,fileList){
				this.bannerForm.filename = file.name;
				this.bannerForm.file = file.raw;
				console.log(file.raw)
				if(fileList.length>0){
					this.hasFmt = true;
				}
			},
			// 批量提交审核
			toAudits(){
				if(this.ids == false){
					this.$message({
						message: '您没有勾选任何文章!',
						type: 'warning'
					});
					return;
				}
				this.$confirm('确定要提交审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						ids:this.ids.join(',')
					}
					console.log(params)
					this.$post('news/batchWaitCheck',params).then(res => {
						console.log(res)
						this.creatList();
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
			// 复选框操作, 获取选中的新闻的article_id
			handleSelectionChange(val) {
				this.multipleSelection = val;
				this.ids = [];
				this.multipleSelection.map(item => {
					this.ids.push(item.id);
				})
			},
			// tab切换
			handleClick(tab, event) {
				console.log(tab.name, event);
				if(tab.name == 'second'){ 	
					var params = {
						tokenId:this.$store.state.user.tokenId,
						queryType:'create',
						limit:this.per_page2,
						offset:this.currentPage2
					}
					this.creatList(params)
				}
				//this.newsList(params);
			},
			// 确定推荐到置顶/banner
			sureReco(){
				this.bannerForm={
					title:'',
					file:'',
					filename:'',
					title_short:'',
					articleId:'',
					type:'新闻',
					link:''
				};
				if(this.recommendRadio == '1'){	// 推荐到置顶
					console.log(this.recoIndex)
					var params = {
						tokenId:this.$store.state.user.tokenId,
						id: this.tableData[this.recoIndex].id,
						topFlag:'1'
					}
					this.$post('news/top',params).then(res => {
						console.log(res,res.code);
						if(res.code == '2'){
							this.$message({
								message: res.msg,
								type: 'warning'
							});
						}
						this.newsList();
					})
					this.dialogVisible1 = false;
				}else if(this.recommendRadio == '2'){	// 推荐到banner
					console.log('推荐到banner');
					// this.tableData[this.recoIndex].title,
					this.bannerForm.title = this.tableData[this.recoIndex].title;
					this.bannerForm.link = this.tableData[this.recoIndex].id;
					this.bannerForm.articleId = this.tableData[this.recoIndex].article_id;
					this.dialogVisible1 = false;
					this.bannerDialog =true;
				}else{
					 this.$message('请选择置顶或者banner');
				}
				// this.dialogVisible1 = false;
			},
			//推荐到
			recommend(index,row) {
				if(row.top_flag == '1'){
					this.$message({
						message: '本条消息已经置顶,需取消置顶才能操作',
						type: 'warning'
					});
				}else{
					this.dialogVisible1 = true;
					this.recoIndex = index;	// 保存当前的index
					console.log(row,this.recoIndex);
				}
			},
			//取消置顶
			cancelUp(row) {
				this.$confirm('确定要取消置顶吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						id: row.id,
						topFlag:'0'
					}
					console.log(params.id)
					this.$post('news/top',params).then(res => {
						console.log(res);
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
						this.newsList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			//实现置顶排序的方法
			changeIndex(index, rows, dir) {
				if(dir == 'isUp') {
					var a = rows[index]
					var b = rows[index - 1]
					rows.splice(index - 1, 1, a)
					rows.splice(index, 1, b)
				} else {
					var a = rows[index]
					var b = rows[index + 1]
					rows.splice(index + 1, 1, a)
					rows.splice(index, 1, b)
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {

						done();
					})
					.catch(_ => {});
			},
			guanlian(id) {
				var arr = [{
					id: 1
				}];
				let item = arr.filter((item, index) => {
					return item.id === id
				})
			},
			
			//删除新闻
			deleteRow(index, rows) {
				// rows.splice(index, 1);
				this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						id:rows.id
					}
					this.$post('news/delete',params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.newsList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				console.log(index, rows);
			},
			miniTable(row) {
				return 'miniTable'
			},
			btnTable(row) {
				return 'btnTable'
			},
			handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
		}
	}
</script>
<style type="text/css">
	.bannerForm .el-upload--picture-card{
		width: 80px;
		height: 80px;
		line-height: 88px;
	}
	.bannerForm .el-upload-list--picture-card .el-upload-list__item{
		width: 80px;
		height: 80px;
		line-height: 88px;
	}
	.el-range-editor.el-input__inner {
		padding: 0;
	}
	
	.el-date-editor .el-range__icon,
	.el-date-editor .el-range-separator {
		line-height: 28px;
		height: 28px;
	}
	
	.el-date-editor .el-range__icon {
		padding-left: 4px;
	}
	
	.iconfont {
		vertical-align: middle;
		cursor: pointer;
	}
	
	.name_wrapper {
		display: inline-block;
	}
	
	.yshx {
		color: #00C621;
	}
	
	.dshx {
		color: #FEB210;
	}
	
	.yxx {
		color: #999;
	}
	
	.el-table,
	.el-table .el-button {
		font-size: 12px;
	}
	
	.el-table th {
		font-size: 14px;
	}
	
	.el-table_1_column_7 .iconfont {
		font-size: 20px;
		vertical-align: middle;
		margin-right: 8px;
	}
	
	.el-button.el-button--small {
		line-height: 8px;
		padding-top: 9px;
		padding-bottom: 9px;
	}
</style>
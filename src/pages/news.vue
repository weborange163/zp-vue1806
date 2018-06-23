<template>
	<div class="page-body news">
		<div class="page-header">
			<el-row>
				<el-col :span="5">
					<el-select v-model="value" placeholder="发布状态" style="width:45%">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select v-model="value1" placeholder="发布来源" style="width:45%">
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
					<el-date-picker style="width:90%;" v-model="value6" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
					</el-date-picker>
				</el-col>
				<el-col :span="6" :offset="4">
					<el-input v-model="inputs" placeholder="标题、发布账号、文章ID" style="width:70%;margin-right:5%;"></el-input>
					<el-button class="light_btn" style="width:20%;">搜素</el-button>
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
									<i class="iconfont icon-zhiding" style="color:#A30001;" v-if="scope.row.isUping"></i>
									<el-popover trigger="hover" placement="top" v-if="scope.row.link">
										<p>{{ scope.row.link }}</p>
										<div slot="reference" class="name_wrapper">
											<i class="iconfont icon-link" style="color:#3658A7;vertical-align: middle;" v-if="scope.row.link"></i>
										</div>
									</el-popover>
									<p style="display:inline-block;">{{ scope.row.title }}</p>
								</template>
							</el-table-column>
							<el-table-column label="创建人" prop="author" width="80"></el-table-column>
							<el-table-column label="发布状态" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='0'" >新建</p>
									<p v-if="scope.row.status=='4'" class="yshx">已上线</p>
									<p v-if="scope.row.status=='1'" class="dshx">待审核</p>
									<p v-if="scope.row.status=='5'" class="yxx">已下线</p>
									<p v-if="scope.row.status=='3'" class="yxx">已审核</p>
								</template>
							</el-table-column>
							<el-table-column label="发布来源"  width="120">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">移动端</p>
									<p v-if="scope.row.publish_source=='3'">数据爬取</p>
								</template>
							</el-table-column>
							<el-table-column label="文章ID" prop="id"></el-table-column>
							<el-table-column label="操作" width="300" fixed="right">
								<template slot-scope="scope">
									<el-button type="text" style="margin-right:8px;vertical-align:middle;" v-if="scope.row.isUping" @click.native.prevent="cancelUp(scope.row)">取消置顶</el-button>
									<el-button type="text" v-if="scope.row.status =='4'" style="margin-right:8px;vertical-align:middle;">下线</el-button>
									<el-button type="text" @click="newsShow(scope.row)"><i class="iconfont icon-see"></i></el-button>
									<el-button type="text" v-if="scope.row.status =='4'" @click.native.prevent="recommend(scope.row)"><i class="iconfont icon-share"></i></el-button>
									<el-button type="text"><i class="iconfont icon-edit"></i></el-button>
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
							<el-button class="light_btn">批量提交审核</el-button>
							<el-button class="light_btn">刷新</el-button>
						</div>
						<el-table :row-class-name="miniTable" :header-row-class-name="miniTable" ref="multipleTable" :data="newArticle" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column type="index" label="序号" width="120">
							</el-table-column>
							<el-table-column prop="title" label="标题">
							</el-table-column>
							<el-table-column prop="author" label="创建人" show-overflow-tooltip>
							</el-table-column>
							<el-table-column label="状态" show-overflow-tooltip>
								<template slot-scope="scope">
									<p v-if="scope.row.status=='0'">新建</p>
								</template>
							</el-table-column>
							<el-table-column label="发布来源"  width="120">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">移动端</p>
									<p v-if="scope.row.publish_source=='3'">数据爬取</p>
								</template>
							</el-table-column>
							<el-table-column label="文章ID" prop="id"></el-table-column>
							<el-table-column label="操作" width="300" fixed="right">
								<template slot-scope="scope">
									<el-button type="text" @click="newsShow(scope.row)"><i class="iconfont icon-see"></i></el-button>
									<el-button type="text"><i class="iconfont icon-edit"></i></el-button>
									<el-button type="text" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button type="text" @click="toAudit(scope.row)">提交审核</el-button>
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
				<el-table :data="upData" border style="width: 100%" :row-class-name="miniTable" :header-row-class-name="miniTable">
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">发 布</el-button>
        </span>
			</el-dialog>
			<el-dialog title="推荐到新闻主页" :visible.sync="dialogVisible1" center width="30%" :before-close="handleClose">
				<el-radio v-model="recommendRadio" label="1">推荐到banner</el-radio><br/>
				<el-radio v-model="recommendRadio" label="2">置顶-新闻推荐列表区</el-radio>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
			</el-dialog>
			<!-- 分页 -->
			
		</div>
	</div>
</template>
<script type="text/javascript">
	import { get } from '../utils/http.js' 
	export default {
		name: 'home',
		data() {
			return {
				multipleSelection: [],
				newArticle: [{
					num: 1,
					title: 'test7mkaiemlaoapuemske93osksks',
					author: 'web'
				}],
				activeTab: 'first',
				recommendRadio: 1,
				dialogVisible: false,
				dialogVisible1: false,
				per_page1: 5,
				per_page2:10,
				total_pages1: 0,
				total_pages2:0,
				currentPage1: 1, // 页面默认展示的当前页码
				currentPage2: 1,
				params:{},
				upData: [],
				tableData: [],
				options: [{
					value: '选项1',
					label: '全部'
				}, {
					value: '选项5',
					label: '已上线'
				}, {
					value: '选项6',
					label: '已下线'
				}],
				optionss: [{
					value1: '选项1',
					label: '全部'
				}, {
					value1: '选项2',
					label: 'APP'
				}, {
					value1: '选项3',
					label: '后台发布'
				}, {
					value1: '选项4',
					label: '数据爬取'
				}],
				optionsss: [{
					value2: '选项1',
					label: '上线时间'
				}, {
					value2: '选项2',
					label: '创建时间'
				}, {
					value2: '选项3',
					label: '下线时间'
				}, {
					value2: '选项4',
					label: '审核时间'
				}],
				value6: '',
				inputs: '',
				value: '',
				value1: '',
				value2: '',
				dataList: [],
			}
		},
		created(){
			this.initParams();
			this.newsList(this.params);
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
			// 置顶排序
			publishWaitTop(){
				this.dialogVisible = true;
				this.$get('news/publishWaitTop',{tokenId:this.$store.state.user.tokenId}).then(res =>{
					this.upData = res.data;
				})
			},
			//提交审核&批量提交审核
			toAudit(row){
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
						console.log(res)
					})
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
						offset:this.currentPage1
					}
				}
				// console.log(params)
				this.$post('/news/list',params).then(res => {
					// console.log(res.data[0].rows)
					this.tableData = res.data[0].rows;
					this.total_pages1 = res.data[0].total;
				})
			},
			//新建的新闻列表
			creatList(){

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

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection)
			},
			handleClick(tab, event) {
				console.log(tab.name, event);
				if(tab.name == 'second'){ 	// 待提取为createList
					var params = {
						tokenId:this.$store.state.user.tokenId,
						queryType:'create',
						limit:this.per_page2,
						offset:this.currentPage2
					}
					console.log(params)
					this.$post('/news/list',params).then(res => {
						this.newArticle = res.data[0].rows;
						this.total_pages2 = res.data[0].total;
					})
					
				}
				//this.newsList(params);
			},
			//推荐到
			recommend(row) {
				this.dialogVisible1 = true;
			},
			//取消置顶
			cancelUp(row) {
				this.$confirm('确定要取消置顶吗?', '提示', {
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
			}
		}
	}
</script>
<style type="text/css">
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
	
	.el-table th {
		text-align: center;
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
<template>
	<div class="page-body banner">
		<el-dialog center title="设置置顶内容排序" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-table :data="upData" border style="width: 100%" :row-class-name="btnTable" :header-row-class-name="btnTable" v-loading="loading">
				<el-table-column prop="titleShort" label="标题"></el-table-column>
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
		<!--修改-->
		<el-dialog center width="30%" :visible.sync="bannerDialog" append-to-body>
			<el-form :model="bannerForm" :rules="bannerRules" ref="bannerForm" label-width="110px" class="bannerForm">
				<el-form-item label="原文标题">
					<el-input v-model="bannerForm.title" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="短标题" prop="title_short">
					<el-input v-model="bannerForm.title_short"></el-input>
				</el-form-item>
				<el-form-item label="banner图片" label-width="110px" required>
					<el-upload :action="getFullUrl()" :data="uploadData" :multiple="false" :limit='1' ref="upload" name="newsFile" list-type="picture-card" :auto-upload="false" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
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
						<el-button type="primary" @click="toBanner()" class="light_btn">保 存</el-button>
					</span>
		</el-dialog>

		<!--查看-->
		<el-dialog center width="30%" :visible.sync="bannerDialog1" append-to-body>
			<el-form :data="bannerForm1" :rules="bannerRules" ref="bannerForm1" label-width="110px" class="bannerForm">
				<el-form-item label="原文标题">
					<el-input v-model="bannerForm1.title" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="短标题" prop="titleShort">
					<el-input v-model="bannerForm1.titleShort"></el-input>
				</el-form-item>
				<el-form-item label="banner图片">
						<img class="imgs" :src="imgFullSrc" alt="封面图展示">
					</el-form-item>
			
				<el-form-item label="类型">
					<el-input v-model="bannerForm1.type" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="链接">
					<el-input v-model="bannerForm1.link" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>

		<div class="page-header clearfix">
			<el-input v-model="search_info" placeholder="请输入内容" style="width:220px;margin:0 20px;"></el-input>
			<el-button class="light_btn" @click.native.prevent="getBannerlist()">搜索</el-button>
		</div>
		<div class="box">
			<div style="text-align:right;margin-bottom:4px;">
				<el-button class="light_btn" @click="publishWaitTop()">发布</el-button>
				<el-button class="light_btn" @click.native.prevent="getBannerlist1()">刷新</el-button>
			</div>
			<div class="banner_show">
				<el-table :data="banner_data" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable">
					<el-table-column label="序号" type="index" width='50'></el-table-column>
					<el-table-column label="原文标题" prop="title_original"></el-table-column>
					<el-table-column label="短标语" prop="title_short"></el-table-column>
					<el-table-column label="发布状态" prop="status" width="80">
						<template slot-scope="scope">
							<p v-if="scope.row.status=='1'" class="yshx">已上线</p>
							<p v-if="scope.row.status=='0'" class="dshx">待上线</p>
							<p v-if="scope.row.status=='2'" class="yxx">已下线</p>
						</template>
					</el-table-column>
					<el-table-column label="内容类型" width='100'>
						<template slot-scope="scope">
							<p v-if="scope.row.banner_type=='1'">新闻</p>
							<p v-if="scope.row.banner_type=='2'">专题</p>
						</template>
					</el-table-column>
					<el-table-column label="图片" prop="cover_img_id" width='100'></el-table-column>
					<el-table-column label="上线时间" prop="online_time" width='100'></el-table-column>
					<el-table-column label="创建时间" prop="create_time" width='100'></el-table-column>
					<el-table-column label="操作" width="260" fixed="right">
						<template slot-scope="scope">

							<el-button type="text" v-if="scope.row.status=='1' && scope.row.top_flag=='1' " style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button>
							<el-button type="text" v-if="scope.row.status=='1' && scope.row.top_flag!='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button>

							<el-button type="text" v-if="scope.row.status=='2' || scope.row.status=='0' " style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag2(scope.$index, scope.row)">上线</el-button>

							<el-button type="text" @click="marketShow(scope.$index, scope.row)"><i class="iconfont icon-see"></i></el-button>

							<el-button type="text" v-if="scope.row.status=='1'" :disabled="true" @click.native.prevent="update1(scope.$index, scope.row)"><i class="iconfont icon-edit"></i></el-button>
							<el-button type="text" v-if="scope.row.status=='2' || scope.row.status=='0' " @click.native.prevent="update1(scope.$index, scope.row)"><i class="iconfont icon-edit"></i></el-button>

							<el-button type="text" v-if="scope.row.status=='1'" :disabled="true" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
							<el-button type="text" v-if="scope.row.status=='2' || scope.row.status=='0' " @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
							<!--<el-button type="text" v-else disabled><i class="iconfont icon-delete unclick"></i></el-button>-->
						</template>

					</el-table-column>
				</el-table>
				<div style="margin-top:20px;">
					<el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="prev, pager, next" :total="this.total_pages">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { btnTable } from '@/utils/table-style.js'
	import { HTMLDecode, getBaceUrl } from '@/utils/auth'
	export default {
		data() {
			return {
				search_info: '',
				imgFullSrc:'',
				btnTable: btnTable,
				dialogVisible: false,
				loading: false,
				upData: [],
				per_page: 2,
				params: {},
				total_pages: 0,
				currentPage: 1, // 页面默认展示的当前页码
				banner_data: [],
				bannerDialog: false,
				bannerDialog1: false,
				dialogVisible2: false,
				dialogImageUrl: '',
				uploadData: {},
				bannerForm: {
					title: '1111',
					title_short: '111',
					articleId: '1111',
					type: '新闻',
					link: '1111'
				},
				bannerForm1: [],

				bannerRules: {
					title_short: [{
						required: true,
						message: '请输入短标题',
						trigger: 'blur'
					}]
				},
			}
		},
		computed: {
			upDataLength: function() {
				return this.upData.length - 1;
			}
		},
		created() {
			this.initParams();
			this.getBannerlist();
		},
		methods: {
			//修改
			update1() {
				this.bannerDialog = true;

			},
				
			marketShow(index, rows) {
				this.bannerDialog1 = true;
//				alert(rows.id)
				var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
				}
				this.$get('/bannerInfo/show', params).then(res => {
					
					this.bannerForm1 = res.data[0];
					this.imgSrc=this.bannerForm1.coverImgId
//					alert(this.bannerForm1.id);
					this.imgFullSrc = this.baceUrl + this.imgSrc
				})
				
				
				
			},

			//		下线
			top_flag1(index, rows) {
				this.$confirm('确定要下线吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						status: '2'
					}
					this.$post('/bannerInfo/isOnline', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '下线成功!'
						});
						this.getBannerlist();
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
						status: '1'
					}
					this.$post('/bannerInfo/isOnline', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '上线成功!'
						});
						this.getBannerlist();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '上线失败'
					});
				});
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				console.log(file)
				this.dialogImageUrl = file.url;
				//      this.dialogVisible2 = true;
			},
			getFullUrl() {
				return(this.baceUrl + '/bannerInfo/save')
			},
			//修改
			toBanner() {
				this.$refs.bannerForm.validate((valid) => {
					if(valid) {
						this.uploadData = {
							tokenId: this.$store.state.user.tokenId,
							titleShort: this.bannerForm.title_short,
							bannerType: this.bannerForm.type,
							linkId: this.bannerForm.link,
							articleId: this.bannerForm.articleId,
						}
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

			// 置顶排序
			publishWaitTop() {
				this.dialogVisible = true;
				this.loading = true;
				this.$get('/bannerInfo/getIsOnline', {
					tokenId: this.$store.state.user.tokenId
				}).then(res => {
					this.loading = false;
					console.log(res)
					this.upData = res.data;
				})
			},
			//提交置顶排序(弹框点击发布)
			toPublish() {
				// console.log(this.upData)
				var newsInfos = [];
				this.upData.map((item, index) => {
					//	newsInfos.push({id:item.id,orderNum:index+1})
					newsInfos.push(item.id);
				})
				var params = {
					tokenId: this.$store.state.user.tokenId,
					// newsInfos:JSON.stringify(newsInfos)
					ids: newsInfos.join(',')
				}
				console.log(params);
				this.$post('/industry/publishOrederByIds', params).then(res => {
					console.log(res)
				})
				this.dialogVisible = false
			},

			getBannerlist(params) {
				if(!params) {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						limit: this.per_page,
						offset: this.currentPage,
						simpleParameter: this.search_info

					}
				}
				this.$post('bannerInfo/list', params).then(res => {
					console.log(res.data[0].rows);
					this.banner_data = res.data[0].rows;
					//      this.bannerForm=res.data[0].rows;
					this.total_pages = res.data[0].total;
				})
				this.search_info = ''
			},
			//刷新
			getBannerlist1(params) {
				if(!params) {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						limit: this.per_page,
						offset: this.currentPage,
						//        simpleParameter:this.search_info

					}
				}
				this.$post('bannerInfo/list', params).then(res => {
					console.log(res.data[0].rows);
					this.banner_data = res.data[0].rows;
					this.total_pages = res.data[0].total;
				})
			},
			// 
			initParams() {
				this.params = {
					tokenId: this.$store.state.user.tokenId,
					limit: this.per_page,
					offset: this.currentPage
				}
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.initParams()
				console.log(this.params)
				this.getBannerlist(this.params);
			},
			deleteRow(index, rows) {
				// rows.splice(index, 1);
				this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id
					}
					this.$post('/bannerInfo/delete', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getBannerlist();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				console.log(index, rows);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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

			sort() {
				let arr = [{
						id: 1
					},
					{
						id: 2
					},
					{
						id: 3
					},
					{
						id: 4
					},
					{
						id: 5
					},
					{
						id: 6
					}
				]

				let obj1 = arr[2];
				arr[2] = arr[3];
				arr[3] = obj1;
				console.log(arr)
			}
		}
	}
</script>
<style>

</style>
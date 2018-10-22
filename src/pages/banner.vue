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
					<el-input size="mini" v-model="bannerForm.titleOriginal" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="短标题" prop="titleShort">
					<el-input size="mini" v-model="bannerForm.titleShort"></el-input>
				</el-form-item>
				<el-form-item label="banner图片" label-width="110px" prop="icon" ref="icon">
					<el-upload action="" :multiple="false" :limit='1' 
          ref="upload" name="file" :file-list="fileList"
          list-type="picture-card" :auto-upload="false" 
          :on-change="fileChange" :on-exceed="handleExceed" 
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible2">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="类型">
					<template slot-scope="scope">
						<el-input size="mini" v-if="bannerForm.bannerType=='1'" value="新闻" disabled></el-input>
						<el-input size="mini" v-if="bannerForm.bannerType=='2'" value="专题" disabled></el-input>
					</template>
				</el-form-item>
				</el-form-item>
				<el-form-item label="链接">
					<el-input size="mini" v-model="bannerForm.articleId" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button @click="bannerDialog = false;recommendRadio=''" class="light_btn">取 消</el-button>
        <el-button type="primary" @click.native.prevent="toBanner()" class="light_btn">保 存</el-button>
      </span>
		</el-dialog>

		<!--查看-->
		<el-dialog center width="30%" :visible.sync="banner1" style='z-index: 99999;'>
			<el-form :data="bannerForm1" :rules="bannerRules1" ref="bannerForm1" label-width="110px" class="bannerForm1">
				<el-form-item label="原文标题">
					<el-input size="mini" type="textarea" v-model="bannerForm1.titleOriginal" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="短标题" prop="titleShort">
					<el-input size="mini" v-model="bannerForm1.titleShort" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="banner图片">
						<img class="imgs" :src="imgFullSrc" style="width:80px;max-height:80px" alt="封面图展示">
					</el-form-item>
			
				<el-form-item label="类型">
					<template slot-scope="scope">
						<el-input size="mini" v-if="bannerForm1.bannerType=='1'" value="新闻" disabled></el-input>
						<el-input size="mini" v-if="bannerForm1.bannerType=='2'" value="专题" disabled></el-input>
					</template>
				</el-form-item>
				<el-form-item label="链接">
					<el-input size="mini" v-model="bannerForm1.articleId" :disabled="true"></el-input>
				</el-form-item>
        <el-form-item label="其他信息">
					<el-input size="mini" v-model="bannerForm1.statusText" :disabled="true">
            <template slot="prepend">状态</template>
          </el-input>
				</el-form-item>
			</el-form>
      <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border marT20">
            <colgroup>
              <col name="el-table_1_column_1" width="25%">
              <col name="el-table_1_column_1" width="50%">
              <col name="el-table_1_column_1" width="25%">
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td><div class="cell"></div></td>
                <td><div class="cell">时间</div></td>
                <td><div class="cell">操作账号</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">创建时间</div></td>
                <td><div class="cell">{{bannerForm1.createTime}}</div></td>
                <td><div class="cell">{{bannerForm1.createUser}}</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">上线时间</div></td>
                <td><div class="cell">{{bannerForm1.onlineTime}}</div></td>
                <td><div class="cell">{{bannerForm1.onlineUser}}</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">下线时间</div></td>
                <td><div class="cell">{{bannerForm1.offlineTime}}</div></td>
                <td><div class="cell">{{bannerForm1.offlineUser}}</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">修改时间</div></td>
                <td><div class="cell">{{bannerForm1.updateTime}}</div></td>
                <td><div class="cell">{{bannerForm1.updateUser}}</div></td>
              </tr>
            </tbody>
          </table>
		</el-dialog>
    <!-- 查看结束 -->
		<div class="page-header clearfix">
			<el-input v-model="search_info" size="mini" placeholder="请输入内容" style="width:220px;margin:0 20px;"></el-input>
			<el-button class="light_btn" @click.native.prevent="getBannerlist()" size="mini">搜索</el-button>
		</div>
		<div class="box">
			<div style="text-align:right;margin-bottom:4px;">
				<el-button class="light_btn" @click="publishWaitTop()" size="mini">发布</el-button>
				<el-button class="light_btn" @click.native.prevent="getBannerlist()" size="mini">刷新</el-button>
			</div>
			<div class="banner_show">
				<el-table :data="banner_data" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable">
					<el-table-column label="序号" type="index" width='50'></el-table-column>
					<el-table-column label="原文标题">
						<template slot-scope="scope">
							<p v-if="scope.row.banner_type=='1'||scope.row.banner_type=='3'" >{{scope.row.title_original}}</p>
							<p v-if="scope.row.banner_type=='2'" >{{scope.row.title_original1}}</p>
						</template>
					</el-table-column>
					<el-table-column label="短标语" prop="title_short" width="150"></el-table-column>
					<el-table-column label="发布状态" prop="status" width="80">
						<template slot-scope="scope">
							<p v-if="scope.row.status=='1'" class="yshx">已上线</p>
							<p v-if="scope.row.status=='0'" class="dshx">待上线</p>
							<p v-if="scope.row.status=='2'" class="yxx">已下线</p>
						</template>
					</el-table-column>
					<el-table-column label="内容类型" width='80'>
						<template slot-scope="scope">
							<p v-if="scope.row.banner_type=='1'">新闻</p>
							<p v-if="scope.row.banner_type=='2'">专题</p>
							<p v-if="scope.row.banner_type=='3'">行情</p>
						</template>
					</el-table-column>
					<el-table-column label="图片" width='100'>
						<template slot-scope="scope">
							<img :src="scope.row.coverImgUrl" alt="">
						</template>
					</el-table-column>
					<el-table-column label="上线时间" prop="online_time" width='100'></el-table-column>
					<el-table-column label="创建时间" prop="create_time" width='100'></el-table-column>
					<el-table-column label="操作" width="200" fixed="right">
						<template slot-scope="scope">
							<!-- <el-button type="text" v-if="scope.row.status=='1' && scope.row.top_flag=='1' " style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button> -->
							<el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button>
							<el-button type="text" v-else style="margin-right:8px;vertical-align:middle;" disabled>下线</el-button>
              <el-button type="text" v-if="scope.row.status=='2' || scope.row.status=='0'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag2(scope.$index, scope.row)">上线</el-button>
							<el-button type="text" @click="bannerShow(scope.$index, scope.row)"><i class="iconfont icon-see"></i></el-button>
							<el-button type="text" v-if="scope.row.status=='1'" :disabled="true"><i class="iconfont icon-edit"></i></el-button>
							<el-button type="text" v-if="scope.row.status=='2' || scope.row.status=='0' " @click.native.prevent="bannerEdit(scope.$index, scope.row)"><i class="iconfont icon-edit"></i></el-button>
							<el-button type="text" v-if="scope.row.status=='1'" :disabled="true" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
							<el-button type="text" v-if="scope.row.status=='2' || scope.row.status=='0' " @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
							<!--<el-button type="text" v-else disabled><i class="iconfont icon-delete unclick"></i></el-button>-->
						</template>

					</el-table-column>
				</el-table>
				<div class="marT20">
					<el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" 
          :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" :total="this.total_pages">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { btnTable } from '@/utils/table-style.js'
	import { getBaceUrl } from '@/utils/auth'
	export default {
		data() {
      var valiIcon = (rule, value, callback) => { // 图片验证
        if (!this.hasFmt) {
          callback(new Error('请上传封面图'));
        } else {
          callback();
        }
      };
			return {
        hasFmt:false,
				fileList:[],	// 预览图片
				baceUrl:'',
				search_info: '',
				imgFullSrc:'',
				btnTable: btnTable,
				dialogVisible: false,
				loading: false,
        upData: [],
        params: {},
				per_page: 10,
				total_pages: 0,
				currentPage: 1, // 页面默认展示的当前页码
				banner_data: [],
				bannerDialog: false,
				banner1: false,
				dialogVisible2: false,
				dialogImageUrl: '',
				uploadData: {},
				bannerForm: {},
				bannerForm1: {},
        editStatus:'2',
				bannerRules: {
					titleShort: [
            {required: true,message: '请输入短标题',trigger: 'blur'},
            { min: 1, max: 10, message: '长度在 1 到 10 个字', trigger: 'blur' }
          ],
          icon:[
            {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
          ],
        },
        bannerRules1: {
					titleShort: [
            {required: true,message: '请输入短标题',trigger: 'blur'}
          ],
          icon:[
            {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
          ],
				},
			}
		},
		computed: {
			upDataLength: function() {
				return this.upData.length - 1;
			}
		},
		created() {
			this.baceUrl = getBaceUrl();
			this.initParams();
			this.getBannerlist();
		},
		methods: {
      // 添加/修改
			toBanner(){
        this.$refs['bannerForm'].validate((valid) => {
          if(valid){
            let param = new FormData();
            param.append('tokenId',this.$store.state.user.tokenId);
            param.append('titleShort',this.bannerForm.titleShort);  
            param.append('bannerType',this.bannerForm.bannerType);
            param.append('linkId',this.bannerForm.linkId);
            param.append('articleId',this.bannerForm.articleId);
            param.append('editStatus',this.editStatus);
            param.append('id',this.bannerForm.id);
            if(this.editStatus == '1'){
              param.append('file',this.bannerForm.newsFile,this.bannerForm.filename);
            }
            this.$post('bannerInfo/save',param).then(res => {
              console.log(res)
              if(res.code == 0){
                this.bannerDialog = false;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.getBannerlist();
              }else{
                this.$message({
                  message: '对不起,修改失败',
                  type: 'error'
                });
              }
            })
          }
        })
      },
      	//修改 点击edit
			bannerEdit(index, rows) {
        this.fileList=[];
        this.hasFmt=true;
				this.bannerDialog = true;
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
				}
				this.$get('bannerInfo/show', params).then(res => {
          this.bannerForm = res.data[0];
					this.imgSrc=this.bannerForm.coverImgId
					this.imgFullSrc = this.bannerForm.coverImgUrl;
//						alert(this.imgFullSrc)
					this.fileList.push({url:this.imgFullSrc})
				})
			},
			//		下线
			top_flag1(index, rows) {
        this.banner1 = false;
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
					this.$post('bannerInfo/isOnline', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '下线成功!'
						});
						setTimeout(() => {
								this.getBannerlist();
							}, 1000);
							
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
        this.banner1 = false;
        if(rows.originalStatus =='5'){
          this.$message({
            type: 'warning',
            message: '相关新闻已经下线,无法上线到banner!'
          });
          return;
        }
        if(rows.topFlag=='1'){
          this.$message({
            type: 'warning',
            message: '相关新闻已经置顶,无法上线到banner!'
          });
          return;
        }
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
					this.$post('bannerInfo/isOnline', params).then(res => {
						// console.log(res)
					if(res.code==0){
            this.$message({
							type: 'success',
							message: '上线成功!'
						});
          }else{
            this.$message({
							type: 'warning',
							message: res.msg
						});
          }
						this.getBannerlist();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '上线失败'
					});
				});
			},
			bannerShow(index, rows) {
        this.banner1 = true;
				this.fileList=[];
				var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
				}
				this.$get('bannerInfo/show', params).then(res => {
					console.log(res.data[0])
          this.bannerForm1 = res.data[0];
          if(this.bannerForm1.status == '0'){
            this.bannerForm1.statusText ='待上线'
          }else if(this.bannerForm1.status == '1'){
            this.bannerForm1.statusText ='已上线'
          }else{
            this.bannerForm1.statusText ='已下线线'
          }
					this.imgSrc=this.bannerForm1.coverImgId
					this.imgFullSrc = this.bannerForm1.coverImgUrl  //http://192.168.1.91:8080/images/showImage?id=453610293595996160
					console.log(this.imgFullSrc);
				})
				
				
				
			},
			handleRemove(file, fileList) {
				if(fileList.length == 0){
          this.hasFmt =false;
          this.editStatus = '1';
				}
			},
			handlePictureCardPreview(file) {
				console.log(file)
				this.dialogImageUrl = file.url;
				//      this.dialogVisible2 = true;
			},
			getFullUrl() {
				return(this.baceUrl + '/bannerInfo/save')
			},
		

			// 置顶排序
			publishWaitTop() {
				this.dialogVisible = true;
				this.loading = true;
				this.$get('bannerInfo/getIsOnline', {
					tokenId: this.$store.state.user.tokenId
				}).then(res => {
					this.loading = false;
					console.log(res)
					this.upData = res.data;
				})
			},
			//提交置顶排序(弹框点击发布)
			toPublish1() {
				// console.log(this.upData)
				var newsInfos = [];
				this.upData.map((item, index) => {
						// newsInfos.push({id:item.id,orderNum:index+1})
					newsInfos.push(item.id);
				})
				var params = {
					tokenId: this.$store.state.user.tokenId,
					// newsInfos:JSON.stringify(newsInfos)
					ids: newsInfos.join(',')
				}
				console.log(params);
				this.$post('bannerInfo/publishIsOnline', params).then(res => {
					if(res.code == '0'){
            this.$message({
							type: 'success',
							message: res.msg
            });
            this.dialogVisible = false
          }else{
            this.$message({
							type: 'error',
							message: res.msg?res.msg:'发布失败'
            });
          }
				})
      },
      	//提交置顶排序(弹框点击发布)
			toPublish() {
				// console.log(this.upData)
        var newsInfos = [];
        var params = {
					tokenId: this.$store.state.user.tokenId,
				}
				this.upData.map((item, index) => {
          // newsInfos.push({id:item.id,orderNum:index+1});
          params['bannerInfos['+index+'].id'] = item.id;
          params['bannerInfos['+index+'].orderNum'] = index+1;
        });
        /* newsInfos.map((item,index) => {
          params['bannerInfos['+index+'].id'] = item.id;
          params['bannerInfos['+index+'].orderNum'] = item.orderNum;
        }); */
				console.log(params);
				this.$post('bannerInfo/publishIsOnline', params).then(res => {
					if(res.code == '0'){
            this.$message({
							type: 'success',
							message: res.msg
            });
            this.dialogVisible = false
          }else{
            this.$message({
							type: 'error',
							message: res.msg?res.msg:'发布失败'
            });
          }
				})
			},
      // banner列表
			getBannerlist(params) {
				if(!params) {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						limit: this.per_page,
						offset: this.currentPage,
						simpleParameter: this.search_info
					}
				}
				console.log(params)
				this.$post('bannerInfo/list', params).then(res => {
          this.banner_data = res.data[0].rows;
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
				this.banner1 = false
			},
			// 
			initParams() {
				this.params = {
					tokenId: this.$store.state.user.tokenId,
					limit: this.per_page,
					offset: this.currentPage
				}
      },
      handleSizeChange(val){
        this.per_page = val;
        this.getBannerlist();
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
      fileChange(file,fileList){
        this.$refs['icon'].clearValidate(); // 图片验证
        this.bannerForm.filename = file.name;
        this.bannerForm.newsFile = file.raw;
				// console.log(file)
				if(fileList.length>0){
					this.hasFmt = true;
				}
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件`);
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
	.el-upload--picture-card{
    width: 80px;
    height: 80px;
    line-height: 88px;
  }
  .banner .cell p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .banner .bannerForm1 .el-form-item{
    margin-bottom: 8px;
  }
	
</style>
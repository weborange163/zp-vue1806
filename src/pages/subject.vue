<template>
  <div class="page-body subject">
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
			<el-dialog title="推荐到专题主页" :visible.sync="dialogVisible1" center width="30%" >
				<el-radio v-model="recommendRadio" label="1" class="marBo4">置顶-专题推荐列表区</el-radio><br/>
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
							<el-input v-model="bannerForm.title" :disabled="true" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="短标题" prop="title_short">
							<el-input v-model="bannerForm.title_short" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="banner图片" label-width="110px" ref="icon" prop="icon">
							<el-upload 
								action="" :multiple="false" :limit='1'
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
							<el-input v-model="bannerForm.type" size="mini" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="链接">
							<el-input v-model="bannerForm.articleId" size="mini" :disabled="true"></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="bannerDialog = false;recommendRadio=''" class="light_btn">取 消</el-button>
						<el-button type="primary" @click="toBanner" class="light_btn">保 存</el-button>
					</span>
				</el-dialog>
    <div class="page-header">
      <el-row>
        <el-col :span="3">
          <el-select v-model="value" placeholder="发布来源" size="mini">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
       <el-col :span="2" class="text-right" style="padding-right:4px;"><span style="line-height:28px;" >上线时间</span></el-col>
        <el-col :span="9">
          <!-- value-format="yyyy-MM-dd hh:mm:ss"  -->
           <el-date-picker size="mini" style="width:90%;" v-model="value6" type="datetimerange" 
           value-format="yyyy-MM-dd HH-mm-ss"
           start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '00:00:00']">
					</el-date-picker>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-input v-model="inputs" style="width:70%" placeholder="标题、专题ID" size="mini"></el-input>
          <el-button class="light_btn" @click.native.prevent="getSubjectList()" size="mini">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="text-right marBo4">
        <router-link :to="{name:'subject-add'}" ><el-button class="light_btn" size="mini">新建专题</el-button></router-link>
        <el-button class="light_btn" @click="publishWaitTop()" size="mini">置顶排序</el-button>
        <el-button class="light_btn" @click.native.prevent="getSubjectList()" size="mini">刷新</el-button>
      </div>
      <el-table :data="subjectList" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()" v-loading="loading2">
        <el-table-column label="序号" type="index" width='50'></el-table-column>
        <el-table-column label="专题标题" prop="title" >
					<template slot-scope="scope">
						<i class="iconfont icon-zhiding" style="color:#A30001;" v-if="scope.row.top_flag == '1'"></i>
            <i class="iconfont icon-banner" style="color:#00C621;vertical-align: middle;font-size:22px;"  v-if="scope.row.recommend == '1'"></i>
						<i class="iconfont icon-banner" style="color:#333;vertical-align: middle;font-size:22px;" v-if="scope.row.recommend == '2'"></i>
            <span>{{ scope.row.title }}</span>
					</template>
				</el-table-column>
        <el-table-column label="专题封面" prop="cover_img_id" width="80">
					<template slot-scope="scope">
						<img :src="scope.row.cover_img_url" alt="">
					</template>
				</el-table-column>
        <el-table-column label="发布状态" width="80">
          <template slot-scope="scope">
              <p v-if="scope.row.status=='0'" >新建</p>
              <p v-if="scope.row.status=='3'" class="dshx">待上线</p>
              <p v-if="scope.row.status=='4'" class="yshx">已上线</p>
              <p v-if="scope.row.status=='5'" class="yxx">已下线</p>
          </template>
        </el-table-column>
        <el-table-column label="上线时间" prop="online_time" width="160"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="180"></el-table-column>
        <el-table-column label="专题ID" prop="article_id" width="100"></el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" v-if="scope.row.top_flag=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp(scope.$index, scope.row)"> 取消置顶 </el-button>
						<el-button type="text" v-if="scope.row.status=='4' && scope.row.top_flag!='1'&&scope.row.recommend != '1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button>
						<el-button type="text" v-else style="margin-right:8px;vertical-align:middle;" disabled>下线</el-button>
            <el-button type="text" v-if="scope.row.status!='4'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag2(scope.$index, scope.row)">上线</el-button>
						<el-button type="text" v-if="scope.row.status =='4'" @click.native.prevent="recommend(scope.$index, scope.row)"><i class="iconfont icon-share"></i></el-button>
						<router-link :to="{name:'subject-edit',params:{id:scope.row.id,argu:{a:value,b:value6,c:inputs,d:per_page,e:currentPage}}}">
							<el-button type="text"><i class="iconfont icon-edit"></i></el-button>
						</router-link>
            <!-- <el-button v-else disabled type="text"><i class="iconfont icon-edit"></i></el-button> -->
						<el-button type="text" v-if="scope.row.status !='4'&&scope.row.recommend=='0'" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
						<el-button type="text" v-else disabled><i class="iconfont icon-delete"></i></el-button>
					</template>
				</el-table-column>
      </el-table>
      <div style="margin-top:20px;">
        <el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" 
          :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" :total="this.total_pages">
				</el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {btnTable} from '@/utils/table-style.js'
import { getBaceUrl } from '@/utils/auth'
export default {
  data(){
     var valiIcon = (rule, value, callback) => { // 图片验证
        if (!this.hasFmt) {
          callback(new Error('请上传图片'));
        } else {
          callback();
        }
      };
    return{
      argu:{},
      hasFmt:false,
			bannerForm:{
				type:'专题'
			},
			dialogImageUrl:'',
			dialogVisible2:false,
			uploadData:{},
			baceUrl:'',
			recoIndex:0,
			bannerRules: {
				title_short: [
          { required: true, message: '请输入短标题', trigger: 'blur' },
          {min:1,max:10,message:'短标题在10字以内', trigger:'blur'}
        ],
        icon:[
          {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
        ]
			},
			bannerDialog:false,
			recommendRadio:'',
      subjectList:[],
      per_page:10,
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
    dialogVisible: false,
    dialogVisible1: false,
    loading:false,
    loading2:false,
    upData:[],
    }
  },
  computed: {
			upDataLength: function() {
				return this.upData.length - 1;
			}
		},
  created(){
    // a:value,b:value6,c:inputs,d:per_page,e:currentPage
    if(this.$route.params.argu){
      this.argu = this.$route.params.argu;
      this.value=this.argu.a;
      this.value6=this.argu.b;
      this.inputs=this.argu.c;
      this.per_page=this.argu.d;
      this.currentPage=this.argu.e;
    }
    this.getSubjectList();
		this.baceUrl = getBaceUrl();
  },
  methods:{
		// 点击 推荐到banner 保存按钮
    toBanner(){
      this.$refs.bannerForm.validate((valid) => {
        if(valid){
          let param = new FormData();
          param.append('tokenId',this.$store.state.user.tokenId);
          param.append('titleShort',this.bannerForm.title_short);
          param.append('linkId',this.bannerForm.link);
          param.append('bannerType','2');
          param.append('articleId',this.bannerForm.articleId);
          param.append('file',this.bannerForm.file,this.bannerForm.filename);
          this.$post('bannerInfo/save',param).then(res => {
            console.log(res);
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: res.msg
              });
              setTimeout(() => {
                this.getSubjectList();
              }, 1000);
              this.bannerDialog = false;
            }else{
              this.$message({
                type: 'warning',
                message: res.msg?res.msg:'出错了'
              });
            }
            
          })
        }
      })
    },
		// 确定推荐到置顶/banner
    sureReco(){
      if(this.recommendRadio == '1'){	// 推荐到置顶
        console.log(this.recoIndex)
        var params = {
          tokenId:this.$store.state.user.tokenId,
          id: this.subjectList[this.recoIndex].id,
          topFlag:'1'
        }
        this.$post('/specialInfo/top',params).then(res => {
          console.log(res,res.code);
          if(res.code == '2'){
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }else if(res.code == '0'){
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            setTimeout(() => {
              this.getSubjectList();
            }, 1000);
          }
        })
          this.dialogVisible1=false;
				}else if(this.recommendRadio == '2'){	// 推荐到banner
          // console.log('推荐到banner');
          if(this.subjectList[this.recoIndex].recommend !='0'){   // 判断是否是已经推荐到了banner列表,
            this.$message({
              message: '本条消息已经推荐到了banner,请去banner列表查看',
              type: 'warning'
            });
            this.dialogVisible1 = false;
            return;
          }
					// this.subjectList[this.recoIndex].title,
					this.bannerForm.title = this.subjectList[this.recoIndex].title;
					this.bannerForm.link = this.subjectList[this.recoIndex].id;
					this.bannerForm.articleId = this.subjectList[this.recoIndex].article_id;
					this.dialogVisible1 = false;
					this.bannerDialog =true;
				}else{
					 this.$message('请选择置顶或者banner');
				}
				// this.dialogVisible1 = false;
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
  		// 置顶排序
			publishWaitTop(){
				this.dialogVisible = true;
				this.loading = true;
				this.$get('/specialInfo/publishWaitTop',{tokenId:this.$store.state.user.tokenId}).then(res =>{
					this.loading = false;
					if(res.code == '0'){
            this.upData = res.data;
          }else{
             this.$message({
							type: 'errpr',
							message: res.msg?res.msg:'获取列表失败'
            });
          }
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
				this.$post('/specialInfo/publishTop',params).then(res => {
					if(res.code == '0'){
            this.$message({
							type: 'success',
							message: res.msg?res.msg:'发布成功'
            });
            this.getSubjectList();
            this.dialogVisible = false;
          }else{
            this.$message({
							type: 'errpr',
							message: res.msg?res.msg:'发布失败'
            });
          }
				})
			
			},
		//推荐到banner
		recommend(index,row) {
			console.log(index,row);
				if(row.top_flag == '1'){
					this.$message({
						message: '本条消息已经置顶,需取消置顶才能操作',
						type: 'warning'
					});
				}else if(row.recommend == '1'){
          this.$message({
						message: '本条消息已经被推荐到了banner并上线,请去banner列表查看',
						type: 'warning'
					});
        }else{
					this.dialogVisible1 = true;
					this.recoIndex = index;	// 保存当前的index
					console.log(row,this.recoIndex);
				}
		},
    //专题列表
    getSubjectList(val){
      this.loading2=true;
      this.currentPage=val?val:1;
      var params = {
        tokenId:this.$store.state.user.tokenId,
        limit:this.per_page,
        offset:this.currentPage,
        status:this.value,
        simpleParameter:this.inputs,
      }
      if(this.value6){
        params.startTime=this.value6[0];
        params.endTime=this.value6[1];
      }
      this.$post('specialInfo/list',params).then(res => {
				if(res.code == 0){
          console.log(res.data[0].rows);
          this.subjectList = res.data[0].rows;
          this.total_pages = res.data[0].total;
          this.loading2=false;
        }
      })
      // this.inputs='';
      // this.value6='';
      // this.value='';
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.currentPage = val;
      this.getSubjectList(val);
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
						status:'5'
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
			
			handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSizeChange(val){
        this.per_page = val;
        this.getSubjectList();
      },
      handlePictureCardPreview(file) {
				console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible2 = true;
      },
      fileChange(file,fileList){
        this.$refs['icon'].clearValidate(); // 图片验证
        this.bannerForm.filename = file.name;
        this.bannerForm.file = file.raw;
        console.log(file.raw)
        if(fileList.length>0){
          this.hasFmt = true;
        }
      },
      handleExceed(files, fileList){
        this.$message.warning('当前限制选择 1 个文件');
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
						status:'4'
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
  .el-upload--picture-card,
  .el-upload-list--picture-card .el-upload-list__item{
		width: 80px;
		height: 80px;
		line-height: 88px;
	}
  /* .el-date-editor .el-range__icon,
  .el-date-editor .el-range-separator{
    line-height: 20px;
  } */
</style>


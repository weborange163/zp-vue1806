<template>
	<div class="version-list">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 8px;margin-bottom: 8px;margin-left: 22px;">
      <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
			<el-breadcrumb-item>版本管理</el-breadcrumb-item>
			<el-breadcrumb-item>应用详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-left: 22px;margin-right: 22px;margin-bottom: 20px;overflow: hidden;background:rgba(255,255,255,1);border-radius:4px;box-shadow:0px 0px 0px rgba(54,88,167,0.07);">
			<div style="margin-top: 20px;margin-right: 88px; text-align: right;">
        <router-link :to="{name:'version'}">
          <el-button size="small" class="light_btn router_btn">返回</el-button>
        </router-link>
				<el-button size="small" class="light_btn" v-if="bag.platformType=='1'" @click="newDialog = true;isEdit = false;">上传插件</el-button>
			</div>

			<p class="title-p">应用信息</p>
			<div class="el-table__body-wrapper is-scrolling-none info_table">
				<table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
					<colgroup>
						<col name="el-table_1_column_1" width="15%">
						<col name="el-table_1_column_2" width="35%">
						<col name="el-table_1_column_3" width="15%">
						<col name="el-table_1_column_4" width="35%">
					</colgroup>
					<tbody>
						<tr class="el-table__row">
							<td>
								<div class="cell">应用包名</div>
							</td>
							<td>
								<div class="cell">{{bag.packageName}}</div>
							</td>
							<td>
								<div class="cell">版本号</div>
							</td>
							<td>
								<div class="cell">{{bag.versionName}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">下载地址</div>
							</td>
							<td>
								<div class="cell">{{bag.downloadUrl}}</div>
							</td>
							<td>
								<div class="cell">code版本</div>
							</td>
							<td>
								<div class="cell">{{bag.versionCode}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">MD5</div>
							</td>
							<td>
								<div class="cell">{{bag.fileMdFive}}</div>
							</td>
							<td>
								<div class="cell">应用大小</div>
							</td>
							<td>
								<div class="cell">{{bag.fileSize}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">升级模式</div>
							</td>
							<td>
								<div class="cell">{{bag.upgradeMode1}}</div>
							</td>
							<td>
								<div class="cell">应用平台</div>
							</td>
							<td>
								<div class="cell">{{bag.platformType1}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">状态</div>
							</td>
							<td>
								<div class="cell">{{bag.status1}}</div>
							</td>
							<td rowspan="2">
								<div class="cell">版本提示</div>
							</td>
							<td rowspan="2">
								<div class="cell">{{bag.upgradeContent}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">延时生效</div>
							</td>
							<td>
								<div class="cell">{{bag.delayTime}}</div>
							</td>
							<!-- <td>
								<div class="cell">11111</div>
							</td>
							<td>
								<div class="cell">1111112</div>
							</td> -->
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">创建时间</div>
							</td>
							<td>
								<div class="cell">{{bag.createTime}}</div>
							</td>
							<td>
								<div class="cell">修改时间</div>
							</td>
							<td>
								<div class="cell">{{bag.updateTime}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">更新时间</div>
							</td>
							<td>
								<div class="cell">{{bag.onlineTime}}</div>
							</td>
							<td>
								<div class="cell">操作人</div>
							</td>
							<td>
								<div class="cell">{{bag.updateUserId}}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="title-p" v-if="bag.platformType == '1'">插件信息</p>
			<el-table :data="plugData" :row-class-name="miniTable" :header-row-class-name="miniTable" border v-if="bag.platformType == '1'">
        <el-table-column label="序号" type="index" width='50'></el-table-column>
				<el-table-column prop="version_code" label="版本号" width='80'></el-table-column>
				<el-table-column prop="plugin_name" label="插件名称" width='80'></el-table-column>
        <el-table-column prop="package_name" label="插件包名" width="160"></el-table-column>
				<el-table-column prop="download_url" label="下载地址"></el-table-column>
				<el-table-column prop="file_size" label="插件大小" width='80'></el-table-column>
				<el-table-column prop="update_time" label="修改时间" width='160'></el-table-column>
				<el-table-column label="状态" width='70'>
          <template slot-scope="scope">
            <p v-if="scope.row.status=='1'" class="dshx">新建</p>
            <p v-if="scope.row.status=='2'" class="yshx">已上线</p>
            <p v-if="scope.row.status=='3'" class="yyx">已下线</p>
          </template>
        </el-table-column>
				<el-table-column label="操作" width="240" fixed="right">
					<template slot-scope="scope">
            <el-button class="marR10" type="text" @click="downPlug(scope.row.download_url)">下载</el-button>
						<router-link :to="{name:'version-detail',params:{id:scope.row.id}}">
							<el-button class="marR10" type="text">查看</el-button>
						</router-link>
						<el-button type="text" class="marR10" v-if="scope.row.status == '2'" @click="onOff('3',scope.row.id)">下线</el-button>
            <el-button type="text" class="marR10" v-else @click="onOff('2',scope.row.id)" >上线</el-button>
						<el-button type="text" class="marR10" v-if="scope.row.status=='1'" @click="editPlug(scope.row)"><i class="iconfont icon-edit"></i></el-button>
						<el-button type="text" v-if="scope.row.status != '2'" @click="deletePlug(scope.row.id)"><i class="iconfont icon-delete"></i></el-button>
            <el-button v-else type="text" disabled><i class="iconfont icon-delete"></i></el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="marT20" v-if="bag.platformType == '1'">
        <el-pagination class="text-right" background @current-change="handleCurrentChange" 
        :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" 
        layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages" @size-change="handleSizeChange">
        </el-pagination>
      </div>
		</div>
    <el-dialog center :close-on-click-modal="false"
        width="30%" :before-close="beforeClose"
        :visible.sync="newDialog"
        append-to-body>
        <el-form :model="plugForm" :rules="plugRules" ref="plugForm" label-width="110px" class="plugForm">
          <el-form-item label="上传插件包" label-width="110px" ref="icon" prop="icon">
            <el-upload action="" class="upload-demo"
              :multiple="false" :limit='1'
              ref="upload" name="file"
              :file-list="fileList"
              :auto-upload="false" :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :on-change="fileChange"
              :on-remove="handleRemove">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-dialog :visible.sync="imgDialog">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="版本号" prop="num">
            <el-input size="mini" v-model="plugForm.num" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="code版本" prop="plugcode">
            <el-input size="mini" v-model="plugForm.plugcode" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="插件包名" prop="plugPackageName">
            <el-input size="mini" v-model="plugForm.plugPackageName" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="插件名称" prop="plugname">
            <el-input size="mini" v-model="plugForm.plugname" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="插件提示" prop="desc">
            <el-input type="textarea" v-model="plugForm.desc" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="升级模式" required>
            <el-radio v-model="plugForm.radio" label="0">可选升级</el-radio>
            <el-radio v-model="plugForm.radio" label="1">强制升级</el-radio>
          </el-form-item>
          <!-- <el-form-item label="延时生效" required>
            <el-select size="mini" v-model="plugForm.delay" placeholder="请选择延时生效时间" style="width:70%;">
              <el-option label="立即生效" value="0"></el-option>
              <el-option label="5分钟" value="5"></el-option>
              <el-option label="10分钟" value="10"></el-option>
              <el-option label="15分钟" value="15"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="beforeClose" class="light_btn">取 消</el-button>
          <el-button type="primary" @click="createPlug" class="light_btn"
          v-loading.fullscreen.lock="loading2"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          >保 存</el-button>
        </span>
      </el-dialog>
	</div>
</template>
<script>
  import { getBaceUrl } from '@/utils/auth'
	export default {
		data() {
      var valiIcon = (rule, value, callback) => { // 图片验证
        if (!this.hasFmt) {
          callback(new Error('请上传插件包!'));
        } else {
          callback();
        }
      };
			return {
        loading2:false,
        idDetail:'',
				per_page:10,
        total_pages:0,
        currentPage:1,
				currentPage_bidding: 7, // 页面默认展示的当前页码
				plugData: [],
        content: '111',
        bag:{},
        fileList:[],
        newDialog:false,
        hasFmt:false,
        imgDialog:false,
        dialogImageUrl:'',
        plugForm:{
          radio:'0'
        },
        plugRules:{
          icon:[
            {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
          ],
          num: [
            { required: true, message: '请输入版本号', trigger: 'blur' },
            {pattern:/^[a-zA-Z0-9.]+$/,message:'只允许输入英文数字和.', trigger: 'blur'}
          ],
          plugcode:[
            {required: true, message: '请输入code版本', trigger: 'blur' },
            {pattern: /^[0-9]*$/,message:'code版本只能输入数字', trigger: 'blur'}
          ],
          plugname:[
            {required: true, message: '请输入插件名称', trigger: 'blur' },
            // {pattern:/^[a-zA-Z0-9.]+$/,message:'只允许输入英文数字和.', trigger: 'blur'}
          ],
          plugPackageName:[
            {required: true, message: '请输入插件包名', trigger: 'blur' },
          ],
          desc:[
            {required: true, message: '请输入插件提示', trigger: 'blur' },
          ]
        },
        app_id:'',
        isEdit:false,
        editId:'',
        baceUrl:''
			}
    },
     created() {
      this.baceUrl = getBaceUrl();
      this.getParams();
      this.getInfo();
      this.getPlugList();
      console.log(this.idDetail)
    },
		methods: {
      getParams () {
        // 取到路由带过来的参数 
				let routerParams = this.$route.params.id;
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams
				this.idDetail = routerParams;
				console.log(this.$route.params)
      },
      miniTable(row){
        return 'miniTable'
      },
      downPlug(url){
        this.$confirm('确定要下载此插件包吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          // window.location.href= this.baceUrl + url;
          window.location.href= url;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
          });          
        });
      },
      onOff(status,id){
        var text = '';
        if (status == '2'){
          text = '上线';
        }else{
          text= '下线';
        }
        this.$confirm(`确定要${text}当前插件吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          var params = {
            tokenId: this.$store.state.user.tokenId,
            status:status,
            id:id
          }
          this.$post('pluginUpgrade/onAndOffLine',params).then(res => {
            console.log(res);
            if(res.code == 0){
              setTimeout(() => {
                this.getPlugList();
              }, 500);
              this.$message({
                type: 'success',
                message: res.msg
              });
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      deletePlug(id){
        this.$confirm('此操作将删除该插件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = {
              tokenId: this.$store.state.user.tokenId,
              status:0,
              id:id
            }
            this.$post('pluginUpgrade/delete',params).then(res => {
            console.log(res)
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              setTimeout(() => {
                this.getPlugList();
              }, 1000);
            }else{
              this.$message({
                type: 'info',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      editPlug(row){
        this.newDialog=true;
        this.fileList.push({url:row.download_url,name:row.file_name});
        this.plugForm.num = row.version_name;
        this.plugForm.plugcode = row.version_code;
        this.plugForm.plugname = row.plugin_name;
        this.plugForm.desc = row.upgrade_content;
        this.plugForm.plugPackageName = row.package_name;
        this.plugForm.radio = row.upgrade_mode;
        this.plugForm.id = row.id;
        // this.plugForm.appId = row.app_id;
        this.isEdit=true;
        this.editId = row.id;
        // this.app_id = row.id;
        this.hasFmt = true;
        console.log(this.fileList);
        console.log(this.plugForm.file);
      },
      beforeClose(){
        this.$confirm('关闭后输入的信息将重置!')
          .then(()=> {
            this.$refs['plugForm'].resetFields();
            this.fileList=[];
            this.isEdit=false;
            this.newDialog=false;
            this.plugForm={
              radio:'0'
            }
            done();
          })
          .catch(() => {});
      },
      // 获取应用包详情
			getInfo(){
        var params = {
          tokenId: this.$store.state.user.tokenId,
          id:this.idDetail
        }
        // console.log(this.idDetail)
        this.$post('appUpgrade/get',params).then(res => {
          console.log(res);
          if(res.code == 0){
            console.log(res.data[0]);
            var data = res.data[0].appUpgrade
            this.bag = res.data[0].appUpgrade;
            if(data.status == '1'){
              this.bag.status1 ='新建';
            }else if(data.status =='2'){
              this.bag.status1 ='已上线';
            }else{
              this.bag.status1 ='已下线';
            }
            if(data.platformType=='1'){
              this.bag.platformType1 = '安卓';
            }else{
              this.bag.platformType1 = 'IOS';
            }
            if(data.upgradeMode == '0'){
              this.bag.upgradeMode1='可选升级';
            }else{
              this.bag.upgradeMode1='强制升级';
            }
          }
        })
      },
      createPlug(){
        this.$refs.plugForm.validate((valid) => {
          if(valid){
            this.loading2 = true;
            // console.log(this.idDetail,this.plugForm.appId);
            let param = new FormData();
            param.append('tokenId',this.$store.state.user.tokenId);
            param.append('appId',this.idDetail);
            param.append('versionName',this.plugForm.num);
            param.append('versionCode',this.plugForm.plugcode);
            param.append('upgradeContent',this.plugForm.desc);
            param.append('upgradeMode',this.plugForm.radio);
            param.append('newsFile',this.plugForm.file,this.plugForm.filename);
            param.append('packageName',this.plugForm.plugPackageName);
            param.append('pluginName',this.plugForm.plugname);
            // param.append('status','1'); // 1新建,2上线,3下线
            if(this.isEdit){
              console.log(1111);
              param.append('id',this.editId);
            }
            console.log(this.idDetail)
            this.$post('pluginUpgrade/save',param).then(res =>{
              console.log(res)
              this.loading2 =false;
              if(res.code == 0){
                this.$refs['upload'].clearFiles();
                this.$refs['plugForm'].resetFields(); 
                this.plugForm={};
                this.fileList=[];  
                this.hasFmt=false;
                this.newDialog = false;
                this.$message({
                  type: 'success',
                  message: res.msg
                });
                setTimeout(() => {
                  this.getPlugList();
                }, 500);
              }else{
                this.$message({
                  type: 'error',
                  message: res.msg
                });
              }
            })
          }
        })
      },
      // 获取插件列表
      getPlugList(){
        var params = {
          tokenId: this.$store.state.user.tokenId,
          appId:this.idDetail,
          limit: this.per_page,
          offset: this.currentPage,
        }
        this.$post('pluginUpgrade/list',params).then(res => {
          console.log(res);
          this.plugData = res.data[0].rows;
          this.total_pages = res.data[0].total;
        })
      },
			handleCurrentChange(val) {
        this.currentPage = val;
        // this.getList();
      },
      handleSizeChange(val){
        this.per_page = vla;
        this.getPlugList();
      },
      handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.imgDialog = true;
    },
    fileChange(file,fileList){
      this.$refs['icon'].clearValidate(); // 图片验证
      this.plugForm.filename = file.name;
      this.plugForm.file = file.raw;
      console.log(file.name);
      console.log(file.raw);
      if(fileList.length>0){
        this.hasFmt = true;
      }
    },
    handleExceed(files, fileList){
      this.$message.warning('当前限制选择 1 个文件');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      if(fileList.length == 0){
        this.hasFmt =false;
      }
    },
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
	}
</script>
<style type="text/css">
	.up_form .el-input__inner {
		height: 30px;
		line-height: 30px;
		max-width: 300px;
	}
	
	.up_form .quill-editor .ql-container {
		min-height: 550px;
	}
	.version-list .title-p {
		border-left: 4px solid rgba(54, 88, 167, 1);
		padding-left: 18px;
		line-height: 24px;
		font-size: 16px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 18px;
		margin-top: 16px;
	}
	
	.info_table .el-table__body,
	.info_table .el-table--border td,
	.info_table .el-table td {
		border-color: #EAEAEA;
	}
	
	.info_table .el-table td {
		padding: 6px 0;
		background: #F3F3F3;
	}
	
	.info_table .el-table .cell {
		color: #333;
	}
	
	.version-list .el-table td,
	.el-table th {
		padding: 4px 0px;
  }
  .version-list .cell{
    overflow: auto;
    white-space: normal;
  }
  .plugForm .el-form-item{
    margin-bottom: 18px;
  }
</style>
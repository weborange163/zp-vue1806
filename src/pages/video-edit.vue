<template>
	<div class="page-body news-add" style="min-width:980px;">
    <el-dialog center width="375px"  :visible.sync="showDia" append-to-body :before-close="handleClose">
			<el-form :data="form2"  ref="form2" label-width="110px" class="form1 u_editor">
        <video :src="form1.videoUrl" id="myVideo" width="100%" height="240" controls style="background:rgba(0,0,0,0.7)">
          <source :src="form1.videoUrl" type="video/mp4">
        </video>
        <p class="marT20" style="height:20px;line-height:20px;font-size:16px;"><img src="@/assets/img/y4.png" alt="" style="width:20px;height:20px;border-radius:50%;display:block;float:left;margin-right:10px;"><span>{{form1.author}}</span></p>
				<p class="title marT20" >{{form1.title }}</p>
        <p class="color9">{{form1.updateTime}}</p>
        <p class="content" v-html="form1.content"></p>
			</el-form>
		</el-dialog>
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>发布内容</el-breadcrumb-item>
				<el-breadcrumb-item>编辑视频</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="box">
			<div class="text-right marR100">
				<el-button size="small" @click="fanhui" class="light_btn">返回</el-button>
        <el-button size="small" class="light_btn" @click="showPre" >预览</el-button>
				<el-button size="small" class="light_btn"  @click="creatVideo('form1',0)">仅保存</el-button>
				<el-button size="small" class="light_btn"  @click="creatVideo('form1','1')">保存并提交审核</el-button>
			</div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form1" :model="form1" label-width="96px" :rules="rules1" class="up_form clearfix">
            <div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
              <el-form-item label="视频标题" prop="title" >
                <el-input type="textarea" autosize v-model="form1.title" placeholder="请输入标题" style="width:420px;"></el-input>
              </el-form-item>
              <el-form-item label="视频简介" class="editor" prop="content">
                <el-input type="textarea"  v-model="form1.content" :rows="6" style="width:420px;"></el-input>
              </el-form-item>
              <el-form-item label="上传视频:" prop='videoVali' ref='videoVali'>
                <el-upload
                  class="upload-demo" :limit='1'
                  ref="uploadVideo1" name="newsVideo"
                  action="" accept='video/mp4'
                  :on-remove="handleRemove2" :before-upload='beforeUpload'
                  :http-request="uploadVideo"
                  :on-progress="uploading"
                  :file-list="fileListVideo"
                  :on-success="handleSuccess"
                  :on-exceed="exceedFile"
                  :before-remove="beforeRemove"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" :loading="uploadVideoing1" :disabled="uploadVideoing2">点击上传视频</el-button>
                  <div slot="tip" class="el-upload__tip">请选择mp4文件进行上传</div>
                  <!-- <div class="el-upload__tip" v-html="showUrl"></div> -->
                </el-upload>
              </el-form-item>
              <el-form-item label="视频预览:" v-if="videoId">
                <video width="320" height="240" controls style="background:rgba(0,0,0,0.7)">
                  <source :src="showUrl" type="video/mp4">
                </video>
              </el-form-item>
            </div>
            <div style="width: 35%;float:left;padding:15px;min-width:420px;">
              <el-form-item label="发布到:" prop="columnId">
                <el-select filterable v-model="form1.columnId" name="columnId" placeholder="请选择">
                  <el-option
                    v-for="item in columnIds"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="fabuStyle" label="发布账号:" prop="userId">
                <el-select disabled filterable v-model="form1.userId" placeholder="请选择发布账号">
                  <el-option 
                    v-for="item in accounts"
                    :key="item.userId"
                    :label="item.nickName"
                    :value="item.userId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Tag标签:" prop="tagLabels">
                <el-input placeholder="用'，'隔开，单个标签小于12字节" v-model="form1.tagLabels"></el-input>
              </el-form-item>
              <!-- <el-form-item label="关键词:">
                <el-input placeholder="用英文 “ , ” 隔开" v-model="form1.keyWords"></el-input>
              </el-form-item> -->
              <el-form-item label="视频ID:" >
                <el-input disabled  v-model="form1.articleId" ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="second">
          <div class="tableOverstyle" style="width:1000px;margin:auto;">
            <el-table :data="tableData" style="width: 100%" class="marT20" border>
              <el-table-column label="序号" type="index" align="center" width='50'></el-table-column>
              <el-table-column prop="content" label="评论内容" ></el-table-column>
              <el-table-column prop="nick_name" label="账号"></el-table-column>
              <el-table-column prop="create_time" label="评论时间" ></el-table-column>
              <el-table-column prop="date" label="操作" >
                <template  slot-scope="scope">
                  <el-button class="marR10" type="text" @click="delCom(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="text-right marT20" background @current-change="handleCurrentChange" :current-page="currentPage" 
              :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange" :total="this.total_pages">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
			
		</div>
	</div>
</template>
<script>
//import MQuillEditor from 'm-quill-editor'
import { getBaceUrl } from '@/utils/auth'
import myVali from '@/utils/myVali'
	export default{
		components: {
		//	MQuillEditor
    },
		data(){
      var valiTag=(rule,value,callback) => {
        if (value === '') {
          callback();
        } else {
          console.log(value)
          var v = value.replace(/，/ig,',');
          var arr = v.split(',');
          arr.map(item => {
            if(item.replace(/[^\x00-\xff]/g,"aa").length>12){
              callback(new Error('单个tag标签不能超过12字节!'))
            }else{
              callback();
            }
          })
        }
      };
      var valiVideo= (rule, value, callback) => { // 视频验证
        if (!this.videoId) {
          callback(new Error('请上传视频'));
        } else {
          callback();
        }
      };
			return{
        currentPage:1,
        per_page:10,
        total_pages:1,
        tableData:[],
        activeName:'first',
        uploadVideoing1:false,
        uploadVideoing2:false,
        formDatas:'',
        accounts:[],
        fileList:[],
        fileListVideo:[],
        showDia:false,
        form2:'',
				pkg:'',
				uploadData:{},
				baceUrl:'',
				// content:'111',
				dialogImageUrl: '',
        dialogVisible: false,
				form1: {
					title: '',
					content:'',
          columnId:'',
					author:'',
					userId:'',
					imgType:'0',
					newsFile:'',
					tagLabels:'',
					keyWords:''
        },
        idDetail:'',
				cities:[],
        showUrl:'',
        argu:{},
        videoUrl:'',
        columnIds:'',
        videoId:"",
				rules1: {
          title: [
            {required:true,  message: '请输入标题', trigger: 'blur' }, 
             { min: 1, max: 50, message: '长度在 50字以内', trigger: 'blur' } 
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
             { min: 1, max: 500, message: '长度在 500字以内', trigger: 'blur' }
          ],
          
          columnId:[
            { required: true, message: '请选择来源', trigger: 'change'}
          ],
          userId: [
            {required: true, message: '请选择发布账号', trigger: 'change' }
          ],
          
          tagLabels:[
            { validator: valiTag, trigger: 'blur' }
          ]
        }
			}
		},
		created(){
      this.baceUrl = getBaceUrl();
      this.videoUrl = this.baceUrl + '/news/addVideo';
      // console.log(this.videoUrl);
      this.$get('/videoColumn/findColumnList',{tokenId:this.$store.state.user.tokenId,enabled:''}).then(res => {
    		// console.log(res.data)
    		this.columnIds = res.data
    	});
      // console.log(this.$route.params);
      this.argu=this.$route.params.argu;
      this.getParams();
		},
		mounted() {
			this.$get('reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.cities = res.data
      });
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        // console.log(res)
        this.accounts = res.data;
        
      });
      this.showNews();
      this.getComment();
		},
		methods:{
      handleClose(done){
       let myVideo = document.getElementById("myVideo");
       myVideo.pause();
        done();
      },
      getParams () {
        // 取到路由带过来的参数 
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams
				this.idDetail = this.$route.params.id;
				// console.log(this.idDetail)
      },
      delCom(row){
        this.$confirm('确定要删除这条评论吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$post('/comment/delete',{tokenId:this.$store.state.user.tokenId,id:row.id}).then(res => {
            // console.log(res)
            if(res.code==0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.getComment();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getComment(){
        let params={
          tokenId:this.$store.state.user.tokenId,
          linkId:this.idDetail,
          limit:this.per_page,
          offset:this.currentPage
        }
        this.$post('/comment/importList',params).then(res => {
          if(res.code==0){
            this.tableData=res.data[0].rows;
            this.total_pages=res.data[0].total;
          }
        });
      },
      showNews(){
        var params = {
					tokenId:this.$store.state.user.tokenId,
					id:this.idDetail
				}
				this.$get('/video/show',params).then(res => {
          this.form1 = res.data[0];
          this.accounts.map(item => {
            if(item.userId==this.form1.userId){
              console.log(item.nickName);
              this.form1.author=item.nickName;
              return;
            }
          });
          this.videoId=this.form1.videoId;
          this.showUrl=this.form1.videoUrl;
          this.fileListVideo.push({name:this.form1.videoName,url:this.form1.videoUrl});

				});
      },
      showPre(){
        this.$refs['form1'].validate((valid) => {
          // console.log(valid);
          if(valid){
            this.showDia=true;
          }
        });
      },
      getUContent: function(){
        let content = this.$refs.ueditor.getUEContent();
        console.log(content);
        this.form1.content = content;
      },
      beforeUpload(file){
        console.log(file);
      },
      uploadVideo(file){
        let formDatas = new FormData();
        formDatas.append('newsVideo', file.file);
        this.uploadVideoing1=true;
        this.uploadVideoing2=true;
        // formDatas.append('tokenId',this.$store.state.user.tokenId);
        this.$post('/news/addVideo',formDatas).then(res =>{
          if(res.code == 0){
            this.uploadVideoing1=false;
            this.showUrl = res.data[1];
            this.videoId = res.data[0];
            this.$refs['videoVali'].clearValidate();
            // console.log(this.showUrl,this.videoId);
            this.$message({
              message: res.msg,
              type: 'success'
            });

          }else{
            this.$message({
              message: res.msg?res.msg:'操作失败',
              type: 'error'
            });
            this.uploadVideoing1=false;
            this.uploadVideoing2=false;
          }
        })
      },
      exceedFile(){
        this.$message.warning('只能上传一个视频!');
      },
      uploading(event, file, fileList){
        // console.log(event, file, fileList)
      },
      videoChange(file,filelist){
        console.log(file,filelist);
        let params = new FormData(); // 创建form对象
        params.append('file',file,file.name);
        this.$post('images/upload',params).then(res => {
					console.log(res);
				})
      },
      submitUpload() {  // 执行的方法是uploadVideo
        console.log(this.fileListVideo);
        this.$refs.uploadVideo1.submit();
      },
      handleRemove2(file, fileList) {
        this.showUrl ='';
        this.videoId='';
        this.uploadVideoing2=false;
        this.$message({
          message: '请重新选择视频',
          type: 'info'
        });
      },
      handleSuccess(res,file){
        // console.log(res.data[1]);
        // this.showUrl = res.data[1];
        // this.videoId = res.data[0];
        console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
			getFullUrl(){
				return (this.baceUrl+'/news/add')
      },
      
      creatVideo(formName,status){
        // console.log(this.$refs.ueditor.getUEContent())
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if(valid){
            this.formDatas = new FormData();
            this.formDatas.append('tokenId',this.$store.state.user.tokenId);
            this.formDatas.append('id',this.form1.id);
            this.formDatas.append('title',this.form1.title);  
            this.formDatas.append('content',this.form1.content);
            this.formDatas.append('userId',this.form1.userId);
            // param.append('articleType','1');
            this.formDatas.append('columnId',this.form1.columnId);
            this.formDatas.append('tagLabels',this.form1.tagLabels.replace(/，/ig,','));
            // param.append('keyWords',this.form1.keyWords.replace(/，/ig,','));
            this.formDatas.append('publishSource','1');
            this.formDatas.append('status',status);
            this.formDatas.append('videoId',this.videoId);
            // this.formDatas.append('videoUrl',this.showUrl);
            const loading = this.$loading({
              lock: true,
              text: '上传中...',
              target: document.querySelector('.loadingArea'),
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$post('/video/edit',this.formDatas).then(res =>{
                console.log(res);
                if(res.code == 0){
                  loading.close();
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                  setTimeout(() => {
                    this.$router.push({
                      name: 'video',
                      params: {
                        argu: this.argu
                      }
                    });
                    
                  }, 1000);
                }else{
                  this.$message({
                    message: res.msg?res.msg:'发布失败',
                    type: 'error'
                  });
                }
              })
          }
        })
      },
		
      handleExceed(files, fileList){
        this.$message.warning(`当前限制上传 ${this.form1.coverNum}个文件`);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      fanhui(){
        this.$confirm('返回已编辑内容将重置是否继续？')
          .then(_ => {
            // console.log(this.argu)
            this.$router.push({
              name: 'video',
              params: {
                argu: this.argu
              }
            });

            // this.$router.back();
            done();
          })
          .catch(_ => {});
      },
      handleSizeChange(val) {
        this.per_page=val;
        this.getComment();
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.getComment();
      },
    },
    /* beforeRouteEnter (to, from, next){
      console.log(from.query)
      if(from.query.argu){
         this.argu = from.query.argu;
        console.log(this.argu)
      }
      next();
    }, */
    beforeRouteLeave (to, from, next){
      to.meta.keepAlive = true;
      next();
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
	}
</script>
<style type="text/css">
	.up_form .el-upload-list--picture-card .el-upload-list__item,
	.up_form .el-upload--picture-card{
		width: 80px;
		height: 80px;
		line-height: 88px;
	}
	.quill-editor .ql-toolbar.ql-snow{
		height: 60px;
	}
	.editor .el-form-item__content {
		line-height: 20px;
	}
	
	.up_form .el-input__inner{
		height: 30px;
		line-height: 30px;
		max-width: 300px;
	}
	.up_form .quill-editor .ql-container{
		min-height: 550px;
		overflow-y: auto;
	}
  .source_style .el-form-item__error{
    left: -50px;
  }
  
  .edui-default{
    position: relative
  }
  
</style>
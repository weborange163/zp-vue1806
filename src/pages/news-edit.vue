<template>
	<div class="page-body news_edit" style="min-width:980px;">
		<el-dialog center width="30%"  :visible.sync="bannerDialog" id='div1' append-to-body>
			<el-form :data="form1" ref="form1" label-width="110px" class="form1">
				<p id="p1" v-html="form1.title"></p>
				<p id="p2" v-html="form1.content"></p>
			</el-form>
		</el-dialog>
		
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>新闻信息</el-breadcrumb-item>
				<el-breadcrumb-item>编辑新闻资讯</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<div class="box" >
			<div class="text-right marR100">
				<el-button size="small" @click="fanhui" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" @click="bannerDialog = true;" >预览</el-button>
				<el-button size="small" class="light_btn" @click="editNews('form1','0')">保存</el-button>
				<el-button size="small" class="light_btn"  @click="editNews('form1','1')">保存并提交审核</el-button>
			</div>
			<el-form ref="form1" :model="form1" label-width="96px" :rules="rules1" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title" >
						<el-input v-model="form1.title" type="textarea" autosize style="width:420px;"  placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor">
						<m-quill-editor ref="myQuillEditor" v-model="form1.content"
						:width="quill.width" :getContent="onEditorChange" :toolbar="quill.toolbar"
						:has-border="quill.border" :zIndex="quill.zIndex"
						:sync-output="quill.syncOutput" 
						:theme="quill.theme"
						:disabled="quill.disabled"
						:fullscreen="quill.full"
						@upload="uploadImg" @blur="onEditorBlur($event)"
						></m-quill-editor>
					</el-form-item>
				</div>
				<div style="width: 35%;float:left;padding:15px;min-width:420px;">
					<!-- <el-form-item label="发布到:">
						<el-input v-model="fabudao"  disabled></el-input>
					</el-form-item> -->
          <el-form-item label="发布到:" prop="columnId">
            <el-select v-model="form1.columnId" name="columnId" placeholder="暂无分类"  style='padding-left: 6px;'>
              <el-option 
              v-for="item in columnIds" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
					</el-form-item>
          <el-row>
          <el-col :span="14">
            <el-form-item label="来源:" prop="sourceType">
              <el-radio-group v-model="form1.sourceType" @change="test()">
                <el-radio label="1">原创</el-radio>
                <el-radio label="2">转载</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item v-if="form1.sourceType == 2" prop="source">
              <el-select filterable v-model="form1.source" placeholder="请选择转载来源" style="margin-left:-68px;width:150px;">
                <el-option
                  v-for="item in cities"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
					<el-form-item label="作者:">
						<el-input v-model="form1.author"></el-input>
					</el-form-item>
					<el-form-item label="发布账号:" prop="userId">
						<el-select filterable v-model="form1.userId">
							<el-option 
                v-for="item in accounts"
                :key="item.userId"
                :label="item.nickName"
                :value="item.userId"
              ></el-option>
						</el-select>
					</el-form-item>
          <el-form-item label="封面图样式:" prop="coverNum">
							<el-radio-group v-model="form1.coverNum" @change="coverNumChange">
								<el-radio :label="0">无图</el-radio>
								<el-radio :label="1">单图</el-radio>
								<el-radio :label="3">三图</el-radio>
							</el-radio-group>
					</el-form-item>
          <el-form-item label="封面图类型:" prop="icon" ref="icon" v-show="form1.coverNum != '0'">
            	<el-radio-group v-model="form1.imgType" @change="radioChange">
                <el-radio label="1">上传封面图</el-radio>
								<el-radio label="2">提取正文图为封面图</el-radio>
							</el-radio-group>
						<el-upload v-if="form1.coverNum != 0 && form1.imgType == '1'"
							action="" :multiple="false" :limit=form1.coverNum
							ref="upload" name="newsFile" :file-list="fileList"
							list-type="picture-card" :auto-upload="false"
              :http-request="uploadFile"
							:on-change="fileChange" :on-exceed="handleExceed"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible" width="30%">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
          <el-form-item label="上传视频:">
						<el-upload
              class="upload-demo" :limit='1'
              ref="uploadVideo" name="newsVideo"
              :action="videoUrl" accept='video/mp4'
              :on-remove="handleRemove2"
              :file-list="fileListVideo"
              :on-success="handleSuccess"
              :before-remove="beforeRemove"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传mp4文件</div> -->
              <div class="el-upload__tip" v-html="showUrl"></div>
            </el-upload>
					</el-form-item>
					<el-form-item label="Tag标签:" prop="tagLabels">
						<el-input placeholder="用'，'隔开，单个标签小于12字节"  v-model="form1.tagLabels" ></el-input>
					</el-form-item>
					<!-- <el-form-item label="关键词:">
						<el-input  v-model="form1.tagLabels" ></el-input>
					</el-form-item> -->
          <div class="tableOverstyle">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
            <colgroup>
              <col name="el-table_1_column_1" width="25%">
              <col name="el-table_1_column_2" width="75%">
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td><div class="cell">发布来源</div></td>
                <td><div class="cell">
                  <span v-if="form1.publishSource == '1'">PC后台</span><span v-if="form1.publishSource == '2'">数据爬取</span><span v-if="form1.publishSource == '3'">APP端</span>
                  </div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">文章ID</div></td>
                <td><div class="cell">{{form1.articleId}}</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">状态</div></td>
                <td><div class="cell">
                  <span v-if="form1.status == '0'">新建</span><span v-if="form1.status == '1'">待审核</span><span v-if="form1.status == '3'">审核中</span>
                  <span v-if="form1.status == '4'">已上线</span><span v-if="form1.status == '5'">已下线</span>
                  </div></td>
              </tr>
            </tbody>
          </table>
          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border marT20">
            <colgroup>
              <col name="el-table_1_column_1">
              <col name="el-table_1_column_1" >
              <col name="el-table_1_column_1" >
              <col name="el-table_1_column_2" >
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td><div class="cell"></div></td>
                <td><div class="cell">时间</div></td>
                <td><div class="cell">操作账号</div></td>
                <td><div class="cell">备注</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">创建时间</div></td>
                <td><div class="cell">{{form1.createTime}}</div></td>
                <td><div class="cell">{{form1.createUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">上线时间</div></td>
                <td><div class="cell">{{form1.onlineTime}}</div></td>
                <td><div class="cell">{{form1.onlineUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">下线时间</div></td>
                <td><div class="cell">{{form1.offlineTime}}</div></td>
                <td><div class="cell">{{form1.offlineUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">修改时间</div></td>
                <td><div class="cell">{{form1.updateTime}}</div></td>
                <td><div class="cell">{{form1.updateUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">审核时间</div></td>
                <td><div class="cell">{{form1.checkTime}}</div></td>
                <td><div class="cell">{{form1.checkReason=='涉及敏感词'?'机审':form1.checkPerson}}</div></td>
                <td><div class="cell">{{form1.checkReason}}</div></td>
              </tr>
            </tbody>
          </table>
          </div>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script>
//import MQuillEditor from 'm-quill-editor'
import { getBaceUrl } from '@/utils/auth'
import myVali from '@/utils/myVali'
import axios from 'axios'
	export default{
		components: {
		//	MQuillEditor
		},
		data(){
      var valiIcon = (rule, value, callback) => { // 图片验证
        if (!this.hasFmt) {
          callback(new Error('请上传封面图'));
        } else {
          callback();
        }
      };
      var valiTag=(rule,value,callback) => {
        if (value === '') {
          callback();
        } else {
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
			return{
        editStatus:'2',
        formDatas:'',
        columnIds:'',
				fileList:[],	// 预览图片
				imgFullSrc:'',
        imgSrc:'',
        videoUrl:'',
        videoId:'',
        showUrl:'',
        fileListVideo:[],
        hasChangeFile:false,
        fabudao:'',
				form1: {
					title: '',
					content:'',
					columnId:'',
					sourceType:'1',
					source:'',
					status:'',
					author:'',
					userId:'1',
					imgType:'',
					newsFile:'',
					tagLabels:'',
					keyWords:'',
					coverImgId:''
				},
        // type:'新闻',
				pkg:'',
        quill: {
          width: 420,
          border: true,
          height:150,
          zIndex:101,
          syncOutput: true,
          theme: 'snow', //bubble snow
          disabled: false,
          full: false,
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link', {'header': [1, 2, 3, 4, 5, 6, false]}],
            ['blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{'color': []}, {'background': []}],
            [{ 'align': [false, 'right', 'center', 'justify'] }],
            ['image', 'video'],
          ]
        },
        bannerDialog: false,
        idDetail:'',
        hasFmt:true,
        uploadData:{},
        baceUrl:'',
        accounts:[],
				// content:'111',
				editorOption:{},
				dialogImageUrl: '',
        dialogVisible: false,
        cities:[],
        argu:{},
				rules1: {
          icon:[
            {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
          ],
          title: [
            {required:true, validator: myVali.checkTitle, trigger: 'blur' }  // 图片验证
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'change' },
            {pattern:/[0-9\u4e00-\u9fa5]+/g,message:'内容必须有中文或者数字',trigger:'blur'}
          ],
          sourceType: [
            { required: true, message: '请选择来源', trigger: 'change'}
          ],
          coverNum:[
            {required: true, message: '请选择封面图样式', trigger: 'change' }
          ],
          userId: [
            {required: true, message: '请选择发布账号', trigger: 'change' }
          ],
          imgType: [
            {required: true, message: '请选择图片', trigger: 'change' }
          ],
         /*  classifyType:[
            { required: true, message: '请选择所属分类', trigger: 'blur' },
          ], */
          source: [
            { required: true, message: '请选择转载来源', trigger: 'change' }
          ],
          columnId:[
            { required: true, message: '请选择来源', trigger: 'change'}
          ],
          tagLabels:[
            { validator: valiTag, trigger: 'blur' }
          ]
        }
			}
		},
		created(){
			this.baceUrl = getBaceUrl();
      this.getParams();
      this.videoUrl = this.baceUrl + '/news/addVideo';
      this.argu=this.$route.params.argu;
      this.$get('/column/findColumnList',{tokenId:this.$store.state.user.tokenId,navigationBar:''}).then(res => {
    		// console.log(res.data)
    		this.columnIds = res.data
    	});
      // console.log(this.argu)
		},
		mounted() {
			this.$get('reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.cities = res.data
      });
      
      this.$post('/members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        // console.log(res)
        this.accounts = res.data;
      });
      this.showNews();
		},
		methods:{
      radioChange(val){
        // console.log(val)
        if(val == '2'){
          this.hasFmt = true;
        }else{
          if(!this.fileList){
            this.hasFmt=false;
          }
          // 
        }
      },
			//图片的验证
			fileChange(file,fileList){
        this.editStatus = '1';
        this.hasChangeFile = true;
        this.$refs['icon'].clearValidate(); // 图片验证
        this.form1.filename = file.name;
        this.form1.newsFile = file.raw;
        this.fileList = fileList;
				console.log(fileList);
				if(fileList.length>0){
					this.hasFmt = true;
				}
      },
      coverNumChange(val){
        if(val == 0){
          this.hasFmt = true;
        }else{
          this.hasFmt = false;
          if(this.fileList){
            this.hasFmt=true;
          }
        }
      },
      uploadFile(file){
        this.formDatas.append('newsFile', file.file);
      },
      handleRemove(file, fileList) {
        this.editStatus = '1';
        // console.log(this.fileList);
        this.hasChangeFile = true;
        // console.log(file, fileList);
        this.fileList = fileList;
				if(fileList.length == 0){
					this.hasFmt =false;
				}
      },
			// 编辑新闻
			editNews(formName,status){
				this.$refs[formName].validate((valid) => {
          if (valid) {
						console.log(valid)
						if(this.form1.sourceType == '2' && !this.form1.source){ // 选择转载时候,需要选择转载来源 (待)
							this.$message.error('请选择转载来源!');
							return;
						}
						if(this.form1.imgType == 2){	// 封面图的类型 
							var reg = /src=/ig;
							if(!this.form1.content.match(reg)){
								 this.$message.error('内容里没有图片!');
                 return;
							}
						}
            this.formDatas = new FormData();
            this.formDatas.append('tokenId',this.$store.state.user.tokenId);
            this.formDatas.append('editStatus',this.editStatus);
            this.formDatas.append('id',this.form1.id);
            this.formDatas.append('title',this.form1.title);  
            this.formDatas.append('content',this.form1.content);
            this.formDatas.append('sourceType',this.form1.sourceType);
            this.formDatas.append('author',this.form1.author);
            this.formDatas.append('articleType',this.form1.articleType);
            this.formDatas.append('classifyType',this.form1.classifyType);
            this.formDatas.append('userId',this.form1.userId);
            this.formDatas.append('coverNum',this.form1.coverNum);
            this.formDatas.append('imgType',this.form1.imgType);
            this.formDatas.append('columnId',this.form1.columnId);
            this.formDatas.append('tagLabels',this.form1.tagLabels.replace(/，/ig,','));
            // param.append('keyWords',this.form1.keyWords.replace(/，/ig,','));
            this.formDatas.append('publishSource','1');
            this.formDatas.append('status',status);
            if(this.editStatus == 1){
              let imgIds = [];
              console.log(this.fileList);
              this.fileList.map(item => {
                if(item.coverImgId){imgIds.push(item.coverImgId);}
              });
              if(this.form1.imgType == '1'&& this.hasChangeFile){
                this.$refs.upload.submit();
              }
              console.log(imgIds);
              this.formDatas.append('imgIds',imgIds);

              // return;
              
            }
            if(this.videoId){
              this.formDatas.append('videoId',this.videoId);
              this.formDatas.append('videoUrl',this.showUrl);
            }
            if(this.form1.sourceType=='2'){
              this.formDatas.append('source',this.form1.source)
            }
            const loading = this.$loading({
              lock: true,
              text: '上传中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
            });
            this.$post('news/edit',this.formDatas).then(res =>{
              if(res.code == 0){
                loading.close();
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
              
                setTimeout(() => {
                  this.$router.push({
                    name: 'news',
                    params: {
                      argu: this.argu
                    }
                  });
                }, 1000);
              }else{
                loading.close();
                this.$message({
                  message: res.msg?res.msg:'操作失败',
                  type: 'error'
                });
              }
            });
						
          } else {
            console.log('error submit!!');
            return false;
          }
        });
				
			},
			// 获取新闻详情
			showNews(){
				var params = {
					tokenId:this.$store.state.user.tokenId,
					id:this.idDetail
				}
				this.$get('news/show',params).then(res => {
          // console.log(res.data[0]);
					this.form1 = res.data[0];
          // console.log(this.form1);
          
          this.showUrl = this.form1.videoUrl;
          if(this.form1.videoId){
            this.videoId=this.form1.videoId;
            this.showUrl=this.form1.videoUrl;
            this.fileListVideo.push({name:this.form1.videoName,url:this.form1.videoUrl});
          }
					this.imgSrc = this.form1.coverImgId;
					this.status = this.form1.status;
					this.imgFullSrc = this.form1.coverImgUrl;
					// console.log(this.imgFullSrc)
          // this.fileList.push({url:this.imgFullSrc});
          this.form1.newsImgList.map(item => {
            this.fileList.push({url:item.coverImgUrl,coverImgId:item.coverImgId});
          })

				});
			},
			getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams;
				this.idDetail = routerParams;
      },
			// 富文本图片上传
			uploadImg(file,insert){
				console.log(file)
				let params = new FormData(); // 创建form对象
				params.append('file',file,file.name);
				// params.append('name',file.name);
				console.log(file.name)
				
				this.$post('images/upload',params).then(res => {
					let url =  res.data[0].showUrl;
					// console.log(url)
					insert(url, 'center')
					console.log(res);
				})
			},
			test(){
				console.log(this.form1.source);
      },
      // 获取富文本的内容
			onEditorBlur({
				quill,
				html,
				text
			}) {},
			// 获取富文本的内容
			onEditorBlur(quill) {
        // console.log( quill);
        // this.form1.content = quill.container.innerHTML;
				// console.log(this.form1.content);
			},
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({
				val
			}) {
				console.log('editor change!', val);
				//					this.content = html;
			},
      handleExceed(files, fileList){
        this.$message.warning('当前限制选择 1 个文件');
      },
			
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitUpload() {
        this.$refs.uploadVideo.submit();
      },
      handleRemove2(file, fileList) {
        this.showUrl ='';
        this.videoId='';
      },
      handleSuccess(res,file){
        console.log(res.data[1]);
        this.showUrl = res.data[1];
        this.videoId = res.data[0];
        console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      fanhui(){
        this.$confirm('返回已编辑内容将重置是否继续？')
          .then(_ => {
             
             this.$router.push({
              name: 'news',
              params: {
                argu: this.argu
              }
            });
            done();
          })
          .catch(_ => {});
      }
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = false;
      next();
    },
		watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
	}
</script>
<style type="text/css">
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
.imgs {
		width: 200px;
		height: 200px;
		display: block;
	}
	.news_edit .el-dialog--center .el-dialog__body{
		padding: 0;
	}
</style>
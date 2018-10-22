<template>
	<div class="page-body" style="min-width:980px;">
    <el-dialog center width="375px"  :visible.sync="showNews" append-to-body id='div1'>
			<el-form :data="form1"  ref="form1" label-width="110px" class="form1">
				<p id="p1" >{{form1.title }}</p>
				<p id="p2" v-html="form1.content"></p>
			</el-form>
		</el-dialog>
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>发布内容</el-breadcrumb-item>
				<el-breadcrumb-item>发布新闻资讯</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<div class="box" >
			<div class="text-right marR100">
				<el-button size="small" @click="fanhui" class="light_btn">返回</el-button>
        <el-button size="small" class="light_btn" @click="showNews = true;" >预览</el-button>
				<el-button size="small" class="light_btn"  @click="creatNews('form1',0)">仅保存</el-button>
				<el-button size="small" class="light_btn"  @click="creatNews('form1','1')">保存并提交审核</el-button>
			</div>
			<el-form ref="form1" :model="form1" label-width="84px" :rules="rules1" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title" >
						<el-input type="textarea" autosize v-model="form1.title" placeholder="请输入标题" style="width:420px;"></el-input>
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
					<el-form-item label="发布到:">
						<el-input :disabled="true" v-model="form1.column"></el-input>
					</el-form-item>
          <el-row>
            <el-col :span="14">
              <el-form-item label="来源:" prop="sourceType">
                <el-radio-group v-model="form1.sourceType" @change="test()">
                  <el-radio label="1" >原创</el-radio>
                  <el-radio label="2" >转载</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item v-if="form1.sourceType == 2" prop="source" class="source_style">
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
          <el-form-item label="所属分类:" prop="classifyType">
            <el-select filterable v-model="form1.classifyType" name="classifyType" placeholder="请选择">
              <el-option
                v-for="item in classifyTypeAll"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
					<el-form-item class="fabuStyle" label="发布账号:" prop="userId">
						<el-select filterable v-model="form1.userId" placeholder="请选择发布账号">
							<el-option 
                v-for="item in accounts"
                :key="item.userId"
                :label="item.nickName"
                :value="item.userId"
              ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="附加选项:" prop="imgType">
							<el-radio-group v-model="form1.imgType" @change="radioChange">
								<el-radio label="1">上传缩略图</el-radio>
								<el-radio label="2">提取第一个图为缩略图</el-radio>
							</el-radio-group>
					</el-form-item>
					<el-form-item label="封面图:" prop="icon" ref="icon" v-show="form1.imgType == '1'">
						<el-upload
							action="" :multiple="false" :limit='1'
							ref="upload" name="newsFile" :file-list="fileList"
							list-type="picture-card" :auto-upload="false"
							:on-change="fileChange" :on-exceed="handleExceed"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible" width="30%">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
          <!-- accept='video/mp4' -->
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
						<el-input placeholder="用'，'隔开，单个标签小于12字节" v-model="form1.tagLabels"></el-input>
					</el-form-item>
					<!-- <el-form-item label="关键词:">
						<el-input placeholder="用英文 “ , ” 隔开" v-model="form1.keyWords"></el-input>
					</el-form-item> -->
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
			return{
        accounts:[],
        fileList:[],
        fileListVideo:[],
        showNews:false,
				pkg:'',
      quill: {
        width: 420,
				border: true,
				height:150,
				zIndex:101,
        content: 'wellcome ~',
        syncOutput: true,
        theme: 'snow', //bubble snow
        disabled: false,
        full: false,
        toolbar: [
          // [{'size': ['small', false, 'large', 'huge']}],
          ['bold', 'italic', 'underline', 'strike', 'link', {'header': [1, 2, 3, 4, 5, 6, false]}],
          // [{ 'header': 1 }, { 'header': 2 }],
          // [{'header': [1, 2, 3, 4, 5, 6, false]}],
          ['blockquote', 'code-block'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          // [{ 'direction': 'rtl' }],
          [{'color': []}, {'background': []}],
          // [{align: []}],
          [{ 'align': [false, 'right', 'center', 'justify'] }],
          // [{align: ''}, {align: 'right'}, {align: 'center'}, {align: 'justify'}],
          ['image', 'video'],
          // ['clean']
        ]
      },
				uploadData:{},
				baceUrl:'',
				// content:'111',
				editorOption:{},
				dialogImageUrl: '',
        dialogVisible: false,
				form1: {
					title: '',
					content:'',
					column:'新闻资讯',
          sourceType:'1',
          classifyType:'',
					source:'',
					author:'',
					userId:'',
					imgType:'1',
					newsFile:'',
					tagLabels:'',
					keyWords:''
				},
				cities:[],
        hasFmt:false,
        showUrl:'',
        argu:{},
        videoUrl:'',
        classifyTypeAll:'',
        videoId:"",
				rules1: {
          icon:[
            {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
          ],
         /*  classifyType:[
            { required: true, message: '请选择所属分类', trigger: 'blur' },
          ], */
          title: [
            {required:true, validator: myVali.checkTitle, trigger: 'blur' }  // 图片验证
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            {pattern:/[0-9\u4e00-\u9fa5]+/g,message:'内容必须有中文或者数字',trigger:'blur'}
          ],
          sourceType: [
            { required: true, message: '请选择来源', trigger: 'change'}
          ],
          source:[
            {required: true, message: '请选择转载来源', trigger: 'change' }
          ],
          classifyType:[
            { required: true, message: '请选择来源', trigger: 'change'}
          ],
          userId: [
            {required: true, message: '请选择发布账号', trigger: 'change' }
          ],
          imgType: [
            {required: true, message: '请选择封面图类型', trigger: 'change' }
					],
					coverImg:[
						{required: true, message: '请上传图片', trigger: 'change' }
					],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
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
      this.$get('/industryCategory/findIndustryCategoryList',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.classifyTypeAll = res.data
    	});
      // console.log(this.$route.params);
			this.argu=this.$route.params.argu;
		},
		mounted() {
			this.$get('reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.cities = res.data
      });
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        // console.log(res)
        this.accounts = res.data;
      })
		},
		methods:{
      radioChange(val){
        console.log(val)
        if(val == '2'){
          this.hasFmt = true;
        }else{
          if(!this.fileList){
            this.hasFmt=false;
          }
        }
      },
			// 富文本图片上传
			uploadImg(file,insert){
				console.log(file)
				let params = new FormData(); // 创建form对象
				params.append('file',file,file.name);
				// params.append('name',file.name);
				// console.log(file.name)
				this.$post('images/upload',params).then(res => {
					let url = res.data[0].showUrl;
					console.log(insert);
					insert(url, 'center');
					// console.log(res);
				})
      },
      videoChange(file,filelist){
        console.log(file,filelist);
        let params = new FormData(); // 创建form对象
        params.append('file',file,file.name);
        this.$post('images/upload',params).then(res => {
					console.log(res);
				})
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
			getFullUrl(){
				return (this.baceUrl+'/news/add')
			},
			// 新建新闻
			creatNews(formName,status){
				this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
						// console.log(valid)
						/* if(this.form1.sourceType == '2' && !this.form1.source){ // 选择转载时候,需要选择转载来源 (待)
							this.$message.error('请选择转载来源!');
							return;
						} */
						if(this.form1.imgType == 2){	// 封面图的类型 
              var reg =  /http:\/\/.*?(gif|png|jpg|jpeg)/gi;
							if(!this.form1.content.match(reg)){
                 this.$message.error('内容里没有图片!');
                 return;
              }
						}
            let param = new FormData();
            param.append('tokenId',this.$store.state.user.tokenId);
            param.append('title',this.form1.title);  
            param.append('content',this.form1.content);
            param.append('sourceType',this.form1.sourceType);
            param.append('author',this.form1.author);
            param.append('userId',this.form1.userId);
            param.append('imgType',this.form1.imgType);
            param.append('articleType','1');
            param.append('classifyType',this.form1.classifyType);
            param.append('tagLabels',this.form1.tagLabels.replace(/，/ig,','));
            // param.append('keyWords',this.form1.keyWords.replace(/，/ig,','));
            param.append('publishSource','1');
            param.append('status',status);
            if(this.form1.imgType == '1'){
              param.append('newsFile',this.form1.newsFile,this.form1.filename);
            }
            if(this.form1.sourceType=='2'){
              param.append('source',this.form1.source)
            }
            if(this.videoId){
              param.append('videoId',this.videoId);
              param.append('videoUrl',this.showUrl);
            }
            console.log(this.form1.newsFile)
            this.$post('news/add',param).then(res =>{
                if(res.code == 0){
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
                }
              })
						
          } else {
            console.log('error submit!!');
            return false;
          }
        });
				
			},
			test(){
				console.log(this.form1.source);
      },
			//图片的验证
			fileChange(file,fileList){
        this.$refs['icon'].clearValidate(); // 图片验证
        this.form1.filename = file.name;
        this.form1.newsFile = file.raw;
				// console.log(file)
				if(fileList.length>0){
					this.hasFmt = true;
				}
			},
			// 获取富文本的内容
			onEditorBlur({quill, html,text}) {
				// console.log('editor blur!', quill, html, text)
				console.log(this.form1.content)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange(val) {
        console.log('editor change!', val)
				// this.content = html
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
				if(fileList.length == 0){
					this.hasFmt =false;
				}
      },
      handleExceed(files, fileList){
        this.$message.warning('当前限制选择 1 个文件');
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
              name: 'news',
              params: {
                argu: this.argu
              }
            });

            // this.$router.back();
            done();
          })
          .catch(_ => {});
      }
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
  
</style>
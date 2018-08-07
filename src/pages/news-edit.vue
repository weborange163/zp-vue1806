<template>
	<div class="page-body news_lookes" style="min-width:980px;">
		<el-dialog center width="375px"  :visible.sync="bannerDialog" append-to-body id='div1'>
			<el-form :data="form1" :model="form1" ref="form1" label-width="110px" class="form1">
				<p id="p1" >{{form1.title }}</p>
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
			<div class="text-right">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" @click="bannerDialog = true;" >预览</el-button>
				<el-button size="small" class="light_btn" @click="editNews('form1',0)">保存</el-button>
			</div>
			<el-form ref="form1" :model="form1" label-width="80px" :rules="rules1" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title" >
						<el-input v-model="form1.title"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor">
						<m-quill-editor ref="myQuillEditor" v-model="form1.content"
						:width="quill.width" :getContent="onEditorChange"
						:has-border="quill.border" :zIndex="quill.zIndex"
						:sync-output="quill.syncOutput"
						:theme="quill.theme"
						:disabled="quill.disabled"
						:fullscreen="quill.full"
						@upload="uploadImg" @change="onEditorBlur($event)"
						></m-quill-editor>
					</el-form-item>
					<!-- <div id="test" class="ql-editor"></div> -->
				</div>
				<div style="width: 35%;float:left;padding:15px;">
					<el-form-item label="发布到:">
						<el-input v-model="type" disabled></el-input>
					</el-form-item>
					<el-form-item label="来源:" prop="sourceType">
						<el-radio-group v-model="form1.sourceType" @change="test()">
							<el-radio label="1">原创</el-radio>
							<el-radio label="2">转载</el-radio>
						</el-radio-group>
						<el-select v-if="form1.sourceType == 2" v-model="form1.source" placeholder="请选择来源" style="margin-left:20px;width:140px;">
							<el-option
								v-for="item in cities"
								:key="item.id"
								:label="item.name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="作者:">
						<el-input v-model="form1.author"></el-input>
					</el-form-item>
					<el-form-item label="发布账号:" prop="userId" label-width="82">
						<el-select v-model="form1.userId">
							<el-option label="小号1" value="shanghai"></el-option>
							<el-option label="小号2" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="附加选项:" prop="imgType" label-width="82">
							<el-radio-group v-model="form1.imgType">
								<el-radio label="1">上传缩略图</el-radio>
								<el-radio label="2">提取第一个图为缩略图</el-radio>
							</el-radio-group>
					</el-form-item>
					<el-form-item v-if="form1.imgType=='1'">
						<el-upload
							:action="getFullUrl()" :data="uploadData" :multiple="false" :limit='1'
							ref="upload" name="newsFile"
							list-type="picture-card"
							:auto-upload="false"
							:file-list="fileList"
							:file-change="fileChange"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="Tag标签:">
						<el-input  v-model="form1.tagLabels" ></el-input>
					</el-form-item>
					<el-form-item label="关键词:">
						<el-input  v-model="form1.tagLabels" ></el-input>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script>
//import MQuillEditor from 'm-quill-editor'
import { getBaceUrl } from '@/utils/auth'
import axios from 'axios'
	export default{
		components: {
		//	MQuillEditor
		},
		data(){
			return{
				fileList:[],	// 预览图片
				imgFullSrc:'',
				imgSrc:'',
				form1: {
					title: '',
					content:'',
					column:'新闻资讯',
					sourceType:'1',
					source:'',
					status:'',
					author:'',
					userId:'1',
					imgType:'1',
					newsFile:'',
					tagLabels:'',
					keyWords:'',
					coverImgId:''
				},
				type:'新闻',
				pkg:'',
      quill: {
        width: 420,
				border: true,
				height:150,
        content: 'wellcome ~',
        syncOutput: false,
        theme: 'snow', //bubble snow
        disabled: false,
        full: false,
        toolbar: [
          [{ 'header': 1 }, { 'header': 2 }],
          ['bold', 'italic', 'underline', 'strike', 'link']
        ]
      },
      bannerDialog: false,
			idDetail:'',
			hasFmt:false,
				uploadData:{},
				baceUrl:'',
				// content:'111',
				editorOption:{},
				dialogImageUrl: '',
        dialogVisible: false,
				cities:[],
				rules1: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 45, message: '长度在 3 到 45 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'change' }
          ],
          sourceType: [
            { required: true, message: '请选择来源', trigger: 'change'}
          ],
          userId: [
            {required: true, message: '请选择发布账号', trigger: 'change' }
          ],
          imgType: [
            {required: true, message: '请选择图片', trigger: 'change' }
          ],
          source: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        }
			}
		},
		created(){
			this.baceUrl = getBaceUrl();
			this.getParams();
			this.showNews();
			// console.log(this.baceUrl)
		},
		mounted() {
			this.$get('reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		console.log(res.data)
    		this.cities = res.data
    	})
		//	var test =  document.getElementById('test');
			//test.innerHTML=this.form1.content;
		},
		methods:{
			//图片的验证
			fileChange(file,fileList){
				this.form1.newsFile = file.raw;
				console.log(fileList.length)
				if(fileList.length>0){
					this.hasFmt = true;
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
							if(!!this.form1.content.match(reg)){
								var params ={
									tokenId:this.$store.state.user.tokenId,
									status:status,
									id:this.idDetail,
									title: this.form1.title,
									content: this.form1.content,
									sourceType:this.form1.sourceType,
									source:this.form1.source,
									author:this.form1.author,
									userId:this.form1.userId,
									imgType:this.form1.imgType,
									tagLabels:this.form1.tagLabels,
									keyWords:this.form1.keyWords,
									publishSource:"1"
								}
								this.$post('news/edit',params).then(res =>{
									if(res.code == 0){
										setTimeout(() => {
											this.$router.push({name: 'news'});
										}, 1000);
									}
								})
							}else{
								 this.$message.error('内容里没有图片!');
							}
						}else{
							if(!this.hasFmt){
								this.$message.error('请上传封面图!');
								return;
							}
							this.uploadData={
								tokenId:this.$store.state.user.tokenId,
								id:this.idDetail,
								// newsFile:this.form1.newsFile,
								status:status,
								title: this.form1.title,
								content: this.form1.content,
								sourceType:this.form1.sourceType,
								editStatus:'1',
								source:this.form1.source,
								articleId:this.form1.articleId,
								author:this.form1.author,
								userId:this.form1.userId,
								imgType:this.form1.imgType,
								tagLabels:this.form1.tagLabels,
								keyWords:this.form1.keyWords,
								publishSource:"1"
							}
							// this.uploadData = params;
							console.log(this.uploadData)
							setTimeout(() => {
								this.$refs.upload.submit();
								this.$message({
									type: 'success',
									message: '添加成功!'
								});
								setTimeout(() => {
									this.$router.push({name: 'news'});
								}, 1000);
							}, 0);
						}
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
					this.form1 = res.data[0];
					console.log(this.form1)
					this.imgSrc = this.form1.coverImgId;
					this.status = this.form1.status;
					this.imgFullSrc = this.baceUrl + this.imgSrc;
					console.log(this.imgFullSrc)
					this.fileList.push({url:this.imgFullSrc})
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
					let url = this.baceUrl + res.data[0].showUrl;
					// console.log(url)
					insert(url, 'center')
					console.log(res);
				})
			},
			getFullUrl(){
				return (this.baceUrl+'/news/edit')
			},
			test(){
				console.log(this.form1.source);
			},
			// 获取富文本的内容
			onEditorBlur(t) {
				this.form1.content =  t.container.innerHTML;
				console.log(t)
				console.log(t.container.innerHTML)
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
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
			}
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
		height: 550px;
		overflow-y: auto;
	}
.imgs {
		width: 200px;
		height: 200px;
		display: block;
	}
	#p1{
		text-align: center;
		font-size: 20px;
	}
	#p2{
		 margin: 0 auto; height: 500px;margin-top: 2px;text-indent:2em; overflow-y: auto !important;
	}
	#p2 img{
		display: block;
		margin: 0 auto;
		width: 320px !important;
		
	}
	.el-dialog--center .el-dialog__body{
		padding: 0 !important;
	}
</style>
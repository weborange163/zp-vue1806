<template>
	<div class="page-body" style="min-width:980px;">
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>行业信息</el-breadcrumb-item>
				<el-breadcrumb-item>发布新闻资讯</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<div class="box" >
			<div class="text-right">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn"  @click="creatNews('form1',0)">仅保存</el-button>
				<el-button size="small" class="light_btn"  @click="creatNews('form1',1)">保存并提交审核</el-button>
			</div>
			<el-form ref="form1" :model="form1" label-width="80px" :rules="rules1" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title" >
						<el-input v-model="form1.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor">
						<!-- <quill-editor v-model="form1.content"
							ref="myQuillEditor"
							:options="editorOption"
							@blur="onEditorBlur($event)"
							@focus="onEditorFocus($event)"
							@ready="onEditorReady($event)">
						</quill-editor> -->
						<m-quill-editor ref="myQuillEditor" v-model="form1.content"
						:width="quill.width" :getContent="onEditorChange"
						:has-border="quill.border" :zIndex="quill.zIndex"
						:sync-output="quill.syncOutput"
						:theme="quill.theme"
						:disabled="quill.disabled"
						:fullscreen="quill.full"
						@upload="uploadImg" @blur="onEditorBlur($event)"
						></m-quill-editor>
					</el-form-item>
				</div>
				<div style="width: 35%;float:left;padding:15px;">
					<el-form-item label="发布到:">
						<el-input :disabled="true" v-model="form1.column"></el-input>
					</el-form-item>
					<el-form-item label="来源:" prop="sourceType">
						<el-radio-group v-model="form1.sourceType" @change="test()">
							<el-radio label="1" >原创</el-radio>
							<el-radio label="2" >转载</el-radio>
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
						<el-select v-model="form1.userId" placeholder="请选择发布账号">
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
					<el-form-item label="封面图:" prop="">
						<el-upload
							:action="getFullUrl()" :data="uploadData" :multiple="false" :limit='1'
							ref="upload" name="newsFile"
							list-type="picture-card"
							:auto-upload="false"
							:on-change="valiImg"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="Tag标签:">
						<el-input placeholder="用逗号隔开，单个标签少于12字节" v-model="form1.tagLabels"></el-input>
					</el-form-item>
					<el-form-item label="关键词:">
						<el-input placeholder="用英文 “ , ” 隔开" v-model="form1.keyWords"></el-input>
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
				pkg:'',
      quill: {
        width: 420,
				border: true,
				height:150,
				zIndex:1,
        content: 'wellcome ~',
        syncOutput: true,
        theme: 'snow', //bubble snow
        disabled: false,
        full: false,
        toolbar: [
          [{ 'header': 1 }, { 'header': 2 }],
          ['bold', 'italic', 'underline', 'strike', 'link']
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
					source:'',
					author:'',
					userId:'1',
					imgType:'1',
					newsFile:'',
					tagLabels:'',
					keyWords:''
				},
				cities:[],
				rules1: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
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
					coverImg:[
						{required: true, message: '请上传图片', trigger: 'change' }
					],
          source: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
			}
		},
		created(){
			this.baceUrl = getBaceUrl();
			// console.log(this.baceUrl)
		},
		mounted() {
			this.$get('reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		console.log(res.data)
    		this.cities = res.data
    	})
		},
		methods:{
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
				return (this.baceUrl+'/news/add')
			},
			// 新建新闻
			creatNews(formName,status){
				this.$refs[formName].validate((valid) => {
          if (valid) {
						console.log(valid)
						if(this.form1.sourceType == '2' && !this.form1.source){ // 选择转载时候,需要选择转载来源 (待)

						}
            this.uploadData={
							tokenId:this.$store.state.user.tokenId,
							// newsFile:this.form1.newsFile,
							status:status,
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
						
					// console.log(params)
					/* this.$post('news/add',params).then(res =>{
						if(res.code == 0){
							console.log(1111111,res)
						}
					}) */
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
			valiImg(){
				// this.$refs.upload.validate(valid => {

				// })
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
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
			}
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
		height: 550px;
		overflow-y: auto;
	}
</style>
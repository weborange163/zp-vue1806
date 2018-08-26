<template>
	<div class="page-body" style="min-width:980px;">
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>新闻信息</el-breadcrumb-item>
				<el-breadcrumb-item>审核新闻资讯</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-dialog title="审核页面" :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="form" label-width="80px">
				<el-form-item label="审核原因" :label-width="formLabelWidth">
					<el-select size="mini" v-model="form.region" placeholder="请选择区域" style="width:100%">
						<el-option label="您发布的内容涉嫌敏感内容" value="您发布的内容涉嫌敏感内容"></el-option>
						<el-option label="您发布的内容排版、错字过于混乱" value="您发布的内容排版、错字过于混乱"></el-option>
						<el-option label="您发布的内容无具体信息，或信息无意义" value="您发布的内容无具体信息，或信息无意义"></el-option>
						<el-option label="您发布的内容不符合栏目属性" value="您发布的内容不符合栏目属性"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核信息" :label-width="formLabelWidth">
					<el-input size="mini" type="textarea" v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="toAudit('3')">确 定</el-button>
			</div>
		</el-dialog>

		<div class="box">
			<div class="text-right">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" @click="dialogFormVisible = true">不通过</el-button>
				<el-button size="small" class="light_btn" @click="toAudit('4')">通过</el-button>
			</div>
			<el-form ref="form1" :model="form1" label-width="80px" :rules="rules1" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title">
						<el-input :disabled="true" v-model="form1.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor">
						<m-quill-editor ref="myQuillEditor" v-model="form1.content" :width="quill.width" :getContent="onEditorChange" :has-border="quill.border" :zIndex="quill.zIndex" :sync-output="quill.syncOutput" :theme="quill.theme" :disabled="quill.disabled" :fullscreen="quill.full" @upload="uploadImg" @blur="onEditorBlur($event)"></m-quill-editor>
					</el-form-item>
				</div>
				<div style="width: 35%;float:left;padding:15px;">
					<el-form-item label="发布到:">
						<el-input :disabled="true" v-model="column"></el-input>
					</el-form-item>
					<el-form-item label="来源:" prop="sourceType">
						<el-radio-group :disabled="true" v-model="form1.sourceType" @change="test()">
							<el-radio label="1">原创</el-radio>
							<el-radio label="2">转载</el-radio>
						</el-radio-group>
						<el-select v-if="form1.sourceType == 2" :disabled="true" v-model="form1.source" placeholder="请选择来源" style="margin-left:20px;width:140px;">
							<el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="作者:">
						<el-input :disabled="true" v-model="form1.author"></el-input>
					</el-form-item>
					<el-form-item label="发布账号:" v-if="form1.publishSource!='3'" prop="userId" label-width="82">
						<el-select :disabled="true" v-model="form1.userId" placeholder="请选择发布账号">
							<el-option 
                v-for="item in accounts"
                :key="item.userId"
                :label="item.nickName"
                :value="item.userId"
              ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="附加选项:" prop="imgType" label-width="82">
						<el-radio-group :disabled="true" v-model="form1.imgType">
							<el-radio label="1">上传缩略图</el-radio>
							<el-radio label="2">提取第一个图为缩略图</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="封面图" required v-if="form1.imgType == 1">
						<img class="imgs" :src="imgFullSrc" alt="封面图展示">
					</el-form-item>
					<el-form-item label="Tag标签:">
						<el-input :disabled="true" placeholder="用逗号隔开，单个标签少于12字节" v-model="form1.tagLabels"></el-input>
					</el-form-item>
					<el-form-item label="关键词:">
						<el-input :disabled="true" placeholder="用英文 “ , ” 隔开" v-model="form1.keyWords"></el-input>
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
	export default {
		components: {
			//	MQuillEditor
		},
		data() {
			return {
				pkg: '',
				quill: {
					width: 420,
					border: true,
					height: 150,
					content: 'wellcome ~',
					syncOutput: true,
					theme: 'snow', //bubble snow
					disabled: false,
					full: false,
					toolbar: [
						[{
							'header': 1
						}, {
							'header': 2
						}],
						['bold', 'italic', 'underline', 'strike', 'link']
					]
				},
				uploadData: {},
				baceUrl: '',
				column: '新闻资讯',
				// content:'111',
				editorOption: {},
				dialogImageUrl: '',
				dialogVisible: false,
				form1: {
					title: '',
					content: '',
					column: '新闻资讯',
					sourceType: '1',
					source: '',
					author: '',
					userId: '1',
					imgType: '1',
					newsFile: '',
					tagLabels: '',
					keyWords: ''
				},
				cities: [],
				idDetail:'',
				imgSrc:'',
				imgFullSrc:'',
				fileList:[],
				//弹框
				dialogTableVisible: false,
        dialogFormVisible: false,
        accounts:'',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px',
				rules1: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
					],
					content: [{
						required: true,
						message: '请输入内容',
						trigger: 'change'
					}],
					sourceType: [{
						required: true,
						message: '请选择来源',
						trigger: 'change'
					}],
					userId: [{
						required: true,
						message: '请选择发布账号',
						trigger: 'change'
					}],
					imgType: [{
						required: true,
						message: '请选择图片',
						trigger: 'change'
					}],
					source: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.baceUrl = getBaceUrl();
			this.getParams();
			this.showNews();
			// console.log(this.baceUrl)
			
		},
		mounted() {
			this.$get('reprintSth/findAll', {
				tokenId: this.$store.state.user.tokenId
			}).then(res => {
				console.log(res.data)
				this.cities = res.data
      });
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        console.log(res)
        this.accounts = res.data;
      })
		//	document.getElementById('test').innerHTML(this.form1.content)
		},
		methods: {
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
					// console.log(this.imgFullSrc)
					// this.fileList.push({url:this.imgFullSrc})
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
			uploadImg(file, insert) {
				console.log(file)
				let params = new FormData(); // 创建form对象
				params.append('file', file, file.name);
				// params.append('name',file.name);
				console.log(file.name)

				this.$post('images/upload', params).then(res => {
					let url = this.baceUrl + res.data[0].showUrl;
					// console.log(url)
					insert(url, 'center')
					console.log(res);
				})
			},
			getFullUrl() {
				return(this.baceUrl + '/news/add')
			},
			//不通过
			toAudit(num) {
				var params = {
					ids: this.$route.params.id,
					tokenId: this.$store.state.user.tokenId,
					status: num,
					checkReason: this.form.region,
					checkMessage: this.form.name
				};
				this.$post('/news/check', params).then(res => {
					if(res.code === 0) {
						console.log(1111111, res);
					}
					setTimeout(() => {
						this.$router.push({
							name: 'audit-news'
						});
					}, 1000);
				});
			},

			// 新建新闻
			creatNews(formName, status) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(valid)
						if(this.form1.sourceType == '2' && !this.form1.source) { // 选择转载时候,需要选择转载来源 (待)

						}
						this.uploadData = {
							tokenId: this.$store.state.user.tokenId,
							// newsFile:this.form1.newsFile,
							status: status,
							title: this.form1.title,
							content: 'this.form1.content',
							sourceType: this.form1.sourceType,
							source: this.form1.source,
							author: this.form1.author,
							userId: this.form1.userId,
							imgType: this.form1.imgType,
							tagLabel: this.form1.tagLabel,
							keyWords: this.form1.keyWords,
							publishSource: "1"
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
								this.$router.push({
									name: 'news'
								});
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
			test() {
				console.log(this.form1.source);
			},
			// 获取富文本的内容
			onEditorBlur({
				quill,
				html,
				text
			}) {
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
		},
		watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
	}
</script>
<style type="text/css">
	.quill-editor .ql-toolbar.ql-snow {
		height: 60px;
	}
	
	.editor .el-form-item__content {
		line-height: 20px;
	}
	
	.up_form .el-input__inner {
		height: 30px;
		line-height: 30px;
		max-width: 300px;
	}
	
	.up_form .quill-editor .ql-container {
		min-height: 550px;
		overflow-y: auto;
	}
</style>
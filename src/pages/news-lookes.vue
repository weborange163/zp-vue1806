<template>
	<div class="page-body news_lookes" style="min-width:980px;">
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>行业信息</el-breadcrumb-item>
				<el-breadcrumb-item>查看新闻资讯</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<div class="box" >
			<div class="text-right">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" >预览</el-button>
				<el-button size="small" v-if="status == '0'" class="light_btn" @click="toAudit()">提交审核</el-button>
				<el-button size="small" class="light_btn" v-if="status == '5'" @click="onOff('4','上线')">上线</el-button>
				<el-button size="small" class="light_btn" v-if="status == '4'" @click="onOff('5','下线')">下线</el-button>
			</div>
			<el-form ref="form1" :model="form1" label-width="80px" :rules="rules1" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title" >
						<el-input v-model="form1.title" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor">
						
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
					<!-- <div id="test" class="ql-editor"></div> -->
				</div>
				<div style="width: 35%;float:left;padding:15px;">
					<el-form-item label="发布到:">
						<el-input :disabled="true" v-model="type"></el-input>
					</el-form-item>
					<el-form-item label="来源:" prop="sourceType">
						<el-radio-group v-model="form1.sourceType" @change="test()">
							<el-radio label="1" disabled>原创</el-radio>
							<el-radio label="2" disabled>转载</el-radio>
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
						<el-input v-model="form1.author" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="发布账号:" prop="userId" label-width="82">
						<el-select v-model="form1.userId" disabled>
							<el-option label="小号1" value="shanghai"></el-option>
							<el-option label="小号2" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="附加选项:" prop="sourceType" label-width="82">
							<el-radio-group v-model="form1.sourceType">
								<el-radio label="1" disabled>上传缩略图</el-radio>
								<el-radio label="2" disabled>提取第一个图为缩略图</el-radio>
							</el-radio-group>
					</el-form-item>
					<el-form-item label="封面图">
						<img class="imgs" :src="imgFullSrc" alt="封面图展示">
					</el-form-item>
					<el-form-item label="Tag标签:">
						<el-input  v-model="form1.tagLabels" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="关键词:">
						<el-input  v-model="form1.keyWords" :disabled="true"></el-input>
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
				type:'新闻',
				imgFullSrc:'',
				imgSrc:'',
				pkg:'',
      quill: {
        width: 420,
				border: true,
				height:150,
				zIndex:1,
        content: 'wellcome ~',
        syncOutput: false,
        theme: 'snow', //bubble snow
        disabled: true,
        full: false,
        toolbar: [
          [{ 'header': 1 }, { 'header': 2 }],
          ['bold', 'italic', 'underline', 'strike', 'link']
        ]
      },
				uploadData:{},
				baceUrl:'',
				status:'',
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
					status:'',
					author:'',
					userId:'1',
					imgType:'1',
					newsFile:'',
					tagLabels:'',
					keyWords:'',
					coverImgId:''
				},
				idDetail:'',
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
			this.getParams();
			console.log(this.idDetail)
			this.showNews();
			// this.getImgUrl();
		},
		mounted() {
			
		//	var test =  document.getElementById('test');
			//test.innerHTML=this.form1.content;
		},
		methods:{
			//上下线操作
			onOff(status,type){
				this.$confirm(`确定要${type}该新闻吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						status:status,
						id:this.form1.id
					}
					this.$post('news/isOnline',params).then(res => {
						// console.log(res)
						setTimeout(() => {
								this.$router.push({name: 'news'});
							}, 1000);
						this.$message({
							type: 'success',
							message: res.msg
						});
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: res.msg
          });          
        });
			},
			//提交审核
			toAudit(){
				this.$confirm('确认要提交审核吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						ids:this.form1.id,
					}
					console.log(params)
					this.$post('news/batchWaitCheck',params).then(res =>{
						// console.log(res);
						setTimeout(() => {
								this.$router.push({name: 'news'});
							}, 1000);
						this.$message({
							type: 'success',
							message: res.msg
						});
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: res.msg
          });          
        });
			},
			//获取封面图路径
			getImgUrl(){
				this.imgFullSrc = this.baceUrl + this.imgSrc;
				console.log(this.imgSrc)
				console.log(this.imgFullSrc)
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
				});
			},
			getParams () {
        // 取到路由带过来的参数 
				let routerParams = this.$route.params.rowInfo
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams
				this.idDetail = routerParams.id
				// console.log(this.idDetail)
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
				return (this.baceUrl+'/news/add')
			},
			test(){
				console.log(this.form1.source);
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
	.imgs{
		width: 300px;
		height: 30px;
	}
</style>
<template>
	<div class="page-body">
		<el-dialog  center width="375px"  :visible.sync="bannerDialog" append-to-body >
			<el-form id='div1'  :data="form2"  ref="form2" label-width="110px" class="form2">
				<p id="p1" >{{form2.title }}</p>
				<p id="p2"  v-html="form2.content"></p>
			</el-form>
		</el-dialog>
		
		
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>行业信息</el-breadcrumb-item>
				<el-breadcrumb-item>添加行情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="box">
			<div class="text-right">
				<el-button size="small" @click="fanhui" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" @click="bannerDialog = true;">预览</el-button>
				<el-button size="small" class="light_btn" type="text" v-if="status=='6'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag2()">上线</el-button>
				<!-- <el-button size="small" class="light_btn" type="text" v-if="status=='5'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1()">下线</el-button> -->
				<el-button size="small" class="light_btn" type="text" v-if="status=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp2()">提交审核</el-button>

				<!--<el-button size="small" class="light_btn" @click="toAudit('form2',1)">仅保存</el-button>
                <el-button size="small" class="light_btn" @click="toAudit('form2',2)">保存并提交审核</el-button>-->
			</div>
			<el-form ref="form2" :model="form2" label-width="80px" class="up_form">
				<div style="width: 35%;float: left;padding:15px;margin-left:5%;margin-right:10%;">
					<el-form-item label="文章标题" prop="title">
						<el-input :disabled="true" v-model="form2.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor">
						
						<m-quill-editor ref="myQuillEditor" v-model="form2.content"
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
						<el-input :disabled="true" v-model="classifyTypes"></el-input>
					</el-form-item>
					<el-form-item label="所属分类" prop="userId" label-width="82" >
					<el-select v-model="value" name="classifyType" placeholder="请选择"  style='padding-left: 6px;' :disabled="true">
						<el-option v-for="item in classifyType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					</el-form-item>
					<el-form-item label="发布账号:" prop="userId" label-width="82">
						<el-select v-model="form2.userId" placeholder="请选择发布账号" :disabled="true">
							<el-option label="小号1" value="1"></el-option>
							<el-option label="小号2" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="附加选项:" prop="imgType" label-width="82">
						<el-radio-group v-model="form2.imgType" :disabled="true">
							<el-radio label="1">上传缩略图</el-radio>
							<el-radio label="2">提取第一个图为缩略图</el-radio>
						</el-radio-group>
					</el-form-item>
					<!--上传图片-->
					<el-form-item label="封面图">
						<img class="imgs" :src="imgFullSrc" alt="封面图展示">
					</el-form-item>
					<el-form-item label="Tag标签:" >
						<el-input placeholder="用逗号隔开，单个标签少于12字节" v-model="form2.tagLabel" :disabled="true"></el-input>
					</el-form-item>
					<!--<el-form-item label="关键词:">
        							<el-input placeholder="用英文 “ , ” 隔开"></el-input>
        						</el-form-item>-->
				</div>
			</el-form>
		</div>
	</div>
</template>
<script>
import { getBaceUrl } from '@/utils/auth'
	export default {
		data() {
			return {
				quill: {
					width: 420,
					border: true,
					height: 150,
//					overflow-y:auto,
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
				classifyTypes: '行情',
				status: '',
				form2: {
					title: '',
					content: '',
					userId: '1',
					imgType: '1',
					tagLabel: '',
					resource: '',
					source: '',
					type: [],
					desc: '',
					author: '',
					img: '',
					//未置顶
					topFlag: '0',
					//排序
					orderNum: '0'
				},
				bannerDialog: false,
				bannerForm: [],
				baceUrl: '',
				// url: 'http://192.168.1.91:8080/industry/save',
				// 上传图片
				editorOption: {},
				dialogImageUrl: '',
				dialogVisible: false,
				classifyType: '',
				//			form2: {},
				uploadData: {},
				value: '',
				imgFullSrc: '',
				imgSrc: '',
			};
		},
		created() {
			this.baceUrl = getBaceUrl();
		},
		mounted() {
			//  	修改查看
			this.$get('/industry/get', {
				tokenId: this.$store.state.user.tokenId,
				id: this.$route.params.id
			}).then(res => {
				console.log(res.data[0].industry)
				this.form2 = res.data[0].industry
//				alert(this.form2.content)
				this.imgSrc = this.form2.showUrl
				this.status = this.form2.status;
				this.classifyType = this.form2.classifyType
				this.imgFullSrc = this.baceUrl + this.imgSrc
				let selectid = this.classifyType;
				//				alert(selectid)
				//  	下拉菜单
				this.$get('/industryCategory/findIndustryCategoryList', {
					tokenId: this.$store.state.user.tokenId
				}).then(res => {
					console.log(res.data)
					this.classifyType = res.data
					for(var i = 0; i < this.classifyType.length; i++) {
						if(selectid == this.classifyType[i].id) {
							this.value = this.classifyType[i].name
						}

					}

				})

			})

		},
		created() {
			this.baceUrl = getBaceUrl();
		},
		methods: {
			
			//			下线
			top_flag1(index, rows) {
				this.$confirm('确定要下线吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: this.$route.params.rowInfo.id,
						status:'6'
					}
					this.$post('/industry/save', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '下线成功!'
						});
						setTimeout(() => {
						this.$router.push({
							name: 'market'
						});
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
				this.$confirm('确定上线吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: this.$route.params.rowInfo.id,
						status:'5'
					}
					this.$post('/industry/save', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '上线成功!'
						});
						setTimeout(() => {
						this.$router.push({
							name: 'market'
						});
					}, 1000);
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '上线失败'
					});
				});
			},
			
			
			// 富文本图片上传
			uploadImg(file, insert) {
				//				console.log(file)
				let params = new FormData(); // 创建form对象
				params.append('file', file, file.name);
				// params.append('name',file.name);
				//				console.log(file.name)

				this.$post('images/upload', params).then(res => {
					let url = this.baceUrl + res.data[0].showUrl;
					// console.log(url)
					insert(url, 'center')
					//					console.log(res);
				})
			},
			// 获取富文本的内容
			onEditorBlur({
				quill,
				html,
				text
			}) {
				// console.log('editor blur!', quill, html, text)
				//				console.log(this.form2.content)
			},
			//获取封面图路径
			getImgUrl() {
				this.imgFullSrc = this.baceUrl + this.imgSrc;
				console.log(this.imgSrc)
				console.log(this.imgFullSrc)
			},
			fileOver() {
				this.$message('只允许添加一张图片,如果替换请删除后再上传');
			},
			onEditorBlur(quill) {
				console.log('editor blur!', quill);
				// console.log(this.form2.content);
			},
			onEditorFocus(quill) {
				console.log('editor focus!', quill);
			},
			onEditorReady(quill) {
				console.log('editor ready!', quill);
			},
			onEditorChange({
				val
			}) {
				console.log('editor change!', val);
				//					this.content = html;
			},
			// 文件上传的删除  和放大!
			handleRemove(file, fileList) {
				alert('删除');
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
				console.log(this.dialogImageUrl);
				alert('放大');

			},
			//提交审核
			cancelUp2(index, rows) {
				this.$confirm('确定要提交审核吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						status: '2'
					}
					this.$post('/industry/save', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '提交成功!'
						});
						this.getMarket();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '提交失败'
					});
				});
			},
			watch: {
				// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
				'$route': 'getParams'
			},
			 fanhui(){
        this.$confirm('你确定要返回吗？')
          .then(_ => {
            this.$router.back();
            done();
          })
          .catch(_ => {});
      }
		}
	};
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
		 margin: 0 auto; height: 500px !important;margin-top: 2px;text-indent:2em; overflow-y: auto !important;
	}
	#p2 img{
		display: block;
		margin: 0 auto;
		width: 320px !important;
		
	}
	

</style>
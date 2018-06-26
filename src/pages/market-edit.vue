<template>
    <div class="page-body">
        <div class="breadcrumb" style="padding:8px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
                <el-breadcrumb-item>行业信息</el-breadcrumb-item>
                <el-breadcrumb-item>添加行情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
            <div class="text-right">
                <el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
                <el-button size="small" class="light_btn">预览</el-button>
                <el-button size="small" class="light_btn" @click="toAudit('form2',1)">仅保存</el-button>
                <el-button size="small" class="light_btn" @click="toAudit('form2',2)">保存并提交审核</el-button>
            </div>
            <el-form ref="form2" :model="form2" label-width="80px" class="up_form">
                <div style="width: 40%;float: left;padding:15px;margin-left:5%;margin-right:10%;">
                    <el-form-item label="文章标题" prop="title">
                        <el-input v-model="datas.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="正文内容" prop="content">
                        <quill-editor v-model="datas.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
                        </quill-editor>
                    </el-form-item>
                </div>
                <div style="width: 35%;float:left;padding:15px;">
                    <el-form-item label="发布到:">
                        <el-input :disabled="true" v-model="form2.classifyTypes" style="width:173px;"></el-input>
                    </el-form-item>
                    
                    
                    <el-select v-model="value" name="classifyType" placeholder="请选择">
					    <el-option
					      v-for="item in classifyType"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
					  
					  
                    <!--<el-form-item label="来源:">
        							<el-radio-group v-model="form.resource" required @change="test()">
        								<el-radio label="2" >原创</el-radio>
        								<el-radio label="1" >转载</el-radio>
        							</el-radio-group>
        							<el-select v-model="form.source" placeholder="请选择来源" style="margin-left:20px;width:140px;">
        								<el-option label="第一网站" value="shanghai"></el-option>
        								<el-option label="第二网站" value="beijing"></el-option>
        							</el-select>
        						</el-form-item>-->
                    <!--<el-form-item label="作者:" :required="true">
        							<el-input v-model="form.author"></el-input>
        						</el-form-item>-->
                    <el-form-item label="发布账号:" prop="userId" label-width="82">
                        <el-select v-model="form2.userId" placeholder="请选择发布账号">
                            <el-option label="小号1" value="1"></el-option>
                            <el-option label="小号2" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="附加选项:" prop="imgType" label-width="82">
                        <el-radio-group v-model="form2.imgType">
                            <el-radio label="1">上传缩略图</el-radio>
                            <el-radio label="2">提取第一个图为缩略图</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--上传图片-->
                    <el-form-item>
                        <el-upload ref="upload" :action="getFullUrl()" name="newsFile" :data="uploadData" :multiple="false" :limit='1' 
												list-type="picture-card" :auto-upload="false"  :on-preview="handlePictureCardPreview" :on-exceed="fileOver" :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="Tag标签:">
                        <el-input placeholder="用逗号隔开，单个标签少于12字节" v-model="datas.tagLabel"></el-input>
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
						baceUrl:'',
            // url: 'http://192.168.1.91:8080/industry/save',
            // 上传图片
            editorOption: {},
            dialogImageUrl: '',
            dialogVisible: false,
            classifyType:'',
            form2: {
                title: '',
                content: '',
                classifyTypes: '行情',
                userId: '1',
                imgType: '1',
                tagLabel: '',
                resource: '',
                source:'',
                type: [],
                desc: '',
                author: '',
                img: ''
                
            },
            uploadData: {},
//	            options: [{
//	          value: '选项1',
//	          label: '黄金糕'
//	        }, {
//	          value: '选项2',
//	          label: '双皮奶'
//	        }, {
//	          value: '选项3',
//	          label: '蚵仔煎'
//	        }, {
//	          value: '选项4',
//	          label: '龙须面'
//	        }, {
//	          value: '选项5',
//	          label: '北京烤鸭'
//	        }],
	        value: '',
	        datas:''
//          rules2: {
//              title: [
//                  { required: true, message: '请输入标题', trigger: 'blur' },
//                  { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
//              ],
//              content: [
//                  { required: true, message: '请输入内容', trigger: 'change' }
//              ],
////              classifyType: [
////                  { required: true, message: '请输入内容', trigger: 'change' }
////              ],
//              userId: [
//                  { required: true, message: '请选择发布账号', trigger: 'change' }
//              ],
//              imgType: [
//                  { required: true, message: '请选择图片', trigger: 'change' }
//              ],
//              resource: [
//                  { required: true, message: '请选择活动资源', trigger: 'change' }
//              ],
//              desc: [
//                  { required: true, message: '请填写活动形式', trigger: 'blur' }
//              ],
//               source: [
//          { required: true, message: '请选择活动资源', trigger: 'change' }
//        ]
//          }
        };
		},
		created(){
			this.baceUrl = getBaceUrl();
			// console.log(this.baceUrl)
			
		},
    mounted() {
//  	修改查看
    	this.$get('/industry/get',{tokenId:this.$store.state.user.tokenId,id:'459733959777976321'}).then(res => {
//  		console.log(res.data[0].industry)
    		this.datas = res.data[0].industry
    	})
//  	下拉菜单
    	this.$get('/industryCategory/findIndustryCategoryList',{tokenId:this.$store.state.user.tokenId}).then(res => {
//  		console.log(res.data)
    		this.classifyType = res.data
    	})
//  	图片回显	
		this.$get('/images/showImage',{tokenId:this.$store.state.user.tokenId,id:'459733906246074368'}).then(res => {
    		console.log(res);
    		alert(res)
    		this.classifyType = res.data
    	})
    	
    	
    	
        // console.log(222222, this.$store.state.user, sessionStorage.getItem('tokenId'));
    },
    methods: {
			getFullUrl(){
				console.log(this.baceUrl+'/industry/save')
				return (this.baceUrl+'/industry/save')
			},
			fileOver(){
				this.$message('只允许添加一张图片,如果替换请删除后再上传');
			},
			toAudit(formName, status) {
					this.$refs[formName].validate((valid) => {
							console.log(valid);
							// console.log(this.$store.state.user.tokenId);
							if (valid) {
									var params = {
											id:'459733959777976321',
											tokenId: this.$store.state.user.tokenId,
											status: status,
											title: this.form2.title,
											content: this.form2.content,
//											classifyType: this.form2.classifyType,
											userId: this.form2.userId,
											imgType: this.form2.imgType,
											tagLabel: this.form2.tagLabel,
											publishSource:'1',
											classifyType:this.value,
										
									};
									this.uploadData = params;
									setTimeout(() => {
										this.$refs.upload.submit();
									}, 0);
									// console.log(params)
									// this.$post('industry/save', params).then(res => {
									//     if (res.code === 0) {
									//         console.log(1111111, res);
									//     }
									// });
									return true;
							}else{
								console.log('error submit!!');
								return false;
							}
					});
					return true;
			},
			onEditorBlur(quill) {
					console.log('editor blur!', quill);
					console.log(this.form2.content);
			},
			onEditorFocus(quill) {
					console.log('editor focus!', quill);
			},
			onEditorReady(quill) {
					console.log('editor ready!', quill);
			},
			onEditorChange({ quill, html, text }) {
					console.log('editor change!', quill, html, text);
					this.content = html;
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
/*.app-container .app-page-body{
		min-height: 890px !important;
	}*/
</style>
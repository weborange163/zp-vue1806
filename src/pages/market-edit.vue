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
			<el-form ref="form1" :model="form1" label-width="84px" :rules="rules1" class="up_form clearfix">
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
					<el-form-item label="发布到:">
						<el-input v-model="fabudao"  disabled></el-input>
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
          	<el-form-item label="所属分类" prop="classifyType">
            <el-select filterable v-model="form2.classifyType" name="classifyType" placeholder="请选择"  style='padding-left: 6px;'>
              <el-option v-for="item in classifyTypeAll" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
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
					<el-form-item label="附加选项:" prop="imgType">
							<el-radio-group v-model="form1.imgType" @change="radioChange">
								<el-radio label="1">上传缩略图</el-radio>
								<el-radio label="2">提取第一个图为缩略图</el-radio>
							</el-radio-group>
					</el-form-item>
					<el-form-item prop="icon" ref="icon" label="封面图" v-if="form1.imgType=='1'">
						<el-upload
							action="" :multiple="false" :limit='1'
							ref="upload" name="newsFile"
              :file-list="fileList"
							list-type="picture-card"
							:auto-upload="false"
							:on-change="fileChange" :on-exceed="handleExceed"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
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
				fileList:[],	// 预览图片
				imgFullSrc:'',
        imgSrc:'',
        hasChangeFile:false,
        fabudao:'新闻资讯',
				form1: {
					title: '',
					content:'',
					column:'新闻资讯',
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
        classifyTypeAll:'',
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
          userId: [
            {required: true, message: '请选择发布账号', trigger: 'change' }
          ],
          imgType: [
            {required: true, message: '请选择图片', trigger: 'change' }
          ],
          source: [
            { required: true, message: '请选择转载来源', trigger: 'change' }
          ],
          classifyType:[
            { required: true, message: '请选择所属分类', trigger: 'blur' },
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
      this.argu=this.$route.params.argu;
      // console.log(this.argu)
		},
		mounted() {
			this.$get('reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.cities = res.data
      });
      this.$get('/industryCategory/findIndustryCategoryList',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.classifyTypeAll = res.data
    	});
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
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
        this.$refs['icon'].clearValidate(); // 图片验证
        this.form1.filename = file.name;
        this.form1.newsFile = file.raw;
				// console.log(file)
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
							if(!this.form1.content.match(reg)){
								 this.$message.error('内容里没有图片!');
                 return;
							}
						}
						let param = new FormData();
            param.append('tokenId',this.$store.state.user.tokenId);
            param.append('id',this.form1.id);
            param.append('title',this.form1.title);  
            param.append('content',this.form1.content);
            param.append('sourceType',this.form1.sourceType);
            param.append('author',this.form1.author);
            param.append('articleType','2');
            param.append('userId',this.form1.userId);
            param.append('imgType',this.form1.imgType);
            param.append('classifyType',this.form1.classifyType);
            param.append('tagLabels',this.form1.tagLabels.replace(/，/ig,','));
            // param.append('keyWords',this.form1.keyWords.replace(/，/ig,','));
            param.append('publishSource','1');
            param.append('status',status);
            if(this.form1.sourceType=='2'){
              param.append('source',this.form1.source)
            }
            if(this.form1.imgType == '1'&&this.hasChangeFile){
              param.append('newsFile',this.form1.newsFile,this.form1.filename);
            }
            this.$post('news/edit',param).then(res =>{
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
			// 获取新闻详情
			showNews(){
				var params = {
					tokenId:this.$store.state.user.tokenId,
					id:this.idDetail
				}
				this.$get('news/show',params).then(res => {
          // console.log(res.data[0]);
					this.form1 = res.data[0];
					// console.log(this.form1)
					this.imgSrc = this.form1.coverImgId;
					this.status = this.form1.status;
					this.imgFullSrc = this.form1.coverImgUrl;
					// console.log(this.imgFullSrc)
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
			handleRemove(file, fileList) {
        this.hasChangeFile = true;
				console.log(file, fileList);
				if(fileList.length == 0){
					this.hasFmt =false;
				}
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
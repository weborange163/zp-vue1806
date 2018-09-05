<template>
	<div class="page-body market_edit" style="min-width:980px;">
		<el-dialog center width="22%" :visible.sync="bannerDialog" append-to-body>
			<el-form :data="form2"  ref="form2" label-width="110px" class="form2">
				<p id="p1" v-html="form2.title"></p>
				<p id="p2" v-html="form2.content"></p>
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
				<el-button size="small" class="light_btn" @click="saveAudit('form2','1')">仅保存</el-button>
        <el-button size="small" class="light_btn" @click="saveAudit('form2',2)">保存并提交审核</el-button>
			</div>
			<el-form ref="form2" :model="form2" :rules='rules2' label-width="84px" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title">
						<el-input style="width:420px" type="textarea" autosize v-model="form2.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor">
						<m-quill-editor ref="myQuillEditor" v-model="form2.content"
             :width="quill.width" :getContent="onEditorChange" 
             :has-border="quill.border" :zIndex="quill.zIndex"
             :sync-output="quill.syncOutput"  :toolbar="quill.toolbar"
             :theme="quill.theme" 
             :disabled="quill.disabled" 
             :fullscreen="quill.full" 
             @upload="uploadImg" @blur="onEditorBlur($event)">
             </m-quill-editor>
					</el-form-item>
				</div>
				<div style="width: 35%;float:left;padding:15px;min-width:420px;">
					<el-form-item label="发布到:" required>
						<el-input :disabled="true" v-model="classifyTypes" style="width:173px;"></el-input>
					</el-form-item>
					<el-form-item label="所属分类" prop="classifyType">
            <el-select v-model="form2.classifyType" name="classifyType" placeholder="请选择"  style='padding-left: 6px;'>
              <el-option v-for="item in classifyTypeAll" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
					</el-form-item>
					<el-form-item label="发布账号:" prop="userId">
						<el-select v-model="form2.userId" placeholder="请选择发布账号">
              <el-option 
                v-for="item in accounts"
                :key="item.userId"
                :label="item.nickName"
                :value="item.userId"
              ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="附加选项:" prop="imgType" >
						<el-radio-group v-model="form2.imgType" @change="radioChange">
							<el-radio label="1">上传缩略图</el-radio>
							<el-radio label="2">提取第一个图为缩略图</el-radio>
						</el-radio-group>
					</el-form-item>
					<!--上传图片-->
          <el-form-item label="封面图:" prop="icon" ref="icon" v-show="form2.imgType == '1'">
            <el-upload
              action="" :multiple="false" :limit='1'
              ref="upload" name="newsFile" :file-list="fileList"
              list-type="picture-card" :auto-upload="false"
              :on-change="fileChange" :on-exceed="fileOver"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="form2.showUrl" alt="">
            </el-dialog>
          </el-form-item>
					<el-form-item label="Tag标签:" prop="tagLabel">
						<el-input placeholder="用逗号隔开，单个标签少于12字节" v-model="form2.tagLabel"></el-input>
					</el-form-item>
					<!--<el-form-item label="关键词:">
        							<el-input placeholder="用英文 “ , ” 隔开"></el-input>
        						</el-form-item>-->
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
                  <span v-if="form2.publishSource == '1'">PC后台</span><span v-if="form2.publishSource == '2'">数据爬取</span><span v-if="form2.publishSource == '3'">APP端</span>
                  </div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">文章ID</div></td>
                <td><div class="cell">{{form2.articleId}}</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">状态</div></td>
                <td><div class="cell">
                  <span v-if="form2.status == '1'">新建</span><span v-if="form2.status == '2'">待审核</span><span v-if="form2.status == '4'">审核不通过</span>
                  <span v-if="form2.status == '5'">已上线</span><span v-if="form2.status == '6'">已下线</span>
                  </div></td>
              </tr>
            </tbody>
          </table>

          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border marT20">
            <colgroup>
              <col name="el-table_1_column_1" >
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
                <td><div class="cell">{{form2.createTime}}</div></td>
                <td><div class="cell">{{form2.createUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">上线时间</div></td>
                <td><div class="cell">{{form2.onlineTime}}</div></td>
                <td><div class="cell">{{form2.onlineUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">下线时间</div></td>
                <td><div class="cell">{{form2.offlineTime}}</div></td>
                <td><div class="cell">{{form2.offlineUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">修改时间</div></td>
                <td><div class="cell">{{form2.updateTime}}</div></td>
                <td><div class="cell">{{form2.updateUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">审核时间</div></td>
                <td><div class="cell">{{form2.checkTime}}</div></td>
                <td><div class="cell">{{form2.checkPerson}}</div></td>
                <td><div class="cell">{{form2.checkMessage}}</div></td>
              </tr>
            </tbody>
          </table>
          </div>
				</div>
			</el-form>
		</div>
		<!--{{$route.params.rowInfo.id}}-->
	</div>
</template>
<script>
  import myVali from '@/utils/myVali'
	import { getBaceUrl } from '@/utils/auth'
	export default {
		data() {
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
			return {
        // aaa:'<p class="ql-indent-1">999999</p>',
        hasFmt:true,
        accounts:[],
				dialogVisible: false,
        bannerDialog:false,
				quill: {
					width: 420,
					border: true,
          height: 150,
          zIndex:101,
					content: '',
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

				baceUrl: '',
				fileList:[],	// 预览图片
				// 上传图片
				editorOption: {},
				dialogImageUrl: '',
				classifyTypes: '行情',
				classifyTypeAll: '',
				form2: {
					title: '',
					content: '',
					column: '行情',
					sourceType: '1',
					source: '',
					status: '',
					author: '',
					userId: '',
          imgType: '1',
          showUrl:'',
					newsFile: '',
					tagLabel: '',
					keyWords: '',
					coverImgId: ''
        },
        rules2: {
          title: [
            {required:true, validator: myVali.checkTitle, trigger: 'blur' }  // 图片验证
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'change' },
            {pattern:/[0-9\u4e00-\u9fa5]+/g,message:'内容必须有中文或者数字',trigger:'blur'}
          ],
          userId: [
            { required: true, message: '请选择发布账号', trigger: 'change' }
          ],
          imgType: [
            { required: true, message: '请选择图片', trigger: 'change' }
          ],
          icon:[
            {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
          ],
          classifyType:[
            { required: true, message: '请选择所属分类', trigger: 'blur' },
          ],
          tagLabel:[
            { validator: valiTag, trigger: 'blur' }
          ]
        } ,
				uploadData: {},
        value: '',
        imgFullSrc:''
			};
		},
		created() {
			this.baceUrl = getBaceUrl();
		},
		mounted() {
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        // console.log(res)
        this.accounts = res.data;
      });
      this.$get('/industryCategory/findIndustryCategoryList',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.classifyTypeAll = res.data
    	});
			this.$get('/industry/get', {
				tokenId: this.$store.state.user.tokenId,
				id: this.$route.params.id
			}).then(res => {
				console.log(res.data[0].industry)
        this.form2 = res.data[0].industry;
				// this.imgSrc = this.form2.showUrl
				this.status = this.form2.status;
				this.classifyType = this.form2.classifyType
				// this.imgFullSrc = this.baceUrl + this.imgSrc
				this.fileList.push({url:this.form2.showUrl})
        let selectid = this.classifyType;
        
			})
		},
		methods: {
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
			uploadImg(file, insert) {
				//				console.log(file)
				let params = new FormData(); // 创建form对象
				params.append('file', file, file.name);
				// params.append('name',file.name);
				//				console.log(file.name)
				this.$post('images/upload', params).then(res => {
					let url = res.data[0].showUrl;
					// console.log(url)
					insert(url, 'center')
					//					console.log(res);
				})
      },
      saveAudit(formName, status){
        this.$refs[formName].validate((valid) => {
					console.log(valid);
					if (valid) {
            if(this.form2.imgType == 2){	// 封面图的类型 
              var reg = /src=/ig;
							if(!this.form2.content.match(reg)){
                 this.$message.error('内容里没有图片!');
                 return;
              }
            }
            let param = new FormData();
            param.append('tokenId',this.$store.state.user.tokenId);
            param.append('title',this.form2.title);  
            param.append('content',this.form2.content);
            param.append('userId',this.form2.userId);
            param.append('imgType',this.form2.imgType);
            param.append('tagLabel',this.form2.tagLabel.replace(/，/ig,','));
            param.append('publishSource','1');
            param.append('status',status);
            param.append('classifyType',this.form2.classifyType);
            param.append('newsFile',this.form2.file,this.form2.filename);
            param.append('id',this.$route.params.id);
            this.$post('industry/save', param).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({name: 'market'});
                }, 1000);
              }
            });
							}else{
								console.log('error submit!!');
								return false;
							}
					});
					return true;
      },
			// 获取富文本的内容
			onEditorBlur({
				quill,
				html,
				text
			}) {},
			fileOver() {
				this.$message('只允许添加一张图片,如果替换请删除后再上传');
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
			onEditorChange({
				val
			}) {
				console.log('editor change!', val);
				//					this.content = html;
			},
			// 文件上传的删除  和放大!
			handleRemove(file, fileList) {
        this.hasFmt=false;
				console.log(file, fileList);
      },
      fileChange(file,fileList){
        this.$refs['icon'].clearValidate(); // 图片验证
        this.form2.filename = file.name;
        this.form2.file = file.raw;
				// console.log(file)
				if(fileList.length>0){
					this.hasFmt = true;
				}
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
				console.log(this.dialogImageUrl);
				alert('放大');

			},
			
				 fanhui(){
        this.$confirm('返回编辑内容将重置是否继续？')
          .then(_ => {
            this.$router.back();
            done();
          })
          .catch(_ => {});
      }
    },
    watch: {
				// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
				'$route': 'getParams'
			},
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
		height: 550px;
		overflow-y: auto;
	}
</style>
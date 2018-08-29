<template>
    <div class="page-body market_add" style="min-width:980px;">
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
                <el-button size="small" class="light_btn" @click="saveAudit('form2',1)">仅保存</el-button>
                <el-button size="small" class="light_btn" @click="saveAudit('form2',2)">保存并提交审核</el-button>
            </div>
            <el-form ref="form2" :model="form2" label-width="84px" :rules="rules2" class="up_form clearfix">
              <div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
                <el-form-item label="文章标题" prop="title">
                    <el-input type="textarea" autosize v-model="form2.title" placeholder="请输入标题"></el-input>
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
              <div style="width: 35%;float:left;padding:15px;min-width:420px;" >
                <el-form-item label="发布到:" required>
                    <el-input :disabled="true" v-model="form2.classifyTypes" style="width:173px;"></el-input>
                </el-form-item>
                <el-form-item label="所属分类:" prop="classifyType">
                  <el-select v-model="form2.classifyType" name="classifyType" placeholder="请选择">
                    <el-option
                      v-for="item in classifyTypeAll"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="fabuStyle" label="发布账号:" prop="userId">
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
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
                <el-form-item label="Tag标签:" prop="tagLabel">
                    <el-input placeholder="用逗号隔开，单个标签少于12字节" v-model="form2.tagLabel"></el-input>
                </el-form-item>
              </div>
            </el-form>
        </div>
    </div>
</template>
<script>
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
      hasFmt:false,
      fileList:[],
      accounts:[],
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
          [{ 'header': 1 }, { 'header': 2 }],
          ['bold', 'italic', 'underline', 'strike', 'link']
        ]
      },
      baceUrl:'',
      editorOption: {},
      dialogImageUrl: '',
      dialogVisible: false,
      classifyTypeAll:'',
      form2: {
        title: '',
        content: '',
        classifyTypes: '行情',
        userId: '',
        imgType: '1',
        tagLabel: '',
        resource: '',
        source:'',
        type: [],
        desc: '',
        author: '',
        img: '',
        //未置顶
        topFlag:'0',
//              排序
        orderNum:'0'
      },
      uploadData: {},
	    value: '',
      rules2: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
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
      }  
            
    };
	},
		created(){
			this.baceUrl = getBaceUrl();
		},
    mounted() {
    	this.$get('/industryCategory/findIndustryCategoryList',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		console.log(res.data)
    		this.classifyTypeAll = res.data
    	});
    	 this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        console.log(res)
        this.accounts = res.data;
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
			fileOver(){
				this.$message('只允许添加一张图片,如果替换请删除后再上传');
			},
			//仅保存
			saveAudit(formName, status) {
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
				//图片的验证
			fileChange(file,fileList){
        this.$refs['icon'].clearValidate(); // 图片验证
        this.form2.filename = file.name;
        this.form2.file = file.raw;
				// console.log(file)
				if(fileList.length>0){
					this.hasFmt = true;
				}
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
			},
			 fanhui(){
        this.$confirm('返回已编辑内容将重置是否继续？')
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
.market_add .el-upload--picture-card{
	width: 80px;
	height: 80px;
	line-height: 88px;
}
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
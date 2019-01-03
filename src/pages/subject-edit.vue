<template>
  <div class="page-body subject-add">
  	<el-dialog center width="375px"  :visible.sync="bannerDialog" append-to-body id='div1'>
			<el-form :data="subjectForm"  ref="subjectForm" label-width="110px" class="subjectForm">
				<p id="p1" >{{subjectForm.title }}</p>
				<p id="p2" v-html="subjectForm.description"></p>
			</el-form>
		</el-dialog>
    <div class="breadcrumb" style="padding:8px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" >
			<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
			<el-breadcrumb-item>专题管理</el-breadcrumb-item>
			<el-breadcrumb-item>编辑专题</el-breadcrumb-item>
		</el-breadcrumb>
    </div>
    <div class="box">
			<div class="text-right marBo4" style="margin-right:50px;">
				<el-button size="small" @click="fanhui" class="light_btn">返回</el-button>
				<!-- <el-button size="small" class="light_btn" @click="bannerDialog = true;">预览</el-button> -->
				<el-button size="small" class="light_btn" @click="addSubject('subjectForm',subjectForm.status)">保存</el-button>
				<!-- <el-button size="small" class="light_btn" @click="addSubject('subjectForm','4')">保存并上线</el-button> -->
			</div>
      <el-form :model="subjectForm" :rules="subjectRules" ref="subjectForm" label-width="100px" style="max-width:800px;">
        <el-form-item label="专题标题" prop="title">
          <el-input v-model="subjectForm.title"></el-input>
        </el-form-item>
        <el-form-item label="专题描述" prop="description">
          <el-input type="textarea" v-model="subjectForm.description"></el-input>
        </el-form-item>
        <el-form-item label="封面缩略图" ref="icon" prop="icon">
          <el-upload name="file" ref="upload" :multiple="false" :limit='1'
            action="" list-type="picture-card"
            :file-list="fileList" :on-change="fileChange"
            :auto-upload="false" :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imgFullSrc" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="tag标签" prop="tag">
          <el-input v-model="subjectForm.tagLabels"></el-input>
        </el-form-item>
        <el-form-item label="关联文章" prop="linkArt">
          <el-row>
            <el-col :span="18">
              <el-input v-model="subjectForm.ariId"></el-input>
            </el-col>
            <el-col :span="6" class="text-center">
              <el-button class="light_btn" @click="addById()">添加</el-button>
              <el-button class="light_btn" @click="searchAdd=true;searchLinkArt=[];searchInput=''">搜索添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-table :data="artData" border :row-class-name="miniTable" :header-row-class-name="miniTable">
            <el-table-column prop="title" label="标题" min-width="390"></el-table-column>
            <el-table-column prop="articleId" label="文章ID" width="100"></el-table-column>
            <el-table-column  label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.$index,artData,0)" type="text" size="small">取消关联</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="searchAdd">
        <div style="margin-bottom:20px">
          <el-input v-model="searchInput" style="width:80%" size="mini" placeholder="请输入搜索内容"></el-input>
          <el-button class="light_btn" @click="searchMore" size="mini">搜索</el-button>
        </div>
        <el-table :data="searchLinkArt" border :row-class-name="miniTable" :header-row-class-name="miniTable">
          <el-table-column prop="title" label="标题" min-width="390"></el-table-column>
          <el-table-column prop="articleId" label="文章ID" width="100"></el-table-column>
          <el-table-column  label="操作" width="150">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.flag" @click="handleClick1(scope.row,artData,0)" type="text" size="small">取消关联</el-button>
              <el-button v-else @click="handleClick1(scope.row,artData,1)" type="text" size="small">关联</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import { getBaceUrl } from '@/utils/auth'
export default {
  data(){
    var valiIcon = (rule, value, callback) => { // 图片验证
        if (!this.hasFmt) {
          callback(new Error('请上传图片'));
        } else {
          callback();
        }
    };
    return{
      argu:{},
      hasFmt:true,
      hasChangeFile:false,
      editStatus:'2',
    	fileList:[],	// 预览图片
    	imgFullSrc:'',
				imgSrc:'',
      searchInput:'',
      uploadData:{},
      baceUrl:'',
      artData:[
      ],
      searchLinkArt:[],
      dialogImageUrl: '',
      dialogVisible:false,
      imageUrl: '',
      editorOption:{},
      searchAdd:false,
      bannerDialog: false,
      subjectForm:{
        title:'',
        description:'',
        tagLabels:'',
        newsArticleIds:'',
        ariId:''
      },
      subjectRules:{
        title: [
            { required: true, message: '请输入专题名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字', trigger: 'blur' }
          ],
        description:[
          { required: true, message: '请输入专题描述', trigger: 'blur' },
          { min: 1, max: 500, message: '长度在 1 到 500 个字', trigger: 'blur' }
        ],
        icon:[
          {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
        ]
      }
    }
  },
  created(){
    this.baceUrl = getBaceUrl();
    this.argu=this.$route.params.argu;
    // console.log(this.$route.params.id)
    this.$get('/specialInfo/show', {
				tokenId: this.$store.state.user.tokenId,
				id: this.$route.params.id
			}).then(res => {
        console.log(res)
				this.subjectForm=res.data[0]
				this.imgSrc = this.subjectForm.coverImgId;
        this.status = this.subjectForm.status;
        this.imgFullSrc = this.subjectForm.coverImgUrl;
        this.artData = this.subjectForm.specialNews;
        console.log(this.subjectForm);
        console.log(this.searchLinkArt);
        this.fileList.push({url:this.imgFullSrc})
				
			})
    // console.log(this.baceUrl)http://localhost:8089/specialInfo/add
  },
  mounted() {
				
		},
  methods:{
    onSuccess(){
//    console.log(111)
    },
    // 模糊搜索添加文章关联
    searchMore(){
      this.searchLinkArt=[];  // 重置搜索表格
      if(!this.searchInput){
        this.$message({
          message: '请输入搜索内容!',
          type: 'warning'
        });
      }else{
        var params = {
          tokenId:this.$store.state.user.tokenId,
          idOrTitle:this.searchInput
        }
        console.log(params)
        this.$post('news/getlist',params).then(res => {
            console.log(res);
            if(!res.data[0]){
              this.$message.error('很抱歉,没有匹配的文章!');
            }else{
              var result = res.data;
              var arr=[]; // 获取表单里关联列表的articleId
              this.artData.map((item) =>{
                arr.push(item.articleId);
              })
              result.map(item => {
                if(arr.indexOf(item.articleId) == -1){
                  item.flag = true
                }
              })
              this.searchLinkArt = result;
              console.log(this.artData)
              //this.artData = res.data
            }
        })
      }
    },
    //输入ID 点击添加按钮进行添加关联文章
   // 10000008
    addById(){
      var isIn = false;
      if(!this.subjectForm.ariId){
        this.$message({
          message: '请输入文章ID添加!',
          type: 'warning'
        });
      }else{
        this.artData.map((item) =>{
          if(this.subjectForm.ariId == item.articleId){
            this.$message.error('此文章已经被关联!');
            isIn = true;
            return;
          }
        })
        if(isIn){
          return;
        }
        var params = {
          tokenId:this.$store.state.user.tokenId,
          articleIds:this.subjectForm.ariId
        }
        this.$post('news/batchGet',params).then(res => {
            console.log(res)
            if(!res.data[0]){
              this.$message.error('请输入正确的文章ID!');
            }else{
              this.artData.push(res.data[0])
              console.log(this.artData)
              //this.artData = res.data
            }
        })
      }
    },
    // 修改专题
//  /specialInfo/add
    addSubject(formName,status){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = new FormData();
            var ids = [];
            this.artData.map(item => {
              ids.push(item.articleId);
            });
            param.append('tokenId',this.$store.state.user.tokenId);
            param.append('status',status);
            param.append('description',this.subjectForm.description);
            param.append('title',this.subjectForm.title);
            param.append('tagLabels',this.subjectForm.tagLabels);
            param.append('newsArticleIds',ids.join(','));
            if(this.hasChangeFile){
              param.append('file',this.subjectForm.file,this.subjectForm.filename);
            }
            param.append('id',this.$route.params.id);
            param.append('editStatus',this.editStatus);
            this.$post('specialInfo/edit',param).then(res => {
              if(res.code == 0){
                setTimeout(() => {
                  this.$message({
                    type: 'success',
                    message: res.msg
                  });
                  this.$router.push({
                    name: 'subject',
                    params: {
                      argu: this.argu
                    }
                  });
                }, 500);
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    fanhui(){
      this.$confirm('返回已编辑内容将重置是否继续？')
        .then(_ => {
            this.$router.push({
            name: 'subject',
            params: {
              argu: this.argu
            }
          });
          done();
        })
        .catch(_ => {});
    },
    getFullUrl(){
      return (this.baceUrl+'/specialInfo/edit')
    },
    miniTable(row){
      return 'miniTable'
    },
    //搜索更多 之 关联操作
    //参数:每条新闻对象,table表格,操作指令
    handleClick1(index,rows,status){
      if(status == 1){
        rows.push(index);
        index.flag = false;
        // console.log(index.flag)
        this.$message({
          message: '关联成功.',
          type: 'success'
        });
      }else if(status == 0){
        rows.splice(index,1);
        index.flag = true;
        // console.log(index.flag);
        this.$message({
          message: '操作成功.',
          type: 'info'
        });
      }
      
    },
    // 表单中table 取消关联. 
    handleClick(index,rows,status){
        this.$confirm('此操作将取消关联, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    handleRemove(file, fileList) {
      this.hasChangeFile=true;
       if(fileList.length == 0){
        this.hasFmt =false;
      }
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    fileChange(file,fileList){
      this.$refs['icon'].clearValidate(); // 图片验证
      this.subjectForm.filename = file.name;
      this.subjectForm.file = file.raw;
      this.editStatus='1';
      console.log(file.raw)
      if(fileList.length>0){
        this.hasFmt = true;
      }
    },
    handleExceed(files, fileList){
      this.$message.warning('当前限制选择 1 个文件');
    },
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
}
</script>
<style>
.subject-add .quill-editor .ql-container{
		min-height: 150px;
  }
	#div1{
    height: 740px !important;
    overflow-y: auto !important;
	}
</style>


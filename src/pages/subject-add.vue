<template>
  <div class="page-body subject-add">
    <div class="breadcrumb" style="padding:8px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" >
			<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
			<el-breadcrumb-item>专题管理</el-breadcrumb-item>
			<el-breadcrumb-item>新建专题</el-breadcrumb-item>
		</el-breadcrumb>
    </div>
    <div class="box">
			<div class="text-right">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn">预览</el-button>
				<el-button size="small" class="light_btn" @click="addSubject('subjectForm','3')">仅保存</el-button>
				<el-button size="small" class="light_btn" @click="addSubject('subjectForm','4')">保存并上线</el-button>
			</div>
      <el-form :model="subjectForm" :rules="subjectRules" ref="subjectForm" label-width="100px" style="max-width:800px;">
        <el-form-item label="专题标题" prop="title">
          <el-input v-model="subjectForm.title"></el-input>
        </el-form-item>
        <el-form-item label="专题描述" prop="description">
          <el-input type="textarea" v-model="subjectForm.description"></el-input>
        </el-form-item>
        <el-form-item label="封面缩略图" ref="imgItem">
          <el-upload name="file" :data="uploadData" ref="upload" :multiple="false" :limit='1'
            :action="getFullUrl()" :on-success="onSuccess"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
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
              <el-button class="light_btn" @click="searchAdd=true">搜索添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-table :data="artData" border :row-class-name="miniTable" :header-row-class-name="miniTable">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="articleId" label="文章ID" width="150"></el-table-column>
            <el-table-column  label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.$index, artData)" type="text" size="small">取消关联</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="searchAdd">
        <div style="margin-bottom:20px">
          <el-input v-model="searchInput" style="width:80%"></el-input>
          <el-button class="light_btn" @click="searchMore">搜索</el-button>
        </div>
        <el-table :data="searchLinkArt" border >
          <el-table-column prop="title" label="标题" width="150"></el-table-column>
          <el-table-column prop="id" label="文章ID" width="200"></el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.flag" @click="handleClick(scope.row,0)" type="text" size="small">取消关联</el-button>
              <el-button v-else @click="handleClick(scope.row,1)" type="text" size="small">关联</el-button>
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
    return{
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
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        description:[
          { required: true, message: '请输入专题描述', trigger: 'blur' }
        ]
        
      }
    }
  },
  created(){
    this.baceUrl = getBaceUrl();
    // console.log(this.baceUrl)http://localhost:8089/specialInfo/add
  },
  methods:{
    onSuccess(){
      console.log(111)
    },
    searchMore(){
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
        this.$post('news/list',params).then(res => {
            console.log(res)
            if(!res.data[0]){
              this.$message.error('很抱歉,没有匹配的文章!');
            }else{
              var result = res.data[0];
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
    // 新建专题
    addSubject(formName,status){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid)
            var ids = [];
            this.uploadData={
							tokenId:this.$store.state.user.tokenId,
              status:status,
              title: this.subjectForm.title,
              description: this.subjectForm.description,
              tagLabels:this.subjectForm.tagLabels,
              newsArticleIds:ids
						}
						// this.uploadData = params;
						console.log(this.uploadData)
						setTimeout(() => {
              this.$refs.upload.submit();
              this.$router.back(-1);
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
    getFullUrl(){
      return (this.baceUrl+'/specialInfo/add')
    },
    miniTable(row){
      return 'miniTable'
    },
    handleClick(index, rows){
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
      
      console.log(row)
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
<style>
.subject-add .quill-editor .ql-container{
		min-height: 150px;
  }

</style>


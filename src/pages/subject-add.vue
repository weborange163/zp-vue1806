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
				<el-button size="small" class="light_btn">仅保存</el-button>
				<el-button size="small" class="light_btn">保存并上线</el-button>
			</div>
      <el-form :model="subjectForm" :rules="subjectRules" ref="ruleForm" label-width="100px" style="max-width:800px;">
        <el-form-item label="专题标题" prop="title">
          <el-input v-model="subjectForm.title"></el-input>
        </el-form-item>
        <el-form-item label="专题描述" prop="desc">
          <el-input type="textarea" v-model="subjectForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="封面缩略图">
          <el-upload
            action="#"
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
        <el-form-item label="tag标签" prop="tag" required>
          <el-input v-model="subjectForm.tag"></el-input>
        </el-form-item>
        <el-form-item label="关联文章" prop="linkArt" required>
          <el-row>
            <el-col :span="18">
              <el-input v-model="subjectForm.linkArt"></el-input>
            </el-col>
            <el-col :span="6" class="text-center">
              <el-button class="light_btn">添加</el-button>
              <el-button class="light_btn" @click="dialogTableVisible=true">搜索添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-table :data="artData" border :row-class-name="miniTable" :header-row-class-name="miniTable">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="id" label="文章ID" width="150"></el-table-column>
            <el-table-column  label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">取消关联</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="searchLinkArt" border >
          <el-table-column prop="title" label="标题" width="150"></el-table-column>
          <el-table-column prop="id" label="文章ID" width="200"></el-table-column>
          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">取消关联</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      artData:[
        {title:'世界杯在俄罗斯举行世界杯在俄罗斯举行世界杯在俄罗斯举行世界杯在俄罗斯举行',id:'100090'}
      ],
      searchLinkArt:[],
      dialogImageUrl: '',
      dialogVisible:false,
      imageUrl: '',
      editorOption:{},
      dialogTableVisible:false,
      subjectForm:{
        title:'',
        desc:'',
        tag:'',
        linkArt:''
      },
      subjectRules:{
        title: [
            { required: true, message: '请输入专题名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        desc:[
          { required: true, message: '请输入专题描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    miniTable(row){
      return 'miniTable'
    },
    handleClick(row){
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


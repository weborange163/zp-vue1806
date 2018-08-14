<template>
    <div class="page-body rules">
      <div class="page-header">
      </div>
      <div class="box">
        <div class="text-right marBo4">
          <el-button class="light_btn" @click="newDialog = true;classForm.title='';classForm.radio='1'">新建分类</el-button>
        </div>
        <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()" v-loading="loading"
          :data="tableData"
          stripe border
          style="width: 100%">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="name"  label="分类名称"></el-table-column>
          <el-table-column  label="icon" width='100'>
            <template slot-scope="scope">
							<img :src="scope.row.imgurl" alt="">
						</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
							<p v-if="scope.row.status=='1'" class="yshx">正常</p>
							<p v-if="scope.row.status=='2'" class="dshx">停用</p>
							<p v-if="scope.row.status=='3'" class="yxx">启用</p>
						</template>
          </el-table-column>
          <el-table-column prop="create_time"  label="创建时间" width="180"></el-table-column>
          <el-table-column prop="update_time"  label="修改时间" width="180"></el-table-column>
          <el-table-column label="操作" width="260" fixed="right">
            <template slot-scope="scope">
							<el-button type="text" v-if="scope.$index == '0'" disabled><i class="iconfont icon-up"></i></el-button>
							<el-button type="text" v-else @click="order(scope.$index,scope.row.id,1)"><i class="iconfont icon-up"></i></el-button>
              <el-button type="text" v-if="scope.$index != tableLength" @click="order(scope.$index,scope.row.id, 2)"><i class="iconfont icon-down"></i></el-button>
              <el-button type="text" v-else disabled ><i class="iconfont icon-down"></i></el-button>
							<el-button type="text" @click="editClass(scope.row)"><i class="iconfont icon-edit"></i></el-button>
							<el-button type="text"><i class="iconfont icon-delete" @click="deleteClass(scope.row.id)"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="marT20">
          <el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="prev, pager, next" :total="this.total_pages">
          </el-pagination>
        </div>
      </div>
      <el-dialog center
        width="30%"
        :visible.sync="newDialog"
        append-to-body>
        <el-form :model="classForm" :rules="classRules" ref="classForm" label-width="110px" class="classForm">
          <el-form-item label="分类标题" prop="title">
            <el-input v-model="classForm.title" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="上传icon" label-width="110px" ref="icon" prop="icon">
            <el-upload action=""
              :multiple="false" :limit='1'
              ref="upload" name="file"
              list-type="picture-card"
              :file-list="fileList"
              :auto-upload="false" :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :on-change="fileChange"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="imgDialog">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="使用状态" required>
             <el-radio v-model="classForm.radio" label="1">启用</el-radio>
            <el-radio v-model="classForm.radio" label="2">关闭</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="newDialog = false;fileList=[];" class="light_btn">取 消</el-button>
          <el-button type="primary" @click="createClass" class="light_btn">保 存</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import {miniTable} from '@/utils/table-style.js'
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
      fileList:[],
      isEdit:false,
      editId:'',
      newDialog:false,
      imgDialog:false,
      dialogImageUrl:'',
      loading:false,
      baceUrl:'',
      miniTable:miniTable,
      per_page: 10,
      total_pages: 0,
      currentPage: 1,
      tableData:[],
      input:'',
      classForm:{
        title:'',
        radio:'1'
      },
      classRules:{
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字', trigger: 'blur' }
        ],
       icon:[
          {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
       ]
      },
      hasFmt:false
    }
  },
  created() {
    this.baceUrl = getBaceUrl();
    this.getList();
  },
  computed: {
    tableLength: function() {
      return this.tableData.length - 1;
    }
  },
  methods:{
    // 排序
    order(index,id,f){
      var params={};
      if(f==1){   // 1 是向上交换
        params={
          tokenId: this.$store.state.user.tokenId,
          firstId:this.tableData[index-1].id,
          lastId:id
        }
      }else{
        params={
          tokenId: this.$store.state.user.tokenId,
          firstId:id,
          lastId:this.tableData[index+1].id
        }
      }
      console.log(params);
      this.$post('industryCategory/updateByOrder',params).then(res => {
        console.log(res);
        if(res.code == 0){
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.getList();
        }else{

        }
      });
    },
    //编辑
    editClass(row){
      console.log(row);
      this.newDialog = true;
      this.classForm.title = row.name;
      this.classForm.radio = row.status;
      this.fileList.push({url:row.imgurl});
      this.hasFmt = true;
      this.editId = row.id;
      this.isEdit=true;
    },
    // 新建分类
    createClass(){
      //this.newDialog=true;
      this.$refs.classForm.validate((valid) => {
        if(valid){
          let param = new FormData();
          param.append('newsFile',this.classForm.file,this.classForm.filename);
          param.append('tokenId',this.$store.state.user.tokenId);
          param.append('name',this.classForm.title);
          param.append('status',this.classForm.radio);
          if(this.isEdit){
            param.append('id',this.editId);
          }
          this.$post('industryCategory/save',param).then(res =>{
            console.log(res)
            this.newDialog = false;
            this.$refs['upload'].clearFiles();  // 清空图片
            this.$refs['classForm'].resetFields();  // 清空表单
            this.classForm.radio = '1';
            this.fileList=[];   // 清空图片列表
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: res.msg
              });
              setTimeout(() => {
                this.getList();
              }, 500);
              
            }
          })
        }
      })
    },
    // 删除行业
    deleteClass(id){
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            tokenId: this.$store.state.user.tokenId,
            status:0,
            id:id
          }
          this.$post('industryCategory/delete',params).then(res => {
          console.log(res)
          if(res.code == 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            setTimeout(() => {
              this.getList();
            }, 1000);
          }else{
            this.$message({
              type: 'info',
              message: '删除失败!'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    getList(){
      this.loading=true;
      var params = {
        tokenId: this.$store.state.user.tokenId,
        limit: this.per_page,
        offset: this.currentPage,
      }
      this.$get('industryCategory/list',params).then(res => {
        console.log(res)
        if(res.code==0){
          var listarr = res.data[0].rows;
					listarr.map((item) => {
						item.imgurl = this.baceUrl + '/images/showImage?id=' + item.picture_id;
					})
          this.tableData = listarr;
          this.loading=false;
          this.total_pages = res.data[0].total;
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.imgDialog = true;
    },
    fileChange(file,fileList){
      this.$refs['icon'].clearValidate(); // 图片验证
      this.classForm.filename = file.name;
      this.classForm.file = file.raw;
      console.log(file.raw)
      if(fileList.length>0){
        this.hasFmt = true;
      }
    },
    handleExceed(files, fileList){
      this.$message.warning('当前限制选择 1 个文件');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      if(fileList.length == 0){
        this.hasFmt =false;
      }
    },
  }
}
</script>
<style>

</style>


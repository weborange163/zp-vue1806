<template>
    <div class="page-body rules">
      <div class="breadcrumb" style="padding:8px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">系统设置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/rules-list' }">规则管理</el-breadcrumb-item>
          <el-breadcrumb-item>视频栏目管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="page-header">
        <el-input size="mini" v-model="columnName" placeholder="请输入栏目名称" style="width:200px;"></el-input>
        <el-button class="light_btn" @click="getList()">搜索</el-button>
      </div>
      <div class="box miniBox">
        <div class="text-right marBo4">
				  <el-button size="mini"  @click="$router.back()" class="light_btn">返回</el-button>
          <el-button size="mini" class="light_btn" @click="newDialog = true;classForm.title='';classForm.radio='1';isEdit=false;hasChangeFile=true;"><i class="el-icon-plus" style="font-weight:600;"></i> 栏目</el-button>
          <el-button size="mini"  @click="getList()" class="light_btn">刷新</el-button>
        </div>
        <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()" v-loading="loading"
          :data="tableData"
          stripe border
          style="100%">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="name"  label="栏目名称"></el-table-column>
          <el-table-column  label="icon" width='100'>
            <template slot-scope="scope">
							<img v-if="scope.row.picture_url" :src="scope.row.picture_url" alt="">
              <p v-else>暂无图片</p>
						</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
							<p v-if="scope.row.enabled=='1'" class="yshx">启用</p>
							<p v-if="scope.row.enabled=='0'" class="dshx">关闭</p>
						</template>
          </el-table-column>
          <el-table-column prop="create_time"  label="创建时间" width="180"></el-table-column>
          <el-table-column prop="update_time"  label="修改时间" width="180"></el-table-column>
          <el-table-column label="操作" width="260" fixed="right">
            <template slot-scope="scope">
							<!-- <el-button type="text" v-if="scope.$index == '0'" disabled><i class="iconfont icon-Gototop"></i></el-button> -->
							<el-button type="text" @click="order(scope.$index,scope.row.id,3)"><i class="iconfont icon-Gototop"></i></el-button>
							<el-button type="text" v-if="scope.$index == '0'" disabled><i class="iconfont icon-up"></i></el-button>
							<el-button type="text" v-else @click="order(scope.$index,scope.row.id,1)"><i class="iconfont icon-up"></i></el-button>
              <el-button type="text" v-if="scope.$index != tableLength" @click="order(scope.$index,scope.row.id, 2)"><i class="iconfont icon-down"></i></el-button>
              <el-button type="text" v-else disabled ><i class="iconfont icon-down"></i></el-button>
							<el-button type="text" @click="order(scope.$index,scope.row.id, 4)"><i class="iconfont icon-Gotobottom"></i></el-button>
              <!-- <el-button type="text" v-else disabled ><i class="iconfont icon-Gotobottom"></i></el-button> -->
							<el-button type="text" @click="editClass(scope.row)"><i class="iconfont icon-edit"></i></el-button>
							<el-button type="text"><i class="iconfont icon-delete" @click="deleteClass(scope.row.id)"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="marT20">
          <el-pagination class="text-right" background @current-change="handleCurrentChange" 
          :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" 
          layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages" @size-change="handleSizeChange">
          </el-pagination>
        </div>
      </div>
      <el-dialog center :before-close="beforeClose"
        width="30%" :close-on-click-modal="false"
        :visible.sync="newDialog" append-to-body>
        <el-form :model="classForm" :rules="classRules" ref="classForm" label-width="110px" class="classForm">
          <el-form-item label="栏目标题" prop="name" size="mini">
            <el-input v-model="classForm.name" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="上传icon" label-width="110px" ref="icon" prop="icon">
            <el-upload action="" accept="image/jpeg,image/gif,image/png,image/bmp"
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
            <el-dialog :visible.sync="imgDialog" :modal='false'>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="使用状态" required>
             <el-radio v-model="classForm.enabled" label="1">启用</el-radio>
            <el-radio v-model="classForm.enabled" label="0">关闭</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="beforeClose()" class="light_btn">取 消</el-button>
          <el-button type="primary" @click="createClass" class="light_btn" >保 存</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import {miniTable,btnTable} from '@/utils/table-style.js'
import { getBaceUrl } from '@/utils/auth'
export default {
  data(){
    var valiIcon = (rule, value, callback) => { // 图片验证
        if (!this.hasFmt) {
         // callback(new Error('请上传图片'));
        } else {
          callback();
        }
      };
    return{
      pictureId:'',
      upData:[],
      columnName:'',
      hasChangeFile:false,
      fileList:[],
      isEdit:false,
      editId:'',
      newDialog:false,
      imgDialog:false,
      dialogImageUrl:'',
      loading:false,
      loading2:false,
      baceUrl:'',
      miniTable:miniTable,
      btnTable:btnTable,
      per_page: 10,
      total_pages: 0,
      currentPage: 1,
      tableData:[],
      input:'',
      classForm:{
        name:'',
        enabled:'1',
      },
      classRules:{
        name: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字', trigger: 'blur' }
          ],
        icon:[
         //   {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
        ]
        },
        hasFmt:false
    }
  },
  created() {
    this.baceUrl = getBaceUrl();
    this.getList();
  },
  
  methods:{
    // 排序
    order(index,id,f){
      var params={};
      var url='';
      if(f==1){   // 1 是向上交换
        params={
          tokenId: this.$store.state.user.tokenId,
          firstId:this.tableData[index-1].id,
          lastId:id
        }
        url='/videoColumn/updateByOrder';
      }else if(f==2){ //2是下移
        params={
          tokenId: this.$store.state.user.tokenId,
          firstId:id,
          lastId:this.tableData[index+1].id
        }
        url='/videoColumn/updateByOrder';
      }else if(f==3){ // 3是去顶部
        params={
          tokenId: this.$store.state.user.tokenId,
          operType:'0',
          id:this.tableData[index].id
         }
        url='/videoColumn/stickOrBottom';
      }else{  // 4是去底部
        params={
          tokenId: this.$store.state.user.tokenId,
          operType:'1',
          id:this.tableData[index].id
        }
        url='/videoColumn/stickOrBottom';
      }
      console.log(params);
      this.$post(url,params).then(res => {
        console.log(res);
        if(res.code == 0){
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.getList(this.currentPage);
        }else{
          this.$message({
            type: 'warning',
            message: res.msg?res.msg:'操作失败'
          });
        }
      });
    },
    //编辑
    editClass(row){
      // console.log(row);
      this.newDialog = true;
      this.hasChangeFile = false;
      this.classForm=JSON.parse(JSON.stringify(row));
      if(row.picture_url){
        this.fileList.push({url:row.picture_url});
      }
      this.hasFmt = true;
      this.editId = row.id;
      this.pictureId=row.picture_id;
      this.isEdit=true;
      // console.log(this.classForm);
    },
    // 新建分类
    createClass(){
      //this.newDialog=true;
      this.$refs.classForm.validate((valid) => {
        if(valid){
          const loading = this.$loading({
            lock: true,
            target:document.querySelector('.app-container'),
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          let param = new FormData();
          param.append('tokenId',this.$store.state.user.tokenId);
          param.append('name',this.classForm.name);
          param.append('enabled',this.classForm.enabled);
          if(this.isEdit){
            param.append('id',this.editId);
            param.append('pictureId',this.pictureId);
          }
          if(this.hasChangeFile){         // 如果编辑时更换了图片或者是新建时候上传了图片
            param.append('newsFile',this.classForm.file,this.classForm.filename);
          }else{
             param.append('newsFile','');
          }
          this.$post('videoColumn/save',param).then(res =>{
            // console.log(res)
            if(res.code == 0){
              this.newDialog = false;
              loading.close();
              this.$refs['upload'].clearFiles();  // 清空图片
              this.$refs['classForm'].resetFields();  // 清空表单
              this.classForm.enabled = '1';
              this.classForm.file='';
              this.fileList=[];   // 清空图片列表
              this.$message({
                type: 'success',
                message: res.msg
              });
              setTimeout(() => {
                this.getList(this.currentPage);
              }, 500);
            }else{
              this.$message({
                type: 'warning',
                message: res.msg?res.msg:'出错了'
              });
            }
          })
        }
      })
    },
    // 删除行业
    deleteClass(id){
      this.$confirm('此操作将删除该栏目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            tokenId: this.$store.state.user.tokenId,
            id:id
          }
          this.$post('videoColumn/delete',params).then(res => {
          console.log(res)
          if(res.code == 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            setTimeout(() => {
              this.getList();
            }, 1000);
          }else if(res.code == '1'){
            this.$message({
              type: 'error',
              message: res.msg
            });
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
    getList(val){
      this.currentPage=val?val:1;
      var params = {
        tokenId: this.$store.state.user.tokenId,
        limit: this.per_page,
        offset: this.currentPage,
        queryField:this.columnName
      }
      this.$get('/videoColumn/list',params).then(res => {
        // console.log(res)
        if(res.code==0){
          this.tableData = res.data[0].rows;
          this.loading=false;
          this.total_pages = res.data[0].total;
        }
      })
    },
    beforeClose(){
      this.newDialog = false;
      this.fileList=[];
      this.$refs['classForm'].resetFields();
      this.isEdit=false;
      this.classForm={
        title:'',
        enabled:'1',
      }
      // console.log(this.classForm);
    },
    handleCurrentChange(val) {
      // this.currentPage = val;
      this.getList(val);
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.imgDialog = true;
    },
    fileChange(file,fileList){
      this.$refs['icon'].clearValidate(); // 图片验证
      this.classForm.filename = file.name;
      this.hasChangeFile=true;
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
      this.pictureId='';
      this.hasChangeFile=true;
      // console.log(file, fileList);
      if(fileList.length == 0){
        this.hasFmt =false;
        this.classForm.file='';
        this.classForm.filename='';
      }
    },
    handleSizeChange(val){
      this.per_page = val;
      this.getList()
    }
  },
  computed: {
			tableLength: function() {
				return this.tableData.length - 1;
      },
      upDataLength:function(){
        return this.upData.length - 1;
      }
		},
}
</script>
<style>

</style>


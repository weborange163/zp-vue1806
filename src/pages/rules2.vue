<template>
    <div class="page-body rules">
      <div class="page-header">
      </div>
      <div class="box">
        <div class="text-right marBo4">
          <el-button class="light_btn" @click="newDialog = true;sourceForm.name='';">新建</el-button>
        </div>
        <el-table :row-class-name="btnTable()" :header-row-class-name="btnTable()" v-loading="loading"
          :data="tableData"
          stripe border
          style="width: 100%;max-width:600px;margin:0 auto;">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="name"  label="转载来源"></el-table-column>
          <el-table-column label="操作" width="160" fixed="right">
            <template slot-scope="scope">
							<el-button type="text" @click="editSource(scope.row)"><i class="iconfont icon-edit"></i></el-button>
							<el-button type="text"><i class="iconfont icon-delete" @click="deleteSource(scope.row.id)"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="marT20">
          <el-pagination class="text-right" background @current-change="handleCurrentChange" 
          :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" 
          layout="total, sizes, prev, pager, next, jumper" :total="this.total" @size-change="handleSizeChange">
          </el-pagination>
        </div>
        <el-dialog center
          width="30%"
          :visible.sync="newDialog"
          append-to-body>
          <el-form :model="sourceForm" :rules="sourceRules" ref="sourceForm" label-width="110px" class="sourceForm">
            <el-form-item label="转载来源" prop="title">
              <el-input v-model="sourceForm.name" size="mini" style="width:70%;"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="newDialog = false;fileList=[];" class="light_btn">取 消</el-button>
            <el-button type="primary" @click="createSource" class="light_btn">添 加</el-button>
          </span>
        </el-dialog>
      </div>
      
    </div>
</template>
<script>
import {btnTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      loading:false,
      btnTable:btnTable,
      input:'',
      tableData:[],
      per_page: 10,
      total: 0,
      currentPage: 1,
      isEdit:false,
      editId:'',
      newDialog:false,
      sourceForm:{
        name:''
      },
      sourceRules:{
        title:[
          { required: true, message: '请输入转载来源', trigger: 'blur' },
          // { min: 2, max: 14, message: '长度在 2 到 14 个字', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList();
  },
  methods:{
    getList(){
      this.loading=true;
      var params = {
        tokenId: this.$store.state.user.tokenId,
        limit: this.per_page,
        offset: this.currentPage,
      }
      this.$get('reprintSth/list',params).then(res => {
        // console.log(res)
        if(res.code == 0){
          this.tableData = res.data[0].rows;
          this.total = res.data[0].total;
          this.loading=false;
        }
      })
    },
    createSource(){
      this.$refs.sourceForm.validate((valid) => {
        if(valid){
          var params={};
          params.tokenId = this.$store.state.user.tokenId;
          params.name = this.sourceForm.name;
          if(this.isEdit){
            params.id = this.editId
          }
          this.$post('reprintSth/save',params).then(res => {
           if(res.code == 0){
             this.newDialog = false;
             this.isEdit=false;
              setTimeout(() => {
                this.getList();
              }, 500);
              this.$message({
                type: 'success',
                message: res.msg
              });
           }
          });
        }
      })
    },
    editSource(row){
      this.newDialog=true;
      this.sourceForm.name=row.name;
      this.isEdit=true;
      this.editId=row.id;
    },
    deleteSource(id){
      this.$confirm('此操作将删除该转载来源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            tokenId: this.$store.state.user.tokenId,
            id:id
          }
          this.$post('reprintSth/delete',params).then(res => {
          // console.log(res)
          if(res.code == 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            setTimeout(() => {
              this.getList();
            }, 500);
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.per_page = val;
      this.getList();
    },
  }
}
</script>
<style>

</style>


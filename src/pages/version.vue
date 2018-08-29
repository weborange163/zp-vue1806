<template>
  <div class="page-body version">
    <div class="page-header">
      <el-select v-model="source" placeholder="应用平台" size="mini">
        <el-option 
        v-for="item in sources"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <el-button class="light_btn" size="mini" @click="getList">搜 索</el-button>
    </div>
    <div class="box">
      <el-row class="marBo4">
        <el-col :span="2" :offset="22">
          <el-button class="light_btn text-right" size="mini" @click="newDialog = true;">上传应用</el-button>
        </el-col>
      </el-row>
      <el-table :data="versionData" :row-class-name="btnTable"
      :header-row-class-name="btnTable" border v-loading="loading">
        <el-table-column label="序号" type="index" width='50'></el-table-column>
        <el-table-column prop="version_name" label="版本号"></el-table-column>
        <el-table-column prop="version_code" label="code版本"></el-table-column>
        <el-table-column prop="platform_type" label="应用平台" width='80'>
          <template slot-scope="scope">
            <p v-if="scope.row.platform_type=='1'" class="yshx">安卓</p>
            <p v-if="scope.row.platform_type=='2'" class="dshx">iOS</p>
          </template>
        </el-table-column>
        <el-table-column prop="file_size" label="应用大小"></el-table-column>
        <el-table-column prop="package_name" label="应用包名" width='260'></el-table-column>
        <el-table-column prop="update_time" label="修改时间" width='140'></el-table-column>
        <el-table-column label="状态" width='80'>
          <template slot-scope="scope">
            <p v-if="scope.row.status=='1'" class="dshx">新建</p>
            <p v-if="scope.row.status=='2'" class="yshx">已上线</p>
            <p v-if="scope.row.status=='3'" class="yyx">已下线</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.platform_type == '1'" @click="downBag(scope.row.download_url)">下载</el-button>
            <el-button type="text" v-else disabled>下载</el-button>
            <el-button type="text" class="marR10" v-if="scope.row.status == '2'" @click="onOff('3',scope.row.id)">下线</el-button>
            <el-button type="text" v-else @click="onOff('2',scope.row.id)" >上线</el-button>
            <router-link :to="{name:'version-list',params:{id:scope.row.id}}">
              <el-button class="marR10" type="text">查看</el-button>
            </router-link>
                 <!--<el-button class="light_btn">添加新闻</el-button>-->
            <el-button type="text" v-if="scope.row.status == '1'" @click="editBag(scope.row)"><i class="iconfont icon-edit"></i></el-button>
            <el-button type="text" @click="deleteBag(scope.row.id)"><i class="iconfont icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      	  <!-- 分页 -->
      <div class="marT20">
        <el-pagination class="text-right" background @current-change="handleCurrentChange" 
        :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" 
        layout="total, sizes, prev, pager, next, jumper" :total="this.total_pages" @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </div>

     <!-- 新增/修改应用包 -->
    <el-dialog center :close-on-click-modal="false"
        width="30%" :before-close="beforeClose"
        :visible.sync="newDialog"
        >
        <div class="el-form-item1">
          <label class="el-form-item__label1" style="width: 110px;line-height:28px">
            应用平台
          </label>
          <div class="el-form-item__content1">
            <el-select size="mini" v-model="plat" placeholder="请选择应用平台" :disabled="isEdit"
                @change="selectChange">
                <el-option label="安卓" value="1"></el-option>
                <el-option label="iOS" value="2"></el-option>
            </el-select>
          </div>
        </div>
        <el-form :model="bagForm" :rules="bagRules" ref="bagForm" label-width="110px" class="bagForm">
          <el-form-item class="hei74" v-if="plat == '1'" label="上传应用包" label-width="110px" ref="icon" prop="icon">
            <el-upload action="" class="upload-demo"
              :multiple="false" :limit='1'
              ref="upload" name="file"
              :file-list="fileList"
              :auto-upload="false" :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :on-change="fileChange"
              :on-remove="handleRemove">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-dialog :visible.sync="imgDialog">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item v-if="plat == '2'" label="上传路径" prop="url">
            <el-input size="mini" v-model="bagForm.url" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="版本号" prop="num">
            <el-input size="mini" v-model="bagForm.num" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="code版本" prop="bagcode">
            <el-input size="mini" v-model="bagForm.bagcode" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="应用包名" prop="bagname">
            <el-input size="mini" v-model="bagForm.bagname" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="版本提示" prop="desc" style="height:60px;" class="hei74">
            <el-input type="textarea" :rows="3" v-model="bagForm.desc" style="width:70%;height:60px;"></el-input>
          </el-form-item>
          <el-form-item label="升级模式" prop="radio" style="margin-top:36px;">
            <el-radio v-model="bagForm.radio" label="0">可选升级</el-radio>
            <el-radio v-model="bagForm.radio" label="1">强制升级</el-radio>
          </el-form-item>
          <!-- <el-button @click="$refs.bagForm.resetFields()">重置</el-button> -->
          <!-- <el-form-item label="延时生效" required>
            <el-select size="mini" v-model="bagForm.delay" placeholder="请选择延时生效时间" style="width:70%;">
              <el-option label="立即生效" value="0"></el-option>
              <el-option label="5分钟" value="5"></el-option>
              <el-option label="10分钟" value="10"></el-option>
              <el-option label="15分钟" value="15"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="beforeClose" class="light_btn">取 消</el-button>
          <el-button type="primary" @click="createBag" class="light_btn"
          v-loading.fullscreen.lock="loading2"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          >保 存</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    var valiIcon = (rule, value, callback) => { // 图片验证
        if (!this.hasFmt) {
          callback(new Error('请上传安装包'));
        } else {
          callback();
        }
      };
    return{
      newDialog:false,
      newDialog1:false,
      imgDialog:false,
      loading2:false,
      plat:'1',
      dialogImageUrl:'',
      bagForm:{
        radio:'0'
      },
      bagRules:{
        icon:[
         {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
        ],
        num: [
          { required: true, message: '请输入版本号', trigger: 'blur' },
          {pattern:/^[a-zA-Z0-9.]+$/,message:'只允许输入英文数字和.', trigger: 'blur'}
        ],
        bagcode:[
          {required: true, message: '请输入code版本', trigger: 'blur' },
          {pattern: /^[0-9]*$/,message:'code版本只能输入数字', trigger: 'blur'}
        ],
        bagname:[
          {required: true, message: '请输入应用报名', trigger: 'blur' },
          {pattern:/^[a-zA-Z0-9.]+$/,message:'只允许输入英文数字和.', trigger: 'blur'}
        ],
        desc:[
           {required: true, message: '请输入code版本', trigger: 'blur' },
        ]
      },
      fileList:[],
      hasFmt:false,
      versionData:[],
      loading:false,
      multipleSelection: [],
      newArticle:[
        {
          num:1,
          title:'test7mkaiemlaoapuemske93osksks',
          author:'web'
        }
      ],
      activeTab:'first',
      recommendRadio:1,
      dialogVisible: false,
      dialogVisible1: false,
      per_page:10,
      total_pages:0,
      currentPage:1, // 页面默认展示的当前页码
      source:'',
      isEdit:false,
      sources:[
        {
          value:'0',
          label:'全部'
        },
        {
          value:'2',
          label:'iOS'
        },
        {
          value:'1',
          label:'Adroid'
        },
      ] 
    }
  },
  created() {
    this.getList();
    // console.log(111111,this.hasFmt)
  },
  methods:{
    downBag(url){
      this.$confirm('确定要下载此应用包吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        window.location.href=url;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        });          
      });
    },
    selectChange(val){
      console.log(val);
      if(val=='2'){
        this.$refs['icon'].clearValidate();
      }
      this.$refs['bagForm'].resetFields();
    },
    editBag(row){
      console.log(row);
      this.newDialog = true;
      this.plat = row.platform_type;
      this.fileList.push({url:row.download_url,name:row.file_name});
      this.bagForm.url = row.download_url;
      this.bagForm.num = row.version_name;
      this.bagForm.bagcode = row.version_code;
      this.bagForm.bagname = row.package_name;
      this.bagForm.desc = row.upgrade_content;
      this.bagForm.radio = row.upgrade_mode;
      this.hasFmt = true;
      this.editId = row.id;
      this.isEdit=true;
    },
    // 创建包
    createBag(){
      this.$refs['bagForm'].validate((valid) => {
        console.log(valid)
        if(this.plat=='2'){
          if(this.bagForm.num&&this.bagForm.bagcode&&this.bagForm.bagname&&this.bagForm.desc){
            console.log(111)
            // valid=true;
          }
        }
        if(valid){
          this.loading2 = true;
          console.log(valid)
          let param = new FormData();
          param.append('tokenId',this.$store.state.user.tokenId);
          param.append('appType',1);  
          param.append('platformType',this.plat);
          param.append('versionName',this.bagForm.num);
          param.append('versionCode',this.bagForm.bagcode);
          param.append('packageName',this.bagForm.bagname);
          param.append('upgradeContent',this.bagForm.desc);
          param.append('upgradeMode',this.bagForm.radio);
          param.append('status','1');
          // param.append('delayTime',this.bagForm.delay);
          if(this.plat=='1'){
            param.append('newsFile',this.bagForm.file,this.bagForm.filename);
          }else{
            param.append('downloadUrl',this.bagForm.url);
          }
          if(this.isEdit){
            param.append('id',this.editId);
          }
          this.$post('appUpgrade/save',param).then(res =>{
            console.log(res)
             // 清空图片列表
             this.loading2 =false;
            if(res.code == 0){
              if(this.plat == '1'){
                this.$refs['upload'].clearFiles();  // 清空图片
              }
              this.$refs['bagForm'].resetFields();  // 清空表单
              this.bagForm.radio = '0';
              this.plat='1';
              this.fileList=[];
              this.hasFmt=false;
              this.editId='';
              this.newDialog = false;
              this.$message({
                type: 'success',
                message: res.msg
              });
              setTimeout(() => {
                this.getList();
              }, 500);
            }else{
              this.$message({
                type: 'error',
                message: res.msg
              });
            }
          })
        }
      })
    },
    beforeClose(){
      this.$confirm('关闭后输入的信息将重置!')
        .then(()=> {
          this.$refs['bagForm'].resetFields();
          this.fileList=[];
          this.isEdit=false;
          this.newDialog=false;
          this.plat='1';
          this.bagForm={
            radio:'0'
          }
          done();
        })
        .catch(() => {});
    },
    onOff(status,id){
      var text = '';
      if (status == '2'){
        text = '上线';
      }else{
        text= '下线';
      }
      this.$confirm(`确定要${text}当前应用包吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          var params = {
            tokenId: this.$store.state.user.tokenId,
            status:status,
            id:id
          }
          this.$post('appUpgrade/onAndOffLine',params).then(res => {
            console.log(res);
            if(res.code == 0){
              setTimeout(() => {
                this.getList();
              }, 500);
              this.$message({
                type: 'success',
                message: res.msg
              });
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    deleteBag(id){
      this.$confirm('此操作将删除该应用包, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            tokenId: this.$store.state.user.tokenId,
            status:0,
            id:id
          }
          this.$post('appUpgrade/delete',params).then(res => {
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
        platformType:this.source
      }
      if(this.source=='0'){
        params.platformType = '';
      }
      this.$get('appUpgrade/list',params).then(res => {
        console.log(res)
        if(res.code==0){
          this.versionData = res.data[0].rows;
          this.loading=false;
          this.total_pages = res.data[0].total;
        }
      })
    },
   	miniTable(row){
      return 'miniTable'
    },
    btnTable(row){
    	return 'btnTable'
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
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.imgDialog = true;
    },
    fileChange(file,fileList){
      this.$refs['icon'].clearValidate(); // 图片验证
      this.bagForm.filename = file.name;
      this.bagForm.file = file.raw;
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
  },
}
</script>
<style>
 .bagForm .el-form-item{
    margin-bottom: 22px;
  }

 .bagForm .el-form-item__content{
   height: 28px;
   line-height: 28px;
 }
 .hei74 .el-form-item__content{
    height: 74px;
 }
.bagForm .el-form-item__label{
  line-height: 28px;
}
.version .el-dialog--center .el-dialog__body{
 padding-bottom: 0;
}
.el-form-item1 {
  margin-bottom: 22px;
}
 .el-form-item__label1{
   height: 28px;
  line-height: 28px;
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
 .el-form-item__content1 {
  height: 28px;
  line-height: 28px;
  position: relative;
  font-size: 14px;
  margin-left: 110px;
}
</style>


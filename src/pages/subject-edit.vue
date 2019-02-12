<template>
  <div class="page-body subject-edit">
  	<el-dialog center width="375px"  :visible.sync="bannerDialog" append-to-body>
			<div class="subjectForm">
        <div id="div1">
          <div class="mask">
          </div>
          <img :src="imgFullSrc" />
          <div id="div_title">
            <p id="p_title">{{subjectForm.title }}</p>
            <p id="div_times">88位跟踪者 <a></a><span>88分钟前 </span></p>
          </div>
          </div>
          <div id="div2">
              <h2>导读</h2>
              <p id="div2_content" v-html="subjectForm.description" class="content1 showClass">
              </p>
              <!-- <img id="drop-down" src="@/assets/img/xiala.png" /> -->
          </div>
			</div>
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
        <el-button size="small" @click="showPre" class="light_btn">预览</el-button>
				<!-- <el-button size="small" class="light_btn" @click="bannerDialog = true;">预览</el-button> -->
				<el-button size="small" class="light_btn" @click="addSubject('subjectForm',subjectForm.status)">保存</el-button>
				<el-button size="small" class="light_btn" @click="addSubject('subjectForm','4')">保存并上线</el-button>
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
            <div class="el-upload__tip" slot="tip">(规格：750x315)</div>
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
              <el-button class="light_btn" @click="searchAdd=true;searchLinkArt=[];searchInput=''">批量添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-table :data="artData" border :row-class-name="miniTable" :header-row-class-name="miniTable">
            <el-table-column label="序号" type="index" align="center" width='50'></el-table-column>
            <el-table-column prop="title" label="标题" min-width="380"></el-table-column>
            <el-table-column prop="articleId" label="文章ID" width="80"></el-table-column>
            <el-table-column  label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="text" v-if="scope.$index != 0" @click="changeIndex(scope.$index,artData,'toTop')">
                  <i class="iconfont icon-Gototop"></i>
                </el-button>
                <el-button type="text" v-else disabled>
                  <i class="iconfont icon-Gototop unclick"></i>
                </el-button>
                <el-button type="text" v-if="scope.$index != 0" @click="changeIndex(scope.$index,artData,'isUp')">
                  <i class="iconfont icon-up"></i>
                </el-button>
                <el-button type="text" v-else disabled>
                  <i class="iconfont icon-up unclick"></i>
                </el-button>
                <el-button type="text" v-if="scope.$index != upDataLength" @click="changeIndex(scope.$index,artData,'isDown')">
                  <i class="iconfont icon-down"></i>
                </el-button>
                <el-button type="text" v-else disabled>
                  <i class="iconfont icon-down" style="cursor:not-allowed"></i>
                </el-button>
                <el-button type="text" v-if="scope.$index != upDataLength" @click="changeIndex(scope.$index,artData,'toBottom')">
                  <i class="iconfont icon-Gotobottom"></i>
                </el-button>  
                <el-button type="text" v-else disabled>
                  <i class="iconfont icon-Gotobottom" style="cursor:not-allowed"></i>
                </el-button>
                <el-button @click="handleClick(scope.$index,artData,0)" type="text" size="small">
                  <i class="iconfont icon-delete-file"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
            <colgroup>
              <col name="el-table_1_column_1" width="30%">
              <col name="el-table_1_column_1" width="70%">
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td><div class="cell">发布来源</div></td>
                <td>
                  <div class="cell">PC后台
                    <!-- <span v-if="subjectForm.publishSource == '1'">PC后台</span>
                    <span v-if="subjectForm.publishSource == '2'">数据爬取</span>
                    <span v-if="subjectForm.publishSource == '3'">APP端</span> -->
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">专题ID</div></td>
                <td>
                  <div class="cell">
                    {{subjectForm.articleId}}
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">状态</div></td>
                <td>
                  <div class="cell">
                    <span v-if="subjectForm.status == '0'">新建</span>
                    <span v-if="subjectForm.status == '1'">待审核</span>
                    <span v-if="subjectForm.status == '2'">审核中</span>
                    <span v-if="subjectForm.status == '3'">审核不通过</span>
                    <span v-if="subjectForm.status == '4'">已上线</span>
                    <span v-if="subjectForm.status == '5'">已下线</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border marT20">
              <colgroup>
                <col name="el-table_1_column_1" >
                <col name="el-table_1_column_1" >
                <col name="el-table_1_column_1" >
                <col name="el-table_1_column_1" >
              </colgroup>
              <tbody>
                <tr class="el-table__row" style="background:#fafafa;font-weight:600;">
                  <td><div class="cell">时间类型</div></td>
                  <td><div class="cell">时间</div></td>
                  <td><div class="cell">操作账号</div></td>
                  <td><div class="cell">备注</div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">创建时间</div></td>
                  <td><div class="cell">{{subjectForm.createTime}}</div></td>
                  <td><div class="cell">{{subjectForm.createUser}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">上线时间</div></td>
                  <td><div class="cell">{{subjectForm.onlineTime}}</div></td>
                  <td><div class="cell">{{subjectForm.onlineUser}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">下线时间</div></td>
                  <td><div class="cell">{{subjectForm.offlineTime}}</div></td>
                  <td><div class="cell">{{subjectForm.offlineUser}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">修改时间</div></td>
                  <td><div class="cell">{{subjectForm.updateTime}}</div></td>
                  <td><div class="cell">{{subjectForm.updateUser}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">审核时间</div></td>
                  <td><div class="cell">{{subjectForm.checkTime}}</div></td>
                  <td><div class="cell">{{subjectForm.checkReason=='涉及敏感词'?'机审':subjectForm.checkPerson}}</div></td>
                  <td><div class="cell"><p v-if="subjectForm.status=='3'">{{subjectForm.checkReason=='其它'?subjectForm.checkMessage:subjectForm.checkReason}}</p></div></td>
                </tr>
              </tbody>
            </table>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="searchAdd">
        <div style="margin-bottom:20px">
          <el-input v-model="searchInput" style="width:80%" size="mini" placeholder="请输入搜索内容"></el-input>
          <el-button class="light_btn" @click="searchMore" size="mini">搜索</el-button>
        </div>
        <el-table :data="searchLinkArt" border :row-class-name="miniTable" :header-row-class-name="miniTable">
          <el-table-column label="序号" type="index" align="center" width='50'></el-table-column>
          <el-table-column prop="title" label="标题" min-width="390"></el-table-column>
          <el-table-column prop="articleId" label="文章ID" width="100"></el-table-column>
          <el-table-column  label="操作" width="150">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.flag" @click="handleClick1(scope.row,artData,0)" type="text" size="small">取消关联</el-button>
              <el-button v-else @click="handleClick1(scope.row,artData,1)" type="text" size="small">关联</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="text-right marT20" background @current-change="handleCurrentChange" :current-page="currentPage" 
          :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" :total="this.total_pages">
        </el-pagination>
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
      per_page:20,
      total_pages:1,
      currentPage:1,
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
  computed: {
    upDataLength: function() {
      return this.artData.length - 1;
    }
  },
  methods:{
    handleCurrentChange(val){
      this.currentPage=val;
      this.searchNews();
    },
    handleSizeChange(val){
      this.per_page=val;
      this.searchNews();
    },
    showPre(){
       this.$refs['subjectForm'].validate((valid) => {
         if(valid){
            this.bannerDialog=true;
         }
       })
    },
    changeIndex(index, rows, dir) {
        // console.log(index);
				if(dir == 'isUp') {
					var a = rows[index]
					var b = rows[index - 1]
					rows.splice(index - 1, 1, a)
					rows.splice(index, 1, b)
				} else if(dir == 'isDown') {
					var a = rows[index]
					var b = rows[index + 1]
					rows.splice(index + 1, 1, a)
					rows.splice(index, 1, b)
				}else if(dir == 'toTop'){
          var a = rows[index];
          rows.splice(index,1);
          rows.unshift(a);
        }else{
          var a=rows[index];
          rows.splice(index,1);
          rows.push(a);
        }
			},
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
        this.searchNews();
      }
    },
    searchNews(){
      let params = {
          tokenId:this.$store.state.user.tokenId,
          idOrTitle:this.searchInput,
          offset:this.currentPage,
          limit:this.per_page
        }
      this.$post('news/getlist',params).then(res => {
            console.log(res);
            if(!res.data[0].rows[0]){
              this.$message.error('很抱歉,没有匹配的文章!');
            }else{
              var result = res.data[0].rows;
              this.total_pages=res.data[0].total;
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
      this.imgFullSrc='';
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
      this.imgFullSrc=file.url;
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
.subject-edit .quill-editor .ql-container{
		min-height: 150px;
  }
  .subject-edit .el-table td, 
  .subject-edit .el-table th{
    padding: 4px 0;
  }
#div1{
  position: relative;
  width: 100%;
  height: 150px;
}
#div1 .mask{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color:rgba(0,0,0,0.4);
}
#div1 img{
    width: 100%;
    height: 100%;
}
#div_title{
    width: 290px;
    position: absolute;
    left: 20px;
    top: 60px;
    font-size: 17px;
    color: #FFFFFF;
    z-index: 9;
}
#p_title{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  line-height: 1.3;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#div_times{
  overflow: hidden;
  position: absolute;
  font-size: 12px;
  margin-top: 14px;
}
#div_times a{
    color: #ADADAD;
    margin-right: 0.18rem;
    
}
#div_times span{
    color: #ADADAD;
}
#div2{
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: 10px;

}
#div2 h2{
    color: #333333;
    font-size: 18px;
    margin-bottom: 10px;
    margin-top: 2px;
}
#div2 #div2_content{
    font-size:16px;
    color: #666666;
    line-height: 1.3;

}
#div2 .content1{
    /*height: 1.8rem;
    overflow: hidden;
    overflow : hidden;*/
    /*text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;*/
    position:relative;
}
#drop-down {
    position: absolute;
    width: 14px;
    height: 8px;
    right: 2px;
    bottom: 8px;
    z-index: 10;
}
</style>


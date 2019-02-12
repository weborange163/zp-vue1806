<template>
	<div class="page-body video_second" style="min-width:980px;">
    
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>发布内容</el-breadcrumb-item>
				<el-breadcrumb-item>审核视频</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-dialog title="审核页面" :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="form" label-width="80px" :rules="rules">
				<el-form-item label="审核原因" prop="region">
					<el-select size="mini" v-model="form.region" placeholder="请选择不通过的原因" style="width:100%" @change="selectChange">
						<el-option label="涉嫌敏感内容" value="涉嫌敏感内容"></el-option>
						<el-option label="标题与视频不符" value="标题与视频不符"></el-option>
						<el-option label="内容无具体信息，无意义" value="您内容无具体信息，无意义"></el-option>
						<el-option label="内容不符合栏目属性" value="内容不符合栏目属性"></el-option>
            <el-option label="内容低俗，标题党" value="内容低俗，标题党"></el-option>
            <el-option label="其它" value="其它"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核信息">
					<el-input size="mini" type="textarea" v-model="form.name" auto-complete="off" :disabled="qita"
          placeholder="审核原因选择其它,可以填写审核信息"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="toAudit('3')">确 定</el-button>
			</div>
		</el-dialog>
		<div class="box" >
			<div class="text-right marR100">
				<el-button size="small" @click="fanhui" class="light_btn">返回</el-button>
        <el-button size="small" class="light_btn" @click="dialogFormVisible = true">不通过</el-button>
				<el-button size="small" class="light_btn" @click="toAudit('4')">通过</el-button>
			</div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form1" :model="form1" label-width="96px" class="up_form clearfix">
            <div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
              <el-form-item label="视频标题" prop="title" >
                <el-input type="textarea" disabled autosize v-model="form1.title" placeholder="请输入标题" style="width:420px;"></el-input>
              </el-form-item>
              <el-form-item label="视频简介" class="editor">
                <el-input type="textarea" disabled  v-model="form1.content" :rows="6" style="width:420px;"></el-input>
              </el-form-item>
              <el-form-item label="视频预览:">
                <video :src="form1.videoUrl" width="320" height="240" controls style="background:rgba(0,0,0,0.7)">
                  <source :src="form1.videoUrl" type="video/mp4">
                </video>
              </el-form-item>
            </div>
            <div style="width: 35%;float:left;padding:15px;min-width:420px;">
              <el-form-item label="发布到:" prop="columnId">
                <el-select filterable v-model="form1.columnId" name="columnId" disabled placeholder="请选择">
                  <el-option
                    v-for="item in columnIds"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="fabuStyle" label="发布账号:" prop="userId">
                <el-select filterable v-model="form1.userId" disabled placeholder="请选择发布账号">
                  <el-option 
                    v-for="item in accounts"
                    :key="item.userId"
                    :label="item.nickName"
                    :value="item.userId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Tag标签:" prop="tagLabels">
                <el-input disabled placeholder="用'，'隔开，单个标签小于12字节" v-model="form1.tagLabels"></el-input>
              </el-form-item>
              <!-- <el-form-item label="关键词:">
                <el-input placeholder="用英文 “ , ” 隔开" v-model="form1.keyWords"></el-input>
              </el-form-item> -->
              <el-form-item label="视频ID:" >
                <el-input disabled  v-model="form1.articleId" ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="second">
          <div class="tableOverstyle">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
              <colgroup>
                <col name="el-table_1_column_1" width="20%">
                <col name="el-table_1_column_1" width="30%">
                <col name="el-table_1_column_1" width="20%">
                <col name="el-table_1_column_1" width="30%">
              </colgroup>
              <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">发布来源</div></td>
                  <td>
                    <div class="cell">
                      <span v-if="form1.publishSource == '1'">PC后台</span>
                      <span v-if="form1.publishSource == '2'">数据爬取</span>
                      <span v-if="form1.publishSource == '3'">APP端</span>
                    </div>
                  </td>
                  <td><div class="cell">状态</div></td>
                  <td>
                    <div class="cell">
                      <span v-if="form1.status == '0'">新建</span>
                      <span v-if="form1.status == '1'">待审核</span>
                      <span v-if="form1.status == '2'">审核中</span>
                      <span v-if="form1.status == '3'">审核不通过</span>
                      <span v-if="form1.status == '4'">已上线</span>
                      <span v-if="form1.status == '5'">已下线</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">系统评论量</div></td>
                  <td><div class="cell">{{form1.commentsImport}}</div></td>
                  <td><div class="cell">用户评论量</div></td>
                  <td><div class="cell">{{form1.comments}}</div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">系统收藏量</div></td>
                  <td><div class="cell">{{form1.likesImport}}</div></td>
                  <td><div class="cell">用户收藏量</div></td>
                  <td><div class="cell">{{form1.likes}}</div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">系统点赞量</div></td>
                  <td><div class="cell">{{form1.goodsImport}}</div></td>
                  <td><div class="cell">用户点赞量</div></td>
                  <td><div class="cell">{{form1.goods}}</div></td>
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
                  <td><div class="cell">{{form1.createTime}}</div></td>
                  <td><div class="cell">{{form1.createUser}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">上线时间</div></td>
                  <td><div class="cell">{{form1.onlineTime}}</div></td>
                  <td><div class="cell">{{form1.onlineUser}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">下线时间</div></td>
                  <td><div class="cell">{{form1.offlineTime}}</div></td>
                  <td><div class="cell">{{form1.offlineUser}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">修改时间</div></td>
                  <td><div class="cell">{{form1.updateTime}}</div></td>
                  <td><div class="cell">{{form1.updateUser}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">审核时间</div></td>
                  <td><div class="cell">{{form1.checkTime}}</div></td>
                  <td><div class="cell">{{form1.checkReason=='涉及敏感词'?'机审':form1.checkPerson}}</div></td>
                  <td><div class="cell"><p v-if="form1.status=='3'">{{form1.checkReason=='其它'?form1.checkMessage:form1.checkReason}}</p></div></td>
                </tr>
              </tbody>
            </table>
            <el-table :data="tableData" style="width: 100%" class="marT20" border>
              <el-table-column label="序号" type="index" align="center" width='50'></el-table-column>
              <el-table-column prop="content" label="评论内容" ></el-table-column>
              <el-table-column prop="nick_name" label="账号"></el-table-column>
              <el-table-column prop="create_time" label="评论时间" ></el-table-column>
            </el-table>
            <el-pagination class="text-right marT20" background @current-change="handleCurrentChange" :current-page="currentPage" 
              :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange" :total="this.total_pages">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
			
		</div>
	</div>
</template>
<script>
//import MQuillEditor from 'm-quill-editor'
import { getBaceUrl } from '@/utils/auth'
import myVali from '@/utils/myVali'
	export default{
		components: {
		//	MQuillEditor
    },
		data(){
      var valiTag=(rule,value,callback) => {
        if (value === '') {
          callback();
        } else {
          console.log(value)
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
			return{
        currentPage:1,
        per_page:10,
        total_pages:1,
        tableData:[],
        activeName:'first',
        uploadVideoing1:false,
        uploadVideoing2:false,
        dialogFormVisible: false,
        formDatas:'',
        accounts:[],
        fileList:[],
        fileListVideo:[],
				pkg:'',
				uploadData:{},
				baceUrl:'',
				// content:'111',
				dialogImageUrl: '',
        dialogVisible: false,
				form1: {
					title: '',
					content:'',
          columnId:'',
					author:'',
					userId:'',
					imgType:'0',
					newsFile:'',
					tagLabels:'',
					keyWords:''
        },
        form: {
					name: '',
					region: '涉嫌敏感内容',
        },
        qita:true,
        rules:{
          region:[
            {required:true}
          ]
        },
				cities:[],
        hasFmt:true,
        showUrl:'',
        argu:{},
        videoUrl:'',
        columnIds:'',
        videoId:"",
				idDetail:'',
			}
		},
		created(){
      this.baceUrl = getBaceUrl();
      this.videoUrl = this.baceUrl + '/news/addVideo';
      // console.log(this.videoUrl);
      this.$get('/column/findColumnList',{tokenId:this.$store.state.user.tokenId,navigationBar:''}).then(res => {
    		// console.log(res.data)
    		this.columnIds = res.data
    	});
      // console.log(this.$route.params);
      this.argu=this.$route.params.argu;
      this.getParams();
      this.showNews();
		},
		mounted() {
			this.$get('reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.cities = res.data
      });
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        // console.log(res)
        this.accounts = res.data;
      });
      this.getComment();
		},
		methods:{
      handleClose(done){
       let myVideo = document.getElementById("myVideo");
       myVideo.pause();
        done();
      },
      getParams () {
        // 取到路由带过来的参数 
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams
				this.idDetail = this.$route.params.id;
				// console.log(this.idDetail)
      },
      getComment(){
        let params={
          tokenId:this.$store.state.user.tokenId,
          linkId:this.idDetail,
          limit:this.per_page,
          offset:this.currentPage
        }
        this.$post('/comment/importList',params).then(res => {
          if(res.code==0){
            this.tableData=res.data[0].rows;
            this.total_pages=res.data[0].total;
          }
        });
      },
      selectChange(val){
        console.log(val);
        if(val == '其它'){
          this.qita = false;
        }else{
          this.qita = true;
          this.form.name='';
        }
      },
      toAudit(num) {
        this.$confirm('是否要进行审核操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: this.$route.params.id,
            tokenId: this.$store.state.user.tokenId,
            status: num,
          };
          if(num==3){
            params.checkReason= this.form.region;
            params.checkMessage= this.form.name;
          }
          this.$post('/video/check', params).then(res => {
            // console.log(res);
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: res.msg
              });
              // console.log(backRoute);
              setTimeout(() => {
                this.$router.push({
                  name: 'audit-video',
                  params:{
                    argu:this.argu
                  }
                });
              }, 1000);
            }else if(res.code == 2){
              this.$message({
                type: 'info',
                message: res.msg
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核操作'
          });          
        });
				
			},
      getUContent: function(){
        let content = this.$refs.ueditor.getUEContent();
        console.log(content);
        this.form1.content = content;
      },
      beforeUpload(file){
        console.log(file);
      },
			getFullUrl(){
				return (this.baceUrl+'/news/add')
      },
      showNews(){
				var params = {
					tokenId:this.$store.state.user.tokenId,
					id:this.idDetail
				}
				this.$get('video/show',params).then(res => {
          this.form1 = res.data[0];
          this.accounts.map(item => {
            if(item.userId==this.form1.userId){
              console.log(item.nickName);
              this.form1.author=item.nickName;
              return;
            }
          });
				});
			},
      fanhui(){
        this.$router.push({
          name: 'audit-video',
          params: {
            argu: this.argu
          }
        });
      },
      handleSizeChange(val) {
        this.per_page=val;
        this.getComment();
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.getComment();
      },
    },
    /* beforeRouteEnter (to, from, next){
      console.log(from.query)
      if(from.query.argu){
         this.argu = from.query.argu;
        console.log(this.argu)
      }
      next();
    }, */
    beforeRouteLeave (to, from, next){
      to.meta.keepAlive = true;
      next();
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
	}
</script>
<style type="text/css">
	.up_form .el-upload-list--picture-card .el-upload-list__item,
	.up_form .el-upload--picture-card{
		width: 80px;
		height: 80px;
		line-height: 88px;
	}
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
		min-height: 550px;
		overflow-y: auto;
	}
  .source_style .el-form-item__error{
    left: -50px;
  }
  
  .edui-default{
    position: relative
  }
  .video_second .tableOverstyle{
    width: 1000px;
    margin: 20px auto;
  }
  .video_second .tableOverstyle td{
    padding: 4px 0;
  }
  
</style>
<template>
	<div class="page-body news_lookes" style="min-width:1200px;">
		<el-dialog center width="446px"  :visible.sync="detailDialog">
			<el-form :data="form1" ref="form1" label-width="110px" class="form1 u_editor">
        <div class="zhuan" v-if="form1.sourceType==2">
          <p class="title">{{form1.title }}</p>
					<div class="pubMsg">
            <div class="reprint">转载</div>
            <p v-html="form1.author"></p>
            <p>转自：<span v-html="form1.sourceName"></span></p>
            <p v-html="form1.updateTime"></p>
          </div>
				</div>
        <div class="yuan" v-else>
          <div class="pubMsg">
            <img id="img1" src="@/assets/img/yuanchuang.png"> 
            <p class="title">{{form1.title }}</p>
            <p v-html="form1.author"></p>
            <p v-html="form1.updateTime"></p>
          </div>
				</div>
				<article class="content" v-html="form1.content"></article>
			</el-form>
		</el-dialog>
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>新闻管理</el-breadcrumb-item>
				<el-breadcrumb-item>查看新闻资讯</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="box" >
			<div class="text-right marR100">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" @click="detailDialog = true;" >预览</el-button>
				<el-button size="small" v-if="form1.status == '0'" class="light_btn" @click="toAudit()">提交审核</el-button>
				<el-button size="small" class="light_btn" v-if="form1.status == '5'" @click="onOff('4','上线',form1.articleType)">上线</el-button>
				<el-button size="small" class="light_btn" v-if="form1.status == '4'&& form1.topFlag!='1'&&form1.recommend !='1'&&form1.specialNewsStatus!=1" @click="onOff('5','下线',form1.articleType)">下线</el-button>
				<!-- <el-button size="small" class="light_btn" v-else :disabled="true">下线</el-button> -->
			</div>
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form1" :model="form1" label-width="96px" :rules="rules1" class="up_form clearfix">
            <div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
              <el-form-item label="文章标题" prop="title" >
                <el-input type="textarea" autosize v-model="form1.title" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="文章内容" prop="content" class="editor ql-show">
                <div id="content" class="ql-editor" v-html="form1.content"></div>
              </el-form-item>
            </div>
            <div style="width: 35%;float:left;padding:15px;min-width:440px;">
              <el-form-item label="发布到:" prop="columnId">
                <el-select v-model="form1.columnId" placeholder="暂无栏目"  style='padding-left: 6px;' disabled>
                  <el-option v-for="item in columnIds" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="来源:" prop="sourceType">
                <el-radio-group v-model="form1.sourceType" >
                  <el-radio label="1" disabled>原创</el-radio>
                  <el-radio label="2" disabled>转载</el-radio>
                </el-radio-group>
                <el-select disabled v-if="form1.sourceType == 2" v-model="form1.source" placeholder="请选择来源" style="margin-left:20px;width:140px;">
                  <el-option
                    v-for="item in cities"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作者:">
                <el-input v-model="form1.author" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="发布账号:" v-if="form1.publishSource!='3'" prop="userId">
                <el-select v-model="form1.userId" disabled>
                  <el-option 
                    v-for="item in accounts"
                    :key="item.userId"
                    :label="item.nickName"
                    :value="item.userId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else label="发布账号:" required>
                <el-input size="mini" disabled v-model="form1.createUser"></el-input>
              </el-form-item>
              <el-form-item label="封面图样式:" prop="coverNum">
                  <el-radio-group v-model="form1.coverNum" disabled>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="封面图类型:" v-show="form1.coverNum != '0'">
                <el-radio-group v-model="form1.imgType" disabled>
                    <el-radio label="1">上传封面图</el-radio>
                    <el-radio label="2">提取正文图为封面图</el-radio>
                  </el-radio-group>
                <!-- <img class="wh80" :src="imgFullSrc" alt="封面图展示"> -->
                <ul>
                  <li v-for="item in form1.newsImgList" class="showImgs el-upload-list">
                    <img :src="item.coverImgUrl" />
                  </li>
                </ul>
              </el-form-item>
              <el-form-item label="视频预览:" v-if="form1.videoId">
                <video :src="form1.videoUrl" width="320" height="240" controls style="background:rgba(0,0,0,0.7)">
                  <source :src="form1.videoUrl" type="video/mp4">
                </video>
              </el-form-item>
              <el-form-item label="视频名称:" v-if="form1.videoId">
                <p v-text="form1.videoName"></p>
              </el-form-item>
              <el-form-item label="Tag标签:">
                <el-input  v-model="form1.tagLabels" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="推荐到:" v-if="form1.topFlag==1">
                <el-input value="新闻主页置顶" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="推荐到:" v-if="form1.recommend==1">
                <el-input value="新闻主页banner" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="推荐到:" v-if="form1.columnTopFlag==1">
                <el-input value="栏目置顶" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="文章ID:" >
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
                <!-- <tr class="el-table__row">
                  <td><div class="cell">系统点赞量</div></td>
                  <td><div class="cell">{{form1.goodsImport}}</div></td>
                  <td><div class="cell">用户点赞量</div></td>
                  <td><div class="cell">{{form1.goods}}</div></td>
                </tr> -->
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
import axios from 'axios'
	export default{
		components: {
		//	MQuillEditor
		},
		data(){
			return{
        currentPage:1,
        per_page:10,
        total_pages:1,
        tableData:[],
        activeName: 'first',
        columnIds:'',
        value:'',
        type:'',
        accounts:[],
				imgFullSrc:'',
				imgSrc:'',
				uploadData:{},
				baceUrl:'',
				status:'',
				// content:'111',
				editorOption:{},
				dialogImageUrl: '',
        dialogVisible: false,
        detailDialog: false,
				form1: {
					title: '',
					content:'',
					column:'新闻资讯',
					sourceType:'1',
					source:'',
					status:'',
					author:'',
					userId:'1',
					imgType:'1',
					newsFile:'',
					tagLabels:'',
					keyWords:'',
					coverImgId:''
				},
				idDetail:'',
				cities:[],
				rules1: {
        }
			}
		},
		created(){
			this.baceUrl = getBaceUrl();
			this.getParams();
			// console.log(this.idDetail);
      
      this.$get('/column/findColumnList',{tokenId:this.$store.state.user.tokenId,navigationBar:''}).then(res => {
    		// console.log(res.data)
    		this.columnIds = res.data
    	});
			// this.getImgUrl();
		},
		mounted() {
			this.$get('/reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
        this.cities = res.data
         this.showNews();
      });
      this.getComment();
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        console.log(res)
        this.accounts = res.data;
      })
			var content =  document.getElementById('content');
			content.innerHTML=this.form1.content;
		},
		methods:{
      handleSizeChange(val) {
        this.per_page=val;
        this.getComment();
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.getComment();
      },
      tabClick(tab, event) {
        console.log(tab, event);
      },
			//上下线操作
			onOff(status,type,article_type){
				this.$confirm(`确定要${type}该新闻吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						status:status,
						id:this.form1.id
					}
					this.$post('news/isOnline',params).then(res => {
						// console.log(res)
						this.showNews();
						this.$message({
							type: 'success',
							message: res.msg
						});
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '失败了'
          });          
        });
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
			//提交审核
			toAudit(){
				this.$confirm('确认要提交审核吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						ids:this.form1.id,
					}
					console.log(params)
					this.$post('news/batchWaitCheck',params).then(res =>{
						// console.log(res);
						this.$message({
							type: 'success',
							message: res.msg
            });
            this.showNews();
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: res.msg
          });          
        });
			},
			//获取封面图路径
			/* getImgUrl(){
				this.imgFullSrc = this.baceUrl + this.imgSrc;
				console.log(this.imgSrc)
				console.log(this.imgFullSrc)
			}, */
			// 获取新闻详情
			showNews(){
				var params = {
					tokenId:this.$store.state.user.tokenId,
					id:this.idDetail
				}
				this.$get('news/show',params).then(res => {
          this.form1 = res.data[0];
          if(this.form1.sourceType==2){
            this.cities.map(item => {
              if(item.id == this.form1.source){
                this.form1.sourceName= item.name;
              }
            });
          }
				});
			},
			getParams () {
        // 取到路由带过来的参数 
				let routerParams = this.$route.params.id
        console.log(this.$route);
        console.log(this.$router);
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams
				this.idDetail = routerParams
				// console.log(this.idDetail)
      },
			
			getFullUrl(){
				return (this.baceUrl+'/news/add')
			},
			
      
    },
    beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = true;
        // console.log(111)
        next();
    },
		watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
	}
</script>
<style type="text/css">
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
	
	.news_lookes .el-dialog--center .el-dialog__body{
		padding: 0 ;
	}
  .news_lookes .el-table td, 
  .news_lookes .el-table th{
    padding: 4px 0;
  }
  .news_lookes .showImgs{
    width: 80px;
    height: 80px;
    line-height: 88px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 8px 8px 0;
    display: inline-block;
  }
  .showImgs img{
    width: 100%;
    height: 100%;
    line-height: 88px;
  }
  .news_lookes .tableOverstyle{
    width: 1000px;
    margin: 0 auto;
  }
  /* .news_lookes .el-table .cell{
    overflow: auto;
    max-height: 48px;
    white-space: nowrap;
    text-overflow: initial;
  } */
</style>
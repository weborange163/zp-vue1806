<template>
	<div class="page-body news_lookes" style="min-width:1200px;">
		<el-dialog center width="375px"  :visible.sync="detailDialog" id='div1'>
			<el-form :data="form1" ref="form1" label-width="110px" class="form1 ql-editor">
				<p id="p1" >{{form1.title }}</p>
				<p id="p2" v-html="form1.content"></p>
			</el-form>
		</el-dialog>
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>新闻管理</el-breadcrumb-item>
				<el-breadcrumb-item>查看{{type}}资讯</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="box" >
			<div class="text-right marR100">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" @click="detailDialog = true;" >预览</el-button>
				<el-button size="small" v-if="form1.status == '0'" class="light_btn" @click="toAudit()">提交审核</el-button>
				<el-button size="small" class="light_btn" v-if="form1.status == '5'" @click="onOff('4','上线',form1.articleType)">上线</el-button>
				<el-button size="small" class="light_btn" v-if="status == '4'&& form1.topFlag!='1'&&form1.recommend !='1'&&form1.specialNewsStatus!=1" @click="onOff('5','下线',form1.articleType)">下线</el-button>
				<!-- <el-button size="small" class="light_btn" v-else :disabled="true">下线</el-button> -->
			</div>
			<el-form ref="form1" :model="form1" label-width="84px" :rules="rules1" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title" >
						<el-input type="textarea" autosize v-model="form1.title" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor ql-show">
						<div id="content" class="ql-editor" v-html="form1.content"></div>
					<!-- 	<m-quill-editor ref="myQuillEditor" v-model="form1.content"
						:width="quill.width" :getContent="onEditorChange"
						:has-border="quill.border" :zIndex="quill.zIndex"
						:sync-output="quill.syncOutput"
						:theme="quill.theme"
						:disabled="quill.disabled"
						:fullscreen="quill.full"
						@upload="uploadImg" @blur="onEditorBlur($event)"
						></m-quill-editor> -->
					</el-form-item>
					<!-- <div id="test" class="ql-editor"></div> -->
				</div>
				<div style="width: 35%;float:left;padding:15px;">
					<el-form-item label="发布到:">
						<el-input :disabled="true" v-model="type"></el-input>
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
          <el-form-item label="所属分类:" prop="userId">
            <el-select v-model="value" name="classifyType" placeholder="暂无分类"  style='padding-left: 6px;' :disabled="true">
              <el-option v-for="item in classifyType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
					</el-form-item>
					<el-form-item label="发布账号:" v-if="form1.publishSource!='3'" prop="userId" label-width="82">
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
					<el-form-item label="附加选项:" prop="sourceType" label-width="82">
							<el-radio-group v-model="form1.sourceType">
								<el-radio label="1" disabled>上传缩略图</el-radio>
								<el-radio label="2" disabled>提取第一个图为缩略图</el-radio>
							</el-radio-group>
					</el-form-item>
					<el-form-item label="封面图:">
						<img class="wh80" :src="imgFullSrc" alt="封面图展示">
					</el-form-item>
          <el-form-item label="视频地址:" v-if="form1.videoId">
						<a :href="form1.videoUrl">{{form1.videoUrl}}</a>
					</el-form-item>
          <el-form-item label="视频名称:" v-if="form1.videoId">
            <p v-text="form1.videoName"></p>
					</el-form-item>
					<el-form-item label="Tag标签:">
						<el-input  v-model="form1.tagLabels" :disabled="true"></el-input>
					</el-form-item>
					<!-- <el-form-item label="关键词:">
						<el-input  v-model="form1.keyWords" :disabled="true"></el-input>
					</el-form-item> -->
          <div class="tableOverstyle">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
            <colgroup>
              <col name="el-table_1_column_1" width="25%">
              <col name="el-table_1_column_2" width="75%">
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td><div class="cell">发布来源</div></td>
                <td><div class="cell">
                  <span v-if="form1.publishSource == '1'">PC后台</span><span v-if="form1.publishSource == '2'">数据爬取</span><span v-if="form1.publishSource == '3'">APP端</span>
                  </div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">文章ID</div></td>
                <td><div class="cell">{{form1.articleId}}</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">状态</div></td>
                <td><div class="cell">
                  <span v-if="form1.status == '0'">新建</span><span v-if="form1.status == '1'">待审核</span><span v-if="form1.status == '2'">审核中</span>
                  <span v-if="form1.status == '3'">审核不通过</span><span v-if="form1.status == '4'">已上线</span><span v-if="form1.status == '5'">已下线</span>
                  </div></td>
              </tr>
            </tbody>
          </table>
          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border marT20">
            <colgroup>
              <col name="el-table_1_column_1" >
              <col name="el-table_1_column_1" >
              <col name="el-table_1_column_1" >
              <col name="el-table_1_column_2" >
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td><div class="cell"></div></td>
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
          </div>
				</div>
			</el-form>
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
        classifyType: '',
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
			this.showNews();
			// this.getImgUrl();
		},
		mounted() {
			this.$get('reprintSth/findAll',{tokenId:this.$store.state.user.tokenId}).then(res => {
    		// console.log(res.data)
    		this.cities = res.data
      });
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        console.log(res)
        this.accounts = res.data;
      })
			var content =  document.getElementById('content');
			content.innerHTML=this.form1.content;
		},
		methods:{
			//上下线操作
			onOff(status,type,article_type){
        var text='';
        var router =''
        if(article_type =='1'){
          text = '新闻';
          router = 'news';
        }else{
          text = '行情'
          router = 'market'
        }
				this.$confirm(`确定要${type}该${text}吗?`, '提示', {
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
						setTimeout(() => {
								this.$router.push({name: router});
							}, 1000);
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
						setTimeout(() => {
								this.$router.push({name: 'news'});
							}, 1000);
						this.$message({
							type: 'success',
							message: res.msg
						});
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
          // console.log(this.form1);
          this.classifyType = this.form1.classifyType;
          if(this.form1.articleType == '1'){
            this.type='新闻'
          }else{
            this.type='行情'
          }
					this.imgSrc = this.form1.coverImgId;
					this.status = this.form1.status;
          this.imgFullSrc = this.form1.coverImgUrl;
          	let selectid = this.classifyType;
				//				alert(selectid)
				//  	下拉菜单
				this.$get('/column/findColumnList', {
					tokenId: this.$store.state.user.tokenId
				}).then(res => {
					console.log(res.data)
					this.classifyType = res.data
					for(var i = 0; i < this.classifyType.length; i++) {
						if(selectid == this.classifyType[i].id) {
							this.value = this.classifyType[i].name
						}
					}
				})
				});
			},
			getParams () {
        // 取到路由带过来的参数 
				let routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams
				this.idDetail = routerParams
				// console.log(this.idDetail)
      },
			// 富文本图片上传
			uploadImg(file,insert){
				console.log(file)
				let params = new FormData(); // 创建form对象
				params.append('file',file,file.name);
				// params.append('name',file.name);
				console.log(file.name)
				
				this.$post('images/upload',params).then(res => {
					let url = this.baceUrl + res.data[0].showUrl;
					// console.log(url)
					insert(url, 'center')
					console.log(res);
				})
			},
			getFullUrl(){
				return (this.baceUrl+'/news/add')
			},
			test(){
				console.log(this.form1.source);
			},
			
			handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
			}
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
  /* .news_lookes .el-table .cell{
    overflow: auto;
    max-height: 48px;
    white-space: nowrap;
    text-overflow: initial;
  } */
</style>